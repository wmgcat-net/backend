import express, {
    ErrorRequestHandler,
    NextFunction,
    Request,
    Response
} from "express";
import cors from "cors";

import Games from "@/routes/games";
import Creatives from "@/routes/creatives";
import Err from "@/utils/errors";

const app = express();

app.use(cors({
    origin: "*"
}));

app.get("/openapi.yml", (req: Request, res: Response) => {
    res.status(200).sendFile("openapi.yml", { root: process.cwd() });
});

app.use("/games", Games);
app.use("/creatives", Creatives);

// Error handler:
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    if (err && (err instanceof Error)) {
        res.status(422).json({
            error_message: err?.message?.toString() || Err.content_invalid
        })
        return;
    }

    next();
});

app.listen(3000, () => console.log(`server *:3000 is running!`));
