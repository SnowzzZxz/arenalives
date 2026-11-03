export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end();

  const { password } = req.body;
  
  // A senha fica segura nas configurações da Vercel
  const senhaCorreta = process.env.ADMIN_PASSWORD || 'admin123'; 

  if (password === senhaCorreta) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false, error: 'Senha incorreta' });
  }
}
