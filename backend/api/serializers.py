from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (
    Department, Grievance, Attachment, GrievanceHistory,
    DepartmentAssignment, ActionTakenReport, CitizenFeedback, ContactEnquiry
)

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['full_name'] = user.full_name
        token['role'] = user.role
        if user.department:
            token['department_id'] = str(user.department.id)
            token['department_name'] = user.department.name
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'id': str(self.user.id),
            'email': self.user.email,
            'full_name': self.user.full_name,
            'role': self.user.role,
            'department': {
                'id': str(self.user.department.id),
                'name': self.user.department.name
            } if self.user.department else None
        }
        return data


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'mobile_number', 'password', 'confirm_password']

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = User.objects.create_user(
            email=validated_data['email'],
            password=password,
            full_name=validated_data['full_name'],
            mobile_number=validated_data.get('mobile_number', ''),
            role=User.Role.CITIZEN
        )
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'mobile_number', 'role', 'department', 'department_name']
        read_only_fields = ['id', 'email', 'role', 'department', 'department_name']


class DepartmentOfficerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'mobile_number']


class DepartmentSerializer(serializers.ModelSerializer):
    officers = DepartmentOfficerSerializer(many=True, read_only=True)
    officers_count = serializers.IntegerField(source='officers.count', read_only=True)

    class Meta:
        model = Department
        fields = ['id', 'name', 'code', 'description', 'contact_email', 'contact_phone', 'is_active', 'officers_count', 'officers']


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'grievance', 'file', 'filename', 'file_type', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']


class GrievanceHistorySerializer(serializers.ModelSerializer):
    changed_by_name = serializers.CharField(source='changed_by.full_name', read_only=True)
    changed_by_role = serializers.CharField(source='changed_by.role', read_only=True)

    class Meta:
        model = GrievanceHistory
        fields = ['id', 'previous_status', 'new_status', 'changed_by', 'changed_by_name', 'changed_by_role', 'remarks', 'timestamp']


class ActionTakenReportSerializer(serializers.ModelSerializer):
    officer_name = serializers.CharField(source='officer.full_name', read_only=True)
    department_name = serializers.CharField(source='officer.department.name', read_only=True)

    class Meta:
        model = ActionTakenReport
        fields = ['id', 'grievance', 'officer', 'officer_name', 'department_name', 'investigation_summary', 'action_taken', 'field_visit_conducted', 'evidence_document', 'submitted_at']
        read_only_fields = ['id', 'officer', 'submitted_at']


class CitizenFeedbackSerializer(serializers.ModelSerializer):
    citizen_name = serializers.CharField(source='citizen.full_name', read_only=True)

    class Meta:
        model = CitizenFeedback
        fields = ['id', 'grievance', 'citizen', 'citizen_name', 'rating', 'comments', 'is_satisfied', 'submitted_at']
        read_only_fields = ['id', 'citizen', 'submitted_at']


class GrievanceDetailSerializer(serializers.ModelSerializer):
    citizen_name = serializers.CharField(source='citizen.full_name', read_only=True)
    citizen_email = serializers.CharField(source='citizen.email', read_only=True)
    citizen_mobile = serializers.CharField(source='citizen.mobile_number', read_only=True)
    assigned_department_name = serializers.CharField(source='assigned_department.name', read_only=True)
    assigned_officer_name = serializers.CharField(source='assigned_officer.full_name', read_only=True)
    attachments = AttachmentSerializer(many=True, read_only=True)
    history = GrievanceHistorySerializer(many=True, read_only=True)
    action_reports = ActionTakenReportSerializer(many=True, read_only=True)
    feedback = CitizenFeedbackSerializer(read_only=True)
    is_overdue = serializers.SerializerMethodField()

    class Meta:
        model = Grievance
        fields = [
            'id', 'reference_number', 'citizen', 'citizen_name', 'citizen_email', 'citizen_mobile',
            'district', 'category', 'subject', 'description', 'status', 'priority',
            'assigned_department', 'assigned_department_name', 'assigned_officer', 'assigned_officer_name',
            'ai_category', 'ai_suggested_department', 'ai_priority', 'ai_summary', 'ai_suggested_action',
            'potential_duplicates', 'is_escalated', 'escalation_reason', 'cmo_remarks', 'attachments', 'history',
            'action_reports', 'feedback', 'created_at', 'updated_at', 'resolved_at', 'is_overdue'
        ]

    def get_is_overdue(self, obj):
        return obj.is_overdue()


class GrievanceListSerializer(serializers.ModelSerializer):
    citizen_name = serializers.CharField(source='citizen.full_name', read_only=True)
    assigned_department_name = serializers.CharField(source='assigned_department.name', read_only=True)
    assigned_officer_name = serializers.CharField(source='assigned_officer.full_name', read_only=True)
    is_overdue = serializers.SerializerMethodField()

    class Meta:
        model = Grievance
        fields = [
            'id', 'reference_number', 'citizen_name', 'district', 'category', 'subject',
            'status', 'priority', 'assigned_department', 'assigned_department_name',
            'assigned_officer', 'assigned_officer_name', 'is_escalated', 'is_overdue', 'created_at', 'updated_at'
        ]

    def get_is_overdue(self, obj):
        return obj.is_overdue()


class GrievanceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grievance
        fields = ['id', 'district', 'category', 'subject', 'description', 'reference_number', 'created_at']
        read_only_fields = ['id', 'reference_number', 'created_at']


class PublicTrackingSerializer(serializers.ModelSerializer):
    assigned_department_name = serializers.CharField(source='assigned_department.name', read_only=True)
    history = GrievanceHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Grievance
        fields = [
            'reference_number', 'district', 'category', 'subject', 'status', 'priority',
            'assigned_department_name', 'created_at', 'updated_at', 'resolved_at', 'history'
        ]


class ContactEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
