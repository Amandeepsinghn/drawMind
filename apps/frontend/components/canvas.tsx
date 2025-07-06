import { Draw } from "./draw";
import { FaRegCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { BiRectangle } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { RiEraserLine } from "react-icons/ri";
import { ImTextColor } from "react-icons/im";

type Shape = {
  type: "text";
  word: string;
  x: number;
  y: number;
};

export function InitCanvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const [tool, setTool] = useState<"rect" | "circle" | "pencil" | "arrow" | "text" | "eraser" | null>("rect");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [textInput, setTextInput] = useState<{ x: number; y: number; value: string; visible: boolean }>({
    x: 0,
    y: 0,
    value: "",
    visible: false,
  });

  useEffect(() => {
    let isStale = false;
    let cleanupFn: (() => void) | undefined;
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const setup = async () => {
      const fn = await Draw(canvas, roomId, socket, tool, setTextInput);

      if (!isStale) {
        cleanupFn = fn;
      } else {
        if (fn) {
          fn();
        }
      }
    };
    setup();

    return () => {
      isStale = true;
      window.removeEventListener("resize", resizeCanvas);
      if (cleanupFn) cleanupFn();
    };
  }, [tool]);

  return (
    <div className="relative h-screen w-screen">
      <div className=" absolute top-3 left-0 w-full flex justify-center text-white space-x-5">
        <div
          className=""
          onClick={() => {
            setTool("rect");
          }}
        >
          <BiRectangle size={45} />
        </div>
        <div
          className="pt-1"
          onClick={() => {
            setTool("circle");
          }}
        >
          <FaRegCircle size={35} />
        </div>
        <div
          className="pt-0.5"
          onClick={() => {
            setTool("arrow");
          }}
        >
          <FaArrowRight size={40} />
        </div>
        <div
          className="pt-0.5"
          onClick={() => {
            setTool("text");
          }}
        >
          <ImTextColor size={40} />
        </div>
        <div
          className="pt-0.5"
          onClick={() => {
            setTool("eraser");
          }}
        >
          <RiEraserLine size={40} />
        </div>
      </div>
      <canvas ref={canvasRef} className="h-screen w-screen block" />
      {textInput.visible && (
        <input
          type="text"
          autoFocus
          style={{
            position: "absolute",
            left: textInput.x,
            top: textInput.y,
            zIndex: 10,
            fontSize: "16px",
            padding: "2px",
            backgroundColor: "black",
            color: "white",
          }}
          value={textInput.value}
          onChange={(e) => setTextInput({ ...textInput, value: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter" && canvasRef.current) {
              if (!textInput.value.trim()) {
                setTextInput({ x: 0, y: 0, value: "", visible: false });
                return;
              }
              const ctx = canvasRef.current.getContext("2d");
              if (ctx) {
                ctx.font = "16px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(textInput.value, textInput.x, textInput.y);

                const shape: Shape = {
                  type: "text",
                  word: textInput.value,
                  x: textInput.x,
                  y: textInput.y,
                };

                socket.send(
                  JSON.stringify({
                    type: "chat",
                    message: JSON.stringify({
                      shape,
                    }),
                    roomId,
                  })
                );
              }
              setTextInput({ x: 0, y: 0, value: "", visible: false });
            }
          }}
          onBlur={() => {
            setTextInput({ ...textInput, visible: false });
          }}
        ></input>
      )}
    </div>
  );
}
