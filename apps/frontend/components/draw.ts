import axios from "axios";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "arrow";
      x: number;
      y: number;
      lastX: number;
      lastY: number;
    }
  | {
      type: "text";
      word: string;
      x: number;
      y: number;
    }
  | {
      type: "eraser";
      x: number;
      y: number;
    }
  | {
      type: "pencil";
      x: number;
      y: number;
    };

export async function Draw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
  tool: "rect" | "circle" | "pencil" | "arrow" | "text" | "eraser" | null,
  setTextInput: React.Dispatch<React.SetStateAction<{ x: number; y: number; value: string; visible: boolean }>>
) {
  const ctx = canvas.getContext("2d");

  let existingShape: Shape[] = await getExistingShape(roomId);

  if (!ctx) {
    return;
  }

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.message);
      if (parsedShape.shape?.type === "eraser") {
        existingShape = [];
      } else {
        existingShape.push(parsedShape.shape);
        clearCanvas(existingShape, canvas, ctx);
      }
    }
  };

  clearCanvas(existingShape, canvas, ctx);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  const onMouseDown = (e: MouseEvent) => {
    clicked = true;
    startX = e.offsetX;
    startY = e.offsetY;

    if (tool === "text") {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setTextInput({
        x,
        y,
        value: "",
        visible: true,
      });
    }
  };
  const onMouseUp = (e: MouseEvent) => {
    clicked = false;

    const currentX = e.offsetX;
    const currentY = e.offsetY;

    const width = currentX - startX;
    const height = currentY - startY;

    // circle
    const rad = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));

    let shape: Shape | null = null;

    if (tool === "rect") {
      shape = {
        type: "rect",
        x: startX,
        y: startY,
        width,
        height,
      };
    } else if (tool == "circle") {
      shape = {
        type: "circle",
        centerX: startX,
        centerY: startY,
        radius: rad,
      };
    } else if (tool == "arrow") {
      shape = {
        type: "arrow",
        x: startX,
        y: startY,
        lastX: currentX,
        lastY: currentY,
      };
    }
    if (shape) {
      existingShape.push(shape);
    }

    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId,
      })
    );
  };
  const onMouseMove = (e: MouseEvent) => {
    if (clicked) {
      // rectangle
      const currentX = e.offsetX;
      const currentY = e.offsetY;
      // circle
      const width = currentX - startX;
      const height = currentY - startY;
      const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));

      clearCanvas(existingShape, canvas, ctx);
      ctx.strokeStyle = "rgba(255,255,255)";
      if (tool === "rect") {
        ctx.strokeRect(startX, startY, width, height);
      } else if (tool === "circle") {
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (tool === "arrow") {
        const headlen = 10;
        const angle = Math.atan2(currentY - startY, currentX - startX);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(currentX - headlen * Math.cos(angle - Math.PI / 6), currentY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(currentX - headlen * Math.cos(angle + Math.PI / 6), currentY - headlen * Math.sin(angle + Math.PI / 6));
        ctx.lineTo(currentX, currentY);
        ctx.lineTo(currentX - headlen * Math.cos(angle - Math.PI / 6), currentY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.stroke();
        ctx.fill();
      }
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (tool === "text") {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setTextInput({ x, y, value: "", visible: true });
    }
    if (tool === "eraser") {
      socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({
            shape: { type: "eraser", x: 0, y: 0 },
          }),
          roomId,
        })
      );

      existingShape = [];
      clearCanvas(existingShape, canvas, ctx);

      try {
        axios.post(
          "http://localhost:3004/api/deleteChat/",
          { roomId },
          {
            headers: {
              Authorization: localStorage.getItem("token") || "",
            },
          }
        );
      } catch (error) {
        alert("Error clearing chat: " + error);
      }
    }
  };

  canvas.addEventListener("click", handleClick);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mousemove", onMouseMove);

  //  clean up function
  return () => {
    canvas.removeEventListener("mousedown", onMouseDown);
    canvas.removeEventListener("mouseup", onMouseUp);
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("click", handleClick);
  };
}

function clearCanvas(existingShape: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const shape of existingShape) {
    if (!shape || shape.type === null) continue;

    ctx.strokeStyle = "rgba(255,255,255)";

    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "arrow") {
      const headlen = 10;
      ctx.beginPath();
      ctx.moveTo(shape.x, shape.y);
      const dx = shape.lastX - shape.x;
      const dy = shape.lastY - shape.y;
      const angle = Math.atan2(dy, dx);
      ctx.lineTo(shape.lastX, shape.lastY);
      ctx.lineTo(shape.lastX - headlen * Math.cos(angle - Math.PI / 6), shape.lastY - headlen * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(shape.lastX, shape.lastY);
      ctx.lineTo(shape.lastX - headlen * Math.cos(angle + Math.PI / 6), shape.lastY - headlen * Math.sin(angle + Math.PI / 6));
      ctx.stroke();
      ctx.fill();
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape.type === "text") {
      ctx.font = "16px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(shape.word, shape.x, shape.y);
    }
  }
}

async function getExistingShape(roomId: string) {
  try {
    const res = await axios.get(`http://localhost:3004/api/chat/${roomId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const messages = res.data.messages;

    const shapes = messages.map((x: { message: string }) => {
      const messageData = JSON.parse(x.message);
      return messageData.shape;
    });
    return shapes;
  } catch (error) {
    alert(error);
  }
}
