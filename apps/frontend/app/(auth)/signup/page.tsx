"use client";

import Link from "next/link";
import { Button } from "../../../components/button";
import { AiFillGitlab } from "react-icons/ai";
import { InputBox } from "../../../components/InputBox";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="bg-[#0e0f11] h-screen w-full">
      <div className="flex justify-between p-3">
        <div className="flex justify-center space-x-2.5">
          <div>
            <AiFillGitlab color="white" size={50} />
          </div>
          <div>
            <div className="text-white font-semibold text-2xl py-2">drawMind</div>
          </div>
        </div>
        <div className="flex justify-center space-x-2.5">
          <Link href="/login">
            <Button name="log In" bgColor="bg-[#2d333b]" />
          </Link>
        </div>
      </div>
      <div>
        <hr className="border-t border-gray-200 opacity-40" />
      </div>
      <br></br>
      <div className="p-10">
        <div className="flex justify-between">
          <div className="flex flex-col justify-center">
            <InputBox label="fullName" placeholder="enter your full name" onChange={(e) => setFirstName(e.target.value)} />
            <InputBox label="Password" placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} />
            <InputBox label="Email" placeholder="enter email" onChange={(e) => setEmail(e.target.value)} />
            <div className="flex justify-center mt-6">
              <button
                className={`text-black text-xl font-semibold rounded-2xl px-40 py-3 bg-[#dbe8f2] `}
                onClick={async () => {
                  try {
                    await axios.post("http://localhost:3004/api/signup", {
                      username: email,
                      password: password,
                      name: firstName,
                    });
                    router.push("/login");
                  } catch (error: unknown) {
                    const err = error as AxiosError;
                    if (err.response && err.response.status === 411) {
                      setErrorMessage("User already exists");
                    } else {
                      setErrorMessage("Something went wrong. Please try again");
                    }
                  }
                }}
              >
                Sign Up
              </button>
            </div>
            {errorMessage && <div className="text-red-500 mt-4 text-center font-medium">{errorMessage}</div>}
          </div>

          <img src="signupLogin.svg" className="w-170 "></img>
        </div>
      </div>
    </div>
  );
}
