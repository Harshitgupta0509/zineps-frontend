# Zineps visual system

## Direction
Cinematic product logistics. A forest silk shader and large Manrope headline introduce the real dashboard. Warm product studies lead into a dedicated studio parcel sequence, carrier interfaces, integration rails, and a bright geographic mesh. Existing content, controls and ticket remain intact.

## Tokens
- Paper: #f5f6f1; secondary paper: #e7ede5.
- Ink: #15392e; body: #4b6056; forest: #0d261e.
- Brand mint: #81d8bd; rules: #cddbd1.
- Fonts: self-hosted Manrope Variable headings, Geist Variable body. Body 17px / 1.7; display 38–102px, weights 500–730, tracking -0.025 to -0.04em.
- Cards: 12–16px; buttons: 8px. Glass uses a shared translucent gradient, mint border, inner highlight and soft offset shadow.
- Content width: 1320px; desktop gutters 56px; mobile gutters 20px.

## Composition
Opening editorial spread: headline left, existing description and actions right; dashboard spans beneath. Alternating quiet product information and large 3D scenes. Bento retains its capabilities with unequal spans. FAQs, news and closing links use open rows and rules.

## Motion
GSAP controls hero entrance and major scroll transitions. Motion crossfades the real product studies and handles microinteractions. One lazy WebGL shader pauses offscreen. The separate lazy parcel scene has rounded cardboard, procedural grain, a blank label with the actual Zineps logo, mint tape, studio lighting, and a scroll-drawn conceptual route. Logo rails pause on hover. Aceternity's adapted 3D Card provides three-degree tilt and layer separation; other selected cards use spotlight or border response. The globe shows 28 conceptual routes, 33 nodes, and five desktop shipment pulses. Reduced motion provides static compositions and mobile shortens the parcel sequence.

## Scope and constraints
Mode: Persuade. Primary target: src/app/page.tsx. No factual copy changes. Seed 5f725a08 was consulted; the explicit single-version implementation constraint replaces concept alternatives and review loops. User will perform visual review. One production build checks technical validity.

## Implementation
src/app/premium.css owns the final visual system. experience-director.tsx owns GSAP choreography; hero-shader.tsx lazy-loads shader-canvas.tsx; parcel-story.tsx lazy-loads parcel-world.tsx; ui/3d-card.tsx adapts the official Aceternity source. The existing globe foundation remains in ui/globe.tsx. No visual review was run under the user's single-pass constraint.
