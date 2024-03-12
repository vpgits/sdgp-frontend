import React from 'react';
import Image from "next/image";
import group from  "@/public/group.webp";
import studentinfo from "@/public/home/studentinfo/studentinfo.json";
import { Card, CardContent } from "../ui/card";

const About = () => {
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-1/2'>
          <p className='text-4xl md:text-6xl mt-10 md:mt-20 ml-4 md:ml-20 leading-loose font-light'>Who We are ?</p>
          <p className='text-md md:text-lg text-justify mt-4 md:mt-10 ml-4 md:ml-20 mr-4 md:mr-20'>We are a group of five members in their second year of the University Informatics Institute of Technology, addressing a solution that provides a personalized learning experience for anyone seeking support from them by developing Quzifyme, a generative AI for a personalized and innovative approach to learning. Quzifyme is a platform that helps users test their own level of knowledge in different sectors according to what they upload as user materials in a given scope according to their expectations.</p>
          <p className='text-4xl md:text-6xl mt-10 md:mt-20 ml-4 md:ml-20 leading-loose font-light'> Our Vision</p>
          <p className='text-md md:text-lg text-justify mt-4 md:mt-10 ml-4 md:ml-20 mr-4 md:mr-20'>To revolutionize the educational landscape by empowering individuals with a personalized and innovative learning experience. We envision Quzifyme as the catalyst for fostering knowledge, growth, and confidence in users, creating a world where learning is accessible, adaptive, and tailored to individual needs.</p>
          <p className='text-4xl md:text-6xl mt-10 md:mt-20 ml-4 md:ml-20 leading-loose font-light'> Our Mission</p>
          <p className='text-md md:text-lg text-justify mt-4 md:mt-10 ml-4 md:ml-20 mr-4 md:mr-20'>At Quzifyme, our mission is to provide a cutting-edge generative AI platform that transforms traditional learning paradigms.</p>
        </div>

        <div className="md:w-1/2">
          <Image
            className="w-full md:w-full mt-20"
            src={group}
            alt="group"
            width={800}
            height={600}
            priority
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-5 m-4 items-center justify-center mt-20">
        {studentinfo.map((student, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <StudentInfo student={student} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export function StudentInfo(studentData: any) {
  const { student, index } = studentData;
  return (
    <Card className="max-w-xs min-h-96 flex items-center">
      <CardContent>
        <p className="text-blue-500 text-8xl font-bold italic">{student.num}</p>
        <Image
          src={student.image}
          alt={`student${index}pf`}
          height={250}
          width={250}
          className="mx-auto"
        />
        <p className='text-4xl'>{student.name}</p>
        <p className='text-md mt-5'>{student.title}</p>
        <p className="text-center italic text-sm mt-5 ">{student.text}</p>
      </CardContent>
    </Card>
  );
}

export default About;
