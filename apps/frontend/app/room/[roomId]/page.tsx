import MainRoom from "../../../components/RoomCanvas";

export default async function CanvasPage({
  params,
}: {
  params: {
    roomId: string;
  };
}) {
  const roomId = (await params).roomId;
  console.log(roomId);
  return <MainRoom roomId={roomId} />;
}
