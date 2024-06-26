"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import signupPic from "../../public/login.avif";
import { signup, Login } from "@/app/login/action";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

export default function SignupLogin({
  nonce,
  hashedNonce,
}: {
  nonce: string;
  hashedNonce: string;
}) {
  const [login, setLogin] = useState(true);
  const [isLoggginIn, setIsLoggingIn] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const signUpHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const signUpData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    console.log(signUpData);
    const { data, errorData } = await signup(formData);
    if (errorData) {
      console.error(errorData);
      toast.error("Signup failed: " + errorData.message);
    } else {
      console.log(data);
      toast.success("Signup successful");
      setLogin(true);
    }
  };

  const signInHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    // console.log(formData);
    const { data, errorData } = await Login(formData);
    if (errorData) {
      console.error(errorData);
      toast.error("SignIn failed: " + errorData.message);
    } else {
      toast.success("SignIn successful");
      router.push("/dashboard");
    }
  };

  const handleSignInWithGoogle = useCallback(
    async (response: any) => {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
        nonce: nonce, // must be the same one as provided in data-nonce (if any)
      });
      console.log(data, error);
      if (data) {
        router.push("/dashboard");
        router.refresh();
      }
      if (error) {
        console.log(error);
        router.push("/login");
      }
    },
    [nonce, router, supabase.auth]
  );

  useEffect(() => {
    (window as any).handleSignInWithGoogle = handleSignInWithGoogle;
    return () => {
      (window as any).handleSignInWithGoogle = undefined;
    };
  }, [handleSignInWithGoogle]);

  return (
    <div className="flex flex-auto items-center justify-center h-full">
      <Toaster />
      <div className="lg:mx-24">
        {login ? (
          <div className="min-h-full flex items-center ">
            <div className="mx-auto w-[350px] space-y-6">
              <form
                onSubmit={(e) => {
                  signInHandler(e);
                }}
              >
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
                      disabled={isLoggginIn}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      required
                      type="password"
                      min={6}
                      disabled={isLoggginIn}
                    />
                  </div>

                  <div className="flex flex-auto items-center flex-col gap-y-2">
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={isLoggginIn}
                    >
                      {isLoggginIn ? "Logging in..." : "Login"}
                    </Button>
                    <GoogleOAuthProvider
                      clientId="251594071758-lcn2jr190479a3t9ghci9gi74tl1c9r8.apps.googleusercontent.com"
                      nonce={hashedNonce}
                    >
                      <div
                        className={`w-full flex justify-center flex-auto ${
                          isLoggginIn ? "hover:cursor-not-allowed" : ""
                        }`}
                      >
                        <GoogleLogin
                          nonce={hashedNonce}
                          onSuccess={(credentialResponse) => {
                            setIsLoggingIn(true);
                            handleSignInWithGoogle(credentialResponse);
                          }}
                          onError={() => {
                            console.log("Login Failed");
                          }}
                          useOneTap
                          size="large"
                          shape="rectangular"
                          auto_select={false}
                        />
                        {/* <div
                          id="g_id_onload"
                          data-client_id="251594071758-lcn2jr190479a3t9ghci9gi74tl1c9r8.apps.googleusercontent.com"
                          data-context="signin"
                          data-ux_mode="popup"
                          data-callback="handleSignInWithGoogle"
                          data-nonce={hashedNonce}
                          data-auto_select="false"
                          data-itp_support="true"
                        ></div>

                        <div
                          className="g_id_signin"
                          data-type="standard"
                          data-shape="pill"
                          data-theme="outline"
                          data-text="continue_with"
                          data-size="large"
                          data-logo_alignment="left"
                        ></div> */}
                      </div>
                    </GoogleOAuthProvider>
                  </div>
                </div>
              </form>

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?&nbsp;
                <a
                  className="hover:cursor-pointer underline"
                  onClick={() => {
                    if (isLoggginIn) return;
                    setLogin(false);
                  }}
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-12 lg:mr-24">
            <div className="mx-auto w-[350px] space-y-6">
              <form
                onSubmit={(e) => {
                  signUpHandler(e);
                }}
              >
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl font-bold">Sign Up</h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    Enter your details below to create a new account
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
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      required
                      type="password"
                      min={6}
                    />
                  </div>
                  <Button className="w-full" type="submit">
                    Sign Up
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
