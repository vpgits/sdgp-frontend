import React from "react";
import Image from "next/image";
import logo from "../public/logo-max.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import wa from "../public/whatsapp.png";
import ig from "../public/instagram.png";
import fb from "../public/facebook.png";
import git from "../public/github.png";

const ButtonAsChild = () => {
  return (
    <Button asChild className="bg-blue-900 ">
      <Link className="mx-auto block dark:text-white" href="/login">
        Learn More
      </Link>
    </Button>
  );
};

const Footer = () => {
  return (
    <>
      <footer className="text-sm bg-slate-900 text-white flex flex-auto flex-col md:flex-row items-center justify-evenly mt-5 md:mt-20">
        <div className="space-y-4  md:w-1/3 m-10 ">
          <h3 className="text-lg font-semibold mt-10 text-center">
            {" "}
            <Image
              src={logo}
              alt="logo"
              height={100}
              width={100}
              className="mx-auto block"
            />
          </h3>
          <p className="text-sm text-justify">
            A generative AI for a personalised and inventive approach to
            learning, based on a solution that offers a personalised learning
            experience for anyone seeking support.
          </p>
          <div className="mt-10 text-center ">
            <ButtonAsChild />
          </div>
        </div>
        <div className="space-y-4 text-center mt-10 ">
          <h3 className="text-lg font-semibold  mx-auto">Activity</h3>
          <ul className="space-y-2  mx-auto">
            <li>
              <a href="#" className="text-sm hover:underline">
              PDF to word document
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
              PDF to Quiz
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
              Highscore Board
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
              History
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
             Game
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4 text-center">
          <h3 className="text-lg font-semibold  mt-10 ">Contact</h3>
          <p className="text-sm">123 Main Street, City, Country</p>
          <p className="text-sm">Phone: +1 (123) 456-7890</p>
          <p className="text-sm">Email: info@example.com</p>
          <div className="flex">
            <Image
              src={wa}
              alt="whatsapp"
              height={30}
              width={30}
              className="mx-auto block"
            />
            <Image
              src={ig}
              alt="instagram"
              height={30}
              width={30}
              className="mx-auto block"
            />
            <Image
              src={fb}
              alt="facebook"
              height={30}
              width={30}
              className="mx-auto block"
            />
            <Image
              src={git}
              alt="github"
              height={30}
              width={30}
              className="mx-auto block"
            />
          </div>
        </div>
      </footer>
      <p className=" bg-slate-900 text-xs font-semibold text-white p-5 flex flex-auto flex-col md:flex-row items-center justify-evenly ">
        Copyright © 2024 Quizifyme
      </p>
    </>
  );
};

export default Footer;
