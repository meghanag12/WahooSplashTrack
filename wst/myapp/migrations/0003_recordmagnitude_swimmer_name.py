# Generated by Django 4.2.11 on 2024-10-14 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_testpost_remove_recordmagnitude_retrieve_swimmer_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='recordmagnitude',
            name='swimmer_name',
            field=models.CharField(default='Unknown Swimmer', max_length=200),
        ),
    ]