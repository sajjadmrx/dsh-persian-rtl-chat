# dsh-persian-rtl-chat

پلاگین [DeepSeek Harness](https://github.com/deepseek-ai) برای چت فارسی و عربی:

- تشخیص خودکار پیام‌های RTL و تنظیم `dir="rtl"`
- فونت **Vazirmatn** (نسخهٔ فعلی خانوادهٔ وزیر)
- بلوک‌های کد همچنان LTR و مونو‌اسپیس می‌مانند
- اعمال فونت روی کامپوزر برای تایپ راحت‌تر فارسی

---

## Install

### Desktop / Web profile

```bat
dsh plugin --profile desktop add github:sajjadmrx/dsh-persian-rtl-chat
```

اگر پروفایلت `web` یا `tui` است، همان را جای `desktop` بگذار:

```bat
dsh plugin --profile web add github:sajjadmrx/dsh-persian-rtl-chat
```

بعد یک‌بار صفحه را **Refresh** کن. اگر فونت یا RTL نیامد، DeepSeek Harness را کامل ببند و دوباره باز کن.

### From a local clone

```bat
git clone https://github.com/sajjadmrx/dsh-persian-rtl-chat.git
dsh plugin --profile desktop add .\dsh-persian-rtl-chat
```

---

## Uninstall

```bat
dsh plugin --profile desktop remove dsh-persian-rtl-chat
```

یا از صفحه **Plugins** در سایدبار خاموش/حذفش کن.

---

## What it does

| Surface | Behavior |
|---|---|
| Persian / Arabic messages | RTL + Vazirmatn |
| Mixed messages | RTL when RTL letters dominate |
| Code blocks (`pre` / `code`) | Stay LTR + monospace |
| Composer | Vazirmatn for typing |

Font is loaded from jsDelivr (`rastikerdar/vazirmatn`), which is usually more reachable in Iran than Google Fonts.

---

## Notes

- این پلاگین به کلاس‌های فعلی UI چت DSH وابسته است و برای نسخه‌های جدیدتر fallback هم دارد؛ اگر بعد از آپدیت بزرگ Harness چیزی شکست، Issue باز کن.
- فقط روی Client Web UI اثر می‌گذارد (نه ترمینال TUI).

---

## License

MIT — see [LICENSE](./LICENSE).

Vazirmatn is by [Saber Rastikerdar](https://github.com/rastikerdar/vazirmatn) (OFL).
