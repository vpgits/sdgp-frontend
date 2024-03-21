import Image from "next/image";
import landingimage from "../public/landing.avif";
import Footer from "@/components/footer";
import Feedback from "@/components/Feedback";
import Faq from "@/components/Faq";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function generateMetadata() {
  return {
    title: "QuizzifyMe | Home",
    description: "Elevate your learning experience with QuizzifyMe",
  };
}

export default function Home() {
  return (
    <>
      <main className="flex flex-col mt-12 items-center">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left">
          <div className="md:ml-20">
            <h1 className="text-3xl italic md:text-4xl lg:text-6xl xl:text-7xl">
              Elevate Your Learning Experience
            </h1>
            <h2 className="text-l mt-3 md:mt-5 lg:mt-5 md:text-2xl lg:text-2xl xl:text-3xl">
              Where AI Meets Fun and Learning!
            </h2>
          </div>
          <div className="flex-shrink-0 w-full md:w-1/2">
            <Image
              src={landingimage}
              alt="landing"
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw,50vw"
            />
          </div>
        </div>

        <p className="ml-10 mr-10 text-lg mt-20 mb-20 text-center font-light dark:text-gray-300 text-gray-800 md:text-2xl md:my-8 lg:my-10 xl:my-12">
          A generative AI-based solution for a personalized and inventive
          approach to learning, based on a solution that offers a personalized
          learning experience for anyone seeking support.
        </p>

        <Feedback />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
