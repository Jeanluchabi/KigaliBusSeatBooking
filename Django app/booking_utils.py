
from django.core.exceptions import ValidationError
from django.utils import timezone
from .models import Booking, Bus

def create_booking(user, bus, seat_number):
    # Check if the seat is available
    if Booking.objects.filter(bus=bus, seat_number=seat_number).exists():
        raise ValidationError("Seat already booked.")
    
    # Create the booking
    booking = Booking.objects.create(user=user, bus=bus, seat_number=seat_number, booking_time=timezone.now())
    return booking

def check_seat_availability(bus, seat_number):
    if Booking.objects.filter(bus=bus, seat_number=seat_number).exists():
        return False
    return True

def calculate_fare(bus, distance):
    base_fare = 10  # Base fare per km
    total_fare = base_fare * distance
    return total_fare