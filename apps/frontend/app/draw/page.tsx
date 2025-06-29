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
      type: "line";
      x: number;
      y: number;
      lastX: number;
      lastY: number;
    };

export async function Draw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
  tool: "rect" | "circle" | "pencil" | "arrow" | "text" | "eraser" | null
) {
  const ctx = canvas.getContext("2d");

  const existingShape: Shape[] = await getExistingShape(roomId);

  if (!ctx) {
    return;
  }

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.message);
      existingShape.push(parsedShape.shape);
      clearCanvas(existingShape, canvas, ctx);
    }
  };

  clearCanvas(existingShape, canvas, ctx);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.offsetX;
    startY = e.offsetY;
  });
  canvas.addEventListener("mouseup", (e) => {
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
  });
  canvas.addEventListener("mousemove", (e) => {
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
      }
    }
  });
}

function clearCanvas(existingShape: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShape.map((shape) => {
    ctx.strokeStyle = "rgba(255,255,255)";
    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "line") {
      ctx.moveTo(shape.x, shape.y);
      ctx.lineTo(shape.lastX, shape.lastY);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
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
