interface ButtonProps {
  name: string;
  bgColor: string;
}
// { size, appName, color }: ButtonProps
// #1e88ff blue bg color
export const JoinButton = ({ name, bgColor }: ButtonProps) => {
  return (
    <button
      className={`text-white flex items-center justify-center text-sm font-semibold rounded-2xl px-2 py-2 hover:bg-[#187bdb] ${bgColor}`}
    >
      {name}
    </button>
  );
};
