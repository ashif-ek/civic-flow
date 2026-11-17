from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView, RegisterCitizenView, CurrentUserProfileView,
    DepartmentListView, AIAnalyzeView,
    CitizenGrievanceListCreateView, CitizenGrievanceDetailView,
    PublicGrievanceTrackingView, AttachmentUploadView, SubmitFeedbackView,
    CMODashboardStatsView, CMOGrievanceListView, CMOGrievanceDetailView,
    CMOAssignGrievanceView, CMOUpdateStatusView, CMOEscalateGrievanceView,
    OfficerGrievanceListView, OfficerGrievanceDetailView, OfficerUpdateStatusView,
    OfficerSubmitActionReportView, ContactEnquiryCreateView
)

urlpatterns = [
    # Auth endpoints
    path('auth/register/', RegisterCitizenView.as_view(), name='register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', CurrentUserProfileView.as_view(), name='user_profile'),

    # Public & Common
    path('departments/', DepartmentListView.as_view(), name='departments_list'),
    path('contact/', ContactEnquiryCreateView.as_view(), name='contact_create'),
    path('grievances/track/<str:ref_number>/', PublicGrievanceTrackingView.as_view(), name='public_tracking'),
    path('ai/analyze/', AIAnalyzeView.as_view(), name='ai_analyze'),

    # Citizen endpoints
    path('citizen/grievances/', CitizenGrievanceListCreateView.as_view(), name='citizen_grievances'),
    path('citizen/grievances/<uuid:pk>/', CitizenGrievanceDetailView.as_view(), name='citizen_grievance_detail'),
    path('grievances/<uuid:grievance_id>/attachments/', AttachmentUploadView.as_view(), name='attachment_upload'),
    path('grievances/<uuid:grievance_id>/feedback/', SubmitFeedbackView.as_view(), name='submit_feedback'),

    # CMO Admin endpoints
    path('cmo/stats/', CMODashboardStatsView.as_view(), name='cmo_stats'),
    path('cmo/grievances/', CMOGrievanceListView.as_view(), name='cmo_grievances'),
    path('cmo/grievances/<uuid:pk>/', CMOGrievanceDetailView.as_view(), name='cmo_grievance_detail'),
    path('cmo/grievances/<uuid:pk>/assign/', CMOAssignGrievanceView.as_view(), name='cmo_assign'),
    path('cmo/grievances/<uuid:pk>/status/', CMOUpdateStatusView.as_view(), name='cmo_status_update'),
    path('cmo/grievances/<uuid:pk>/escalate/', CMOEscalateGrievanceView.as_view(), name='cmo_escalate'),

    # Department Officer endpoints
    path('officer/grievances/', OfficerGrievanceListView.as_view(), name='officer_grievances'),
    path('officer/grievances/<uuid:pk>/', OfficerGrievanceDetailView.as_view(), name='officer_grievance_detail'),
    path('officer/grievances/<uuid:pk>/status/', OfficerUpdateStatusView.as_view(), name='officer_status_update'),
    path('officer/grievances/<uuid:pk>/action-report/', OfficerSubmitActionReportView.as_view(), name='officer_action_report'),
]
