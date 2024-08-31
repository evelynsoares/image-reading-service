import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { GeminiService } from '../services/geminiService';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    // Validação básica dos parâmetros
    if (!image || !customer_code || !measure_datetime || !['WATER', 'GAS'].includes(measure_type)) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "Parâmetros inválidos."
      });
    }

    // Integração com a API do Google Gemini
    const measureValue = await GeminiService.getMeasureFromImage(image);
    const measureUUID = uuidv4();
    const imageUrl = `https://some-image-service/${measureUUID}`;

    // Salve no banco de dados (exemplo com pseudo código)
    // await saveMeasure({ customer_code, measure_datetime, measure_type, measureValue, measureUUID, imageUrl });

    return res.status(200).json({
      image_url: imageUrl,
      measure_value: measureValue,
      measure_uuid: measureUUID,
    });

  } catch (error) {
    return res.status(500).json({
      error_code: "SERVER_ERROR",
      error_description: "Erro ao processar a requisição."
    });
  }
};
