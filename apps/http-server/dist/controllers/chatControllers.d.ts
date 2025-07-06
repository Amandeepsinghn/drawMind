import { Request, Response } from "express";
export declare const chats: (req: Request<{
    roomId: string;
}>, res: Response) => Promise<void>;
interface ChatDeleteBody {
    roomId: string;
}
export declare const chatDelete: (req: Request<{}, {}, ChatDeleteBody, {
    roomId: string;
}>, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=chatControllers.d.ts.map