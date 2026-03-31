document.addEventListener('DOMContentLoaded', function () {

  // === LANGUAGE TOGGLE ===
  var langBtns = document.querySelectorAll('[data-lang-btn]');

  function setLang(lang) {
    document.querySelectorAll('[data-lang-block]').forEach(function (el) {
      el.style.display = (el.dataset.langBlock === lang) ? '' : 'none';
    });
    langBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.langBtn === lang);
    });
    localStorage.setItem('lang', lang);
  }

  var savedLang = localStorage.getItem('lang') || 'zh';
  setLang(savedLang);

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.langBtn); });
  });

  // === BUDGET TOGGLE ===
  document.querySelectorAll('[data-budget-btn]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var show = this.dataset.budgetBtn === 'show';
      document.querySelectorAll('[data-budget]').forEach(function (el) {
        el.style.display = show ? '' : 'none';
      });
      document.querySelectorAll('[data-budget-btn]').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
    });
  });

  // === COPY EMAIL ===
  document.querySelectorAll('.copy-link').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var text = this.dataset.copy;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () { showToast('Email copied!'); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Email copied!');
      }
    });
  });

  // === DARK MODE ===
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    function applyTheme(theme) {
      document.documentElement.setAttribute('data-bs-theme', theme);
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
      localStorage.setItem('theme', theme);
    }
    var savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-bs-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

});

function showToast(msg) {
  var t = document.getElementById('_toast');
  if (!t) {
    t = document.createElement('div');
    t.id = '_toast';
    t.style.cssText = 'position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);background:#1f2937;color:#fff;padding:.5rem 1.25rem;border-radius:.5rem;z-index:9999;font-size:.875rem;pointer-events:none;transition:opacity .3s;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._to);
  t._to = setTimeout(function () { t.style.opacity = '0'; }, 1800);
}
