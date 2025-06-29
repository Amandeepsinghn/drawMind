interface CreateRoomProp {
  name: string;
  bgColor: string;
  onClick: () => void;
}

export const CreateRoom = ({ name, bgColor, onClick }: CreateRoomProp) => {
  return (
    <button className={`text-white text-xl font-semibold rounded-2xl px-4 py-3 hover:bg-[#187bdb] ${bgColor}`} onClick={onClick}>
      {name}
    </button>
  );
};
