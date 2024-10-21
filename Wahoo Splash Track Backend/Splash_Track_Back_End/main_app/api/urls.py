from django.urls import path 
from rest_framework.routers import DefaultRouter
from .views import SwimmerViewSet, StartViewSet

swimmer_router = DefaultRouter()
#rsswimmer argument specifies the URL prefix for the routes handled by this viewset
#automatically creates API routes like /swimmer/ and /swimmer/{id}/
swimmer_router.register(r'swimmer', SwimmerViewSet)

start_router = DefaultRouter()
start_router.register(r'start', StartViewSet)