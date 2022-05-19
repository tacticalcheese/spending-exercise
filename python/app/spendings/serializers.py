from rest_framework import serializers

from .models import Spending


class SpendingSerializers(serializers.ModelSerializer):

    class Meta:
        model = Spending
        fields = ('id', 'description', 'amount', 'amount_normalized', 'spent_at', 'currency')
        extra_kwwargs = {
            'description': {'max_length': 255},
            'amount': {'max_digits': 7, 'decimal_places': 2}
        }
    