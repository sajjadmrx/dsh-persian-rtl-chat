window.__ModuleLoader__.load({
  id: 'dsh-persian-rtl-chat',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useEffect } = React;

    const RTL_SCRIPT = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    const MARK = 'data-persian-rtl';
    const VAZIR_STACK = '"Vazirmatn", "Vazir", Tahoma, "Segoe UI", sans-serif';

    // Known chat surfaces from current ui-chat / ui-conversation builds, plus stable fallbacks.
    const STYLE_TEXT = `
@font-face {
  font-family: "Vazirmatn";
  src: url("https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn[wght].woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

.cJsG2q_bubble,
.v5IAXa_body,
.v5IAXa_root,
.PWz36q_text,
.WW4l1q_content,
.oE-XyW_content,
[${MARK}="1"] {
  unicode-bidi: plaintext;
  text-align: start;
  font-family: ${VAZIR_STACK};
  font-feature-settings: "ss01" on;
}

[${MARK}="1"] {
  direction: rtl;
}

/* Composer draft: Persian typing reads better with Vazir too. */
.RlGAzG_card,
.RlGAzG_scroll,
[contenteditable="true"] {
  font-family: ${VAZIR_STACK};
}

.cJsG2q_bubble pre,
.cJsG2q_bubble code,
.v5IAXa_body pre,
.v5IAXa_body code,
.v5IAXa_root pre,
.v5IAXa_root code,
.PWz36q_text pre,
.PWz36q_text code,
.WW4l1q_content pre,
.WW4l1q_content code,
.oE-XyW_content pre,
.oE-XyW_content code,
[${MARK}="1"] pre,
[${MARK}="1"] code,
[${MARK}="1"] kbd,
[${MARK}="1"] samp,
[${MARK}="1"] .cm-editor,
[${MARK}="1"] [class*="codeBlock"],
[${MARK}="1"] [class*="CodeBlock"],
[${MARK}="1"] [data-language],
.RlGAzG_card pre,
.RlGAzG_card code {
  direction: ltr !important;
  text-align: left !important;
  unicode-bidi: isolate;
  font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace) !important;
}
`.trim();

    function sampleText(el) {
      if (!el || !el.innerText) return '';
      const clone = el.cloneNode(true);
      for (const node of clone.querySelectorAll('pre, code, kbd, samp, .cm-editor, [class*="codeBlock"], [class*="CodeBlock"], [data-language]')) {
        node.remove();
      }
      return (clone.innerText || '').replace(/\s+/g, ' ').trim();
    }

    function looksRtl(text) {
      if (!text) return false;
      let rtl = 0;
      let ltr = 0;
      for (const ch of text) {
        if (RTL_SCRIPT.test(ch)) rtl += 1;
        else if (/[A-Za-z]/.test(ch)) ltr += 1;
      }
      if (rtl === 0) return false;
      return rtl >= ltr;
    }

    function candidateRoots(doc) {
      const out = [];
      const seen = new Set();
      const push = (el) => {
        if (!el || seen.has(el)) return;
        seen.add(el);
        out.push(el);
      };
      for (const el of doc.querySelectorAll('.cJsG2q_bubble, .v5IAXa_body, .v5IAXa_root, .PWz36q_text, .WW4l1q_content, .oE-XyW_content')) {
        push(el);
      }
      for (const el of doc.querySelectorAll('[class*="bubble"], [class*="Markdown"], [class*="markdown"]')) {
        const cls = el.className && el.className.toString ? el.className.toString() : '';
        if (/bubble|Markdown|markdown/i.test(cls)) push(el);
      }
      return out;
    }

    function applyMarks(doc) {
      for (const el of candidateRoots(doc)) {
        const rtl = looksRtl(sampleText(el));
        if (rtl) {
          if (el.getAttribute(MARK) !== '1') {
            el.setAttribute(MARK, '1');
            el.setAttribute('dir', 'rtl');
          }
        } else if (el.hasAttribute(MARK)) {
          el.removeAttribute(MARK);
          el.removeAttribute('dir');
        }
      }
    }

    function RtlEngine() {
      useEffect(() => {
        if (typeof document === 'undefined') return undefined;

        let queued = false;
        const queueScan = () => {
          if (queued) return;
          queued = true;
          requestAnimationFrame(() => {
            queued = false;
            applyMarks(document);
          });
        };

        applyMarks(document);

        const observer = new MutationObserver(() => queueScan());
        observer.observe(document.documentElement, {
          subtree: true,
          childList: true,
          characterData: true,
        });

        return () => {
          observer.disconnect();
          for (const el of document.querySelectorAll(`[${MARK}]`)) {
            el.removeAttribute(MARK);
            el.removeAttribute('dir');
          }
        };
      }, []);

      return h('style', { 'data-persian-rtl-style': '1' }, STYLE_TEXT);
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register({
          name: 'conversation.composer.dock',
          id: 'persian-rtl-chat',
          order: 90,
        }, RtlEngine));
      },
    };
  },
});
