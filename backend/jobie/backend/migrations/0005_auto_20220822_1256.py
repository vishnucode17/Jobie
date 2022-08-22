# Generated by Django 3.1.14 on 2022-08-22 07:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20220822_1230'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='note',
            field=models.TextField(blank=True, default='', max_length=1024, null=True),
        ),
        migrations.AddField(
            model_name='application',
            name='resume',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]