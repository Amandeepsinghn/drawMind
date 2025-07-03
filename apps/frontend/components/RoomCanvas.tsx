"use client";
import React, { useEffect, useState } from "react";
import { InitCanvas } from "../components/canvas";

export default function MainRoom({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080?token=${localStorage.getItem("token")}`);

    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );
    };
  });

  if (!socket) {
    return <div>Connecting to server.....</div>;
  }

  return <InitCanvas roomId={roomId} socket={socket} />;
}
