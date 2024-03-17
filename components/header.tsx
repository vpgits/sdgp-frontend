import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GlobeIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import MiniLogOut from "./login-signup/miniLogOut";

export default async function Header() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();
  const loggedIn = data?.user !== null;
  return (
    <div className="fixed w-full  top-0 rounded-ful ">
      <div className="flex items-center justify-center px-5 py-4   dark:bg-slate-950 text-black bg-white dark:text-white ">
        <div className="w-10/12 flex flex-auto items-center justify-between">
          <Link className="flex justify-start" href="/">
            <GlobeIcon className="h-6 w-6" />
            <h1 className="ml-2 text-lg font-semibold">Quizzifyme</h1>
          </Link>
          <nav className="hidden md:flex flex-auto items-center justify-center gap-4">
            <Link className="text-sm font-medium hover:underline" href="/">
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:underline "
            >
              Dashboard
            </Link>
            <Link
              className="text-sm font-medium hover:underline"
              href="/profile"
            >
              Profile
            </Link>
            <Link
              className="text-sm font-medium hover:underline"
              href="/about-us"
            >
              About
            </Link>
            <Link
              className="text-sm font-medium hover:underline"
              href="/contact-us"
            >
              Contact Us
            </Link>
          </nav>
          <div className="hidden md:block">
            {!loggedIn ? (
              <Link href="/login">
                <Button className="hidden md:inline-flex">Login</Button>
              </Link>
            ) : (
              // <MiniLogOut />
              <Link href={"/subscribe"}>
                <Button>Subscribe</Button>
              </Link>
            )}
          </div>
          <div className="flex flex-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="md:hidden" size="icon" variant="outline">
                  <HamburgerMenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-4 p-4">
                  <Link
                    className="text-lg font-medium hover:underline"
                    href="/"
                  >
                    Home
                  </Link>
                  <Link
                    className="text-lg font-medium hover:underline"
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>

                  <Link
                    className="text-lg font-medium hover:underline"
                    href="/profile"
                  >
                    Profile
                  </Link>
                  <Link
                    className="text-lg font-medium hover:underline"
                    href="/about-us"
                  >
                    About
                  </Link>
                  <Link
                    className="text-lg font-medium hover:underline"
                    href="/contact-us"
                  >
                    Contact Us
                  </Link>
                  {!loggedIn ? (
                    <Link href="/login">
                      <Button className="mt-4">Login</Button>
                    </Link>
                  ) : (
                    // <MiniLogOut />
                    <Link href={"/subscribe"}>
                      <Button>Subscribe</Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
