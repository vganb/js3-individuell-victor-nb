'use client'

import EventsList from "./_components/event-list";
import PageHeadline from "@/components/page-headline";

const EventPage = () => {


  return (
    <div className="flex flex-col p-6">
      <PageHeadline>Events</PageHeadline>

      <div className="justify-center mx-40">

      <EventsList/>
      </div>
    </div>
  );
};

export default EventPage;
