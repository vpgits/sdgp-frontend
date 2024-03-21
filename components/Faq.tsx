import React from "react";
import Image from "next/image";
import faq from "../public/FAQ.avif";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export function accordion() {
  return (
    <div className="flex flex-col items-center w-full m-10">
      <h1 className=" text-5xl">FAQ</h1>
      <Image src={faq} alt="faq" height={400} width={400} className="mx-auto" />
      <Accordion type="single" collapsible className="w-10/12 mx-12">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I create an account?</AccordionTrigger>
          <AccordionContent>
            To create an account, simply click on the &quot;Login with
            Google&quot; button and go to My Documents inside the Dashboard.
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
            During the quiz, you will be given 45 seconds to answer each
            question. You can also customize your quiz experience to suit your
            preferences. There are two types of quizzes, normal and rapid.
            Normal will have a question limit and a remark input. The remark
            will be used to extract information using a RAG pipeline.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            What are the supported file types?
          </AccordionTrigger>
          <AccordionContent>
            Currently we have support for PDF, DOCX, and PPTX file types. We are
            working on expanding support for more file types in the future. The
            maximum file size is currently 50 Megabytes. Refrain from inputting
            poorly formatted texts or texts that might contain escape characters
            that might interfere the question generation pipeline.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            How does this application actually work?
          </AccordionTrigger>
          <AccordionContent>
            We fine tuned a LLM model that is capable of generating MCQs
            according to a JSON schema. Read more about the model from{" "}
            <Link
              href={
                "https://huggingface.co/vpgits/Mistral-7B-v0.1-qagen-v2.1-AWQ"
              }
              className=" underline"
            >
              here
            </Link>
            &nbsp;and&nbsp;
            <Link href={"https://venura.dev"} className="underline">
              here
            </Link>
            .
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default accordion;
