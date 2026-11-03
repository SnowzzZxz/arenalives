const axios = require('axios');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method !== 'GET') return res.status(405).json({ success: false });

    try {
        const CLIENT_ID = 'zpk_541f4b2f71855fb26e1201a7';
        const CLIENT_SECRET = 'zsk_87b13fb23ba5eed5d6d9f0f9e6153d20dfeac10e24a66dd6';
        const BASE_URL = 'https://zpayapi.app/api/v2';

        // Requisição para listar os pagamentos
        const response = await axios.get(`${BASE_URL}/payments`, {
            headers: {
                'client-id': CLIENT_ID,
                'client-secret': CLIENT_SECRET
            }
        });

        // A ZPay pode retornar os dados de formas diferentes, vamos garantir que pegamos a lista
        let pagamentos = [];
        if (Array.isArray(response.data)) {
            pagamentos = response.data;
        } else if (response.data && response.data.data) {
            pagamentos = response.data.data;
        } else if (response.data && response.data.payments) {
            pagamentos = response.data.payments;
        }

        // Se ainda estiver vazio, manda o objeto cru pra gente debugar
        if (pagamentos.length === 0 && Object.keys(response.data).length > 0 && !response.data.data) {
            console.log("Formato da ZPay desconhecido:", response.data);
        }

        return res.status(200).json({ success: true, data: pagamentos });

    } catch (error) {
        // Mostra o erro real no log da Vercel
        console.error('ERRO ZPAY DETALHADO:', error.response?.data || error.message);
        
        return res.status(500).json({ 
            success: false, 
            error: 'Falha ao buscar ZPay',
            detalhes: error.response?.data || error.message 
        });
    }
}
