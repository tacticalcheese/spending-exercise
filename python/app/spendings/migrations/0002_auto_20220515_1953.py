# Generated by Django 3.2.13 on 2022-05-15 17:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spendings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='spendings',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
        migrations.AddField(
            model_name='spendings',
            name='currency',
            field=models.CharField(default='HUF', max_length=3),
        ),
        migrations.AddField(
            model_name='spendings',
            name='spent_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 15, 19, 53, 3, 966173), verbose_name='Time spent'),
        ),
    ]
