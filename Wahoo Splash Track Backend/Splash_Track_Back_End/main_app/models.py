from django.db import models

# Create your models here.

class Swimmer(models.Model):
    swimmer_id = models.AutoField(primary_key=True)  
    first_name = models.CharField(max_length=400)
    last_name = models.CharField(max_length=400)
    year = models.CharField(max_length=100)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Start(models.Model):
    swimmer = models.ForeignKey(Swimmer, on_delete=models.CASCADE)
    start_id = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    front_force = models.JSONField()
    back_force = models.JSONField()

    def __str__(self):
      return f'Start {self.start_id} for Swimmer {self.swimmer}'

