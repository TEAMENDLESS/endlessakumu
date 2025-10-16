import { Router } from "express";
import { accountController } from "../../controllers/index.js";

const router: Router = Router();

router.post("/", accountController.create);
router.get("/", accountController.list);
router.get("/:id", accountController.getById);
router.patch("/:id", accountController.update);
router.delete("/:id", accountController.remove);

export default router;
