# Generated by Django 3.1.14 on 2022-08-22 11:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0012_auto_20220822_1412'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='company_id',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.company'),
        ),
    ]
