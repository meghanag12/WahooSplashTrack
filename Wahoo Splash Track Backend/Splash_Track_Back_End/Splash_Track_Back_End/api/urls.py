from rest_framework.routers import DefaultRouter
from main_app.api.urls import swimmer_router, start_router, myRio_router
from django.urls import path, include

router = DefaultRouter() 
router.registry.extend(swimmer_router.registry)
router.registry.extend(start_router.registry)
router.registry.extend(myRio_router.registry)

urlpatterns = [
    path('', include(router.urls))
]