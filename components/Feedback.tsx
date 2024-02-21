import React from 'react'
import Image from "next/image";
import feedback1 from '../public/feedback1.png';
import feedback2 from '../public/feedback2.png';
import feedback3 from '../public/feedback3.png';
import rating from '../public/rating.png';

const Feedback = () => {
  return (
    <div className='flex'> <div className='text-center float-left w-1/3'>
    <p className='italic text-center mt-10 ml-20 mr-20'><span className="text-blue-500 text-8xl font-bold ">"</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sit veniam non est ea iusto aperiam dolorum debitis accusantium unde."</p>
    <Image
      src={feedback1}
      alt="feedback1pf"
      height={150}
      width={150}
      className="mx-auto block mt-10"

    />
      <Image
      src={rating}
      alt="rating"
      height={150}
      width={150}
      className="mx-auto block mt-10"

    />
  </div>
  <div className='text-center  w-1/3'>
  <p className='italic text-center mt-10 ml-20 mr-20'><span className="text-blue-500 text-8xl font-bold ">"</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur possimus quibusdam blanditiis atque veritatis sequi ab dicta iure dolorem ut?"</p>
  <Image
    src={feedback3}
    alt="feedback3pf"
    height={200}
    width={200}
    className="mx-auto block"

  />
   <Image
      src={rating}
      alt="rating"
      height={150}
      width={150}
      className="mx-auto block"

    />
</div>
  <div className='text-center  w-1/3 float-right'>
  <p className='italic text-center mt-10 ml-20 mr-20'><span className="text-blue-500 text-8xl font-bold ">"</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse veniam amet quas enim sapiente at, est laudantium eius suscipit tenetur."</p>
  <Image
    src={feedback2}
    alt="feedback2pf"
    height={200}
    width={200}
    className="mx-auto block"
  />
   <Image
      src={rating}
      alt="rating"
      height={150}
      width={150}
      className="mx-auto block"
    />
</div></div>
   
  )
}

export default Feedback
