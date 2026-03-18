# Quad City Photo Booth

## Current State
The site uses a Navy/Teal/Gold color palette with Montserrat font. All sections (hero, how-it-works, services/packages, gallery, contact, footer) are in place with correct pricing and contact info.

## Requested Changes (Diff)

### Add
- Nothing new to add

### Modify
- Color system: swap Navy/Teal/Gold palette for Purple primary (oklch 0.55 0.20 280) + Pink/Magenta accent (oklch 0.65 0.22 330)
- Font: remove Montserrat, use default system sans-serif
- Border radius: update to 0.75rem to match reference
- Hero: update gradient overlay to use purple-to-accent gradient
- Buttons, section accents, tags: use purple/pink instead of navy/teal/gold
- Stars/highlights: use yellow-400 instead of gold custom color
- Overall visual direction: modern, clean purple + pink gradient aesthetic matching the reference site

### Remove
- Montserrat Google Font import
- Navy/Teal/Gold custom color tokens

## Implementation Plan
1. Update index.css: new OKLCH color tokens (purple primary, pink accent), remove Montserrat import, update radius to 0.75rem
2. Update App.tsx: replace all custom color class references (navy, teal, gold) with primary/accent/foreground semantic tokens; update gradients, buttons, badges, section backgrounds
