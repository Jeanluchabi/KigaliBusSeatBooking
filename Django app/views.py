from django.shortcuts import render
from django.http import JsonResponse
from .models import Bus
from .utils import authenticate_user
from .booking_utils import create_booking, check_seat_availability, calculate_fare

def create_booking_view(request):
    if request.method == 'POST':
        # Get data from request
        bus_id = request.POST.get('bus_id')
        seat_number = request.POST.get('seat_number')
        distance = request.POST.get('distance')

        # Authenticate user
        user = authenticate_user(request, request.user.email, request.user.password)
        if not user:
            return JsonResponse({'error': 'Authentication failed.'}, status=401)

        # Check seat availability
        bus = Bus.objects.get(id=bus_id)
        if not check_seat_availability(bus, seat_number):
            return JsonResponse({'error': 'Seat already booked.'}, status=400)

        # Calculate fare
        total_fare = calculate_fare(bus, int(distance))

        # Create booking
        booking = create_booking(user, bus, seat_number)

        return JsonResponse({'success': 'Booking created successfully.', 'fare': total_fare})
    else:
        return JsonResponse({'error': 'Method not allowed.'}, status=405)