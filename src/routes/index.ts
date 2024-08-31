import { Router } from 'express';
import { uploadMeasure } from '../controllers/uploadController';
import { confirmMeasure } from '../controllers/confirmController';
import { listMeasures } from '../controllers/listController';

const router = Router();

// Endpoint POST /upload
router.post('/upload', uploadMeasure);

// Endpoint PATCH /confirm
router.patch('/confirm', confirmMeasure);

// Endpoint GET /:customer_code/list
router.get('/:customer_code/list', listMeasures);

export default router;
