import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import Games from "@/routes/games";

const app = express();

app.use("/games", Games);

// Error handler:
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    if (err && (err instanceof Error)) {
        res.status(422).json({
            error_message: err?.message?.toString() || "errors.invalid.content"
        })
        return;
    }

    next();
});

app.listen(3000, () => console.log(`server *:3000 is running!`));