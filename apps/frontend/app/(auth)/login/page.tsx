"use client";

import Link from "next/link";
import { Button } from "../../../components/button";
import { AiFillGitlab } from "react-icons/ai";
import { InputBox } from "../../../components/InputBox";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          <Link href="/signup">
            <Button name="Sign Up" bgColor="bg-[#2d333b]" />
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
            <InputBox label="Password" placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} />
            <InputBox label="Email" placeholder="enter email" onChange={(e) => setEmail(e.target.value)} />
            <div className="flex justify-center mt-6">
              <button
                className={`text-black text-xl font-semibold rounded-2xl px-40 py-3 bg-[#dbe8f2] `}
                onClick={async () => {
                  try {
                    const response = await axios.post("http://localhost:3004/api/signin", {
                      password: password,
                      username: email,
                    });
                    localStorage.setItem("token", response.data.token);
                    router.push("/dashboard");
                  } catch (error: unknown) {
                    const err = error as AxiosError;
                    if (err.response && err.response.status == 403) {
                      setErrorMessage("user does not exsist");
                    } else {
                      setErrorMessage("Something went wrong. Please try again.");
                    }
                  }
                }}
              >
                log In
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
