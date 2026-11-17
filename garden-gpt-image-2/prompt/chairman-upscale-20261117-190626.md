# Chairman portrait: upscale and restore prompt (ChatGPT image edit)

Source image: `garden-gpt-image-2/source/chairman-original.png` (1848 × 1248, soft and compressed)
Attach the image in ChatGPT, then paste the prompt below.

---

```
Use the attached photo as the only reference. It shows a real person, a company chairman. Restore and upscale THIS exact photograph. Do not create a new or reimagined image.

TASK
Upscale to high resolution (3:2 landscape, at least 3000 px wide) and restore the image quality: remove JPEG compression blocks, banding and colour noise, recover fine natural detail, and fix the soft, slightly smeared look.

PRESERVE EXACTLY (identity lock)
- Face: identical facial structure, eye shape, nose, mouth, ears, jawline, skin tone, age, wrinkles and expression. Do not beautify, slim, smooth, de-age or "improve" the face in any way.
- Glasses: same frame shape, thickness, colour and position on the face.
- Hair: same hairline, parting, volume and grey tones.
- Clothing: same dark suit jacket, same white striped shirt with open collar, same buttons and sleeve cuffs.
- Pose and hands: same seated pose with forearms resting on the desk; same hand position and the same number of fingers.
- Background and objects: same dark wood-panelled office cabinets and metal handles, same orange panel on the left, same phone, papers and items on the desk, all in the same positions and colours.
- Lighting and framing: same light direction, same warm white balance, same depth of field, same crop and composition. Do not add, remove or move anything.

ENHANCE ONLY
- Crisp but natural skin texture (pores, fine lines). No plastic or waxy skin.
- Sharper fabric detail on the jacket and the shirt stripes.
- Clean, precise edges on the glasses, hair, collar and cuffs.
- Clean wood grain and reflections on the desk.
- Colours true to the original. Keep the warm wood tones.

AVOID
Changing the person's identity, face shape or expression; AI beauty-filter look; over-sharpening halos; painterly, illustrated or CGI style; added text, logos or watermarks; changed or blurred-out background; extra or distorted fingers; different glasses or clothing.

OUTPUT
One photorealistic image, 3:2 landscape, high resolution, that looks like the same photograph taken with a better camera.
```

---

## Notes
- AI image editors regenerate pixels and can subtly change a face. Compare the result side by side with the original before publishing.
- If the likeness drifts, use a pixel-preserving upscaler instead (Upscayl, free; Topaz Photo AI; Real-ESRGAN), or ask the client for the original high-resolution file. That is the most faithful option for a real person's portrait.
- Final image for the website: replace `web/public/images/chairman.jpg` (keep the 3:2 ratio; about 1600–2400 px wide is enough).
