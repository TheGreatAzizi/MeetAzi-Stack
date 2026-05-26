(function () {
  'use strict';

  const blockedWords = [
    'file',
    'files',
    'share file',
    'send file',
    'attach',
    'attachment',
    'upload',
    'download',
    'فایل',
    'ارسال فایل',
    'اشتراک فایل',
    'پیوست'
  ];

  function textOf(el) {
    if (!el) return '';
    return [
      el.id,
      el.className,
      el.name,
      el.title,
      el.alt,
      el.ariaLabel,
      el.getAttribute && el.getAttribute('aria-label'),
      el.getAttribute && el.getAttribute('data-title'),
      el.getAttribute && el.getAttribute('data-i18n'),
      el.textContent
    ].filter(Boolean).join(' ').toLowerCase();
  }

  function isFileRelated(el) {
    const text = textOf(el);
    return blockedWords.some(function (word) {
      return text.includes(word.toLowerCase());
    });
  }

  function hideFileControls() {
    const selectors = [
      'input[type="file"]',
      '[id*="file" i]',
      '[class*="file" i]',
      '[title*="file" i]',
      '[aria-label*="file" i]',
      '[data-title*="file" i]',
      '[data-i18n*="file" i]',
      '[id*="upload" i]',
      '[class*="upload" i]',
      '[title*="upload" i]',
      '[aria-label*="upload" i]',
      '[id*="download" i]',
      '[class*="download" i]',
      '[title*="download" i]',
      '[aria-label*="download" i]'
    ];

    selectors.forEach(function (selector) {
      try {
        document.querySelectorAll(selector).forEach(function (el) {
          el.disabled = true;
          el.setAttribute('disabled', 'disabled');
          el.setAttribute('aria-disabled', 'true');
          el.style.display = 'none';
          el.style.pointerEvents = 'none';
          el.style.visibility = 'hidden';
        });
      } catch (e) {}
    });

    document.querySelectorAll('button, a, div, li, span').forEach(function (el) {
      if (isFileRelated(el)) {
        const clickable = el.closest('button, a, li, div') || el;
        clickable.setAttribute('aria-disabled', 'true');
        clickable.style.display = 'none';
        clickable.style.pointerEvents = 'none';
        clickable.style.visibility = 'hidden';
      }
    });
  }

  function blockEvent(e) {
    const target = e.target;
    const hasFiles =
      (target && target.type === 'file') ||
      (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0);

    if (hasFiles || isFileRelated(target)) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      try {
        if (window.Swal) {
          Swal.fire({
            icon: 'info',
            title: 'ارسال فایل غیرفعال است',
            text: 'در میتازی امکان ارسال فایل در جلسه فعال نیست.',
            confirmButtonText: 'باشه'
          });
        }
      } catch (err) {}

      return false;
    }
  }

  ['click', 'change', 'input', 'drop', 'dragover', 'dragenter', 'paste'].forEach(function (eventName) {
    document.addEventListener(eventName, blockEvent, true);
    window.addEventListener(eventName, blockEvent, true);
  });

  const style = document.createElement('style');
  style.textContent = `
    input[type="file"],
    [id*="file" i],
    [class*="file" i],
    [title*="file" i],
    [aria-label*="file" i],
    [data-title*="file" i],
    [data-i18n*="file" i],
    [id*="upload" i],
    [class*="upload" i],
    [title*="upload" i],
    [aria-label*="upload" i],
    [id*="download" i],
    [class*="download" i],
    [title*="download" i],
    [aria-label*="download" i] {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
  `;
  document.head.appendChild(style);

  document.addEventListener('DOMContentLoaded', hideFileControls);
  window.addEventListener('load', hideFileControls);

  const observer = new MutationObserver(function () {
    hideFileControls();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true
  });

  setInterval(hideFileControls, 1500);

  window.MEETAZI_FILE_SHARING_DISABLED = true;
})();
