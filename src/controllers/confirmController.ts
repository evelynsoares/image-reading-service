import { Request, Response } from 'express';
import Measure from '../models/Measure';

export const confirmMeasure = async (req: Request, res: Response) => {
  const { measure_uuid, confirmed_value } = req.body;

  // Validação dos dados
  if (!measure_uuid || confirmed_value === undefined) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Todos os campos são obrigatórios',
    });
  }

  if (typeof measure_uuid !== 'string') {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'UUID da medição inválido',
    });
  }

  if (typeof confirmed_value !== 'number') {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Valor confirmado inválido',
    });
  }

  try {
    const measure = await Measure.findOne({ measure_uuid });

    if (!measure) {
      return res.status(404).json({
        error_code: 'MEASURE_NOT_FOUND',
        error_description: 'Leitura não encontrada',
      });
    }

    if (measure.has_confirmed) {
      return res.status(409).json({
        error_code: 'CONFIRMATION_DUPLICATE',
        error_description: 'Leitura já confirmada',
      });
    }

    // Atualizar o valor confirmado e marcar como confirmado
    measure.measure_value = confirmed_value;
    measure.has_confirmed = true;

    await measure.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error: any) {
    console.error('Erro no confirmMeasure:', error.message);
    return res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: 'Erro ao processar a requisição',
    });
  }
};
