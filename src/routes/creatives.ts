import { getCreative, getCreatives } from "@/controllers/creatives";
import { Router as ExpressRouter } from "express";

const Router = ExpressRouter();

Router.get("/", getCreatives);
Router.get("/:id", getCreative);

export default Router;