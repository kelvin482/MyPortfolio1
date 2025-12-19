# Portfolio Design System Documentation

## 🎨 Color Palette

### Dark Theme (Default)
The website uses a dark-first approach with a bold red accent color inspired by modern portfolio aesthetics.

**Primary Colors:**
- **Background (`--bg`)**: `#0a0a0a` - Deep black, almost pure black for maximum contrast
- **Panel (`--panel`)**: `#141414` - Slightly lighter black for cards and elevated surfaces
- **Text (`--text`)**: `#f5f5f5` - Off-white for high readability
- **Muted (`--muted`)**: `#8a8a8a` - Medium gray for secondary text

**Accent Colors:**
- **Primary Accent (`--accent`)**: `#e63946` - Bold red (main brand color)
- **Secondary Accent (`--accent-secondary`)**: `#ff6b6b` - Lighter red for hover states
- **Dark Accent (`--accent-dark`)**: `#c1121f` - Darker red for pressed states

**Effects:**
- **Glass (`--glass`)**: `rgba(255,255,255,0.04)` - Subtle glassmorphism effect

### Light Theme
When light mode is activated, colors invert while maintaining the same red accent:

- **Background**: `#fafafa` - Light gray
- **Panel**: `#ffffff` - Pure white
- **Text**: `#1a1a1a` - Near black
- **Muted**: `#6b6b6b` - Medium gray
- **Accent**: `#d62828` - Slightly darker red for better contrast on light backgrounds

### Color Usage Strategy
- **Red accent** is used sparingly for:
  - Brand name highlights
  - Primary buttons
  - Active navigation states
  - Hover effects
  - Important call-to-action elements
  
- **Muted colors** create hierarchy:
  - Secondary information
  - Inactive states
  - Supporting text

---

## 🔤 Typography

### Font Families

**Primary Font: Inter**
- Used for: Body text, paragraphs, general content
- Weights: 300 (Light), 400 (Regular), 600 (Semi-bold), 700 (Bold)
- Characteristics: Clean, modern, highly readable sans-serif
- Purpose: Ensures excellent readability across all screen sizes

**Display Font: Poppins**
- Used for: Headings, brand name, section titles
- Weights: 600 (Semi-bold), 700 (Bold)
- Characteristics: Geometric, friendly, attention-grabbing
- Purpose: Creates visual hierarchy and brand personality

### Typography Scale

**Headings:**
- `h1`: `clamp(2rem, 5vw, 4rem)` - Responsive, scales with viewport
- `h2`: `clamp(1.8rem, 4vw, 2.5rem)` - Section titles
- `h3`: `1.5rem - 2rem` - Subsection titles
- `h4`: `1.2rem` - Card titles

**Body Text:**
- Large: `1.25rem` - Hero descriptions
- Regular: `1rem` - Standard paragraphs
- Small: `0.95rem` - Supporting text, captions
- Tiny: `0.85rem` - Meta information, labels

**Line Height:**
- Headings: `1.1 - 1.2` - Tight for impact
- Body: `1.6 - 1.8` - Comfortable reading

---

## 📐 Layout Structure

### Global Layout Pattern

Every page follows this consistent structure:

```
┌─────────────────────────────────────┐
│  Header (Sticky Navigation)        │
├─────────────────────────────────────┤
│                                     │
│  Main Content (Page-specific)      │
│                                     │
├─────────────────────────────────────┤
│  Footer (Consistent across pages)   │
└─────────────────────────────────────┘
```

### Container System

**Max Width**: `1100px` - Optimal reading width
**Padding**: `1.6rem` - Consistent spacing on all sides
**Responsive**: Adapts to smaller screens with reduced padding

---

## 📄 Page-by-Page Structure

### 1. Home Page (`index.html`)

**Layout:**
```
Hero Section (2-column grid)
├── Left: Text content + CTA buttons
└── Right: Profile image card with stats

"What I Do" Section
└── 4-column feature grid (responsive)

Projects Preview
└── 3-column project grid

Call-to-Action Section
└── Centered text + button
```

**Key Features:**
- Asymmetric hero layout (text left, image right)
- Feature cards with colored left borders (intentional asymmetry)
- Hover effects reveal background images on feature cards
- Responsive: Stacks to single column on mobile

**Visual Hierarchy:**
1. Hero name (largest, red accent)
2. Lead text (accent color)
3. Bio paragraph (muted)
4. Feature cards (equal weight, different border colors)

---

### 2. About Page (`about.html`)

**Layout:**
```
About Hero Section
├── Left: Large profile image
└── Right: Text content + buttons

Timeline Section
└── Vertical timeline with dots

Philosophy Section
└── Long-form text with gradient headings

Certifications Section
└── 4-column grid of cert cards
```

**Key Features:**
- Two-column grid for hero (image + text)
- Timeline with red accent dots
- Gradient text headings (purple to blue)
- Card-based certification display
- Asymmetric spacing creates visual interest

**Visual Elements:**
- Large profile image with rounded corners
- Timeline markers use accent color
- Cards have hover lift effect
- Gradient headings add visual variety

---

### 3. Projects Page (`projects.html`)

**Layout:**
```
Header Section
├── Title
└── Filter chips (All, Web, AI, Network)

Projects Grid
└── Responsive grid (3 → 2 → 1 columns)
```

**Key Features:**
- Filterable project grid
- Project cards with images
- Hover effects: Card lifts, image zooms
- Clean, minimal design focuses on content

**Card Structure:**
- Image thumbnail (200px height)
- Title and description
- Action buttons (Live, Code)
- Border highlight on hover

---

### 4. Skills Page (`skills.html`)

