from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader


from . models import Swimmer 
from . models import RecordMagnitude

from rest_framework.response import Response 
from rest_framework.decorators import api_view 


# Create your views here.
def index(request):
    return HttpResponse("Magnitude Recorder")

def stats_page(request):
    return HttpResponse("Search Swimmer Stats")


def swim_stats(request, swimmer_id):
    mag_stats_for_swimmer = RecordMagnitude.objects.filter(retrieve_swimmer = swimmer_id).values_list('magnitude', flat = True)
    template = loader.get_template("myapp/swim_stats")
    context = {
        "mag_stats_for_swimmer": mag_stats_for_swimmer, 
    }
    return HttpResponse(template.render(context,request))

@api_view(['POST'])
def save_raw_data(request):
    data = request.data.get('data') #extract 'data' from the POST request
    if data:
        RecordMagnitude.objects.create(data = data)
        return Response({'message': 'Data saved successfully!'}, status = 201)
    return Response({'error': 'No data provided'}, status = 400)

def graph_data(request, swimmer_id):
    return HttpResponse("Hello World")

    
