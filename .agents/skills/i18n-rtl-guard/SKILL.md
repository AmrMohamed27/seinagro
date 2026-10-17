---
name: i18n-rtl-guard
description: Enforces RTL/LTR layout compatibility and trilingual dictionary parity (ar, en, fr) for all UI components.
---

# Instructions

1. Logical Properties Only: Never use physical directional classes (`ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`, `text-left`, `text-right`). Always use logical equivalents (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`).
2. Dictionary Parity: Whenever adding or modifying UI text, immediately update `messages/ar.json`, `messages/en.json`, and `messages/fr.json` in the same step. Never hardcode strings in JSX.
3. Font & Line-Height Scaling: Ensure Arabic typography classes account for taller line-heights and appropriate font-family switching without shifting layout containers.
