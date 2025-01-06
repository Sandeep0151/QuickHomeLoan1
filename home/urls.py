from django.urls import path, re_path
from .views import *
from django.views.generic import TemplateView


urlpatterns = [

    path("homeloan", homeloan, name="homeloan"),
    path("form", form, name="form"),
    path("property", property, name="property"),
    path('save-loan-application/', save_loan_application, name='save_loan_application'),
    path('save-property-details/', save_property_details, name='save_property_details'),
    path('emi-calculator/', emi_calculator, name='emi_calculator'),
    path('emi-calculator2/', emi_calculator2, name='emi_calculator2'),
    path("calculator/", part_payment_calculator, name="part_payment_calculator"),
    path("eligibility/", eligibility, name="eligibility"),
    path('api/loan-applications/', LoanApplicationView.as_view(), name='loan-applications'),
    path('api/contact/', ContactFormView.as_view(), name='contact_form'),
    re_path(r'^.*$', index, name='index'),


]