**Layout:**
```
Hero Section
└── Centered title with gradient text

Category Cards (4-column grid)
└── Core skill categories with icons

Interactive Skills Grid
├── Scroll buttons (left/right)
└── Dynamic skill cards with progress bars

Longread Section
└── Centered explanatory text
```

**Key Features:**
- Animated rotating background gradient
- Category cards with emoji icons
- Interactive skill cards with:
  - Progress bars (animated on scroll)
  - Skill badges
  - Hover tooltips
  - Floating animations
- Scroll buttons for navigation
- Theme-aware colors per skill

**Special Effects:**
- Rotating radial gradient background
- Floating animation (alternating directions)
- Progress bar shimmer effect
- 3D transform on hover

---

### 5. Services Page (`services.html`)

**Layout:**
```
Services Section
└── 4-column service cards

Why Choose Me Section
└── 5-column grid of benefit cards
```

**Key Features:**
- Service cards with hover effects
- Benefit cards explaining value proposition
- Consistent card styling
- Responsive grid layout

---

### 6. Contact Page (`contact.html`)

**Layout:**
```
Contact Section (2-column grid)
├── Left: Contact info + description
└── Right: Contact form
```

**Key Features:**
- Split layout: Info on left, form on right
- Form with validation
- Draft saving functionality
- Clean, focused design

**Form Elements:**
- Input fields with focus states
- Primary button (red)
- Ghost button (outline)
- Status messages

---

### 7. Blog Page (`blog.html`)

**Layout:**
```
Blog List Section
└── Grid of blog post cards
```

**Key Features:**
- Card-based post layout
- Post metadata (date, read time)
- Featured images
- "Read more" links

---

## 🎯 Design Principles

### 1. Intentional Asymmetry
- Feature cards have different colored left borders
- Varied spacing creates visual rhythm
- Asymmetric grid layouts (not perfectly uniform)
- Different card sizes and positions

### 2. Visual Hierarchy
- Size: Larger = more important
- Color: Red accent = primary actions
- Position: Top = most important
- Contrast: High contrast = emphasis

### 3. Interaction Design
- **Hover States**: All interactive elements have hover feedback
- **Transitions**: Smooth 150ms transitions (fast, responsive)
- **Focus States**: Keyboard navigation support
- **Loading States**: Scroll reveal animations

### 4. Responsive Strategy
- Mobile-first approach
- Breakpoints:
  - Desktop: `> 900px` (full layout)
  - Tablet: `600px - 900px` (2 columns)
  - Mobile: `< 600px` (single column)
- Flexible typography with `clamp()`
- Touch-friendly button sizes

### 5. Accessibility
- High contrast ratios (WCAG AA compliant)
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators visible

---

## 🎨 Component Patterns

### Buttons

**Primary Button:**
- Background: Red accent color
- Text: White
- Hover: Darker red + lift effect
- Shadow: Subtle red glow

**Ghost Button:**
- Background: Transparent
- Border: Red accent
- Text: Red accent
- Hover: Fills with red, text becomes white

### Cards

**Standard Card:**
- Background: Panel color
- Border: Subtle (rgba white 0.05)
- Border-radius: 12px
- Hover: Lift + shadow increase
- Padding: 1.5rem - 2rem

**Feature Card:**
- Colored left border (asymmetric)
- Background image on hover
- Text fades, image appears
- Smooth transitions

### Navigation

**Desktop:**
- Horizontal layout
- Underline animation on hover
- Active state with background
- Sticky positioning

**Mobile:**
- Hamburger menu
- Full-screen overlay
- Vertical link list
- Smooth slide animation

---

## 🔄 Animation & Transitions

### Transition Timing
- **Standard**: `0.15s` (150ms) - Fast, responsive
- **Smooth**: `0.3s - 0.4s` - For larger movements
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` - Natural motion

### Scroll Animations
- Elements fade in from bottom
- Staggered delays create rhythm
- Intersection Observer triggers
- Threshold: 12% visibility

### Hover Effects
- **Buttons**: Lift + color change
- **Cards**: Lift + shadow increase
- **Links**: Underline animation
- **Images**: Scale zoom

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 600px) {
  - Single column layouts
  - Stacked navigation
  - Reduced padding
  - Smaller font sizes
}

/* Tablet */
@media (max-width: 900px) {
  - 2-column grids
  - Adjusted spacing
  - Medium font sizes
}

/* Desktop */
@media (min-width: 901px) {
  - Full multi-column layouts
  - Maximum spacing
  - Large typography
}
```

---

## 🎭 Visual Style Characteristics

### Modern & Clean
- Minimal design with plenty of whitespace
- Clear typography hierarchy
- Subtle shadows and effects

### Bold Accents
- Red color creates strong visual identity
- Used strategically, not overwhelming
- Creates clear call-to-action focus

### Professional Yet Approachable
- Clean code aesthetic
- Developer-to-developer tone
- No unnecessary decoration

### Hand-Crafted Feel
- Intentional asymmetry
- Varied spacing
- Personal, human touch
- Not overly templated

---

## 🔧 Technical Implementation

### CSS Architecture
- **Global Styles**: `style.css` (base, layout, components)
- **Page-Specific**: Individual CSS files per page
- **CSS Variables**: Centralized color system
- **Modular**: Easy to update and maintain

### JavaScript Structure
- **Modular**: Separate files for different functions
- **Config**: Centralized configuration
- **No Dependencies**: Vanilla JavaScript
- **Progressive Enhancement**: Works without JS

---

This design system creates a cohesive, professional portfolio that feels modern, personal, and highly functional while maintaining excellent usability across all devices.

