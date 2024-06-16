"use client";
import api from "@/api";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  function signup(event: React.FormEvent) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    api
      .post("/auth/signup", { email, password })
      .then((response) => {
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
        <h1 className="text-4xl w-full ml-4 pb-4">Sign up</h1>
        <form onSubmit={signup} className="flex flex-col">
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
          <Input
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm Password"
          />

          <Button>sign up</Button>
        </form>
        <a href="/signin" className="hover:cursor-pointer hover:underline text-blue-500">Sign in</a>
      </div>
    </main>
  );
}
