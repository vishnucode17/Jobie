# Generated by Django 3.1.14 on 2022-08-22 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_auto_20220822_1319'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experience',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
