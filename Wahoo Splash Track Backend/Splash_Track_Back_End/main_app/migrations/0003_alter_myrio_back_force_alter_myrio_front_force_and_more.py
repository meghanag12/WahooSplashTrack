# Generated by Django 4.2.16 on 2024-11-10 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0002_alter_start_start_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myrio',
            name='back_force',
            field=models.JSONField(),
        ),
        migrations.AlterField(
            model_name='myrio',
            name='front_force',
            field=models.JSONField(),
        ),
        migrations.AlterField(
            model_name='myrio',
            name='total_force',
            field=models.JSONField(),
        ),
    ]
