import MainRoom from "../../../components/RoomCanvas";

export default async function CanvasPage({
  params,
}: {
  params: Promise<{
    roomId: string;
  }>;
}) {
  // Await the params to get the actual roomId
  const { roomId } = await params;

  return <MainRoom roomId={roomId} />;
}
