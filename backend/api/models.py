import uuid
import string
import random
from datetime import timedelta
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', User.Role.CMO_ADMIN)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)


class Department(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150, unique=True)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField(blank=True)
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class User(AbstractUser):
    class Role(models.TextChoices):
        CITIZEN = 'CITIZEN', _('Citizen')
        CMO_ADMIN = 'CMO_ADMIN', _('CMO Administrator')
        DEPARTMENT_OFFICER = 'DEPARTMENT_OFFICER', _('Department Officer')

    username = None
    email = models.EmailField(_('email address'), unique=True)
    full_name = models.CharField(max_length=150)
    mobile_number = models.CharField(max_length=20, blank=True)
    role = models.CharField(max_length=25, choices=Role.choices, default=Role.CITIZEN)
    department = models.ForeignKey(
        Department, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='officers'
    )
    is_verified = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.full_name} ({self.email}) - {self.role}"


def generate_reference_number():
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"KL-GRV-{random_str}"


class Grievance(models.Model):
    class Status(models.TextChoices):
        SUBMITTED = 'Submitted', _('Submitted')
        UNDER_REVIEW = 'Under Review', _('Under Review')
        IN_PROGRESS = 'In Progress', _('In Progress')
        RESOLVED = 'Resolved', _('Resolved')
        REOPENED = 'Reopened', _('Reopened')

    class Priority(models.TextChoices):
        LOW = 'Low', _('Low')
        MEDIUM = 'Medium', _('Medium')
        HIGH = 'High', _('High')

    DISTRICT_CHOICES = [
        ('Thiruvananthapuram', 'Thiruvananthapuram'),
        ('Kollam', 'Kollam'),
        ('Pathanamthitta', 'Pathanamthitta'),
        ('Alappuzha', 'Alappuzha'),
        ('Kottayam', 'Kottayam'),
        ('Idukki', 'Idukki'),
        ('Ernakulam', 'Ernakulam'),
        ('Thrissur', 'Thrissur'),
        ('Palakkad', 'Palakkad'),
        ('Malappuram', 'Malappuram'),
        ('Kozhikode', 'Kozhikode'),
        ('Wayanad', 'Wayanad'),
        ('Kannur', 'Kannur'),
        ('Kasaragod', 'Kasaragod'),
    ]

    # SLA in days based on priority
    SLA_DAYS = {
        Priority.HIGH: 3,     # 3 days for High priority
        Priority.MEDIUM: 7,   # 7 days for Medium priority
        Priority.LOW: 14,     # 14 days for Low priority
    }

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_number = models.CharField(max_length=30, unique=True, default=generate_reference_number, db_index=True)
    citizen = models.ForeignKey(User, on_delete=models.CASCADE, related_name='grievances')
    district = models.CharField(max_length=50, choices=DISTRICT_CHOICES)
    category = models.CharField(max_length=100)
    subject = models.CharField(max_length=255)
    description = models.TextField()
    
    status = models.CharField(max_length=30, choices=Status.choices, default=Status.SUBMITTED, db_index=True)
    priority = models.CharField(max_length=20, choices=Priority.choices, default=Priority.MEDIUM, db_index=True)
    
    assigned_department = models.ForeignKey(
        Department, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='assigned_grievances'
    )
    assigned_officer = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='assigned_cases'
    )
    
    # AI Analysis Fields
    ai_category = models.CharField(max_length=100, blank=True)
    ai_suggested_department = models.CharField(max_length=150, blank=True)
    ai_priority = models.CharField(max_length=20, blank=True)
    ai_summary = models.TextField(blank=True)
    ai_suggested_action = models.TextField(blank=True)
    ai_raw_response = models.JSONField(null=True, blank=True)
    potential_duplicates = models.JSONField(null=True, blank=True)

    # Administrative metadata
    is_escalated = models.BooleanField(default=False)
    escalation_reason = models.TextField(blank=True)
    cmo_remarks = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.reference_number} - {self.subject} ({self.status})"

    def is_overdue(self):
        """
        Calculates if the grievance is overdue based on official SLA rules:
        - High priority: 3 calendar days
        - Medium priority: 7 calendar days
        - Low priority: 14 calendar days
        Only non-resolved grievances can be overdue.
        """
        if self.status == self.Status.RESOLVED:
            return False
        sla_limit_days = self.SLA_DAYS.get(self.priority, 7)
        deadline = self.created_at + timedelta(days=sla_limit_days)
        return timezone.now() > deadline


class Attachment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    grievance = models.ForeignKey(Grievance, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to='grievance_attachments/%Y/%m/')
    filename = models.CharField(max_length=255)
    file_type = models.CharField(max_length=50, blank=True)
    file_size = models.PositiveIntegerField(default=0)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attachment {self.filename} for {self.grievance.reference_number}"


class GrievanceHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    grievance = models.ForeignKey(Grievance, on_delete=models.CASCADE, related_name='history')
    previous_status = models.CharField(max_length=30)
    new_status = models.CharField(max_length=30)
    changed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='status_changes')
    remarks = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.grievance.reference_number}: {self.previous_status} -> {self.new_status}"


class DepartmentAssignment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    grievance = models.ForeignKey(Grievance, on_delete=models.CASCADE, related_name='department_assignments')
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    assigned_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='assignments_made')
    assigned_officer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='officer_assignments')
    instructions = models.TextField(blank=True)
    assigned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-assigned_at']


class ActionTakenReport(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    grievance = models.ForeignKey(Grievance, on_delete=models.CASCADE, related_name='action_reports')
    officer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submitted_action_reports')
    investigation_summary = models.TextField()
    action_taken = models.TextField()
    field_visit_conducted = models.BooleanField(default=False)
    evidence_document = models.FileField(upload_to='action_reports/%Y/%m/', null=True, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"Report for {self.grievance.reference_number} by {self.officer.full_name}"


class CitizenFeedback(models.Model):
    RATING_CHOICES = [(i, str(i)) for i in range(1, 6)]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    grievance = models.OneToOneField(Grievance, on_delete=models.CASCADE, related_name='feedback')
    citizen = models.ForeignKey(User, on_delete=models.CASCADE, related_name='feedbacks')
    rating = models.IntegerField(choices=RATING_CHOICES)
    comments = models.TextField(blank=True)
    is_satisfied = models.BooleanField(default=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for {self.grievance.reference_number} ({self.rating}/5)"


class ContactEnquiry(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Enquiry from {self.name} - {self.subject}"
