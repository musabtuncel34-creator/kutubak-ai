(function () {
  const API_URL = "https://kutubak-ai.vercel.app/api/chat";
  const WHATSAPP = "905317217100";

  if (document.getElementById("kutubak-ai-widget")) return;

  const root = document.createElement("div");
  root.id = "kutubak-ai-widget";

  root.innerHTML = `
<style>
#kb-ai-widget *{box-sizing:border-box}
#kb-ai-toggle{position:fixed;right:24px;bottom:24px;width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#132849,#d7b56d);display:flex;align-items:center;justify-content:center;font-size:34px;cursor:pointer;box-shadow:0 15px 35px rgba(0,0,0,.30);z-index:999999999}
#kb-ai-panel{position:fixed;right:24px;bottom:112px;width:390px;max-width:calc(100vw - 32px);background:#fff;border-radius:24px;box-shadow:0 25px 70px rgba(0,0,0,.30);z-index:999999999;font-family:Arial,sans-serif;overflow:hidden;display:none}
#kb-ai-head{background:#132849;color:#fff;padding:18px 20px;position:relative}
#kb-ai-head strong{font-size:19px;display:block}
#kb-ai-head span{font-size:13px;opacity:.88;margin-top:5px;display:block}
#kb-ai-close{position:absolute;right:14px;top:13px;background:rgba(255,255,255,.12);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:18px}
#kb-ai-body{padding:17px;background:#faf7f5;max-height:385px;overflow:auto}
.kb-msg{padding:13px 15px;border-radius:16px;margin:9px 0;line-height:1.45;font-size:14px;white-space:pre-line}
.kb-bot{background:#fff;color:#222;margin-right:34px}
.kb-me{background:#132849;color:#fff;margin-left:34px}
.kb-btn{width:100%;background:#fff;border:1px solid #eadfce;border-radius:15px;padding:13px;margin:6px 0;text-align:left;cursor:pointer;font-size:14px;transition:.2s}
.kb-btn:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(19,40,73,.10)}
#kb-ai-foot{display:flex;gap:8px;padding:12px;background:#fff;border-top:1px solid #eee}
#kb-ai-input{flex:1;border:1px solid #ddd;border-radius:14px;padding:13px;outline:none;font-size:14px}
#kb-ai-send{background:#132849;color:#fff;border:none;border-radius:14px;padding:0 16px;cursor:pointer;font-weight:bold}
@media(max-width:600px){#kb-ai-panel{right:12px;bottom:96px;width:calc(100vw - 24px)}#kb-ai-toggle{right:16px;bottom:16px}}
</style>

<div id="kb-ai-panel">
  <div id="kb-ai-head">
    <button id="kb-ai-close">×</button>
    <strong>Kutubak AI</strong>
    <span>Premium kuyumcu ambalaj uzmanı</span>
  </div>

  <div id="kb-ai-body">
    <div class="kb-msg kb-bot">Kutubak'a hoş geldiniz 👋

Yüzük kutusu, kolye kutusu, promosyon çantası ve kuyumcu ekipmanları hakkında yardımcı olabilirim.</div>

    <button class="kb-btn" data-msg="Yüzük kutusu hakkında bilgi almak istiyorum">💎 Yüzük Kutuları</button>
    <button class="kb-btn" data-msg="Promosyon çantası hakkında bilgi almak istiyorum">🎁 Promosyon Çantaları</button>
    <button class="kb-btn" data-msg="Toptan teklif almak istiyorum">📦 Toptan Teklif Al</button>
    <button class="kb-btn" id="kb-whatsapp">💬 WhatsApp'a Bağlan</button>
  </div>

  <div id="kb-ai-foot">
    <input id="kb-ai-input" placeholder="Sorunuzu yazın...">
    <button id="kb-ai-send">Gönder</button>
  </div>
</div>

<div id="kb-ai-toggle">💎</div>
`;

  document.body.appendChild(root);

  const panel = document.getElementById("kb-ai-panel");
  const toggle = document.getElementById("kb-ai-toggle");
  const close = document.getElementById("kb-ai-close");
  const body = document.getElementById("kb-ai-body");
  const input = document.getElementById("kb-ai-input");
  const send = document.getElementById("kb-ai-send");

  function addMsg(text, type) {
    const div = document.createElement("div");
    div.className = "kb-msg " + (type === "me" ? "kb-me" : "kb-bot");
    div.innerText = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  }

  async function reply(msg) {
    const loading = addMsg("Yazıyor...", "bot");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ message: msg })
      });

      const data = await res.json();
      loading.innerText = data.reply || data.error || "Şu anda cevap alınamadı.";
    } catch (e) {
      loading.innerText = "Bağlantı hatası oluştu. Lütfen tekrar deneyin.";
    }
  }

  function sendMsg() {
    const msg = input.value.trim();
    if (!msg) return;
    addMsg(msg, "me");
    input.value = "";
    reply(msg);
  }

  toggle.onclick = () => panel.style.display = panel.style.display === "none" ? "block" : "none";
  close.onclick = () => panel.style.display = "none";
  send.onclick = sendMsg;
  input.addEventListener("keydown", e => { if (e.key === "Enter") sendMsg(); });

  document.querySelectorAll(".kb-btn").forEach(btn => {
    btn.onclick = function () {
      if (btn.id === "kb-whatsapp") {
        window.open(`https://wa.me/${WHATSAPP}?text=Merhaba%20Kutubak%2C%20web%20sitesinden%20yaz%C4%B1yorum.%20Teklif%20almak%20istiyorum.`, "_blank");
        return;
      }
      const msg = btn.getAttribute("data-msg");
      addMsg(msg, "me");
      reply(msg);
    };
  });
})();
