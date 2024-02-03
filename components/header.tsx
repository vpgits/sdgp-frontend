import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GlobeIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function Header() {
  return (
    <div className="flex flex-row justify-center p-5 mx-2  ">
      <div className="w-10/12 flex flex-auto items-center justify-between ">
        <Link className="flex justify-start" href="#">
          <GlobeIcon className="h-6 w-6" />
          <h1 className="ml-2 text-lg font-semibold">Quizme</h1>
        </Link>
        <nav className="hidden md:flex flex-auto items-center justify-center gap-4">
          <Link className="text-sm font-medium hover:underline" href="#">
            Home
          </Link>

          <Link
            className="text-sm font-medium hover:underline hover:text-green-300"
            href="#"
          >
            Activity
          </Link>
          <div className="mt-2 hidden group-hover:block absolute left-0 bg-white shadow-md">
            <Link
              className="block text-sm font-medium hover:underline hover:text-green-300"
              href="#"
            >
              Asia
            </Link>
            <Link
              className="block text-sm font-medium hover:underline hover:text-green-300"
              href="#"
            >
              Europe
            </Link>
            <Link
              className="block text-sm font-medium hover:underline hover:text-green-300"
              href="#"
            >
              America
            </Link>
          </div>

          <Link className="text-sm font-medium hover:underline" href="#">
            Account
          </Link>

          <div className="mt-2 hidden group-hover:block">
            <Link
              className="block text-sm font-medium hover:underline hover:text-green-300"
              href="#"
            >
              Asia
            </Link>
            <Link
              className="block text-sm font-medium hover:underline hover:text-green-300"
              href="#"
            >
              Europe
            </Link>
            <Link
              className="block text-sm font-medium hover:underline hover:text-green-300"
              href="#"
            >
              America
            </Link>
          </div>

          <Link className="text-sm font-medium hover:underline" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline" href="#">
            Contact
          </Link>
        </nav>
        <Button className="hidden md:inline-flex">Subscribe </Button>
        <div className="flex flex-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="md:hidden"
                size="icon"
                variant="outline"
              >
                <HamburgerMenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-4">
                <Link className="text-lg font-medium hover:underline" href="#">
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