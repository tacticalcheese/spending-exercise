from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db import IntegrityError

from spendings import models


class ModelTests(TestCase):

    def test_create_spending_successful(self):
        description = 'Test Description'
        amount = 100
        currency = 'USD'
        spending = models.Spending.objects.create(
            description=description,
            amount=amount,
            currency=currency
        )

        self.assertEqual(spending.description, description)
        self.assertEqual(spending.amount, amount)
        self.assertEqual(spending.currency, currency)


    def test_new_spending_invalid_amount(self):
        with self.assertRaises(ValidationError):
            models.Spending.objects.create(
                description="Test",
                amount="Incorrect",
                currency=None
            )

    def test_new_spending_invalid_description(self):
        with self.assertRaises(IntegrityError):
            models.Spending.objects.create(
                description=None,
                amount=100,
                currency=None)