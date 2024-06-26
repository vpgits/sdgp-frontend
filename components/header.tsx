"use client";
import React, { Suspense, useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { GlobeIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";

export default function Header() {
  const supabase = createClient();
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setLoggedIn(true);
      }
    };
    fetchUser();
  }, []);

  return (
    <div
      className={`fixed w-full  top-0 rounded-full z-50 ${
        mobileMenu ? "h-full" : ""
      } `}
      onMouseDown={() => {
        setTimeout(() => {
          if (mobileMenu) setMobileMenu(false);
        }, 100);
      }}
    >
      <div className="flex items-center justify-center px-5 py-4 mx-1   dark:bg-slate-950 rounded-b-full rounded-r-full rounded-l-full shadow-2xl text-black md:mx-5   shadow-slate-600 dark:shadow-slate-900  bg-slate-100  dark:text-white ">
        <div className="md:w-10/12 w-screen flex flex-auto items-center justify-between">
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
          <div className="hidden md:flex flex-end">
            <Suspense fallback={<div>Loading ...</div>}>
              {" "}
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
            </Suspense>
            <ModeToggle />
          </div>
          <div className="flex w-8/12 flex-col md:hidden">
            <div className="flex flex-row absolute  right-2 top-3">
              <Button
                className="px-2  "
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                <HamburgerMenuIcon className="h-6 w-6 md:hidden" />
              </Button>
              <ModeToggle />
            </div>

            <div
              className={`z-10 fixed w-full h-full top-14  ${
                mobileMenu ? "flex" : "hidden"
              } dark:bg-black bg-white `}
            >
              <div className="flex flex-col gap-y-3 m-5">
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
                <Suspense fallback={<div>Loading ...</div>}>
                  {" "}
                  {!loggedIn ? (
                    <Link href="/login">
                      <Button className="md:hidden ">Login</Button>
                    </Link>
                  ) : (
                    // <MiniLogOut />
                    <Link href={"/subscribe"}>
                      <Button className="md:hidden ">Subscribe</Button>
                    </Link>
                  )}
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
