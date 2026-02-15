import { addContact } from "@/services/subscribe";
import { Request, Response } from "express";

/**
 * Subscribe email
 * @param req - Request
 * @param res - Response
*/
const subscribe = async(req: Request, res: Response): Promise<void> => {
    try {
        const { username, email } = req.body;
        await addContact(username, email);
    } finally {
        res.status(200).end();
    }
}

export default subscribe;