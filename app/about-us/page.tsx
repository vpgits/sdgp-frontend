import React from 'react';
import About from "@/components/about/page";
import Footer from '@/components/footer';

export function generateMetadata() {
  return {
    title: "Dashboard | Quizzifyme",
    description: "Dashboard",
  };
}

export default function Page() {
  return (
    <>
      <About />
      <Footer />
    </>
  );
}
