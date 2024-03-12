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
<h1 className="inline text-xl text-left mx-5 font-bold">Welcome</h1>
<p className=" -ml-3 font-bold inline bg-gradient-to-r from-cyan-600 to-orange-400 bg-clip-text text-transparent text-xl">{`${name}!`}</p>

    </span>
  );
}
