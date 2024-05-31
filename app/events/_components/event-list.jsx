'use client'

import { useEffect, useState } from "react"
import EventListItem from "./event-list-item"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import axios from "axios"

const EventsList = () => {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [selectedCity, setSelectedCity] = useState('All')
const [selectedMonth, setSelectedMonth] = useState('All')


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

  const cities = [...new Set(data.map(event => event.city))];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  const filteredEvents = data.filter(event => {
    const eventDate = new Date(event.date);
    const eventMonth = eventDate.getMonth() + 1; // getMonth() returns a 0-based month
    const currentDate = new Date(); // get the current date
    return (selectedCity === 'All' || event.city === selectedCity) &&
      (selectedMonth === 'All' || eventMonth === parseInt(selectedMonth)) &&
      eventDate >= currentDate; // only include events that are in the future
  });

  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (

    <div>

      <div className="flex w-[300px] gap-3">

<Select onValueChange={value => setSelectedCity(value)}>
  <SelectTrigger>
    <SelectValue placeholder="Select a city" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="All">All Cities</SelectItem>
      {cities.map(city => (
        <SelectItem key={city} value={city}>{city}</SelectItem>
      ))}
    </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={value => setSelectedMonth(value)}>
  <SelectTrigger>
    <SelectValue placeholder="Select a month" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="All">All Months</SelectItem>
      {months.map((month, index) => (
        <SelectItem key={month} value={index + 1}>{month}</SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
      </div>

      {sortedEvents.map(event => (
        <div key={event.id} className="my-4">
          <EventListItem event={event}/>
        </div>
      ))}
      </div>
  )
}
export default EventsList