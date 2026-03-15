import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatRouter from "./chat";
import providersRouter from "./providers";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(providersRouter);

export default router;
