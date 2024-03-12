import React from "react";
import Image from "next/image";
import rating from "../public/rating.png";
import feedbacks from "../public/home/feedback/feedback.json";
import {
  Card,
  CardContent
} from "./ui/card";
const Feedback = () => {
  return (
    <>
      <div className="flex flex-auto gap-5 m-4 items-center justify-center flex-col md:flex-row">
        {feedbacks.map((feedback, index) => {
          return (
            <div key={index}>
              {/* <h1 className="text-4xl text-center mt-20">{feedback.text}</h1>

              <div className="flex justify-center">
                <Image
                  src={feedback.image}
                  alt={`feedback${index}pf`}
                  height={150}
                  width={150}
                  className="mx-auto block"
                /> */}
              {/* <Image
                  src={
                    "/rating.png"
                  }
                  alt="rating"
                  height={150}
                  width={150}
                  className="mx-auto block"
                /> */}
              {/* </div> */}
              <RatingCard feedback={feedback} index={index} />
            </div>
          );
        })}
      </div>
      {/* <div className="flex">
        {}
        <div className="text-center float-left w-1/3">
          <p className="italic text-center mt-10 ml-20 mr-20">
            <span className="text-blue-500 text-8xl font-bold ">"</span>Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Cum sit veniam
            non est ea iusto aperiam dolorum debitis accusantium unde."
          </p>
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
        <div className="text-center  w-1/3">
          <p className="italic text-center mt-10 ml-20 mr-20">
            <span className="text-blue-500 text-8xl font-bold ">"</span>Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            possimus quibusdam blanditiis atque veritatis sequi ab dicta iure
            dolorem ut?"
          </p>
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
        <div className="text-center  w-1/3 float-right">
          <p className="italic text-center mt-10 ml-20 mr-20">
            <span className="text-blue-500 text-8xl font-bold ">"</span>Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Esse veniam amet
            quas enim sapiente at, est laudantium eius suscipit tenetur."
          </p>
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
        </div>
      </div> */}
    </>
  );
};

export function RatingCard(feedbackData: any) {
  const { feedback, index } = feedbackData;
  return (
    <Card className="lg:w-80 lg:h-100 flex items-center">
      <CardContent>
        <p className="text-blue-500 text-8xl font-bold italic">"</p>
        <div className="mx-auto -mt-40 md:-mt-20 lg:-mt-10">
          <Image
            src={feedback.image}
            alt={`feedback${index}pf`}
            height={250}
            width={250}
            className="object-cover w-full h-full w-30 h-30 md:w-64 md:h-64 "
          />
        </div>
        <p className="text-center italic text-sm -mt-20 md:-mt-10 lg:-mt-0">{feedback.text}</p>
        <Image
          src="/rating.png"
          alt="rating"
          height={150}
          width={150}
          className="mx-auto block mt-5"
        />
      </CardContent>
    </Card>
  );
}


export default Feedback;
