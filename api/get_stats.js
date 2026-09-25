const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const apiKey = "dbd439e3412d794e56770f21a028045aca78794a76c85925e528267a4e8ca8de";

  const today = new Date().toISOString().split('T')[0];
  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() - 30);
  const dateFrom = dateObj.toISOString().split('T')[0];

  // Daftar Endpoint API Alternatif iMonetizeIt
  const endpoints = [
    `https://api.imonetizeit.com/v1/statistics/smartlink`,
    `https://partner.imonetizeit.com/api/v1/statistics/smartlink`
  ];

  for (const url of endpoints) {
    try {
      const response = await axios.get(url, {
        params: {
          api_key: apiKey,
          date_from: dateFrom,
          date_to: today
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        timeout: 10000
      });

      if (response.data) {
        return res.status(200).json(response.data);
      }
    } catch (err) {
      // Lanjut ke endpoint berikutnya jika gagal
      continue;
    }
  }

  return res.status(500).json({ 
    error: "Gagal menembus Akamai CDN Firewall iMonetizeIt.", 
    details: "Serverless IP Vercel diblokir oleh CDN Akamai." 
  });
};
