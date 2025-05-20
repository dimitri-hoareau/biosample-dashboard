from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BioSampleViewSet, CommentViewSet

router = DefaultRouter()
router.register(r'biosamples', BioSampleViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]