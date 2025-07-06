import { Request, Response } from "express";
type CreateUserBody = {
    username: string;
    password: string;
};
type SignInBody = {
    username: string;
    password: string;
};
export declare const signUp: (req: Request<{}, {}, CreateUserBody>, res: Response) => Promise<void>;
export declare const signIn: (req: Request<{}, {}, SignInBody>, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=longinController.d.ts.map