from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from api.models import Department, Grievance, GrievanceHistory

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds initial departments and demo users for CivicFlow'

    def handle(self, *args, **options):
        self.stdout.write("Seeding departments...")
        
        departments_data = [
            {"name": "Public Works Department", "code": "PWD", "description": "Responsible for state roads, bridges, and public infrastructure maintenance."},
            {"name": "Health and Family Welfare", "code": "HFW", "description": "Public health services, primary health centres, and medical infrastructure."},
            {"name": "Kerala Water Authority", "code": "KWA", "description": "Drinking water supply, pipeline maintenance, and sewage systems."},
            {"name": "Kerala State Electricity Board", "code": "KSEB", "description": "Power transmission, electrical distribution, street lighting, and grid issues."},
            {"name": "General Education Department", "code": "GED", "description": "Public schools, educational facilities, and mid-day meal programs."},
            {"name": "Local Self Government Department", "code": "LSGD", "description": "Panchayat, municipal, waste management, and local civic issues."},
            {"name": "Transport Department", "code": "MOT", "description": "Motor vehicle regulations, public transit, and road safety."},
            {"name": "Revenue and Disaster Management", "code": "REV", "description": "Land administration, certificates, and flood/calamity relief."},
        ]

        departments = {}
        for dept_data in departments_data:
            dept, created = Department.objects.get_or_create(
                code=dept_data["code"],
                defaults={
                    "name": dept_data["name"],
                    "description": dept_data["description"],
                    "contact_email": f"{dept_data['code'].lower()}@civicflow.kerala.gov.in.demo",
                    "contact_phone": "+91 471 2300000"
                }
            )
            departments[dept_data["code"]] = dept
            status = "Created" if created else "Exists"
            self.stdout.write(f" - {dept.name}: {status}")

        self.stdout.write("\nSeeding demo user accounts...")

        # 1. CMO Administrator
        cmo_email = "cmo.admin@civicflow.gov.in"
        cmo_user, created = User.objects.get_or_create(
            email=cmo_email,
            defaults={
                "full_name": "CMO Grievance Director",
                "mobile_number": "9876543210",
                "role": User.Role.CMO_ADMIN,
                "is_staff": True,
                "is_superuser": True
            }
        )
        cmo_user.set_password("Admin@123")
        cmo_user.save()
        self.stdout.write(f" - CMO Admin: {cmo_email} / Admin@123")

        # 2. Department Officer (PWD)
        pwd_dept = departments.get("PWD")
        pwd_officer_email = "officer.pwd@civicflow.gov.in"
        pwd_officer, created = User.objects.get_or_create(
            email=pwd_officer_email,
            defaults={
                "full_name": "Executive Engineer Suresh K",
                "mobile_number": "9876543211",
                "role": User.Role.DEPARTMENT_OFFICER,
                "department": pwd_dept
            }
        )
        pwd_officer.department = pwd_dept
        pwd_officer.set_password("Officer@123")
        pwd_officer.save()
        self.stdout.write(f" - PWD Officer: {pwd_officer_email} / Officer@123")

        # 3. Department Officer (KWA)
        kwa_dept = departments.get("KWA")
        kwa_officer_email = "officer.kwa@civicflow.gov.in"
        kwa_officer, created = User.objects.get_or_create(
            email=kwa_officer_email,
            defaults={
                "full_name": "Assistant Engineer Priya Nair",
                "mobile_number": "9876543212",
                "role": User.Role.DEPARTMENT_OFFICER,
                "department": kwa_dept
            }
        )
        kwa_officer.department = kwa_dept
        kwa_officer.set_password("Officer@123")
        kwa_officer.save()
        self.stdout.write(f" - KWA Officer: {kwa_officer_email} / Officer@123")

        # 4. Citizen
        citizen_email = "citizen.rajesh@gmail.com"
        citizen_user, created = User.objects.get_or_create(
            email=citizen_email,
            defaults={
                "full_name": "Rajesh Varma",
                "mobile_number": "9876543213",
                "role": User.Role.CITIZEN
            }
        )
        citizen_user.set_password("Citizen@123")
        citizen_user.save()
        self.stdout.write(f" - Citizen User: {citizen_email} / Citizen@123")

        # Create demo grievance for immediate walkthrough
        demo_ref = "KL-GRV-DEMO01"
        if not Grievance.objects.filter(reference_number=demo_ref).exists():
            grievance = Grievance.objects.create(
                reference_number=demo_ref,
                citizen=citizen_user,
                district="Thiruvananthapuram",
                category="Roads & Bridges",
                subject="Severe pothole cluster near Pattom Junction causing traffic bottleneck",
                description="The stretch of road directly in front of the sub-post office at Pattom has developed deep craters over the past two weeks. Commuters and two-wheelers are facing extreme danger, especially after evening showers.",
                status=Grievance.Status.UNDER_REVIEW,
                priority=Grievance.Priority.HIGH,
                assigned_department=pwd_dept,
                assigned_officer=pwd_officer,
                ai_category="Roads & Bridges",
                ai_suggested_department="Public Works Department",
                ai_priority="High",
                ai_summary="Severe road deterioration and pothole cluster in Pattom resulting in road safety hazards.",
                ai_suggested_action="Dispatch PWD road maintenance quick-response crew for cold-mix bitumen patching."
            )
            GrievanceHistory.objects.create(
                grievance=grievance,
                previous_status="",
                new_status=Grievance.Status.SUBMITTED,
                changed_by=citizen_user,
                remarks="Submitted via Citizen Portal."
            )
            GrievanceHistory.objects.create(
                grievance=grievance,
                previous_status=Grievance.Status.SUBMITTED,
                new_status=Grievance.Status.UNDER_REVIEW,
                changed_by=cmo_user,
                remarks="Assigned to Public Works Department for urgent site inspection."
            )
            self.stdout.write(f" - Created demo grievance: {demo_ref}")

        self.stdout.write(self.style.SUCCESS("Successfully seeded CivicFlow demo data!"))
