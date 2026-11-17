from django.utils import timezone
from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import Count, Q

from .models import (
    User, Department, Grievance, Attachment, GrievanceHistory,
    DepartmentAssignment, ActionTakenReport, CitizenFeedback, ContactEnquiry
)
from .serializers import (
    CustomTokenObtainPairSerializer, UserRegistrationSerializer, UserProfileSerializer,
    DepartmentSerializer, AttachmentSerializer, GrievanceListSerializer,
    GrievanceDetailSerializer, GrievanceCreateSerializer, PublicTrackingSerializer,
    ActionTakenReportSerializer, CitizenFeedbackSerializer, ContactEnquirySerializer
)
from .permissions import IsCitizen, IsCMOAdmin, IsDepartmentOfficer, IsAdminOrOfficer
from .gemini_service import analyze_grievance_with_gemini


# Auth Views
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterCitizenView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]


class CurrentUserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


# Department Views
class DepartmentListView(generics.ListAPIView):
    queryset = Department.objects.filter(is_active=True)
    serializer_class = DepartmentSerializer
    permission_classes = [AllowAny]


# AI Analysis View
class AIAnalyzeView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        description = request.data.get('description', '').strip()
        subject = request.data.get('subject', '').strip()

        if not description:
            return Response({'error': 'Description is required for analysis.'}, status=status.HTTP_400_BAD_REQUEST)

        analysis = analyze_grievance_with_gemini(description=description, subject=subject)
        return Response(analysis, status=status.HTTP_200_OK)


# Grievance Views for Citizen
class CitizenGrievanceListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsCitizen]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return GrievanceCreateSerializer
        return GrievanceListSerializer

    def get_queryset(self):
        return Grievance.objects.filter(citizen=self.request.user)

    def perform_create(self, serializer):
        # Trigger Gemini AI analysis during creation
        description = serializer.validated_data.get('description', '')
        subject = serializer.validated_data.get('subject', '')
        
        ai_data = analyze_grievance_with_gemini(description=description, subject=subject)
        
        grievance = serializer.save(
            citizen=self.request.user,
            status=Grievance.Status.SUBMITTED,
            priority=ai_data.get('priority', Grievance.Priority.MEDIUM),
            ai_category=ai_data.get('category', ''),
            ai_suggested_department=ai_data.get('suggested_department', ''),
            ai_priority=ai_data.get('priority', ''),
            ai_summary=ai_data.get('summary', ''),
            ai_suggested_action=ai_data.get('suggested_action', ''),
            ai_raw_response=ai_data
        )

        # Create initial history log
        GrievanceHistory.objects.create(
            grievance=grievance,
            previous_status='',
            new_status=Grievance.Status.SUBMITTED,
            changed_by=self.request.user,
            remarks='Grievance submitted by citizen with initial AI triage.'
        )


class CitizenGrievanceDetailView(generics.RetrieveAPIView):
    serializer_class = GrievanceDetailSerializer
    permission_classes = [IsCitizen]

    def get_queryset(self):
        return Grievance.objects.filter(citizen=self.request.user)


