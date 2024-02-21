import React from "react";
import Image from "next/image";
import logo from "../public/logo-max.png";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import wa from "../public/whatsapp.png";
import ig from "../public/instagram.png";
import fb from "../public/facebook.png";
import git from "../public/github.png";

const ButtonAsChild = () => {
  return (
    <Button asChild className="bg-blue-500 ">
    <Link className="mx-auto block" href="/login">Learn More</Link>
  </Button>
  );
};


const Footer = () => {
  return (
    <>
    <footer className=" bg-indigo-950 text-white p-5 flex flex-auto flex-col md:flex-row items-center justify-evenly mt-20">
      <div className="space-y-4  w-1/3 ">
        <h3 className="text-lg font-semibold mt-10 text-center"> <Image
        src={logo}
        alt="logo"
        height={100}
        width={100}
        className="mx-auto block"
  
      /></h3>
        <p className="text-sm text-justify">
         A generative
          AI for a personalised and inventive approach to learning, based on a
          solution that offers a personalised learning experience for anyone
          seeking support.
        </p>
        <div className="mt-10 text-center "><ButtonAsChild /></div>
      </div>
      <div className="space-y-4 text-center mt-10 ">
        <h3 className="text-lg font-semibold  mx-auto">Activity</h3>
        <ul className="space-y-2  mx-auto">
          <li>
            <a href="#" className="text-sm hover:underline">
              Service 1
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:underline">
              Service 2
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:underline">
              Service 3
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
    <p className=" bg-indigo-950 text-white p-5 flex flex-auto flex-col md:flex-row items-center justify-evenly font-thin">Copyright © 2024 Quizifyme</p>
    </>
  );
};

export default Footer;
