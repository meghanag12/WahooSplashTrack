from rest_framework.routers import DefaultRouter
from main_app.api.views import SwimmerViewSet, StartViewSet, MyRioViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'swimmer', SwimmerViewSet, basename='swimmer')
router.register(r'start', StartViewSet, basename='start')
router.register(r'myrio', MyRioViewSet, basename='myrio')

urlpatterns = [
    path('', include(router.urls)),
]
