"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const [events, setEvents] = useState([]);
  const { user } = useUser();
  const attendeeEmail = user?.primaryEmailAddress?.emailAddress || "";
  

  const handleCancelBooking = async (eventId) => {
    try {
      // Make an API call to cancel the booking
      await axios.delete(`http://localhost:3000/api/avbookning`, { data: { email: attendeeEmail, eventId } });
      // Remove the event from the events state
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/event`, {
          params: {
            attendeeEmail: attendeeEmail,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, [attendeeEmail]);

  const filterEvents = events.filter((event) =>
    event.attendees.includes(attendeeEmail)
  );

  return (
    <div className="flex flex-col">
      {filterEvents.map((event) => (
        <div
          className="border rounded-lg p-6 mx-auto max-w-5xl my-8 flex flex-col md:flex-row"
          key={event.id}
        >
          <Image
            src={event.imageUrl}
            width={200}
            height={200}
            alt={event.title}
            className="w-40 h-40 object-cover rounded-lg mb-4 md:mb-0"
          />
          <div className="flex flex-col justify-between ml-10">
            <h2 className="font-bold text-2xl">{event.title}</h2>
            <p className="">
              <strong>{event.city}</strong>
            </p>
            <p className="">
              <strong>{event.date}</strong>
            </p>
            <p className="">{event.description}</p>

            <div className="mt-4">
            <Button onClick={() => handleCancelBooking(event.id)} className="bg-red-500 text-white py-2 px-4 rounded">
                Cancel Booking
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
