"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex justify-between border-b bg-slate-600/60">
      <Link href="/" className="text-4xl font-bold px-8 py-2">
        Logo
      </Link>
      <div className="px-6 py-4">
        {isSignedIn ? (
          <div className="flex gap-8 items-center">
            <div>Hello {user.fullName}!</div>
            <Link href="/events">
              <Button className="px-6 py-1 rounded-lg border">
                Events
            </Button>
            </Link>

            <Link href="/dashboard">
            <Button className="px-6 py-1 rounded-lg border-spacing-0">
              Dashboard</Button>
            </Link>
            <UserButton fallbackRedirectUrl="/" />
          </div>

          ) : (
            <div className="flex gap-8">
              <Link href="/sign-in">
                <Button className=" px-6 py-1 rounded-lg border">Login</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="px-6 py-1 rounded-lg border">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );


}


export default Navbar