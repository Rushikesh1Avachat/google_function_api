"use client";

import { useState } from "react";
import { Client, Account, OAuthProvider } from "appwrite";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { OAuthConfig} from "next-auth/providers/oauth";


const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67e6498a00349285df8c");

const account = new Account(client);

export default function GoogleSignUp() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleGoogleSignUp = async () => {
    try {
      const account = new Account(client);

      account.createOAuth2Session(
        OAuthProvider.Google, // Replace with the actual provider name, e.g., 'google'
        'https://localhost:3000/dashboard', // Success redirect URL
        'https://localhost:3000/failure' // Failure redirect URL
    );
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };
  

  const fetchUserData = async () => {
    try {
      const userData = await account.get();
      setUserEmail(userData.email);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Google Sign-Up Button */}
      <Button  className="w-full">
      <button onClick={handleGoogleSignUp}>Google Sign Up</button>

</Button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Information</DialogTitle>
          </DialogHeader>
          <p>Email: {userEmail}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}





