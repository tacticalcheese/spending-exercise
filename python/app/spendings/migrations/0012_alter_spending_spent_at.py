# Generated by Django 3.2.13 on 2022-05-17 13:11

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spendings', '0011_auto_20220517_1509'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spending',
            name='spent_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 17, 15, 11, 13, 884114), verbose_name='Time spent'),
        ),
    ]