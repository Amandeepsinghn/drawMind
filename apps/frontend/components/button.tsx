interface ButtonProps {
  name: string;
  bgColor: string;
}
// { size, appName, color }: ButtonProps
// #1e88ff blue bg color
export const Button = ({ name, bgColor }: ButtonProps) => {
  return (
    <button className={`text-white text-xl font-semibold rounded-2xl px-4 py-3 hover:bg-[#187bdb] ${bgColor}`}>{name}</button>
  );
};
