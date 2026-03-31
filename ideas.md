# GitBurn Web App - Tasarım Fikirleri

## Seçilen Tasarım: Minimalist Developer Aesthetic (Seçildi)

**Design Movement:** Minimalist + Cyberpunk Lite

**Core Principles:**
1. **Clarity First**: Tüm bilgiler net ve hızlı okunabilir. Gereksiz dekorasyon yok.
2. **Developer Aesthetic**: Kod editörü gibi hissettiren, monospace fontlar ve terminal-benzeri renkler.
3. **Dark Theme Dominance**: Gözü yorulmayan, uzun süreli kullanıma uygun koyu tema.
4. **Functional Minimalism**: Her element bir amacı vardır. Hiçbir şey boşuna orada değildir.

**Color Philosophy:**
- **Background**: Deep charcoal (#0f0f0f) - terminal-like, professional
- **Primary Accent**: Electric cyan (#00d9ff) - attention, energy, tech feel
- **Secondary Accent**: Neon green (#39ff14) - success, positive signals
- **Danger/Warning**: Neon red (#ff1744) - burnout risk, high scores
- **Neutral**: Light gray (#e0e0e0) - text, secondary info
- **Muted**: Medium gray (#666666) - tertiary info, disabled states

**Layout Paradigm:**
- Asymmetric single-column layout with left-aligned input
- Result card with vertical stacking: score (large), signals (list), personality (badge), insight (paragraph), roast (highlighted block)
- Hero section minimal: just title + tagline
- No sidebar, no unnecessary navigation

**Signature Elements:**
1. **Glowing Score Display**: Large, glowing number with animated border
2. **Terminal-Style Input**: Monospace font, subtle glow on focus
3. **Neon Badges**: Personality type as glowing badge with cyan/green colors
4. **Code Block Style Sections**: Signals and roast in code-block-like containers

**Interaction Philosophy:**
- Smooth fade-ins and slide-ups on result reveal
- Hover effects on buttons with subtle glow increase
- Copy-to-clipboard with toast confirmation
- Loading state with animated spinner

**Animation:**
- Fade in on page load (200ms)
- Slide up on result reveal (300ms, staggered)
- Pulse glow on score number (2s loop)
- Hover scale on buttons (1.05x, 150ms)
- Copy toast slide in from bottom (200ms)

**Typography System:**
- **Display**: IBM Plex Mono Bold for score, large headings (developer feel)
- **Heading**: Inter 600 for section titles
- **Body**: Inter 400 for descriptions
- **Monospace**: IBM Plex Mono for code-like blocks (signals, roast)
- **Hierarchy**: Large score (48px) → Personality (20px) → Signals (16px) → Insight (14px)

---

## Alternatif Fikirler (Seçilmedi)

### Idea 2: Glassmorphism + Gradient
- Frosted glass cards with gradient overlays
- Soft, modern aesthetic
- Probability: 0.08

### Idea 3: Retro Terminal
- Pure terminal UI with green-on-black
- ASCII art elements
- Probability: 0.05
