import React from 'react';
import Image from 'next/image';
import logo from '../public/logo-max.png';

const Footer = () => {
  return (
    <footer className=" bg-indigo-950 text-white py-8 mt-20">
      <div className="sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        
      {/* <div className='mt-10'><hr /></div> */}
      <div className='flex flex-auto justify-center flex-row'> 
      <Image
          src={logo}
          alt="logo"
          className="w-full h-auto mx-auto max-w-20 md:max-w-40 lg:max-w-48 xl:max-w-64"
        />
      </div>
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4 ">
            <h3 className="text-lg font-semibold mt-10 text-center">About</h3>
            <p className="text-sm text-justify">A group of five students in their second year at the University of Informatics Institute of Technology developed Quzifyme, a generative AI for a personalised and inventive approach to learning, based on a solution that offers a personalised learning experience for anyone seeking support from them. Quzifyme is a platform that assists users with evaluating their own level of knowledge in various fields based on the materials they submit as user materials within a specified scope that meets their requirements.</p>
            <a href="#" className="text-sm hover:underline">Learn more</a>
          </div>
          <div className="space-y-4 mt-10  text-center ">
            <h3 className="text-lg font-semibold md:w-1/2 mx-auto">Activity</h3>
            <ul className="space-y-2 md:w-1/2 mx-auto">
              <li><a href="#" className="text-sm hover:underline">Service 1</a></li>
              <li><a href="#" className="text-sm hover:underline">Service 2</a></li>
              <li><a href="#" className="text-sm hover:underline">Service 3</a></li>
            </ul>
          </div>
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold  mt-10 ">Contact</h3>
            <p className="text-sm">123 Main Street, City, Country</p>
            <p className="text-sm">Phone: +1 (123) 456-7890</p>
            <p className="text-sm">Email: info@example.com</p>
          </div>
        </div>
        <div className="mt-8">
         
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
