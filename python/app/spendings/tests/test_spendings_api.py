from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from spendings import models


SPENDINGS_URL = reverse('spendings:spendings-list')

def create_spendings(**param):
    return models.Spending.objects.create(param)


class SpendingApiTests(TestCase):

    def setUp(self):
        self.client = APIClient()
    
    def test_create_spending_success(self):
        payload = {'description': 'Test Description', 'amount': '100', 'currency': 'USD'}

        res = self.client.post(SPENDINGS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        spending = models.Spending.objects.get(id=res.data['id'])
        self.assertEqual(spending.description, payload['description'])

    def test_spending_currency_filter(self):
        payload_one = {'description': 'Payload One', 'amount': 100, 'currency': 'USD'}
        payload_two = {'description': 'Payload Two', 'amount': 200, 'currency': 'HUF'}
        payload_three = {'description': 'Payload Three', 'amount': 300, 'currency': 'USD'}

        res_one = self.client.post(SPENDINGS_URL, payload_one)
        self.assertEqual(res_one.status_code, status.HTTP_201_CREATED)

        res_two = self.client.post(SPENDINGS_URL, payload_two)
        self.assertEqual(res_two.status_code, status.HTTP_201_CREATED)

        res_three = self.client.post(SPENDINGS_URL, payload_three)
        self.assertEqual(res_three.status_code, status.HTTP_201_CREATED)

        res = self.client.get(SPENDINGS_URL, {'currency': f'{payload_two["currency"]}'})
        self.assertEqual(1, len(res.data))
        res_element_description = list(res.data[0].items())[1][1]
        self.assertEqual(payload_two['description'], res_element_description)


    def test_spending_order_by_amount_descending(self):
        payload_one = {'description': 'Payload One', 'amount': 234, 'currency': 'USD'}
        payload_two = {'description': 'Payload Two', 'amount': 126, 'currency': 'HUF'}
        payload_three = {'description': 'Payload Three', 'amount': 765, 'currency': 'USD'}

        res_one = self.client.post(SPENDINGS_URL, payload_one)
        self.assertEqual(res_one.status_code, status.HTTP_201_CREATED)

        res_two = self.client.post(SPENDINGS_URL, payload_two)
        self.assertEqual(res_two.status_code, status.HTTP_201_CREATED)

        res_three = self.client.post(SPENDINGS_URL, payload_three)
        self.assertEqual(res_three.status_code, status.HTTP_201_CREATED)

        res = self.client.get(SPENDINGS_URL, {'orderBy': '-amount'})
        self.assertEqual(3, len(res.data))
        res_highest_amount_element = list(res.data[0].items())[1][1]
        self.assertEqual(payload_three['description'], res_highest_amount_element)

