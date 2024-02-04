// import React from 'react';
// import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';



// export default function SignupLogin() {
//   return (
//     <>
//     <Tabs defaultValue="signup" className="w-full max-w-xl"> {/* Increased width of the Tabs */}
//         <TabsList className="flex justify-center gap-6"> {/* Increased gap between tabs */}
//           <TabsTrigger value="signup" className="text-lg">Sign Up</TabsTrigger> {/* Increased font size */}
//           <TabsTrigger value="login" className="text-lg">Login</TabsTrigger> {/* Increased font size */}
//         </TabsList>
//         <TabsContent value="signup">
//           <Card className="mt-6"> {/* Increased margin top */}
//             <CardHeader>
//               <CardTitle className="text-2xl">Create an account</CardTitle> {/* Increased font size */}
//             </CardHeader>
//             <CardContent className="space-y-6"> {/* Increased space between elements */}
//               <div className="space-y-4"> {/* Increased space between input groups */}
//                 <Label htmlFor="signup-name" className="text-lg">Name</Label> {/* Increased font size */}
//                 <Input id="signup-name" required className="text-lg" /> {/* Increased font size */}
//               </div>
//               <div className="space-y-4"> {/* Increased space between input groups */}
//                 <Label htmlFor="signup-email" className="text-lg">Email</Label> {/* Increased font size */}
//                 <Input id="signup-email" required type="email" className="text-lg" /> {/* Increased font size */}
//               </div>
//               <div className="space-y-4"> {/* Increased space between input groups */}
//                 <Label htmlFor="signup-password" className="text-lg">Password</Label> {/* Increased font size */}
//                 <Input id="signup-password" required type="password" className="text-lg" /> {/* Increased font size */}
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full text-lg" type="submit"> {/* Increased font size */}
//                 Sign Up
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//         <TabsContent value="login">
//           <Card className="mt-6"> {/* Increased margin top */}
//             <CardHeader>
//               <CardTitle className="text-2xl">Login to your account</CardTitle> {/* Increased font size */}
//             </CardHeader>
//             <CardContent className="space-y-6"> {/* Increased space between elements */}
//               <div className="space-y-4"> {/* Increased space between input groups */}
//                 <Label htmlFor="login-email" className="text-lg">Email</Label> {/* Increased font size */}
//                 <Input id="login-email" required type="email" className="text-lg" /> {/* Increased font size */}
//               </div>
//               <div className="space-y-4"> {/* Increased space between input groups */}
//                 <Label htmlFor="login-password" className="text-lg">Password</Label> {/* Increased font size */}
//                 <Input id="login-password" required type="password" className="text-lg" /> {/* Increased font size */}
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full text-lg" type="submit"> {/* Increased font size */}
//                 Login
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </>
//   )
// }
