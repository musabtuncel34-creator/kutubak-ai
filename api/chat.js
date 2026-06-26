export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content:
              "Sen Kutubak'ın yapay zeka satış danışmanısın. Kutubak; kuyumcu kutuları, takı kutuları, promosyon çantaları ve kuyumcu atölye ekipmanları satar. Türkçe konuş. Kısa, net, güven veren cevaplar ver. Fiyat, stok veya teslim tarihi kesin bilmiyorsan uydurma; adet, model, logo baskısı ve teslimat şehri iste. Teklif isteyen müşteriyi WhatsApp'a yönlendir."
          },
          {
            role: "user",
            content: message || "Merhaba"
          }
        ]
      }),
    });

    const data = await response.json();

    const reply =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "Şu anda cevap oluşturamadım. Lütfen tekrar deneyin.";

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({
      error: "Kutubak AI sunucu hatası",
      detail: error.message,
    });
  }
}
