import React from "react";
import Image from "next/image";
import faq from "../public/FAQ.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function accordion() {
  return (
    <div className="flex flex-col items-center w-full m-10">
      <h1 className=" text-5xl">FAQ</h1>
      <Image src={faq} alt="faq" height={400} width={400} className="mx-auto" />
      <Accordion type="single" collapsible className="w-10/12 mx-12">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I create an account?</AccordionTrigger>
          <AccordionContent>
            To create an account, simply click on the &quot;Login with Google&quot; button
            and go to My Documents inside the Dashboard.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I start a quiz?</AccordionTrigger>
          <AccordionContent>
            To start a quiz, simply preprocess the document using your own
            documents and then create a quiz based on the processed data.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How does the quiz work?</AccordionTrigger>
          <AccordionContent>
            During the quiz, you will be given 40 seconds to answer each
            question. You can also customize your quiz experience to suit your
            preferences.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default accordion;
