from django.db import models

class TestTable(models.Model):
    swim_id = models.IntegerField()  # Corresponds to the 'swim_id' column
    front = models.IntegerField()    # Corresponds to the 'front' column
    back = models.IntegerField()     # Corresponds to the 'back' column
    react = models.IntegerField()    # Corresponds to the 'react' column

    def __str__(self):
        return f"Swim ID: {self.swim_id}, Front: {self.front}, Back: {self.back}, React: {self.react}"

