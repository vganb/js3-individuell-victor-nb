'use client'

import { useEffect, useState } from "react"
import EventListItem from "./event-list-item"
import { getCollection } from "@/lib/firebaseUtils"
import axios from "axios"

const EventsList = () => {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)


  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:3000/api/event')
      setData(response.data)
    } catch (error) {
      setError(error)
      console.log('Error fetching data', error)
    }
  }

  useEffect(() => {
    fetchData()

  }, [])
  
  if (error) {
    return <div>Error fetching data: { error.message}</div>
  }

  if (!data) {
    return <div>loading...</div>
  }

  return (

    <div className="">
        {data.map(event => (
          <div key={event.id} className="my-4">
            <EventListItem event={event}/>
          </div>
        ))

      }
    </div>
  )
}
export default EventsList