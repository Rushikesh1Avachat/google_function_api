"use client"
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signIn, signOut } from "next-auth/react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Client, Account, OAuthProvider } from 'appwrite';
// import type { OAuthConfig } from "next-auth/providers/oauth";

import GoogleSignUp from "../GoogleSignUp";
import { useRouter } from "next/navigation";
const checkEmailExists = async (email: string) => {
  const existingEmails = ["test@example.com", "user@example.com"]; // Replace with real API call
  return existingEmails.includes(email);
};
// Define form schema
const formSchema = z.object({
  fullName: z.string().min(3, { message: "Full Name is required." }),
  email: z
  .string()
  .email("Invalid email address")
  .refine(async (email) => {
    const exists = await checkEmailExists(email);
    return !exists;
  }, "Email already in use"),
  mobileNumber: z.string().min(10, { message: "Mobile Number must be 10 digits." }), // Ensure correct key
  password: z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Z]/, "Must include at least one uppercase letter.")
  .regex(/[0-9]/, "Must include at least one number.")
  .regex(/[@$!%*?&]/, "Must include at least one special character."),
confirmPassword: z.string().min(8,"Confirm Password should match").regex(/[A-Z]/, "Must include at least one uppercase letter.")
.regex(/[0-9]/, "Must include at least one number.")
.regex(/[@$!%*?&]/, "Must include at least one special character."),
})



// Infer TypeScript types from Zod schema
type FormValues = z.infer<typeof formSchema>;

const Forms= () => {
  // Initialize React Hook Form with Zod
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: undefined,
      mobileNumber: undefined, // or 0 if you want a default numeric value
      password: "",
      confirmPassword: "",
    },
  });

  // Submit handler
  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
  };
  const router=useRouter()
  const client = new Client();

  client.setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('67e6498a00349285df8c'); // Replace with your Project ID

const account = new Account(client);

  const [fullName, setFullName]=useState<string>()
  const [email, setEmail]=useState<string>()
  const [mobileNumber, setMobileNumber]=useState<string>()
  const [password, setPassword]=useState<string>()
  const [confirmPassword, setConfirmPassword]=useState<string>()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setFullName(e.target.value);
    setEmail(e.target.value)
    setMobileNumber(e.target.value);
    setPassword(e.target.value);
    setConfirmPassword(e.target.value)
  };
  const handleGoogleSignup = () => {
    account.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:3000/dashboard", // Success URL
      "http://localhost:3000/login", // Failure URL
    );
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    console.log('Input value changed:', event.target.value);
  };
  return (
   <>
    <div className="flex items-end justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name Field */}
            <FormField
              control={form.control}
                 name="fullName"
              defaultValue={fullName}
              onChange={handleInputChange} 

            //   onChange={handleChange}

              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         <FormField
              control={form.control}
                 name="email"
              defaultValue={email}
              onChange={handleInputChange} 
            //   onChange={handleChange}

              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Mobile Number Field */}
            <FormField
              control={form.control}
              name="mobileNumber"
              defaultValue={mobileNumber}
              onChange={handleInputChange} 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              defaultValue={password}
              name="password"
              onChange={handleInputChange} 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              defaultValue={confirmPassword}
              name="confirmPassword"
              onChange={handleInputChange} 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Re-enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button  className="w-full mt-4 text-white bg-blue-800 hover:bg-blue-500 cursor-pointer "  onClick={()=> { router.push("/dashboard")}}>
              Submit
            </Button>

            {/* Google Sign Up */}
            <div className="flex flex-col items-center w-full mt-2">
              <div className="flex items-center justify-center gap-3 w-full">
                <span className="text-gray-500 text-2xl uppercase">or</span>
                <Button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md"  onClick={handleGoogleSignup}>
                  <FcGoogle className="w-5 h-5 size-2"  /><GoogleSignUp/>
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
   </>
  );
};

export default Forms;
