/**
 * v0 by Vercel.
 * @see https://v0.dev/t/sKrDgL7r8or
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { JSX, SVGProps } from "react";

export default function Component() {
  return (
    <header className="fixed top-0 w-full h-16 flex items-center justify-between px-4 bg-white shadow-md z-50">
      <Link className="flex items-center" href="#">
        <GlobeIcon className="h-6 w-6" />
        <span className="ml-2 text-lg font-semibold">Quizme</span>
      </Link>
      <nav className="hidden md:flex gap-4">
        <Link className="text-sm font-medium hover:underline" href="#">
          Home
        </Link>
        <div className="group relative mt-[-0.2rem]">
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
        </div>

        <Link className="text-sm font-medium hover:underline" href="#">
          Account
        </Link>
        <div className="group">
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
        </div>
        <Link className="text-sm font-medium hover:underline" href="#">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline" href="#">
          Contact
        </Link>
      </nav>
      <Button className="hidden md:inline-flex">Subscribe </Button>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="inline-block md:hidden"
            size="icon"
            variant="outline"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-4">
            <Link className="text-lg font-medium hover:underline" href="#">
              Home
            </Link>
            <div>
              <div>
                <Link className="text-lg font-medium hover:underline hover:text-green-300" href="#">
                  Activites
                </Link>
              </div>
              <div className="mt-2 ml-5">
                <Link className="block text-lg font-medium hover:underline hover:text-green-300" href="#">
                  Asia
                </Link>
                <Link className="block text-lg font-medium hover:underline hover:text-green-300" href="#">
                  Europe
                </Link>
                <Link className="block text-lg font-medium hover:underline hover:text-green-300" href="#">
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
    </header>
  );
}

function GlobeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
