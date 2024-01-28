"use client";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import create from "@/lib/actions/generateQuestion";

type Props = {
  key_points: { key_point: any; id: any }[];
};

export default function SelectKeyPoint({ key_points }: Props) {
  return (
    <div className="w-full flex flex-col items-center ">
      {key_points.map((key_point) => (
        <div key={key_point.id} className="w-9/12 mb-4">
          <Card
            className="hover:border-white cursor-pointer"
            onClick={() => create(key_point.id)}
          >
            <CardContent className="flex items-center justify-center p-6">
              <span className="text-l text-center">{key_point.key_point}</span>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
