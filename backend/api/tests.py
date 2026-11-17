from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from api.models import User, Department, Grievance, GrievanceHistory

class CivicFlowBackendTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.dept = Department.objects.create(name="PWD Test", code="PWD_TEST")
        self.citizen = User.objects.create_user(
            email="test.citizen@example.com",
            password="Password@123",
            full_name="Test Citizen",
            role=User.Role.CITIZEN
        )
        self.cmo = User.objects.create_user(
            email="test.cmo@example.com",
            password="Password@123",
            full_name="Test CMO Admin",
            role=User.Role.CMO_ADMIN
        )
        self.officer = User.objects.create_user(
            email="test.officer@example.com",
            password="Password@123",
            full_name="Test Officer",
            role=User.Role.DEPARTMENT_OFFICER,
            department=self.dept
        )

    def test_auth_login(self):
        response = self.client.post(reverse('login'), {
            'email': 'test.citizen@example.com',
            'password': 'Password@123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('user', response.data)
        self.assertEqual(response.data['user']['role'], 'CITIZEN')

    def test_citizen_submit_and_list_grievance(self):
        self.client.force_authenticate(user=self.citizen)
        
        # Submit
        submit_data = {
            'district': 'Thiruvananthapuram',
            'category': 'Roads & Bridges',
            'subject': 'Pothole on Main Road',
            'description': 'Deep potholes causing road safety problems for vehicles.'
        }
        res = self.client.post(reverse('citizen_grievances'), submit_data)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        ref_no = res.data['reference_number']
        self.assertTrue(ref_no.startswith('KL-GRV-'))

        # List
        list_res = self.client.get(reverse('citizen_grievances'))
        self.assertEqual(list_res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(list_res.data['results']), 1)

    def test_public_tracking(self):
        grievance = Grievance.objects.create(
            citizen=self.citizen,
            district="Kollam",
            category="Water Supply",
            subject="Pipe burst",
            description="Continuous leak near railway station."
        )
        res = self.client.get(reverse('public_tracking', kwargs={'ref_number': grievance.reference_number}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['subject'], "Pipe burst")
        self.assertNotIn('citizen_email', res.data)

    def test_cmo_assign_and_status(self):
        grievance = Grievance.objects.create(
            citizen=self.citizen,
            district="Ernakulam",
            category="Roads & Bridges",
            subject="Broken streetlight",
            description="Dark stretch of highway."
        )
        self.client.force_authenticate(user=self.cmo)

        # Assign
        assign_res = self.client.post(
            reverse('cmo_assign', kwargs={'pk': grievance.id}),
            {'department_id': str(self.dept.id), 'instructions': 'Inspect immediately'}
        )
        self.assertEqual(assign_res.status_code, status.HTTP_200_OK)
        grievance.refresh_from_db()
        self.assertEqual(grievance.status, Grievance.Status.UNDER_REVIEW)
        self.assertEqual(grievance.assigned_department, self.dept)

        # Update to Resolved
        resolve_res = self.client.post(
            reverse('cmo_status_update', kwargs={'pk': grievance.id}),
            {'status': Grievance.Status.RESOLVED, 'remarks': 'Work confirmed complete.'}
        )
        self.assertEqual(resolve_res.status_code, status.HTTP_200_OK)
        grievance.refresh_from_db()
        self.assertEqual(grievance.status, Grievance.Status.RESOLVED)

    def test_officer_action_report(self):
        grievance = Grievance.objects.create(
            citizen=self.citizen,
            district="Ernakulam",
            category="Roads",
            subject="Bridge maintenance",
            description="Crack on pillar",
            assigned_department=self.dept,
            assigned_officer=self.officer,
            status=Grievance.Status.IN_PROGRESS
        )
        self.client.force_authenticate(user=self.officer)

        # Submit action report
        report_data = {
            'investigation_summary': 'Structural team visited site and inspected pillar crack.',
            'action_taken': 'Applied epoxy mortar sealing and stress tested.',
            'field_visit_conducted': True
        }
        res = self.client.post(
            reverse('officer_action_report', kwargs={'pk': grievance.id}),
            report_data
        )
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(grievance.action_reports.count(), 1)
