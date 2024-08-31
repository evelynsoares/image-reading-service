import { Request, Response } from 'express';
import Measure from '../models/Measure';
import { isValidMeasureType } from '../utils/validation';

export const listMeasures = async (req: Request, res: Response) => {
  const { customer_code } = req.params;
  const { measure_type } = req.query;

  // Validação do customer_code
  if (!customer_code || typeof customer_code !== 'string') {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Código do cliente inválido',
    });
  }

  // Validação do measure_type se fornecido
  let filter: any = { customer_code };

  if (measure_type) {
    if (typeof measure_type !== 'string' || !isValidMeasureType(measure_type)) {
      return res.status(400).json({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida',
      });
    }
    filter.measure_type = measure_type.toUpperCase();
  }

  try {
    const measures = await Measure.find(filter).sort({ measure_datetime: -1 });

    if (measures.length === 0) {
      return res.status(404).json({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhuma leitura encontrada',
      });
    }

    const response = {
      customer_code,
      measures: measures.map(measure => ({
        measure_uuid: measure.measure_uuid,
        measure_datetime: measure.measure_datetime,
        measure_type: measure.measure_type,
        has_confirmed: measure.has_confirmed,
        image_url: measure.image_url,
      })),
    };

    return res.status(200).json(response);
  } catch (error: any) {
    console.error('Erro no listMeasures:', error.message);
    return res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: 'Erro ao processar a requisição',
    });
  }
};
