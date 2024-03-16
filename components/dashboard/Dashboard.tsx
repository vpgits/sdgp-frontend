import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaHistory } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { IoIosNotifications } from "react-icons/io";
import { revalidatePath } from "next/cache";
import WelcomeBanner from "./welcomeBanner";
import MiniDocument from "./MiniDocuments";
import MiniHistory from "./MiniHistory";
import MiniNotifications from "./MiniNotifications";

export default function Dashboard({ userData }: { userData: any }) {
  const user = userData;
  revalidatePath("/dashboard", "layout");
  return (
    <>
      <div className="flex flex-col items-center justify-between h-full md:h-auto">
        <WelcomeBanner userData={user} />
        <h1 className="text-5xl font-bold md:text-8xl md:text-center ml-10 md:ml-0 md:mt-0 ">
          Quiz Dashboard
        </h1>
        <div className="md:hidden font-semibold flex flex-auto justify-center flex-col gap-y-5 ">
          <Link href="/documents">
            <div className=" flex flex-auto flex-row items-center gap-x-5 w-full text-5xl">
              <Button className="text-6xl h-20 hover:bg-white hover:text-black hover:shadow-lg   dark:hover:bg-black dark:hover:text-white dark:bg-white">
                <LuBrainCircuit className="text-5xl" />
              </Button>
              <p className="text-gray-700 text-2xl  dark:text-white">
                My Documents
              </p>
            </div>
          </Link>
          <Link href="/history">
            <div className="flex flex-auto flex-row items-center gap-x-5 w-full text-5xl">
              <Button className="text-6xl h-20 hover:bg-white hover:text-black hover:shadow-lg   dark:hover:bg-black dark:hover:text-white dark:bg-white">
                <FaHistory className="text-5xl" />
              </Button>
              <p className="text-gray-700 text-2xl  dark:text-white">History</p>
            </div>
          </Link>
          <Link href="/notifications">
            <div className="flex flex-auto flex-row items-center gap-x-5 w-full text-5xl">
              <Button className="text-6xl h-20 hover:bg-white hover:text-black hover:shadow-lg   dark:hover:bg-black dark:hover:text-white dark:bg-white">
                <IoIosNotifications className="text-5xl" />
              </Button>
              <p className="text-gray-700 text-2xl  dark:text-white">
                Notification
              </p>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex flex-auto items-center justify-evenly gap-x-10 m-5">
          <MiniDocument />
          <MiniHistory />
          <MiniNotifications />
        </div>
      </div>
    </>
  );
}
