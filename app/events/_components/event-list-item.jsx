import Image from "next/image"
import Link from "next/link"


const EventListItem = ({ event }) => {

    return (

  
            
        <Link href={`/events/${event.id}`} className="border rounded-lg overflow-hidden flex">
            <div className="aspect-square h-32">
                <Image
                    src={event.imageUrl}
                    width={200}
                    height={200}
                    alt={event.title}
                    className="size-full object-cover"
                />

            </div>
            <div className="p-4 flex flex-col">
                <p className="font-semibold text-2xl">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.date}</p>
                <p className="text-sm font-semibold text-muted-foreground">{event.city}</p>
            </div>
        </Link>

  )
}
export default EventListItem