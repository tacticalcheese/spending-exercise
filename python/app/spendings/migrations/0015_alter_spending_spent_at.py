# Generated by Django 3.2.13 on 2022-05-17 18:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spendings', '0014_alter_spending_spent_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spending',
            name='spent_at',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
    ]