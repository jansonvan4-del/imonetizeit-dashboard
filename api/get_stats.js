const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const apiKey = "dbd439e3412d794e56770f21a028045aca78794a76c85925e528267a4e8ca8de";

  const today = new Date().toISOString().split('T')[0];
const dateObj = new Date();
dateObj.setDate(dateObj.getDate() - 30); // Ambil 30 hari ke belakang
const dateFrom = dateObj.toISOString().split('T')[0];
  
  try {
    const response = await axios.get(`https://partner.imonetizeit.com/api/v1/statistics/smartlink`, {
      params: {
        api_key: apiKey,
       date_from: dateFrom,
        date_to: today
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ 
      error: "Gagal mengambil data API iMonetizeIt", 
      details: error.message 
    });
  }
};
