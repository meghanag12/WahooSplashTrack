from rest_framework.routers import DefaultRouter
from main_app.api.urls import swimmer_router, start_router, myRio_router
from main_app.api.views import SwimmerViewSet, StartViewSet, MyRioViewSet
from django.urls import path, include

router = DefaultRouter()
#rsswimmer argument specifies the URL prefix for the routes handled by this viewset
#automatically creates API routes like /swimmer/ and /swimmer/{id}/
router.register(r'swimmer', SwimmerViewSet)
router.register(r'start', StartViewSet)
router.register(r'myrio', MyRioViewSet)

urlpatterns = [
    path('', include(router.urls))
]