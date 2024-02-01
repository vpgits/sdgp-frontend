import React from "react";
import { Button } from "@/components/ui/button";
import { FaFileWord } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { GiTrophyCup } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";

export default function page() {
  return (
    <div className="h-screen w-screen flex flex-col bg-white">
      <div className="dashboard">
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
          <h1 className="text-6xl font-bold mb-28 md:text-9xl">Quiz Dashboard</h1>
          {/* <div className="grid grid-cols-2 gap-12 md:grid-cols-3"> */}
          <div className="grid grid-cols-2 gap-20 md:grid-cols-6 font-semibold">

            <div className="buttons text-center space-y-4">
              <Button className="h-32 w-32">
                <FaFileWord size={60} />
              </Button>
              <p className="text-gray-700 text-2xl">PDF to word document</p>
            </div>

            <div className="button text-center space-y-4 ">
              <Button className="h-32 w-32 hover:bg-white  hover:shadow-lg">
                <LuBrainCircuit size={60} className="text-white hover:text-black" />
              </Button>
              <p className="text-gray-700 text-2xl">PDF to Quiz</p>
            </div>

            <div className="button text-center space-y-4">
            <Button className="h-32 w-32">
                <GiTrophyCup size={60} />
              </Button>
              <p className="text-gray-700 text-2xl">Highscore Board</p>
            </div>

            <div className="button text-center space-y-4">
              <Button className="h-32 w-32">
                <FaHistory size={60} />
              </Button>
              <p className="text-gray-700 text-2xl">History</p>
            </div>

            <div className="button text-center space-y-4">
              <Button className="h-32 w-32">
                <IoLogoGameControllerB size={60} />
              </Button>
              <p className="text-gray-700 text-2xl">Game</p>
            </div>

            <div className="button text-center space-y-4">
              <Button className="h-32 w-32">
                <IoIosNotifications size={60} />
              </Button>
              <p className="text-gray-700 text-2xl">Notification</p>
            </div>

            {/* <Button className="h-24 ">PDF to Quiz</Button>
            <Button className="h-24">Highscore Board</Button>
            <Button className="h-24">History</Button>
            <Button className="h-24">Game</Button>
            <Button className="h-24">Notification</Button>
            <Button className="h-24">Category 7</Button>
            <Button className="h-24">Category 8</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}