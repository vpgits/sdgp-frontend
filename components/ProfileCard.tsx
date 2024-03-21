import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import background from "@/public/background.jpg";

export const ProfileCard = () => {
    return (
        <div className="w-full h-60 overflow-hidden rounded-xl">
            <Image src={background} alt="@shadcn"  className="rounded-xl" />
        </div>
    );
}

export default ProfileCard;
