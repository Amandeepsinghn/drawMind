"use client";

import { AiFillGitlab } from "react-icons/ai";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ProfileButton } from "../../components/profile";

import { CreateRoom } from "../../components/CreateRoom";
import { Card } from "../../components/RoomCard";

interface User {
  roomName: string;
  roomId: string;
  createdAt: string;
}

interface Room {
  room: {
    id: number;
    slug: string;
    createdAt: Date;
    adminId: string;
  };
}

export default function LogIn() {
  const [user, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");
  const router = useRouter();
  const [create, createUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const indexofLastRecord = currentPage * recordsPerPage;
  const indexFirstRecord = indexofLastRecord - recordsPerPage;
  const currentUsers = user.slice(indexFirstRecord, indexofLastRecord);

  const totalPage = Math.ceil(user.length / recordsPerPage);

  useEffect(() => {
    axios
      .get(`https://draw-mind-http-server-6wjl.vercel.app/api/room/bulk?filter=${filter}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUsers(response.data);
      });
  }, [filter]);

  return (
    <div className="bg-[#0e0f11] h-screen w-full">
      {create && <Card setCard={createUser} />}
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
          <div className="flex flex-col justify-center">
            <input
              placeholder="Search"
              className="px-2 py-2 pl-4 border rounded-2xl  text-white bg-[#1e2124]"
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            ></input>
          </div>
          <ProfileButton />
        </div>
      </div>
      <div>
        <hr className="border-t border-gray-200 opacity-40" />
      </div>
      <div className="flex justify-between px-40 pt-15">
        <div className="text-white font-semibold text-4xl pt-2">Rooms</div>
        <div className="flex justify-center space-x-2">
          <CreateRoom name="create Room" bgColor="bg-[#2d333b]" onClick={() => createUser(true)} />
        </div>
      </div>

      <div className="pt-15 px-40">
        <div className="overflow-x-auto rounded-lg border border-gray-700 text-white">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-[#16191d]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">Room Name </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">Room ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">Created At</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">Join Button</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-[#0e0f11]">
              {currentUsers.map((user) => (
                <tr key={user.roomId}>
                  <td className="px-6 py-4 text-left text-sm font-medium uppercase">{user.roomName}</td>
                  <td className="px-6 py-4 text-left text-sm font-medium uppercase">{user.roomId}</td>
                  <td className="px-6 py-4 text-left text-sm font-medium uppercase">{user.createdAt}</td>
                  <td className="py-4 px-6">
                    <button
                      className={`text-white flex items-center justify-center text-sm font-semibold rounded-2xl px-2 py-2 hover:bg-[#187bdb] bg-[#0e0f11]`}
                      onClick={async () => {
                        try {
                          const response = await axios.get<Room>(
                            `draw-mind-http-server-6wjl.vercel.app/api/room/${user.roomName}`,
                            {
                              headers: {
                                Authorization: localStorage.getItem("token"),
                              },
                            }
                          );
                          router.push(`/room/${response.data.room.id}`);
                        } catch {
                          <div className="text-red-500"> failed to enter the room,error</div>;
                        }
                      }}
                    >
                      Join room
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          <button
            className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
            disabled={currentPage === totalPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
