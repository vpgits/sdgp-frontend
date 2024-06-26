"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";
import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import { Toaster, toast } from "sonner";

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm("service_nygg8dn", "template_669da1x", form.current!, {
        publicKey: "fzQtHeLDFDWj-PBfK",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Email Sent Successfully");
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Email Failed to Send");
        }
      )
      .finally(() => {
        form.current!.reset();
      });
  };
  return (
    <>
      <Toaster />
      <div className="container grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2 md:py-16 lg:gap-16 md:gap-12">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="text-gray-500 dark:text-gray-400">
              We&apos;ll get back to you as soon as possible.
            </p>
          </div>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="user_name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="user_email"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="user_subject"
                placeholder="Enter your subject"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                className="min-h-[150px]"
                name="message"
                id="message"
                placeholder="Enter your message"
              />
            </div>
            <Button type="submit">Send message</Button>
          </form>
        </div>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Reach out to us using the information below.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <PhoneIcon className="w-6 h-6 flex-shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-semibold">Call us</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Contact our support team: +94 (11) 5 555 555
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MailIcon className="w-6 h-6 flex-shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email us your questions: quizzifyme.cs06@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPinIcon className="w-6 h-6 flex-shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-semibold">Headquarters</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    1 Raymond Rd, Nugegoda 10250, Sri Lanka
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Follow us on Social Media</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Stay updated with our latest news and announcements.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <TwitterIcon className="w-8 h-8" />
              <FacebookIcon className="w-8 h-8" />
              <InstagramIcon className="w-8 h-8" />
              <LinkedinIcon className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function FacebookIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
