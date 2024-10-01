from django.urls import path
from . import views 

urlpatterns = [
    path("", views.index, name="index"), 
    path("", views.stats_page, name = "stats_page"),
    path("<char:swimmer_id>/", views.swim_stats, name = "swim_stats"),
    path("<char:swimmer_id>/raw_data", views.raw_data, name = "raw_data"), 
    path("<char:swimmer_id>/graph_data", views.graph_data, name = "graph_data") 
]


