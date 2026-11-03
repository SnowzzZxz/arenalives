const axios = require('axios');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method !== 'GET') return res.status(405).json({ success: false });

    try {
        const CLIENT_ID = 'zpk_541f4b2f71855fb26e1201a7';
        const CLIENT_SECRET = 'zsk_87b13fb23ba5eed5d6d9f0f9e6153d20dfeac10e24a66dd6';
        const BASE_URL = 'https://zpayapi.app/api/v2';

        // Puxa os últimos 50 pagamentos da ZPay
        const response = await axios.get(`${BASE_URL}/payments?limit=50`, {
            headers: {
                'client-id': CLIENT_ID,
                'client-secret': CLIENT_SECRET
            }
        });

        const pagamentos = Array.isArray(response.data) ? response.data : (response.data.data || []);

        return res.status(200).json({ success: true, data: pagamentos });

    } catch (error) {
        console.error('[ZPay] Erro listar:', error.response?.data || error.message);
        return res.status(500).json({ success: false, error: 'Erro ao buscar pagamentos' });
    }
}
