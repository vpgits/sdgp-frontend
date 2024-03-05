// Code: Login and signup page
import SignupLogin from "@/components/login-signup/Signup";
import crypto from "crypto";

export function generateMetadata() {
  return {
    title: "Login | Quizzifyme",
    description: "Login",
  };
}

export default async function Page() {
  const nonce = crypto.randomBytes(16).toString("base64"); // Generate a random nonce
  const encoder = new TextEncoder();
  const encodedNonce = encoder.encode(nonce); // Encode the nonce
  const hash = await crypto.subtle.digest("SHA-256", encodedNonce); // Hash it with SHA-256
  const bytes = new Uint8Array(hash);
  const hashedNonce = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0")) // Convert the hash to a hexadecimal string
    .join("");

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <SignupLogin nonce={nonce} hashedNonce={hashedNonce} />
    </div>
  );
}
