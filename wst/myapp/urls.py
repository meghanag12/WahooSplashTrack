from django.urls import path
from . import views 

urlpatterns = [
    path("", views.index, name="index"), 
    path("", views.stats_page, name = "stats_page"),
    path("<char:swimmer_id>/", views.swim_stats, name = "swim_stats"), 
]


