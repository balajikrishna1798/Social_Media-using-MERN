import express from "express";
import { createEvent, getEvent } from "../controller/calender";
const router = express.Router();

router.post("/createEvent",createEvent)
router.get("/getEvent",getEvent)
export default router;
