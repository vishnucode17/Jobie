# Generated by Django 3.1.14 on 2022-08-22 07:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_auto_20220822_1256'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='candidate',
            name='email',
        ),
        migrations.RemoveField(
            model_name='candidate',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='candidate',
            name='last_name',
        ),
    ]
