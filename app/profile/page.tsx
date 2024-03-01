import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { JSX, SVGProps } from "react";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LogOut from "@/components/LogOut";

export function generateMetadata() {
  return {
    title: "Profile | Quizzifyme",
    description: "Profile page",
  };
}

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let { data: user, error } = await supabase.from("user").select();
  if (!user) {
    redirect("/login");
  }

  let sessionData = null;
  if (
    (user as any)[0]?.id === "eafe255e-27c0-457b-a6e1-cc321a174389" ||
    (user as any)[0]?.id === "7aacc2d5-2086-4fea-a3e7-e8a82ad5c71b"
  ) {
    sessionData = await supabase.auth.getSession();
  }

  return (
    <div className="grid min-h-screen w-full overflow-hidden bg-gray-100/40 lg:grid-cols-[280px_1fr] dark:bg-gray-800/40">
      <div className="hidden border-r bg-white lg:block dark:bg-gray-950">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </Link>
          </div>
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-950 dark:text-gray-50 dark:hover:text-gray-50"
              href="#"
            >
              <UserIcon className="h-4 w-4" />
              Profile
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <MapPinIcon className="h-4 w-4" />
              Address Book
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <CreditCardIcon className="h-4 w-4" />
              Payment Methods
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <PackageIcon className="h-4 w-4" />
              Setting
            </Link>
            <LogOut />
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-white px-6 dark:bg-gray-950">
          <Link className="lg:hidden" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <h1 className="font-semibold text-lg">My Account</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
            <div className="flex flex-col items-center md:items-start gap-2 md:gap-1">
              <img
                alt="Avatar"
                className="rounded-full"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <Button size="sm" variant="outline">
                edit profile
              </Button>
            </div>
            <div className="grid gap-2 text-sm">
              <div className="grid gap-1 text-xl font-semibold">
                <div>John Doe</div>
                <div className="text-base text-gray-500 dark:text-gray-400">
                  johndoe@example.com
                </div>
              </div>
              <div className="grid gap-1 md:grid-cols-2">
                <div>
                  <h2 className="font-semibold text-sm">Member since</h2>
                  <p>January 1, 2022</p>
                </div>
                <div className="md:ml-auto">
                  <h2 className="font-semibold text-sm">Account number</h2>
                  <p>*********1234</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Quizers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 items-center">
                    <div className="font-semibold">#3210</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      February 20, 2022
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <div className="font-semibold">#3209</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      January 5, 2022
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <div className="font-semibold">#3204</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      August 3, 2021
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <div className="font-semibold">#3203</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      July 15, 2021
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <div className="font-semibold">#3202</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      June 5, 2021
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <pre>{JSON.stringify(sessionData, null, 4)}</pre>
          </div>
        </main>
      </div>
    </div>
  );
}

function CreditCardIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function MapPinIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function Package2Icon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

//   <svg class="with-icon_icon__MHUeb"

//    style="color:var(--geist-foreground);width:24px;height:24px">

function PackageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      data-testid="geist-icon"
      fill="none"
      height="24"
      shape-rendering="geometricPrecision"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}
