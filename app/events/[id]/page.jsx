'use client'

import PageHeadline from "@/components/page-headline"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import EventDetailList from "../_components/event-detail-list"


const EventDetailPage = ({ params }) => {


  return (

    <div className="">
      
      <div className="flex justify-end  mx-20 mt-6">
      <Button>
        <Link href='/events'>Go back to all events</Link>
      </Button>
      </div>

      <div className="justify-center mx-auto max-w-xl	border rounded-lg mt-4">
        <EventDetailList id={ params.id } />
      </div>

    </div>
  )
}
export default EventDetailPage