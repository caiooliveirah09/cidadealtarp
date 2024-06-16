"use client";
import api from "@/api";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function signin(event: React.FormEvent) {
    event.preventDefault();
    api
      .post("/auth/signin", { email, password })
      .then(async (response) => {
        localStorage.setItem("accessToken", response.data.message);
        router.push("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  return (
    <main className="min-h-screen flex-col items-center py-8  justify-center w-full flex text-slate-950">
      <div className="bg-slate-50 w-full max-w-md h-fit py-20 px-2 rounded-md">
        <h1 className="text-4xl w-full ml-4 pb-4">Sign in</h1>
        <form onSubmit={signin} className="flex flex-col">
          <Input
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Email"
          />
          <Input
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Password"
          />

          <Button>sign in</Button>
        </form>
        <a href="/signup" className="hover:cursor-pointer hover:underline text-blue-500">Sign up</a>
      </div>
    </main>
  );
}
