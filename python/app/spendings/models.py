from django.db import models
from django.utils import timezone


class Spending(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    amount_normalized = models.IntegerField(default=0)
    spent_at = models.DateTimeField('Time spent', default=timezone.now)
    currency = models.CharField(max_length=3, default='HUF')

    def save(self, *args, **kwargs):
        try:
            if self.currency == 'USD':
                self.amount_normalized = self.amount * 360
            else:
                self.amount_normalized = self.amount
        except TypeError:
            pass
        super().save(*args, **kwargs)

    def __str__(self):
        return self.id 