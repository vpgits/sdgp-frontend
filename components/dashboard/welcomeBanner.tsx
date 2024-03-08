import React from "react";

export default function WelcomeBanner({ userData }: { userData: any }) {
  let name;
  if (userData.user_metadata?.name) {
    name = userData.user_metadata.name;
  } else {
    name = userData.email;
  }
  return (
    <span>
      <h1 className=" text-xl text-left mx-5">Welcome {name}</h1>
    </span>
  );
}
