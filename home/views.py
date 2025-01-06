from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
import json
import math
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework.decorators import api_view


class ContactFormView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Contact form submitted successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class LoanApplicationView(APIView):
    def get(self, request):
        plans = LoanApplication.objects.all()
        serializer = LoanApplicationSerializer(plans, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(f"Received data: {request.data}")  # Debugging line
        serializer = LoanApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def index(request):
    return render(request, "index.html")


def homeloan(request):
    return render(request, "homeloan.html")


def form(request):
    return render(request, "form.html")


def property(request):
    return render(request, "property.html")


@csrf_exempt
def save_loan_application(request):
    if request.method == "POST":
        data = json.loads(request.body)
        application = LoanApplication.objects.create(
            required_amount=data['required_amount'],
            need_time=data['need_time'],
            bank_type=data['bank_type'],
            name=data['name'],
            mobile=data['mobile'],
        )
        return JsonResponse({"message": "Thank you!", "token": str(application.token)})
    return JsonResponse({"error": "Invalid request"}, status=400)


@csrf_exempt
def save_property_details(request):
    if request.method == "POST":
        data = json.loads(request.body)
        # Save data to the database (you can customize the model and fields as required)
        PropertyDetails.objects.create(
            bhk=data.get("bhk"),
            budget=data.get("budget"),
            name=data.get("name"),
            phone=data.get("phone"),
            email=data.get("email"),
            city=data.get("city"),
            property_name=data.get("propertyName"),
            area_pin_code=data.get("areaPinCode"),
        )
        return JsonResponse({"message": "Details saved successfully"})
    return JsonResponse({"error": "Invalid request"}, status=400)


def emi_calculator(request):
    return render(request, 'emi_calculator.html')


def emi_calculator2 ( request ) :
    return render ( request , "emi_calculator2.html" )


def part_payment_calculator(request):
    if request.method == "POST":
        # Input values
        loan_amount = float(request.POST.get("loan_amount"))
        interest_rate = float(request.POST.get("interest_rate")) / 12 / 100
        loan_tenure = int(request.POST.get("loan_tenure")) * 12  # Convert years to months
        pre_payment = float(request.POST.get("pre_payment"))

        # Calculate original EMI
        original_emi = (loan_amount * interest_rate * math.pow(1 + interest_rate, loan_tenure)) / (
            math.pow(1 + interest_rate, loan_tenure) - 1
        )

        # After part payment
        new_loan_amount = loan_amount - pre_payment
        revised_emi = (new_loan_amount * interest_rate * math.pow(1 + interest_rate, loan_tenure)) / (
            math.pow(1 + interest_rate, loan_tenure) - 1
        )

        # Calculate savings
        total_savings = (original_emi - revised_emi) * loan_tenure

        context = {
            "original_emi": round(original_emi, 2),
            "revised_emi": round(revised_emi, 2),
            "total_savings": round(total_savings, 2),
        }
        return render(request, "part_payment.html", context)
    return render(request, "part_payment.html")


def eligibility(request):
    return render(request, "eligibility.html")