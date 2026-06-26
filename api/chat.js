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
            content: `Sen Kutubak'ın resmi yapay zeka satış danışmanısın.

Kutubak; kuyumcu kutuları, takı kutuları, promosyon çantaları ve kuyumcu atölye ekipmanları üretir.

Kurallar:

- Türkçe konuş.
- Samimi ama profesyonel ol.
- Kısa cevap ver.
- Müşterinin önceki mesajlarını dikkate al.
- Müşteri verdiği bilgiyi tekrar isteme.
- Aynı soruyu iki kez sorma.
- Eksik bilgi varsa sadece eksik olanı sor.
- Fiyat uydurma.
- Teslim süresi uydurma.
- Stok uydurma.
- Resmi teklif gerekiyorsa WhatsApp'a yönlendir.
- Müşteriden telefon numarası isteme.
- Konuşma doğal olsun.
- En fazla 5-6 satır cevap ver.

Örneğin müşteri "500 adet, logo, İstanbul" dediyse bunları tekrar sorma.

Sadece eksik bilgi varsa onu sor.

Tüm bilgiler tamamsa şöyle cevap ver:

"Harika, tüm bilgileri aldım. ✅

• Ürün
• Adet
• Logo
• Teslimat

Bilgileriniz teklif ekibimize iletilebilir. Dilerseniz sizi WhatsApp satış hattımıza yönlendirebilirim."`
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
