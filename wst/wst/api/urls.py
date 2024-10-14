from rest_framework.routers import DefaultRouter
from myapp.api.urls import test_post_router, magnitude_recorder_router
from django.urls import path, include

router = DefaultRouter() 
router.registry.extend(test_post_router.registry)
router.registry.extend(magnitude_recorder_router.registry)

urlpatterns = [
    path('', include(router.urls))
]

