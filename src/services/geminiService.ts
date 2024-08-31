import axios from 'axios';

const GEMINI_API_URL = 'https://ai.google.dev/gemini-api/vision'; // Atualize com a URL correta
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const extractMeasureFromImage = async (base64Image: string): Promise<number> => {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        image: base64Image,
      },
      {
        headers: {
          'Authorization': `Bearer AIzaSyDUIyU-DfMbeHJtxo_WAlCInWGlttQvAq4`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Supondo que a resposta contenha o valor numérico na propriedade 'measure_value'
    const measureValue = response.data.measure_value;

    if (typeof measureValue !== 'number') {
      throw new Error('Valor de medida inválido retornado pela API Gemini');
    }

    return measureValue;
  } catch (error: any) {
    console.error('Erro ao integrar com a API Gemini:', error.message);
    throw new Error('Falha ao processar a imagem com a API Gemini');
  }
};
