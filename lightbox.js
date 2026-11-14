/* 画像をクリック（タップ）すると、大きく表示する。Esc・クリックで閉じる */
(function () {
  var sel = 'main figure img, main .photos img';
  var overlay, big, cap;
  function build() {
    overlay = document.createElement('div');
    overlay.className = 'lb';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', '画像を大きく表示');
    overlay.hidden = true;
    big = document.createElement('img');
    cap = document.createElement('p');
    cap.className = 'lb-cap';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lb-close';
    btn.textContent = '閉じる ×';
    overlay.appendChild(btn);
    overlay.appendChild(big);
    overlay.appendChild(cap);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
  function open(img) {
    if (!overlay) build();
    big.src = img.currentSrc || img.src;
    big.alt = img.alt || '';
    big.className = (img.naturalWidth / (img.naturalHeight || 1) > 2.2) ? 'wide' : '';
    var fc = img.closest('figure') && img.closest('figure').querySelector('figcaption');
    cap.textContent = fc ? fc.textContent : (img.alt || '');
    overlay.hidden = false;
    overlay.scrollTop = 0; overlay.scrollLeft = 0;
    document.body.classList.add('lb-open');
  }
  function close() {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    big.removeAttribute('src');
    document.body.classList.remove('lb-open');
  }
  function init() {
    Array.prototype.forEach.call(document.querySelectorAll(sel), function (img) {
      img.classList.add('zoomable');
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('title', 'クリックで大きく表示');
      img.addEventListener('click', function (e) { e.preventDefault(); open(img); });
      img.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); } });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
