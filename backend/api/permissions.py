from rest_framework import permissions

class IsCitizen(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'CITIZEN')

class IsCMOAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'CMO_ADMIN')

class IsDepartmentOfficer(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'DEPARTMENT_OFFICER')

class IsAdminOrOfficer(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and 
            (request.user.role == 'CMO_ADMIN' or request.user.role == 'DEPARTMENT_OFFICER')
        )
