/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/KZNRflFQQTj
 */
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <Tabs className="flex flex-col gap-2 items-start" defaultValue="signup">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Log In</TabsTrigger>
          </TabsList>
          <TabsContent className="p-4" value="signup">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input id="signup-username" placeholder="Enter your username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" placeholder="Enter your email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" placeholder="Enter your password" type="password" />
              </div>
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <Link className="underline" href="#">
                Forgot password?
              </Link>
            </div>
          </TabsContent>
          <TabsContent className="p-4" value="login">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" placeholder="Enter your email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" placeholder="Enter your password" type="password" />
              </div>
              <Button className="w-full" type="submit">
                Log In
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <Link className="underline" href="#">
                Forgot password?
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
