"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import Image from 'next/image';
import signupPic from '../../public/login-pic.png';



export default function SignupLogin() {
    const [login, setLogin] = useState(true);
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      {login?( <div className="flex items-center justify-center py-12">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="m@example.com" required type="email" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link className="ml-auto inline-block text-sm underline" href="#">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
            <Button className="w-full" variant="outline">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <p className="hover:cursor-pointer underline" onClick={()=>{setLogin(false)}}>Sign up</p>
              
         
          </div>
        </div>
      </div>):<div className="flex items-center justify-center py-12">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your details below to create a new account
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" required type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
            <Button className="w-full" variant="outline">
              Sign Up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <p className="hover:cursor-pointer underline" onClick={()=>{setLogin(true)}}>Login</p>   
          </div>
        </div>
      </div>}
      
      <div className="hidden bg-gray-100 lg:block dark:bg-gray-800">
        {/* <Image src={signupPic} width={500} height={1000} alt="login" /> */}
        
      </div>
    </div>
  );
}
