
Objective
Fix GoFix so photo sharing is reliable on iPhone, the WhatsApp message is clean (not messy), and the confirmation flow feels modern and robust.

What is currently broken
- The current GoFix confirm flow uses `wa.me` (text-only) + an automatic download hack.
- `wa.me` cannot attach image files; it only pre-fills text.
- The current image path depends on `photoPreview` (base64) conversion, which is fragile on mobile.
- The message formatting uses many emojis, and your screenshot shows corrupted symbols (`�`) in WhatsApp, making it look messy.

Root cause (important reality)
- In browser-only mode, WhatsApp deep links (`wa.me`, `whatsapp://send`) cannot programmatically attach media to a specific chat.
- So a pure deep-link flow cannot guarantee “image attached with the same message” automatically.
- The best modern browser approach is: use native file sharing first (`navigator.share` with files), then controlled fallback to WhatsApp text + guided attachment.

Implementation plan

1) Rebuild GoFix confirm flow as a smart share pipeline (single clean UX)
File: `src/pages/GoFixPage.tsx`

- Make `handleConfirm` async and introduce `isSubmitting` state.
- New sequence when a photo exists:
  1. Try native share with the real `File` object (`navigator.canShare` + `navigator.share`).
  2. If supported, share photo (and caption where supported).
  3. If not supported/fails, fallback to opening WhatsApp chat with text and provide reliable manual-attach path.
- No more “fire-and-forget setTimeout” behavior that can race modal close and file actions.

2) Use original File object (not base64 preview) for any download/share fallback
File: `src/pages/GoFixPage.tsx`

- Keep `photo` as the source of truth for sharing and downloads.
- Remove base64-to-blob conversion for send logic.
- If fallback is needed, generate object URL from `photo` directly and trigger attachment guidance.
- This avoids empty/corrupt image behavior caused by conversion timing/format issues.

3) Clean, modern WhatsApp message builder
File: `src/pages/GoFixPage.tsx`

- Replace emoji-heavy message with a clean structured format (plain text labels).
- Keep line breaks and readability optimized for WhatsApp.
- Example style:
  - `Type: ...`
  - `Problème: ...`
  - `Ville: ...`
  - `Adresse: ...`
  - `Date: ...`
  - `Heure: ...`
  - `Nom: ...`
  - `Téléphone: ...`
- This removes the messy rendering seen in your screenshot.

4) Better UX states and reliability
File: `src/pages/GoFixPage.tsx`

- Add loading/disabled state on confirm button (`isSubmitting`) to prevent double taps.
- Keep modal open until action path is complete (success/fallback decision).
- Add clear toasts/messages:
  - Success: “Photo partagée, envoyez dans WhatsApp”
  - Fallback: “WhatsApp ne permet pas l’attachement auto ici, joignez la photo maintenant”
- Update summary copy to be clear and minimal (modern, clean language).

5) Harden upload validation (secure and robust client behavior)
File: `src/pages/GoFixPage.tsx`

- Validate file type in code (not only input accept attr): allow only safe image MIME types.
- Keep max size guard and show explicit user feedback if rejected.
- Use predictable filename fallback when needed.
- Prevent accidental broken states when photo exists but preview is not yet ready.

6) iPhone-focused behavior tuning
File: `src/pages/GoFixPage.tsx`

- Use feature detection for Web Share and iOS-specific compatibility behavior.
- Handle `AbortError` (user cancels share) gracefully without breaking flow.
- Keep deterministic fallback path so user can still finish the request every time.

Acceptance criteria (must pass)
1. iPhone Safari:
- Upload image in GoFix.
- Confirm action does not produce blank/empty media.
- User can complete flow without broken state.

2. Message quality:
- WhatsApp text appears clean (no corrupted symbols/emoji mess).

3. Fallback reliability:
- If native share is unavailable/fails, user still gets WhatsApp chat + clear way to attach image.

4. UX quality:
- No double submits.
- No stuck loading.
- No silent failures.

Technical note (for full “100% auto attach to fixed number”)
- If you want true one-tap automatic media+text sent directly to a fixed business number without user share selection, that requires backend integration with WhatsApp Business/Cloud API (server-side, token-secured).
- The planned frontend fix will make your current web flow modern, clean, and reliable on iPhone within browser limits.

Files to update
- `src/pages/GoFixPage.tsx` (primary and sufficient for this issue)
