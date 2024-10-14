from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
import json 


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

@api_view(['GET'])
def test_get(request):
     if request.method == 'GET':
            # Respond with a success message
        return JsonResponse({'message': 'GET request successful'}, status=200)
     else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_protect
@api_view(['POST'])
def save_raw_data(request):
    if request == 'POST':
        data = json.loads(request.body)
        print("Parsed JSON:", data)
        mag_data = data.get('mag') #extract 'data' from the POST request
        if data:
            magnitude = RecordMagnitude(value = mag_data)
            magnitude.save()
            return Response({'message': 'Data saved successfully!'}, status = 201)
    return Response({'error': 'No data provided'}, status = 400)

def graph_data(request, swimmer_id):
    return HttpResponse("Hello World")

    
