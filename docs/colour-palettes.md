# DDA public-site colour palettes

Ratios use the WCAG relative-luminance formula and are foreground-on-background. No palette uses pure black or white. The implemented variables are scoped to `.site-shell`, so diagnostic interfaces retain their existing tokens.

| Palette | Page | Panel | Body / page | H1/H3 / page | H2 / page | Footer / footer background | Focus / page | Result |
|---|---|---|---:|---:|---:|---:|---:|---|
| **Civic navy + lichen (selected)** | `#F4F3ED` | `#E9EDE7` | `#17232B` **14.40:1** | `#122330` **14.11:1** | `#314B3E` **8.56:1** | `#E8EEE9` on `#0B1D2A` **14.58:1** | `#2E6FA3` **4.82:1** | Pass |
| Slate + forest | `#F2F4F1` | `#E7ECE8` | `#18241F` **14.48:1** | same **14.48:1** | `#31523E` **7.89:1** | `#ECF1ED` on `#17251F` **13.91:1** | `#2B6C91` **5.19:1** | Pass |
| Mineral + moss | `#F3F1EA` | `#EAE8DF` | `#252921` **13.11:1** | same **13.11:1** | `#46583A` **6.84:1** | `#EFF1E8` on `#20271E` **13.44:1** | `#386C8A` **5.05:1** | Pass |
| Harbour blue + olive | `#F1F4F3` | `#E5ECEA` | `#152630` **14.04:1** | same **14.04:1** | `#294F58` **8.06:1** | `#E8EFED` on `#102A35` **12.82:1** | `#34708C` **4.94:1** | Pass |

Each family also defines: subtle gradient (page to panel), table fill (panel), stripe (a 2–3% darker neutral), total row (lichen/forest/moss/olive tint), panel border, darker table-header underline, row strokes, muted text, restrained link blue, image accent, CTA fill, footer rule, and footer text. The selected implementation exposes each of these as `--site-*` tokens in `src/index.css`. CTA text uses dark navy; bright lichen is never used as small text on a light surface. Body text also exceeds 7:1 on the slightly darker panel surface (12.99:1).
