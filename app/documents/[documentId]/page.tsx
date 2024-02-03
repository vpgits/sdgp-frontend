import React from "react";

type Props = {
  params: { documentId: string };
};

export default function page({ params }: Props) {
  console.log(params);
  return (
    <div>
      <p>{params.documentId}</p>
    </div>
  );
}
