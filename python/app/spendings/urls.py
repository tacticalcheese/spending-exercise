from django.urls import path, include

from rest_framework.routers import DefaultRouter

from spendings import views


app_name = 'spendings'


router = DefaultRouter()
router.register(r'spendings', views.SpendingViewSet, basename='spendings')


urlpatterns = [
    path('', include(router.urls))
]