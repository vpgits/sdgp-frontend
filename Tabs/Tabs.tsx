
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Tab = () => {
  

  return (
    <div className="min-h-full flex items-center mt-20 ml-20 ">
      <div className="mx-auto w-[350px] space-y-6">
        <form className='form'>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Make changes to your account here. Click save when you're done.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Pedro Duarte"
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="m@example.com"
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+94123456789"
                required
                type="tel"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main Street, City, Country"
                required
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-auto items-center flex-col mt-5">
            <Button className="w-full" type="submit">
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
