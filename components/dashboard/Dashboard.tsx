import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaFileWord, FaHistory } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { GiTrophyCup } from "react-icons/gi";
import { IoLogoGameControllerB, IoIosNotifications } from "react-icons/io";
import { revalidatePath } from "next/cache";
import WelcomeBanner from "./welcomeBanner";
import MiniHistory from "./MiniHistory";
import MiniDocument from "./MiniDocuments";

export default function Dashboard({ userData }: { userData: any }) {
  const user = userData;
  revalidatePath("/dashboard", "layout");
  return (
    <>
      <WelcomeBanner userData={user} />
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-5xl font-bold md:mb-28 md:text-9xl ml-10 mt-2">
          Quiz Dashboard
        </h1>
        <div className=" font-semibold flex flex-auto flex-col gap-y-5">
          {/* <div className="button text-center space-y-4">
            <Button className="h-32 w-32 hover:bg-white hover:text-black hover:shadow-lg dark:hover:bg-black dark:hover:text-white dark:bg-white">
              <FaFileWord size={60} />
            </Button>
            <p className="text-gray-700 text-2xl dark:text-white">
              PDF to word document
            </p>
          </div> */}
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
          {/* <div className="button text-center space-y-4">
            <Button className="h-32 w-32 hover:bg-white hover:text-black hover:shadow-lg   dark:hover:bg-black dark:hover:text-white dark:bg-white">
              <GiTrophyCup size={60} />
            </Button>
            <p className="text-gray-700 text-2xl  dark:text-white">
              Highscore Board
            </p>
          </div> */}
          <Link href="/history">
            <div className="flex flex-auto flex-row items-center gap-x-5 w-full text-5xl">
              <Button className="text-6xl h-20 hover:bg-white hover:text-black hover:shadow-lg   dark:hover:bg-black dark:hover:text-white dark:bg-white">
                <FaHistory className="text-5xl" />
              </Button>
              <p className="text-gray-700 text-2xl  dark:text-white">History</p>
            </div>
          </Link>
          {/* <div className="button text-center space-y-4">
            <Button className="h-32 w-32 hover:bg-white hover:text-black hover:shadow-lg  dark:hover:bg-black dark:hover:text-white dark:bg-white">
              <IoLogoGameControllerB size={60} />
            </Button>
            <p className="text-gray-700 text-2xl  dark:text-white">Game</p>
          </div> */}
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
          {/* <MiniHistory /> */}
          {/* <MiniDocument /> */}
        </div>
      </div>
    </>
  );
}
