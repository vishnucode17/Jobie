# Generated by Django 3.1.14 on 2022-08-22 08:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_auto_20220822_1327'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='year_of_graduation',
            field=models.CharField(default=None, max_length=10, null=True),
        ),
    ]