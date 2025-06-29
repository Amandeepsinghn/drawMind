import Link from "next/link";
import { Button } from "../components/button";
import { AiFillGitlab } from "react-icons/ai";

export default function Home() {
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
            <Button name="Sign Up" bgColor="bg-[#1e88ff]" />
          </Link>

          <Link href="/login">
            <Button name="log In" bgColor="bg-[#2d333b]" />
          </Link>
        </div>
      </div>
      <div>
        <hr className="border-t border-gray-200 opacity-40" />
      </div>
      <div className="m-20">
        <div className="text-white font-bold text-4xl flex justify-center">Collaborative drawing for teams</div>
        <div className="text-white py-5 flex justify-center">
          Shapelt is a callaborative drawing tool that helps teams visualize and communciate their ideas. Create diagrams,
          flowcharts, wireframes, and more together in real-time.
        </div>
        <div className="flex justify-center space-x-3.5">
          <Link href="/signup">
            <Button name="Sign Up" bgColor="bg-[#1e88ff]" />
          </Link>

          <Link href="/login">
            <Button name="log In" bgColor="bg-[#2d333b]" />
          </Link>
        </div>
      </div>
      {/* <img src="front.svg" className="w-64 h-auto mx-auto " alt="bottom image" /> */}
      <div className="flex flex-col">
        <div></div>
        <img src="front.svg" className="w-70 h-auto mx-auto " alt="bottom image" />
      </div>
    </div>
  );
}
