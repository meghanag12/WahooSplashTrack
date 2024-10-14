from django.urls import path
from . import views 
from .views import save_raw_data, test_get

urlpatterns = [
    path("", views.index, name="index"), 
    path("", views.stats_page, name = "stats_page"),
    path('api/save-raw-data/', save_raw_data, name = 'save_raw_data'),
    path('api/test-get/', test_get, name = 'test_get')
    # path("<str:swimmer_id>/", views.swim_stats, name = "swim_stats"),
    # path("<str:swimmer_id>/graph_data", views.graph_data, name = "graph_data") 
]


