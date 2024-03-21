import React from "react";
import { Button } from "@/components/ui/button";
import hello from "@/public/hello.png";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvatarDemo } from "../Avatar/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { handleChangeUserData } from "./action";

export default async function Tab() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const defaultValues = null;
  const { data: user, error } = await supabase.from("user").select("*");
  const {
    id,
    created_at,
    fname,
    lname,
    email,
    raw_user_meta_data,
    address,
    phone,
    city,
    state,
  } = user![0];

  return (
    <div>
      <div className="flex flex-row items-center justify-center mt-10">
        <div className="flex flex-col">
          <div className="rounded-full h-[100px] w-[100px] overflow-hidden">
            {raw_user_meta_data ? (
              <Image
                src={(raw_user_meta_data as any).picture}
                alt="profile-pic"
                width={100}
                height={100}
              />
            ) : (
              <AvatarDemo />
            )}
          </div>
        </div>
        <div className="grid items-center justify-center mt-5 text-sm ml-10 md:ml-20">
          <Image src={hello} alt="hello" className="w-20" priority />
          <h1 className=" text-xl md:text-3xl text-gray-500 dark:text-gray-">
            User
          </h1>
          {fname && lname ? (
            <>
              <p className=" 400 font-semibold  text-2xl md:text-4xl">
                {fname}
              </p>
              <p className=" 400 font-semibold  text-2xl md:text-4xl">
                {lname}
              </p>
            </>
          ) : (
            <p className=" 400 font-semibold  text-2xl md:text-4xl">{email}</p>
          )}
        </div>
      </div>

      <div className=" flex flex-col  mt-5 p-10 md:ml-20 md:mr-20">
        <h1 className="text-2xl font-bold md:text-4xl ">Change Profile</h1>
        <form
          action={handleChangeUserData}
          className="flex flex-auto flex-col justify-center  border  border-black dark:border-slate-400 rounded-lg p-10 mt-10 md:p-20"
        >
          {" "}
          {/* Attach handleSubmit to form's onSubmit event */}
          <div className="space-y-1 ">
            <Input
              id="id"
              name="id"
              defaultValue={id}
              readOnly
              hidden
              className="hidden"
            />{" "}
            {/* Add name attribute to Input fields */}
          </div>
          <div className=" flex flex-row">
            <div className="space-y-1">
              <Label htmlFor="name">First Name</Label>
              <Input
                id="fname"
                name="fname"
                placeholder="John"
                defaultValue={fname}
                required
              />
            </div>
            <div className="space-y-1 ml-10">
              <Label htmlFor="name">Last Name</Label>
              <Input
                id="lname"
                name="lname"
                placeholder="Doe"
                defaultValue={lname}
                required
              />
              {/* Add name attribute to Input fields */}
            </div>
          </div>
          <div className="space-y-1 mt-10  md:mt-15 float-left">
            <Label htmlFor="phone">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="sample@sampple.com"
              defaultValue={email}
              required
              readOnly
            />{" "}
            {/* Add name attribute to Input fields */}
          </div>
          <div className="space-y-1 mt-10  md:mt-15">
            <Label htmlFor="phone">Contact Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="0123456789"
              defaultValue={phone}
              required
            />{" "}
            {/* Add name attribute to Input fields */}
          </div>
          <div className="space-y-1 mt-10  md:mt-15">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="1234 Main St"
              defaultValue={address}
              required
            />{" "}
            {/* Add name attribute to Input fields */}
          </div>
          <div className=" flex flex-row">
            <div className="space-y-1 mt-5 md:mt-10">
              <Label htmlFor="name">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="Colombo"
                defaultValue={city}
                required
              />
            </div>
            <div className="space-y-1 ml-10 mt-5 md:mt-10">
              <Label htmlFor="name">State</Label>
              <Input
                id="state"
                name="state"
                placeholder="Western Province"
                defaultValue={state}
                required
              />
              {/* Add name attribute to Input fields */}
            </div>
          </div>
          <Button className="mt-10  md:mt-15" type="submit">
            Save changes
          </Button>{" "}
          {/* Change Button type to "submit" */}
        </form>
      </div>
    </div>
  );
}
