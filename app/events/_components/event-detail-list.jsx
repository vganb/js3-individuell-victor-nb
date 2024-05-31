'use client'

import { useEffect, useState } from "react";
import { getDocumentById, bookEvent, cancelBooking } from "@/lib/firebaseUtils";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

const EventDetailList = ({ id }) => {
  const [event, setEvent] = useState(null); 
  const [isBooked, setIsBooked] = useState(false);
  const [availableSeats, setAvailableSeats] = useState(0); // Initialize availableSeats state here

  const [error, setError] = useState('');
  const { user } = useUser();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/event/${id}`);
        if (response.status === 200) {
          const eventData = response.data;
          setEvent(eventData);
          const totalSeats = parseInt(eventData.seats, 10);
          const bookedSeats = eventData.attendees ? eventData.attendees.length : 0;
          setAvailableSeats(totalSeats - bookedSeats);
  
          // Check if the current user is already in the attendees list
          if (user && eventData.attendees && eventData.attendees.includes(user.emailAddresses[0].emailAddress)) {
            setIsBooked(true);
          }
        } else {
          setError(response.data.message);
          console.error("Error fetching event:", response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        console.error("Error fetching event:", err);
      }
    };
  
    getEvent();
  }, [id, user]);



  const handleBooking = async () => {
    if (isBooked) {
      setError('You have already booked this event')
    }
    // if (!user || !user.emailAddresses) {
    //   setError('User email is not available');
    //   return;
    // }

    try {
      const payload = { email: user.emailAddresses[0].emailAddress, eventId: id };
      console.log("Sending booking request with payload:", payload);

      const response = await axios.post("http://localhost:3000/api/booking", payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setAvailableSeats((prevSeats) => prevSeats - 1);
        setIsBooked(true);
        setEvent((prevEvent) => ({
          ...prevEvent,
          attendees: [...(prevEvent.attendees || []), user.emailAddresses[0].emailAddress],
        }));
      } else {
        setError(response.data.message);
        console.error("Error booking event:", response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error("Error booking event:", err);
    }
  };




  const handleCancelBooking = async () => {
    try {
      // Make an API call to cancel the booking
      await axios.delete(`http://localhost:3000/api/avbookning`, { data: { email: user.emailAddresses[0].emailAddress, eventId: id } });
      setAvailableSeats(prevSeats => prevSeats + 1);
      setIsBooked(false);
  
      setEvent(prevEvent => ({
        ...prevEvent,
        attendees: prevEvent.attendees.filter(email => email !== user.emailAddresses[0].emailAddress)
      }));
  
    } catch (err) {
      setError(err.message);
    }
  };
  if (!event) {
    return <p>Loading...</p>;
  }


  return (
    <div className="">

    <div className="flex flex-col p-8">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      {event.imageUrl && (
        <Image
          src={event.imageUrl}
          width={600}
          height={400}
          alt={event.title}
          className="w-full h-auto mb-4"
        />
      )}
      <p className="mb-2"><strong>Description:</strong> {event.description}</p>
      <p className="mb-2"><strong>Date:</strong> {event.date}</p>
      <p className="mb-2"><strong>Location:</strong> {event.city}</p>

      {availableSeats === 0 ? (
        <p className="text-red-500">This event is fully booked</p>
        ) : (
          <p className="mb-2"><strong>Available Seats:</strong> {event.attendees.length} / {event.seats}</p>
          
          )}
      {isBooked ? (
        <Button onClick={handleCancelBooking} className="bg-red-500 text-white py-2 px-4 rounded">
          Cancel Booking
        </Button>
      ) : (
        <Button onClick={handleBooking} className="bg-green-500 text-white py-2 px-4 rounded" disabled={availableSeats === 0}>
          Book Event
        </Button>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
    </div>
  );
}

export default EventDetailList;
