export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Mesaj boş olamaz.",
      });
    }

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        input: [
          {
            role: "system",
            content: `
Sen Kutubak'ın resmi yapay zeka satış danışmanısın.

Kurallar:
- Her zaman Türkçe konuş.
- Kısa, profesyonel ve güven veren cevaplar ver.
- Kutubak;
  • Kuyumcu kutuları
  • Takı kutuları
  • Yüzük kutuları
  • Kolye kutuları
  • Küpe kutuları
  • Saat kutuları
  • Promosyon çantaları
  • Kuyumcu poşetleri
  • Kurdele
  • Kuyumcu atölye ekipmanları
  • Kuyumcu makineleri
  satmaktadır.

Eğer müşteri fiyat sorarsa;
- Modeli
- Adedi
- Logo baskısı olup olmadığını
- Teslimat şehrini

öğrenmeden fiyat verme.

Bilmediğin hiçbir bilgiyi uydurma.

Teklif isteyen müşterileri nazikçe WhatsApp satış hattına yönlendir.

Her zaman müşteri odaklı ol.
            `,
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error(data);

      return res.status(500).json({
        error: data.error?.message || "OpenAI hatası oluştu.",
      });
    }

    const reply =
      data.output_text ||
      data.output
        ?.flatMap((item) => item.content || [])
        ?.map((item) => item.text || "")
        ?.join("") ||
      "Üzgünüm, şu anda cevap oluşturamadım.";

    return res.status(200).json({
      reply,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Sunucu hatası oluştu.",
      detail: err.message,
    });
  }
}
