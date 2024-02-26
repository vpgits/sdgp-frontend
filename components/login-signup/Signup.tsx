"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import signupPic from "../../public/login-pic.png";
import { signup, Login } from "@/app/login/action";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function SignupLogin() {
  const [login, setLogin] = useState(true);
  return (
    <div className="flex flex-auto items-center justify-center h-full">
      <div className="lg:mx-24">
        {login ? (
          <div className="min-h-full flex items-center ">
            <div className="mx-auto w-[350px] space-y-6">
              <form action={Login}>
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl font-bold">Login</h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    Enter your email below to login to your account
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        className="ml-auto inline-block text-sm underline"
                        href="#"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      required
                      type="password"
                    />
                  </div>
                  <Button className="w-full" type="submit">
                    Login
                  </Button>
                  <GoogleOAuthProvider clientId="http://251594071758-lcn2jr190479a3t9ghci9gi74tl1c9r8.apps.googleusercontent.com">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                    ;
                    
                  </GoogleOAuthProvider>
                  {/* <Button className="w-full" variant="outline">
                      Login with Google
                    </Button> */}
                  ;
                </div>
              </form>

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?
                <p
                  className="hover:cursor-pointer underline"
                  onClick={() => {
                    setLogin(false);
                  }}
                >
                  Sign up
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-12 lg:mr-24">
            <div className="mx-auto w-[350px] space-y-6">
              <form action={signup}>
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl font-bold">Sign Up</h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    Enter your details below to create a new account
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      required
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      required
                      type="password"
                    />
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
                  <p
                    className="hover:cursor-pointer underline"
                    onClick={() => {
                      setLogin(true);
                    }}
                  >
                    <a href="">Login</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="hidden lg:block">
        <Image src={signupPic} width={300} alt="login" />
      </div>
    </div>
  );
}
