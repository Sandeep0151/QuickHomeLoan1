from django.contrib import admin
from .models import *


@admin.register(LoanApplication)
class LoanApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'mobile', 'token', 'required_amount', 'need_time', 'bank_type', 'created_at')
    search_fields = ('name', 'mobile', 'token')
    ordering = ('-created_at',)  # Show the most recent applications first


admin.site.register(PropertyDetails)


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    search_fields = ('name', 'email')