(function () {
  var API = "https://kutubak-ai.vercel.app/api/chat";
  var WP = "905317217100";

  function diamondSvg() {
    return '<svg width="42" height="42" viewBox="0 0 64 64" fill="none" aria-hidden="true">' +
      '<path d="M18 10H46L58 25L32 56L6 25L18 10Z" fill="#D7B56D"/>' +
      '<path d="M18 10L32 56L46 10" stroke="#132849" stroke-width="3"/>' +
      '<path d="M6 25H58" stroke="#132849" stroke-width="3"/>' +
      '<path d="M18 10L6 25L32 56L58 25L46 10" stroke="#FFF2C2" stroke-width="2"/>' +
      '</svg>';
  }

  window.onload = function () {
    if (document.getElementById("kutubak-ai-widget")) return;

    var root = document.createElement("div");
    root.id = "kutubak-ai-widget";

    root.innerHTML =
      '<style>' +
      '#kutubak-ai-widget *{box-sizing:border-box}' +
      '#kb-ai-toggle{position:fixed;right:24px;bottom:24px;width:74px;height:74px;border-radius:50%;background:radial-gradient(circle at 30% 25%,#fff4ca,#d7b56d 40%,#132849 85%);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 18px 40px rgba(0,0,0,.35),0 0 0 3px rgba(215,181,109,.35);z-index:999999999;transition:.25s}' +
      '#kb-ai-toggle:hover{transform:translateY(-3px) scale(1.04)}' +
      '#kb-ai-toggle svg{filter:drop-shadow(0 5px 8px rgba(0,0,0,.38))}' +
      '#kb-ai-panel{position:fixed;right:24px;bottom:112px;width:400px;max-width:calc(100vw - 32px);background:#fff;border-radius:24px;box-shadow:0 25px 70px rgba(0,0,0,.30);z-index:999999999;font-family:Arial,sans-serif;overflow:hidden;display:none;border:1px solid rgba(215,181,109,.45)}' +
      '#kb-ai-head{background:#132849;color:#fff;padding:18px 20px 18px 78px;position:relative;min-height:78px}' +
      '#kb-ai-logo{position:absolute;left:18px;top:15px;width:48px;height:48px;border-radius:50%;background:radial-gradient(circle at 30% 25%,#fff4ca,#d7b56d 45%,#132849 88%);display:flex;align-items:center;justify-content:center}' +
      '#kb-ai-logo svg{width:30px;height:30px}' +
      '#kb-ai-head strong{font-size:20px;display:block;letter-spacing:.2px}' +
      '#kb-ai-head span{font-size:13px;opacity:.88;margin-top:5px;display:block}' +
      '#kb-ai-close{position:absolute;right:14px;top:13px;background:rgba(255,255,255,.12);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:18px}' +
      '#kb-ai-body{padding:17px;background:#faf7f5;max-height:390px;overflow:auto}' +
      '.kb-msg{padding:13px 15px;border-radius:16px;margin:9px 0;line-height:1.45;font-size:14px;white-space:pre-line;box-shadow:0 5px 16px rgba(0,0,0,.05)}' +
      '.kb-bot{background:#fff;color:#222;margin-right:34px;border:1px solid #f0e8df}' +
      '.kb-me{background:#132849;color:#fff;margin-left:34px}' +
      '.kb-btn{width:100%;background:#fff;border:1px solid #eadfce;border-radius:15px;padding:13px;margin:6px 0;text-align:left;cursor:pointer;font-size:14px;color:#1f2b3d;transition:.2s}' +
      '.kb-btn:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(19,40,73,.10)}' +
      '#kb-ai-actions{display:flex;gap:8px;padding:12px;background:#fff;border-top:1px solid #eee}' +
      '#kb-ai-actions button{flex:1;border:none;border-radius:13px;padding:11px;cursor:pointer;font-weight:bold;font-size:13px}' +
      '#kb-ai-wa{background:#25D366;color:#fff}' +
      '#kb-ai-clear{background:#f1f1f1;color:#222}' +
      '#kb-ai-foot{display:flex;gap:8px;padding:12px;background:#fff;border-top:1px solid #eee}' +
      '#kb-ai-input{flex:1;border:1px solid #ddd;border-radius:14px;padding:13px;outline:none;font-size:14px}' +
      '#kb-ai-send{background:#132849;color:#fff;border:none;border-radius:14px;padding:0 16px;cursor:pointer;font-weight:bold}' +
      '@media(max-width:600px){#kb-ai-panel{right:12px;bottom:96px;width:calc(100vw - 24px)}#kb-ai-toggle{right:16px;bottom:16px;width:68px;height:68px}}' +
      '</style>' +
      '<div id="kb-ai-panel">' +
        '<div id="kb-ai-head">' +
          '<div id="kb-ai-logo">' + diamondSvg() + '</div>' +
          '<button id="kb-ai-close">×</button>' +
          '<strong>Kutubak AI</strong>' +
          '<span>Premium kuyumcu ambalaj uzmanı</span>' +
        '</div>' +
        '<div id="kb-ai-body">' +
          '<div class="kb-msg kb-bot">Kutubak’a hoş geldiniz 👋\n\nBugün size nasıl yardımcı olabilirim?</div>' +
          '<button class="kb-btn" data-msg="Yüzük kutuları hakkında bilgi almak istiyorum">💎 Yüzük Kutuları</button>' +
          '<button class="kb-btn" data-msg="Promosyon çantaları hakkında bilgi almak istiyorum">🎁 Promosyon Çantaları</button>' +
          '<button class="kb-btn" data-msg="Toptan fiyat almak istiyorum">📦 Toptan Teklif Al</button>' +
        '</div>' +
        '<div id="kb-ai-actions">' +
          '<button id="kb-ai-wa">WhatsApp’a Aktar</button>' +
          '<button id="kb-ai-clear">Temizle</button>' +
        '</div>' +
        '<div id="kb-ai-foot">' +
          '<input id="kb-ai-input" placeholder="Sorunuzu yazın...">' +
          '<button id="kb-ai-send">Gönder</button>' +
        '</div>' +
      '</div>' +
      '<div id="kb-ai-toggle">' + diamondSvg() + '</div>';

    document.body.appendChild(root);

    var panel = document.getElementById("kb-ai-panel");
    var toggle = document.getElementById("kb-ai-toggle");
    var close = document.getElementById("kb-ai-close");
    var body = document.getElementById("kb-ai-body");
    var input = document.getElementById("kb-ai-input");
    var send = document.getElementById("kb-ai-send");
    var wa = document.getElementById("kb-ai-wa");
    var clear = document.getElementById("kb-ai-clear");

    function addMsg(text, type) {
      var div = document.createElement("div");
      div.className = "kb-msg " + (type === "me" ? "kb-me" : "kb-bot");
      div.innerText = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
      return div;
    }

    function reply(msg) {
      var loading = addMsg("Kutubak AI yazıyor...", "bot");

      fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message:
            "Sayfa URL: " + window.location.href +
            "\nSayfa başlığı: " + document.title +
            "\nMüşteri mesajı: " + msg
        })
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        loading.innerText = data.reply || data.error || "Şu anda cevap alınamadı.";
      })
      .catch(function () {
        loading.innerText = "Bağlantı hatası oluştu. Lütfen tekrar deneyin.";
      });
    }

    function sendMsg() {
      var msg = input.value.replace(/^\s+|\s+$/g, "");
      if (!msg) return;
      addMsg(msg, "me");
      input.value = "";
      reply(msg);
    }

    toggle.onclick = function () {
      panel.style.display = panel.style.display === "none" ? "block" : "none";
      setTimeout(function () { input.focus(); }, 150);
    };

    close.onclick = function () { panel.style.display = "none"; };
    send.onclick = sendMsg;

    input.onkeydown = function (e) {
      e = e || window.event;
      if (e.key === "Enter" || e.keyCode === 13) sendMsg();
    };

    var btns = document.querySelectorAll(".kb-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].onclick = function () {
        var msg = this.getAttribute("data-msg");
        addMsg(msg, "me");
        reply(msg);
      };
    }

    wa.onclick = function () {
      window.open(
        "https://wa.me/" + WP + "?text=" +
        encodeURIComponent("Merhaba Kutubak, web sitesinden yazıyorum. Teklif almak istiyorum."),
        "_blank"
      );
    };

    clear.onclick = function () {
      body.innerHTML =
        '<div class="kb-msg kb-bot">Kutubak’a hoş geldiniz 👋\n\nBugün size nasıl yardımcı olabilirim?</div>' +
        '<button class="kb-btn" data-msg="Yüzük kutuları hakkında bilgi almak istiyorum">💎 Yüzük Kutuları</button>' +
        '<button class="kb-btn" data-msg="Promosyon çantaları hakkında bilgi almak istiyorum">🎁 Promosyon Çantaları</button>' +
        '<button class="kb-btn" data-msg="Toptan fiyat almak istiyorum">📦 Toptan Teklif Al</button>';
    };
  };
})();
