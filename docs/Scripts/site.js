(function () {
    // language switch
    const setLang = (lang) => {
        document.documentElement.setAttribute("data-lang", lang);
        document.querySelectorAll("[data-lang-block]").forEach(el => {
            el.style.display = (el.getAttribute("data-lang-block") === lang) ? "" : "none";
        });
        document.querySelectorAll("[data-lang-btn]").forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
        });
        localStorage.setItem("site_lang", lang);
    };

    // show/hide budgets (optional)
    const setBudget = (show) => {
        document.querySelectorAll("[data-budget]").forEach(el => {
            el.style.display = show ? "" : "none";
        });
        document.querySelectorAll("[data-budget-btn]").forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-budget-btn") === (show ? "show" : "hide"));
        });
        localStorage.setItem("site_budget", show ? "show" : "hide");
    };

    window.addEventListener("DOMContentLoaded", () => {
        // init language
        const savedLang = localStorage.getItem("site_lang") || "zh";
        setLang(savedLang);

        // init budget toggle
        const savedBudget = localStorage.getItem("site_budget") || "hide";
        setBudget(savedBudget === "show");

        // bind buttons
        document.querySelectorAll("[data-lang-btn]").forEach(btn => {
            btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang-btn")));
        });
        document.querySelectorAll("[data-budget-btn]").forEach(btn => {
            btn.addEventListener("click", () => setBudget(btn.getAttribute("data-budget-btn") === "show"));
        });
    });
})();

(function () {

    async function copyText(text) {
        // 現代瀏覽器（HTTPS / localhost）
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }
        // fallback（舊瀏覽器）
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
    }

    document.addEventListener("click", async (e) => {
        const btn = e.target.closest("[data-copy]");
        if (!btn) return;

        const text = btn.dataset.copy;
        const lang = localStorage.getItem("site_lang") || "zh";

        const msgSuccess = {
            zh: "已經複製到剪貼簿",
            en: "Copied to clipboard"
        };

        const msgFail = {
            zh: "複製失敗，請手動複製",
            en: "Copy failed. Please copy manually."
        };

        try {
            await copyText(text);
            alert(msgSuccess[lang]);
        } catch (err) {
            alert(msgFail[lang]);
        }
    });


})();