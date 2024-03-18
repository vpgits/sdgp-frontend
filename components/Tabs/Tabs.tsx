import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from '@supabase/supabase-js'; // Import Supabase client

// Add the import statement for the Record type
// Remove the import statement for Record from 'react'
// import { Record } from 'react';

const supabaseUrl = 'https://mokzgwuuykjeipsyzuwe.supabase.co'; // Replace with your Superbase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1va3pnd3V1eWtqZWlwc3l6dXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3NjgzMzMsImV4cCI6MjAxNDM0NDMzM30.qhyjj2Z880nhSpMUTsBW5U6tv51rRoy7fXEUJzirU8A'; // Replace with your Superbase public API key
const supabase = createClient(supabaseUrl, supabaseKey); // Initialize Supabase client

export const Tab = () => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Extract form data
    const formData = new FormData(event.currentTarget);

    // Use Record type to define data
    const data: Record<string, string> = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, value.toString()])
    );

    // Insert data into Superbase database
    const { data: insertedData, error } = await supabase.from('your_table_name').insert([data]);

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted successfully:', insertedData);
      // Optionally, reset the form
      event.currentTarget.reset();
    }
  };
  

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <form onSubmit={handleSubmit}> {/* Attach handleSubmit to the form's onSubmit event */}
          <TabsTrigger value="account">Account</TabsTrigger>
        </form>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit}> {/* Attach handleSubmit to form's onSubmit event */}
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue="Pedro Duarte" /> {/* Add name attribute to Input fields */}
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" defaultValue="@peduarte" /> {/* Add name attribute to Input fields */}
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" name="email" defaultValue="peduarte@gmail.com" /> {/* Add name attribute to Input fields */}
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" defaultValue="+94123456789" /> {/* Add name attribute to Input fields */}
              </div>
              <div className="space-y-1">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" defaultValue="1/2,peduarte,peduarte" /> {/* Add name attribute to Input fields */}
              </div>
              <Button type="submit">Save changes</Button> {/* Change Button type to "submit" */}
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        {/* Password content */}
      </TabsContent>
    </Tabs>
  )
}
