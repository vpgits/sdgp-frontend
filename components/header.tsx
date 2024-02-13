import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GlobeIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function Header() {
  return (
    <div className="flex items-center justify-center p-5">
      <div className="w-10/12 flex flex-auto items-center justify-between">
        <Link className="flex justify-start" href="#">
          <GlobeIcon className="h-6 w-6" />
          <h1 className="ml-2 text-lg font-semibold">Quizme</h1>
        </Link>
        <nav className="hidden md:flex flex-auto items-center justify-center gap-4">
          <Link
            className="text-sm font-medium hover:underline"
            href="/dashboard"
          >
            Home
          </Link>

          {/* Activity Dropdown */}
          <div className="relative group">
            <button className="text-sm font-medium hover:underline ">
              Activity
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-md py-2 px-4 top-full mt-1">
              <Link
                className="block text-sm font-medium hover:underline "
                href="#"
              >
                Asia
              </Link>
              <Link
                className="block text-sm font-medium hover:underline "
                href="#"
              >
                Europe
              </Link>
              <Link
                className="block text-sm font-medium hover:underline "
                href="#"
              >
                America
              </Link>
            </div>
          </div>
          {/* End of Activity Dropdown */}

          <Link className="text-sm font-medium hover:underline" href="#">
            Account
          </Link>
          <Link className="text-sm font-medium hover:underline" href="#">
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline"
            href="ContactPage"
          >
            Contact
          </Link>
        </nav>
        <Button className="hidden md:inline-flex">
          <Link href="subscription-page">Subscribe</Link>{" "}
        </Button>
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
                  href="/dashboard"
                >
                  Home
                </Link>
                <div>
                  <div>
                    <Link
                      className="text-lg font-medium hover:underline hover:text-green-300"
                      href="#"
                    >
                      Activites
                    </Link>
                  </div>
                  <div className="mt-2 ml-5">
                    <Link
                      className="block text-lg font-medium hover:underline hover:text-green-300"
                      href="#"
                    >
                      Asia
                    </Link>
                    <Link
                      className="block text-lg font-medium hover:underline hover:text-green-300"
                      href="#"
                    >
                      Europe
                    </Link>
                    <Link
                      className="block text-lg font-medium hover:underline hover:text-green-300"
                      href="#"
                    >
                      America
                    </Link>
                  </div>
                </div>

                <Link className="text-lg font-medium hover:underline" href="#">
                  Tours
                </Link>
                <Link className="text-lg font-medium hover:underline" href="#">
                  About
                </Link>
                <Link className="text-lg font-medium hover:underline" href="#">
                  Contact
                </Link>
                <Button className="mt-4">Subscribe</Button>
              </div>
            </SheetContent>
          </Sheet>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
