import { Request, Response } from "express";
type CreateRoomBody = {
    name: string;
};
type AuthenticatedRequest<TBody = any, TParams = {}, TQuery = {}> = Request<TParams, {}, TBody, TQuery> & {
    userId: string;
};
type RoomSlugParams = {
    slug: string;
};
type BulkQuery = {
    filter?: string;
};
export declare const room: (req: AuthenticatedRequest<CreateRoomBody>, res: Response) => Promise<void>;
export declare const roomSlug: (req: Request<RoomSlugParams>, res: Response) => Promise<void>;
export declare const getData: (req: Request, res: Response) => Promise<void>;
export declare const bulk: (req: Request<{}, {}, {}, BulkQuery>, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=roomController.d.ts.map