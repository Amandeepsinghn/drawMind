import { ReactNode } from "react";

interface ButtonProps {
  // size?: string;
  appName: string;
  // color: string;
}
// { size, appName, color }: ButtonProps

export const Button = ({ appName }: ButtonProps) => {
  return (
    <button className="bg-[#1e88ff] text-white px-6 py-3 text-xl font-semibold rounded-full hover:bg-[#187bdb]">{appName}</button>
  );
};
