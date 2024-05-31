import Link from "next/link"
import { Button } from "./ui/button"




const Header = () => {
  return (
      <div className="flex flex-col items-center p-10 border rounded-lg">
            <h1 className="text-3xl font-bold">Welcome to Evento</h1>
      <p className="m-4">Book our awesome event today!</p>
      <Link href="/events">
        <Button>Get started</Button>
      </Link>
     </div>
  )
}
export default Header