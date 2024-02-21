// pages/index.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import landingimage from "../public/landing.png";
import Footer from "@/components/footer";
import Feedback from "@/components/Feedback";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <>
      <main className="flex flex-col m-5 items-center">
        <div className="flex flex-auto flex-col m-2 md:m-10 lg:flex-row">
          <div>
            <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-4xl mb-3">
              Elevate Your Learning Experience:
            </h1>
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-2xl">
              {" "}
              Where AI Meets Fun and Learning!
            </h2>
          </div>
          <div className="flex flex-auto justify-end">
            <Image src={landingimage} alt="landing" className="w-9/12" />
          </div>
          <p className=" text-lg text-center  md:text-2xl font-light md:my-20 mt-10 lg:mt-40">
            A generative AI based solution for a personalised and inventive
            approach to learning, based on a solution that offers a personalised
            learning experience for anyone seeking support.
          </p>

          {/* <div className="buttons mt-10 md:mt-20">
            <Button className="bg-blue-500 mr-2">
              <Link href="#buy" className="text-white">
                Try For Free
              </Link>
            </Button>
            <Button className="border border-blue-500 text-blue-500 xl:ml-20">
              <Link href="#buy" className="text-blue-500">
                Buy Premium
              </Link>
            </Button>
          </div> */}
        </div>
      </main>
      <Feedback />
      {/* <div className='ml-20 mt-20 w-1/2'> */}
      <Faq />
      {/* </div> */}
      <Footer />
    </>
  );
}
