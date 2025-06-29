import { Draw } from "@/app/draw/page";
import { FaRegCircle } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { BiRectangle } from "react-icons/bi";
import { MdModeEditOutline } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineFormatColorText } from "react-icons/md";
import { RiEraserLine } from "react-icons/ri";
import { CiText } from "react-icons/ci";
import { ImTextColor } from "react-icons/im";

export function InitCanvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      Draw(canvasRef.current, roomId, socket);

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }
  }, [canvasRef]);

  return (
    <div className="relative h-screen w-screen">
      <div className=" absolute top-3 left-0 w-full flex justify-center text-white space-x-5 ">
        <div className="">
          <BiRectangle size={45} />
        </div>
        <div className="pt-1">
          <FaRegCircle size={35} />
        </div>
        <div className="pt-0.5">
          <MdModeEditOutline size={40} />
        </div>
        <div className="pt-0.5">
          <FaArrowRight size={40} />
        </div>
        <div className="pt-0.5">
          <ImTextColor size={40} />
        </div>
        <div className="pt-0.5">
          <RiEraserLine size={40} />
        </div>
      </div>
      <canvas ref={canvasRef} className="h-screen w-screen block" />
    </div>
  );
}
