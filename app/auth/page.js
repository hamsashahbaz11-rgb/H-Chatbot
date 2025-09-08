 
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <img src={session.user.image} className="w-8 h-8 rounded-full" />
        <span>{session.user.name}</span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 rounded bg-red-500 text-white"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-2 px-4 py-2 border rounded-xl shadow-md hover:bg-gray-100 transition"
    >
      <FcGoogle size={22} />
      Continue with Google
    </button>
  );
}
