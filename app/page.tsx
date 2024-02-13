// pages/index.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import landingimage from '../public/landing.png';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <main className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2  ml-20 mt-20">
          <h1 className="text-5xl italic xs:text-center  md:text-5xl lg:text-7xl font-playfair leading-tight mb-3">
            The Best Way To Showcase Your Skills
          </h1>
          <p className="text-xl mt-10 md:text-2xl font-light md:mt-20">
            <strong>- Free 30 Days Trial -</strong>
          </p>
          <div className="buttons mt-10 md:mt-20">
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
          </div>
        </div>
        <div className="md:w-2/3 mb-3 md:mb-0 md:pr-4">
          <Image
            src={landingimage}
            alt="landing"
            className="w-full md:w-2/3 lg:w-4/5"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
