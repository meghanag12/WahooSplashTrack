# Generated by Django 4.2.11 on 2024-10-13 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TestPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('code', models.CharField(blank='True', max_length=12)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='recordmagnitude',
            name='retrieve_swimmer',
        ),
        migrations.AlterField(
            model_name='recordmagnitude',
            name='magnitude',
            field=models.FloatField(max_length=5),
        ),
    ]
