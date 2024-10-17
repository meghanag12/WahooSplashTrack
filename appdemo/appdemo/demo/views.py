from django.shortcuts import render
from django.http import HttpResponse
from .models import TestTable  # Assuming you have a model
#HTML Handler




def say_hello(request):
   return HttpResponse("Hello World")

def insert_data(request):
    if request.method == 'POST':
        swim_id = request.POST.get('swim_id')
        front = request.POST.get('front')
        back = request.POST.get('back')
        react = request.POST.get('react')

        new_record = TestTable(swim_id=swim_id, front=front, back=back, react=react)
        new_record.save()

        return HttpResponse('Data inserted successfully!')
    else:
        return HttpResponse('Not a POST')