# Public Grievance Tracking
class PublicGrievanceTrackingView(views.APIView):
    permission_classes = [AllowAny]

    def get(self, request, ref_number):
        try:
            grievance = Grievance.objects.get(reference_number=ref_number.strip().upper())
            serializer = PublicTrackingSerializer(grievance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Grievance.DoesNotExist:
            return Response({'error': 'Grievance not found with the provided reference number.'}, status=status.HTTP_404_NOT_FOUND)


# Attachment Upload
class AttachmentUploadView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, grievance_id):
        try:
            grievance = Grievance.objects.get(id=grievance_id)
        except Grievance.DoesNotExist:
            return Response({'error': 'Grievance not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check permission: citizen owner or admin or assigned officer
        if request.user.role == User.Role.CITIZEN and grievance.citizen != request.user:
            return Response({'error': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)

        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided.'}, status=status.HTTP_400_BAD_REQUEST)

        attachment = Attachment.objects.create(
            grievance=grievance,
            file=file,
            filename=file.name,
            file_type=file.content_type if hasattr(file, 'content_type') else ''
        )

        return Response(AttachmentSerializer(attachment).data, status=status.HTTP_201_CREATED)


# Feedback Submission
class SubmitFeedbackView(views.APIView):
    permission_classes = [IsCitizen]

    def post(self, request, grievance_id):
        try:
            grievance = Grievance.objects.get(id=grievance_id, citizen=request.user)
        except Grievance.DoesNotExist:
            return Response({'error': 'Grievance not found.'}, status=status.HTTP_404_NOT_FOUND)

        if grievance.status != Grievance.Status.RESOLVED:
            return Response({'error': 'Feedback can only be submitted for resolved grievances.'}, status=status.HTTP_400_BAD_REQUEST)

        if hasattr(grievance, 'feedback'):
            return Response({'error': 'Feedback already submitted for this grievance.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CitizenFeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(grievance=grievance, citizen=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# CMO Admin Views
class CMODashboardStatsView(views.APIView):
    permission_classes = [IsCMOAdmin]

    def get(self, request):
        total_grievances = Grievance.objects.count()
        pending_grievances = Grievance.objects.filter(
            status__in=[Grievance.Status.SUBMITTED, Grievance.Status.UNDER_REVIEW, Grievance.Status.IN_PROGRESS, Grievance.Status.REOPENED]
        ).count()
        resolved_grievances = Grievance.objects.filter(status=Grievance.Status.RESOLVED).count()
        escalated_grievances = Grievance.objects.filter(is_escalated=True).count()

        # District-wise breakdown
        district_stats = list(
            Grievance.objects.values('district')
            .annotate(count=Count('id'))
            .order_by('-count')
        )

        # Department-wise breakdown
        department_stats = list(
            Department.objects.annotate(count=Count('assigned_grievances'))
            .values('name', 'count')
            .order_by('-count')
        )

        # Priority breakdown
        priority_stats = list(
            Grievance.objects.values('priority')
            .annotate(count=Count('id'))
        )

        # Status breakdown
        status_stats = list(
            Grievance.objects.values('status')
            .annotate(count=Count('id'))
        )

        return Response({
            'total_grievances': total_grievances,
            'pending_grievances': pending_grievances,
            'resolved_grievances': resolved_grievances,
            'escalated_grievances': escalated_grievances,
            'district_stats': district_stats,
            'department_stats': department_stats,
            'priority_stats': priority_stats,
            'status_stats': status_stats
        }, status=status.HTTP_200_OK)


class CMOGrievanceListView(generics.ListAPIView):
    permission_classes = [IsCMOAdmin]
    serializer_class = GrievanceListSerializer

    def get_queryset(self):
        queryset = Grievance.objects.all()
        district = self.request.query_params.get('district')
        category = self.request.query_params.get('category')
        priority = self.request.query_params.get('priority')
        status_param = self.request.query_params.get('status')
        search = self.request.query_params.get('search')

        if district:
            queryset = queryset.filter(district=district)
        if category:
            queryset = queryset.filter(category__icontains=category)
        if priority:
            queryset = queryset.filter(priority=priority)
        if status_param:
            queryset = queryset.filter(status=status_param)
        if search:
            queryset = queryset.filter(
                Q(reference_number__icontains=search) |
                Q(subject__icontains=search) |
                Q(description__icontains=search)
            )

        return queryset


class CMOGrievanceDetailView(generics.RetrieveAPIView):
    permission_classes = [IsCMOAdmin]
    queryset = Grievance.objects.all()
    serializer_class = GrievanceDetailSerializer


class CMOAssignGrievanceView(views.APIView):
    permission_classes = [IsCMOAdmin]

    def post(self, request, pk):
        try:
            grievance = Grievance.objects.get(pk=pk)
        except Grievance.DoesNotExist:
            return Response({'error': 'Grievance not found.'}, status=status.HTTP_404_NOT_FOUND)

        department_id = request.data.get('department_id')
        officer_id = request.data.get('officer_id')
        instructions = request.data.get('instructions', '')
        priority = request.data.get('priority')

        if not department_id:
            return Response({'error': 'Department is required for assignment.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            dept = Department.objects.get(id=department_id)
        except Department.DoesNotExist:
            return Response({'error': 'Department not found.'}, status=status.HTTP_400_BAD_REQUEST)

        officer = None
        if officer_id:
            try:
                officer = User.objects.get(id=officer_id, role=User.Role.DEPARTMENT_OFFICER, department=dept)
            except User.DoesNotExist:
                return Response({'error': 'Officer not found or does not belong to the selected department.'}, status=status.HTTP_400_BAD_REQUEST)

        prev_status = grievance.status
        grievance.assigned_department = dept
        grievance.assigned_officer = officer
        grievance.status = Grievance.Status.UNDER_REVIEW
        if priority:
            grievance.priority = priority
        grievance.save()

        # Create assignment record
        DepartmentAssignment.objects.create(
            grievance=grievance,
            department=dept,
            assigned_by=request.user,
            assigned_officer=officer,
            instructions=instructions
        )

        # Log history
        remarks = f"Assigned to {dept.name}"
        if officer:
            remarks += f" (Officer: {officer.full_name})"
        if instructions:
            remarks += f". Note: {instructions}"

        GrievanceHistory.objects.create(
            grievance=grievance,
            previous_status=prev_status,
            new_status=Grievance.Status.UNDER_REVIEW,
            changed_by=request.user,
            remarks=remarks
        )

        return Response(GrievanceDetailSerializer(grievance).data, status=status.HTTP_200_OK)


class CMOUpdateStatusView(views.APIView):
    permission_classes = [IsCMOAdmin]

    def post(self, request, pk):
        try:
            grievance = Grievance.objects.get(pk=pk)
        except Grievance.DoesNotExist:
            return Response({'error': 'Grievance not found.'}, status=status.HTTP_404_NOT_FOUND)

        new_status = request.data.get('status')
        remarks = request.data.get('remarks', '')

        if new_status not in [Grievance.Status.RESOLVED, Grievance.Status.REOPENED, Grievance.Status.IN_PROGRESS]:
            return Response({'error': f'Invalid status transition: {new_status}'}, status=status.HTTP_400_BAD_REQUEST)

        prev_status = grievance.status
        grievance.status = new_status
        grievance.cmo_remarks = remarks
        if new_status == Grievance.Status.RESOLVED:
            grievance.resolved_at = timezone.now()
        grievance.save()

        GrievanceHistory.objects.create(
            grievance=grievance,
            previous_status=prev_status,
            new_status=new_status,
            changed_by=request.user,
            remarks=remarks or f"Status changed to {new_status} by CMO Admin."
        )

        return Response(GrievanceDetailSerializer(grievance).data, status=status.HTTP_200_OK)


class CMOEscalateGrievanceView(views.APIView):
    permission_classes = [IsCMOAdmin]

    def post(self, request, pk):
        try:
            grievance = Grievance.objects.get(pk=pk)
        except Grievance.DoesNotExist:
            return Response({'error': 'Grievance not found.'}, status=status.HTTP_404_NOT_FOUND)

        reason = request.data.get('reason', 'Escalated by CMO due to administrative urgency or delay.')
        grievance.is_escalated = True
        grievance.escalation_reason = reason
        grievance.priority = Grievance.Priority.HIGH
        grievance.save()

        GrievanceHistory.objects.create(
            grievance=grievance,
            previous_status=grievance.status,
            new_status=grievance.status,
            changed_by=request.user,
            remarks=f"Grievance escalated: {reason}"
        )

        return Response(GrievanceDetailSerializer(grievance).data, status=status.HTTP_200_OK)


# Department Officer Views
class OfficerGrievanceListView(generics.ListAPIView):
    permission_classes = [IsDepartmentOfficer]
    serializer_class = GrievanceListSerializer

    def get_queryset(self):
        officer = self.request.user
        if not officer.department:
            return Grievance.objects.none()

        queryset = Grievance.objects.filter(
            Q(assigned_department=officer.department) | Q(assigned_officer=officer)
        )
        status_param = self.request.query_params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param)

        return queryset


class OfficerGrievanceDetailView(generics.RetrieveAPIView):
    permission_classes = [IsDepartmentOfficer]
    serializer_class = GrievanceDetailSerializer

    def get_queryset(self):
        officer = self.request.user
        if not officer.department:
            return Grievance.objects.none()

        return Grievance.objects.filter(
            Q(assigned_department=officer.department) | Q(assigned_officer=officer)
        )


class OfficerUpdateStatusView(views.APIView):
    permission_classes = [IsDepartmentOfficer]

    def post(self, request, pk):
        officer = request.user
        try:
            grievance = Grievance.objects.get(
                Q(assigned_department=officer.department) | Q(assigned_officer=officer),
                pk=pk
            )
        except Grievance.DoesNotExist:
            return Response({'error': 'Grievance not found or not assigned to your department.'}, status=status.HTTP_404_NOT_FOUND)

        new_status = request.data.get('status')
        remarks = request.data.get('remarks', '')

        # Officers can update to In Progress or Under Review
        if new_status not in [Grievance.Status.IN_PROGRESS, Grievance.Status.UNDER_REVIEW]:
            return Response({'error': 'Officers can only set status to In Progress or Under Review. Use Action Report for resolution recommendation.'}, status=status.HTTP_400_BAD_REQUEST)

        prev_status = grievance.status
        grievance.status = new_status
        grievance.save()

        GrievanceHistory.objects.create(
            grievance=grievance,
            previous_status=prev_status,
            new_status=new_status,
            changed_by=officer,
            remarks=remarks or f"Status updated to {new_status} by officer {officer.full_name}."
        )

        return Response(GrievanceDetailSerializer(grievance).data, status=status.HTTP_200_OK)


class OfficerSubmitActionReportView(views.APIView):
    permission_classes = [IsDepartmentOfficer]

    def post(self, request, pk):
        officer = request.user
        try:
            grievance = Grievance.objects.get(
                Q(assigned_department=officer.department) | Q(assigned_officer=officer),
                pk=pk
            )
        except Grievance.DoesNotExist:
            return Response({'error': 'Grievance not found or not assigned to your department.'}, status=status.HTTP_404_NOT_FOUND)

        investigation_summary = request.data.get('investigation_summary', '').strip()
        action_taken = request.data.get('action_taken', '').strip()
        field_visit_conducted = request.data.get('field_visit_conducted', False)
        evidence_doc = request.FILES.get('evidence_document')

        if not investigation_summary or not action_taken:
            return Response({'error': 'Investigation summary and action taken details are required.'}, status=status.HTTP_400_BAD_REQUEST)

        report = ActionTakenReport.objects.create(
            grievance=grievance,
            officer=officer,
            investigation_summary=investigation_summary,
            action_taken=action_taken,
            field_visit_conducted=field_visit_conducted,
            evidence_document=evidence_doc
        )

        # Log history
        GrievanceHistory.objects.create(
            grievance=grievance,
            previous_status=grievance.status,
            new_status=grievance.status,
            changed_by=officer,
            remarks=f"Action Taken Report submitted by Officer {officer.full_name}. Awaiting CMO review."
        )

        return Response(ActionTakenReportSerializer(report).data, status=status.HTTP_201_CREATED)


# Contact Enquiry View
class ContactEnquiryCreateView(generics.CreateAPIView):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactEnquirySerializer
    permission_classes = [AllowAny]
