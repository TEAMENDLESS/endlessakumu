import { Router } from 'express';
import { healthController } from '../../controllers/index.js';

const router: Router = Router();

router.get('/', healthController.health);

export default router;
