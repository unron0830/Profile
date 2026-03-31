document.addEventListener("DOMContentLoaded", function() {
  const langBtns = document.querySelectorAll("[data-lang-btn]");
  function setLang(lang) {
    document.querySelectorAll("[data-lang-block]").forEach(el => {
      el.style.display = el.dataset.langBlock === lang ? "" : "none";
    });
    langBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.langBtn === lang));
    localStorage.setItem("lang", lang);
  }
  if (langBtns.length) {
    setLang(localStorage.getItem("lang") || "zh");
    langBtns.forEach(btn => btn.addEventListener("click", () => setLang(btn.dataset.langBtn)));
  }

  const budgetBtns = document.querySelectorAll("[data-budget-btn]");
  if (budgetBtns.length) {
    budgetBtns.forEach(btn => btn.addEventListener("click", function() {
      const show = this.dataset.budgetBtn === "show";
      document.querySelectorAll("[data-budget]").forEach(el => el.style.display = show ? "" : "none");
      budgetBtns.forEach(b => b.classList.toggle("active", b === this));
    }));
  }

  document.querySelectorAll(".copy-link").forEach(el => {
    el.addEventListener("click", async (e) => {
      e.preventDefault();
      const text = el.dataset.copy || "";
      try { await navigator.clipboard.writeText(text); toast("Email copied"); }
      catch { toast("Copy failed"); }
    });
  });

  function toast(msg) {
    let t = document.getElementById("_toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "_toast";
      t.style.cssText = "position:fixed;bottom:1rem;left:50%;transform:translateX(-50%);background:#111827;color:#fff;padding:.45rem .8rem;border-radius:.45rem;z-index:9999;opacity:0;transition:opacity .2s;";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(t._h);
    t._h = setTimeout(() => t.style.opacity = "0", 1200);
  }
});
