from django.urls import path 
from rest_framework.routers import DefaultRouter
from .views import TestPostViewSet, MagnitudeRecorderViewSet

test_post_router = DefaultRouter()
test_post_router.register(r'posts', TestPostViewSet)

magnitude_recorder_router = DefaultRouter()
magnitude_recorder_router.register(r'record', MagnitudeRecorderViewSet)