# Generated by Django 3.1.14 on 2022-08-22 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_auto_20220822_1303'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='year_of_graduation',
            field=models.IntegerField(default=None, null=True),
        ),
    ]