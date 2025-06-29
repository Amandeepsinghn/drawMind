import axios from "axios";
import { Head } from "next/document";
import { headers } from "next/headers";
import { useRef } from "react";
import { useRouter } from "next/navigation";
interface room {
  roomId: Number;
}

interface card {
  setCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Card = ({ setCard }: card) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <div className=" bg-[#2d333b] h-screen flex justify-center">
      <div className="flex flex-col justify-center ">
        <div className=" text-white bg-[#0e0f11] rounded-lg border border-white w-80 p-2 h-max px-4">
          <div className="text-center font-semibold text-4xl mb-4">Enter your credentials</div>
          <input ref={inputRef} type="text" placeholder="enter room name" className="bg-[#2d333b] rounded-2xl px-1.5 mb-4 py-2" />
          <div className="flex justify-between">
            {" "}
            <button
              className="bg-[#187bdb] rounded-4xl p-2 font-semibold "
              onClick={async () => {
                const roomName = inputRef.current?.value;

                if (!roomName) {
                  alert("please enter room name first");
                }

                try {
                  const response = await axios.post<room>(
                    "http://localhost:3004/api/room",
                    {
                      name: roomName,
                    },
                    {
                      headers: {
                        Authorization: localStorage.getItem("token"),
                      },
                    }
                  );
                  setCard(false);
                } catch (error) {
                  console.log("something went wrong");
                }
              }}
            >
              create Room
            </button>
            <button className="bg-[#187bdb] rounded-4xl p-2 font-semibold " onClick={() => setCard(false)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
