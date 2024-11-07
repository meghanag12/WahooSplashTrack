# main_app/api/urls.py
from rest_framework.routers import DefaultRouter

from main_app.api.urls import swimmer_router, start_router, myRio_router

from main_app.api.views import SwimmerViewSet, StartViewSet, MyRioViewSet

from django.urls import path, include

# Create a single router instance
router = DefaultRouter()
router.register(r'swimmer', SwimmerViewSet, basename='swimmer')
router.register(r'start', StartViewSet, basename='start')
router.register(r'myrio', MyRioViewSet, basename='myrio')

# Add the router URLs to urlpatterns
urlpatterns = [
    path('', include(router.urls)),
]
