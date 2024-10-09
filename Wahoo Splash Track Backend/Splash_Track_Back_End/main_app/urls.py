from django.urls import path
from . import views


#URL Config
urlpatterns = [
    path('hello/', views.say_hello),
    path('test/', views.insert_data, name = 'insert_data'),
    path('starts/', views.start_list),
    path('swimmers/', views.swimmer_list),
    path('swimmers/<int:swimmer_id>/', views.swimmer_list, name='swimmer_delete'),
]