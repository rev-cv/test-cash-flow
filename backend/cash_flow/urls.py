"""
URL configuration for cash_flow project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from transfer.views import (
    TransferListView,
    TransferUpdateView,
    TransferCreateView,
    StatusListView,
    MarkListView,
    CategoryListView,
    TransferDeleteView,
)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/transfers/", TransferListView.as_view(), name="transfer-list"),
    path("api/transfers/new/", TransferCreateView.as_view(), name="transfer-create"),
    path(
        "api/transfers/<int:pk>/", TransferUpdateView.as_view(), name="transfer-update"
    ),
    path(
        "api/transfers/delete/<int:transfer_id>/",
        TransferDeleteView.as_view(),
        name="transfer-delete",
    ),
    path("api/statuses/", StatusListView.as_view(), name="status-list"),
    path("api/marks/", MarkListView.as_view(), name="mark-list"),
    path("api/categories/", CategoryListView.as_view(), name="category-list"),
    path("", TemplateView.as_view(template_name="index.html")),
    re_path(r"^(?:.*)/?$", TemplateView.as_view(template_name="index.html")),
]
