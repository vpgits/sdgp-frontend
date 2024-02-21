import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaFileWord, FaHistory } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { GiTrophyCup } from "react-icons/gi";
import { IoLogoGameControllerB, IoIosNotifications } from "react-icons/io";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-8 h-full">
      <h1 className="text-6xl font-bold mb-28 md:text-9xl">Quiz Dashboard</h1>
      <div className="grid grid-cols-2 gap-20 md:grid-cols-6 font-semibold">
        <div className="button text-center space-y-4">
          <Button className="h-32 w-32 hover:bg-white hover:text-black hover:shadow-lg dark:hover:bg-black dark:hover:text-white dark:bg-white">
            <FaFileWord size={60} />
          </Button>
          <p className="text-gray-700 text-2xl dark:text-white">
            PDF to word document
          </p>
        </div>
        <div className="button text-center space-y-4">
          <Button className="h-32 w-32 hover:bg-white hover:text-black hover:shadow-lg   dark:hover:bg-black dark:hover:text-white dark:bg-white">
            <LuBrainCircuit size={60} />
          </Button>
          <p className="text-gray-700 text-2xl  dark:text-white">
            <Link href="/documents">PDF to Quiz</Link>
          </p>
        </div>

        <div className="button text-center space-y-4">
          <Button className="h-32 w-32 hover:bg-white hover:text-black hover:shadow-lg   dark:hover:bg-black dark:hover:text-white dark:bg-white">
            <GiTrophyCup size={60} />
          </Button>
          <p className="text-gray-700 text-2xl  dark:text-white">
            Highscore Board
          </p>
        </div>

        <Link href="/History-page">
          <div className="button text-center space-y-4">
            <Button className="h-32 w-32 hover:bg-white hover:text-black hover:shadow-lg   dark:hover:bg-black dark:hover:text-white dark:bg-white">
              <FaHistory size={60} />
            </Button>
            <p className="text-gray-700 text-2xl  dark:text-white">History</p>
          </div>
        </Link>

        <div className="button text-center space-y-4">
          <Button className="h-32 w-32 hover:bg-white hover:text-black hover:shadow-lg  dark:hover:bg-black dark:hover:text-white dark:bg-white">
            <IoLogoGameControllerB size={60} />
          </Button>
          <p className="text-gray-700 text-2xl  dark:text-white">Game</p>
        </div>

        <Link href="/notifications">
          <div className="button text-center space-y-4">
            <Button className="h-32 w-32 hover:bg-white hover:text-black hover:shadow-lg   dark:hover:bg-black dark:hover:text-white dark:bg-white">
              <IoIosNotifications size={60} />
            </Button>
            <p className="text-gray-700 text-2xl  dark:text-white">
              Notification
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
