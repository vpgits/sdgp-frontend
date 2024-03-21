import React from "react";

export default function WelcomeBanner({ userData }: { userData: any }) {
  let name;
  if (userData.user_metadata?.name) {
    name = userData.user_metadata.name;
  } else {
    name = userData.email;
  }
  return (
    <span className="">
      <h1 className="inline text-xl mx-5 font-bold text-left">Welcome</h1>
      <p className=" -ml-3 font-bold inline bg-gradient-to-l dark:bg-gradient-to-r from-gray-400 to-gray-600  dark:from-gray-200 dark:to-gray-500 bg-clip-text text-transparent text-xl">{`${name}`}</p>
    </span>
  );
}
