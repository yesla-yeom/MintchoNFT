import { Router } from "express";
const router = Router();

import mint from "./mint";

router.use("/mint", mint);

export default router;