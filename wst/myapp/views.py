from django.shortcuts import render
from django.http import HttpResponse

from . models import Swimmer 
from . models import RecordMagnitude

# Create your views here.
def index(request):
    return HttpResponse("Hello, world")

def stats_page(request):
    return HttpResponse("Search Swimmer Stats")

def swim_stats(request, swimmer_id):
    mag_stats_for_swimmer = RecordMagnitude.objects.filter(retrieve_swimmer = swimmer_id).values_list('magnitude', flat = True)
    return mag_stats_for_swimmer

    
