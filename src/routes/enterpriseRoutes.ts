import { Router, type IRouter } from "express";
import { validateApiKey } from "../middleware/auth";
import {
  requireMinTier,
  requireSegmentScope,
} from "../middleware/segmentGuard";
import { apiKeyRateLimiter } from "../middleware/rateLimiter";
import {
  postBulkTransfer,
  getTreasury,
} from "../controllers/enterpriseController";

const router: IRouter = Router();

router.use(validateApiKey);
router.use(requireMinTier("enterprise"));
router.use(requireSegmentScope("enterprise:read", "enterprise:write"));
router.use(apiKeyRateLimiter);

router.post("/bulk-transfer", postBulkTransfer);
router.get("/treasury", getTreasury);

export default router;
