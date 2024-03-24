import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@/components/ui/collapsible";
import { JSX, SVGProps } from "react";

export function generateMetadata() {
  return {
    title: "Subscribe | Quizzifyme",
    description:
      "Get access to premium features and enhance your productivity.",
    image: "/images/subscribe.png",
    url: "https://quizzifyme.com/subscribe",
  };
}

export default function Component() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Join Quizzifyme Premium
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Get access to premium features and enhance your productivity.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Button>Start Your Free Trial</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3 md:gap-12">
            <Card>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>$10/month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>200 responses per month</li>
                  <li>20,000 character input</li>
                  <li>Basic chat support</li>
                  <li>Exports</li>
                  <li>1 user</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button>Subscribe</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>$20/month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Unlimited responses per month</li>
                  <li>Up to 3 users</li>
                  <li>Exports</li>
                  <li>Priority chat support</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button>Subscribe</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>Contact Us</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>All Pro Features</li>
                  <li>Custom users</li>
                  <li>24/7 Support</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button>Contact Us</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-4">
            <Collapsible className="border border-gray-200 rounded-md dark:border-gray-800">
              <CollapsibleTrigger className="flex items-center justify-between px-4 py-2">
                <span>How does the free trial work?</span>
                <ChevronDownIcon className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-2">
                Our 14-day free trial gives you full access to all our features.
                No credit card required.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className="border border-gray-200 rounded-md dark:border-gray-800">
              <CollapsibleTrigger className="flex items-center justify-between px-4 py-2">
                <span>Can I cancel my subscription?</span>
                <ChevronDownIcon className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-2">
                Yes, you can cancel your subscription at any time. No questions
                asked.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className="border border-gray-200 rounded-md dark:border-gray-800">
              <CollapsibleTrigger className="flex items-center justify-between px-4 py-2">
                <span>What payment methods do you accept?</span>
                <ChevronDownIcon className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-2">
                We accept all major credit cards, PayPal, and bank transfers.
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>
    </>
  );
}

function ChevronDownIcon(
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
