import { getGame, getGames } from "@/controllers/games";
import { Router as ExpressRouter } from "express";

const Router = ExpressRouter();

Router.get("/", getGames);
Router.get("/:id", getGame);

export default Router;