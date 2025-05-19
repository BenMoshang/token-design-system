Okay, I've updated your `design-system.md` documentation to include the new 12-column responsive grid system.

Here's the updated content:

```markdown
# SCSS Design System Documentation

## 1. Overview

This document outlines the structure, conventions, and usage of the SCSS-based token design system. The system is built with a layered approach, promoting scalability, maintainability, and ease of use. It heavily utilizes Sass modules (`@use`) for clear dependency management and namespacing. It features a robust responsive sizing system for both spacing and typography, powered by a custom `get-clamp` utility, and a flexible 12-column responsive grid system.

## 2. Directory Structure

The design system's core SCSS files are organized as follows (assuming a base path like `your-project/src/scss/` or `token-design-system/`):

```

.
├── global/                        \# Global configurations and utilities
│   ├── \_g-variables.scss          \# Global Sass variables (e.g., viewport widths, type scale ratios, base font size for clamp)
│   │
│   ├── structure/                 \# Core structural definitions (Potentially move to a top-level `core/` or `tokens/` directory)
│   │   ├── primitive/             \# Raw, unopinionated design tokens and systems
│   │   │   ├── \_p-spacing-scale.scss \# Generates base spacing values (min/max) for different scale steps
│   │   │   └── \_p-typography-scale.scss  \# Primitive typography (base font sizes for min/max, families, etc.)
│   │   │   └── ...                \# Other primitive systems (colors, etc.)
│   │   └── semantic/              \# Meaningful aliases and responsive calculations for primitive tokens
│   │       ├── \_s-spacing-scale.scss \# Defines semantic responsive spacing variables using get-clamp()
│   │       └── \_s-typography-scale.scss    \# Defines semantic responsive typography styles using get-clamp()
│   │       └── ...                \# Other semantic layers
│   │
│   ├── public/                    \# Public-facing API (mixins and functions)
│   │   ├── \_public-spacing.scss   \# Mixins for applying responsive spacing (apply-padding, apply-margin)
│   │   ├── \_public-typography.scss \# Mixins/functions for applying responsive typography styles (apply-text-style)
│   │   ├── \_public-grid.scss      \# Mixins and utility classes for the 12-column responsive grid system
│   │   └── ...                \# Other public APIs
│   │
│   └── utils/                     \# Utility functions and mixins
│       ├── \_u-clamp.scss          \# Utility function `get-clamp()` for generating CSS clamp() strings
│       ├── \_u-mixtend.scss        \# Utility for placeholder selectors and common mixins for layout, responsive, etc.
│
└── main.scss                      \# Main SCSS file that imports and orchestrates the system

````

**Note on User's Current Path:** The user's current workspace is `c:\Users\benmo\Downloads\token-design-system\token-design-system\`. The paths in this document are relative to this root.

## 3. Naming Conventions

* **Files:** SCSS partials are prefixed with an underscore (e.g., `_g-variables.scss`).
    * `_g-`: Global scope (e.g., `_g-variables.scss`).
    * `_p-`: Primitive layer (e.g., `_p-spacing-scale.scss`).
    * `_s-`: Semantic layer (e.g., `_s-spacing-scale.scss`).
    * `_public-`: Public API layer (e.g., `_public-spacing.scss`, `_public-grid.scss`).
    * `_u-`: Utility files (e.g., `_u-clamp.scss`).
* **Maps:**
    * !!! NO STRING VALUES ALLOWED IN MAPS !!! (This seems like a specific project rule, keeping it).
    * Semantic mapping variables like `$_SEMANTIC_SPACING_MAPPINGS` and responsive value maps like `$RESPONSIVE_SPACING_VALUES` are uppercase with underscores.
* **Variables:**
    * Global configuration maps are often uppercase with underscores (e.g., `$_TYPE_SCALE_RATIOS`, `$PAGE_MIN_INLINE`).
    * Private variables within a module (not intended for direct external use) can be prefixed with an underscore (e.g., `$_SPACING_CONFIG_DEFAULT`).
    * Publicly exported semantic variables (like those in `$RESPONSIVE_SPACING_VALUES`) use kebab-case keys (e.g., `'spacing-xs'`, `'gutter-m'`). Helper functions like `get-responsive-spacing()` are used to access them.
* **Mixins & Functions:**
    * Public API mixins/functions: `apply-<property>` (e.g., `apply-padding`, `apply-text-style`), or descriptive names like `grid-container`, `col`.
    * Utility functions/mixins:
        * Prefixes like `get-`, `create-`, `is-` are common (e.g., `get-clamp`, `get-responsive-spacing`).
        * The primary clamp utility is `get-clamp`.
    * Private helper functions/mixins within modules can be prefixed with an underscore.

## 4. SCSS Flow & Layer Architecture

The system follows a one-way data flow: `Global -> Primitive -> Semantic -> Public API`. Responsive values are generated at the Semantic layer using utilities.

1.  **Global Layer (`global/_g-variables.scss`)**
    * Defines foundational configurations used across multiple systems.
    * Examples:
        * `$PAGE_MIN_INLINE`, `$PAGE_MAX_INLINE`: Define minimum and maximum viewport widths for responsive calculations via `get-clamp`.
        * `$CLAMP_BASE_FONT_SIZE`: Base font size (typically 16, configurable in `_g-variables.scss`) used by `get-clamp` for `rem` conversions.
        * Type scale ratios, color palettes, breakpoint maps.
2.  **Primitive Layer (`global/structure/primitive/`)**
    * Generates raw, unopinionated design tokens or base system logic. These serve as the foundational values for responsive calculations.
    * **`_p-spacing-scale.scss`**:
        * Uses a base spacing unit and a scale (e.g., type scale ratio) to generate a map of spacing values (e.g., `$PRIMITIVE_SPACING_SCALE`).
        * This map contains numeric or named keys (e.g., `0, 12, 25, 50, 100, 200` or `s1, s2, s3`) mapped to calculated `rem` values.
        * These values represent the *minimum* and *maximum* sizes for use with the `get-clamp` function in the semantic layer.
    * **`_p-typography-scale.scss`**:
        * Defines base font families, font weights.
        * Generates maps of font sizes (e.g., `$PRIMITIVE_FONT_SIZES`) and potentially line heights based on type scales.
        * These font sizes serve as the *minimum* and *maximum* values for responsive typography generated by `get-clamp` in the semantic layer.
3.  **Semantic Layer (`global/structure/semantic/`)**
    * Provides meaningful aliases for primitive tokens and orchestrates the generation of responsive CSS `clamp()` values.
    * **`_s-spacing-scale.scss`**:
        * Imports primitive spacing values from `_p-spacing-scale.scss`, the `get-clamp` utility from `_u-clamp.scss`, and global viewport variables from `_g-variables.scss`.
        * Defines `$_SEMANTIC_SPACING_MAPPINGS`: A map associating semantic names (e.g., 'spacing-xs', 'gutter-m') with keys from the primitive spacing scale for both mobile (min) and desktop (max) values.
        * Defines `$_CLAMP_MIN_VIEWPORT` and `$_CLAMP_MAX_VIEWPORT` using global variables (e.g., `g-vars.$PAGE_MIN_INLINE`, `g-vars.$PAGE_MAX_INLINE`).
        * Generates `$RESPONSIVE_SPACING_VALUES`: A map where keys are semantic names and values are CSS `clamp()` strings. These are calculated using the `get-clamp` function with min/max values derived from the primitive scale (via mappings) and the configured viewport widths.
        * Includes a helper function `get-responsive-spacing($semantic-name)` to retrieve specific `clamp()` values from `$RESPONSIVE_SPACING_VALUES`.
    * **`_s-typography-scale.scss`**:
        * Mirrors the logic of `_s-spacing-scale.scss` for typography.
        * Imports primitive font sizes from `_p-typography-scale.scss`, `get-clamp` from `_u-clamp.scss`, and global viewport/font-size variables from `_g-variables.scss`.
        * Defines semantic typography mappings (e.g., 'heading-1', 'body-text') linking them to primitive font size keys for min and max values.
        * Generates a map (e.g., `$RESPONSIVE_TYPOGRAPHY_STYLES`) where keys are semantic style names and values include `font-size: clamp(...)`, and potentially `line-height: clamp(...)` if responsive line height is also implemented. Font family and weight are typically applied directly from semantic mappings.
4.  **Public API Layer (`global/public/`)**
    * Exposes user-friendly mixins and functions for applying styles in components. This is the primary interface for developers using the design system, now providing responsive styles by default.
    * **`_public-spacing.scss`**:
        * Provides mixins like `apply-padding($semantic-name, $side: null)` and `apply-margin($semantic-name, $side: null)`.
        * These mixins accept a semantic name (e.g., `'spacing-xs'`, `'gutter-m'`) and an optional side.
        * They use `get-responsive-spacing()` from `_s-spacing-scale.scss` to fetch the corresponding `clamp()` CSS value and apply it using logical properties.
    * **`_public-typography.scss`**:
        * Provides an `apply-text-style($style-key)` mixin.
        * This mixin accepts a semantic style key (e.g., `'heading-1'`, `'body-text'`).
        * It applies the corresponding responsive `font-size` (a `clamp()` value) and other properties like `font-family`, `font-weight`, and `line-height` defined in or derived from `_s-typography-scale.scss`.
    * **`_public-grid.scss`**:
        * Provides mixins (`grid-container`, `col`) and utility classes for a 12-column responsive grid system.
        * Leverages semantic spacing for gutters and global variables for breakpoints.
5.  **Utilities Layer (`global/utils/`)**
    * Contains general-purpose helper functions and mixins.
    * **`_u-clamp.scss`**:
        * Provides the core `get-clamp($min-value, $max-value, $min-viewport, $max-viewport)` function.
        * **Purpose:** Generates a CSS `clamp()` string for fluid typography or spacing.
        * **Parameters:**
            * `$min-value`: Minimum value (accepts unitless, px, or rem).
            * `$max-value`: Maximum value (accepts unitless, px, or rem).
            * `$min-viewport`: Viewport width at which the `$min-value` applies (accepts unitless, px, or rem).
            * `$max-viewport`: Viewport width at which the `$max-value` applies (accepts unitless, px, or rem).
        * **Output:** A string in the format `clamp(min_rem, preferred_rem_vw, max_rem)` (e.g., `clamp(1rem, 0.5rem + 2.5vw, 2rem)`).
        * **Details:** It uses a global `$CLAMP_BASE_FONT_SIZE` (default 16, configurable in `_g-variables.scss`) for `rem` conversions, handles unit conversions, and edge cases (e.g., min-value > max-value).
    * **`_u-mixtend.scss`**:
        * Contains reusable placeholder selectors (e.g., `%visually-hidden`) and common utility mixins.
        * These can cover typography, layout, spacing, responsive helpers, and visual utilities, promoting DRY CSS and providing quick access to common patterns.

## 5. Grid System (`public/_public-grid.scss`)

The design system includes a flexible 12-column responsive grid system built with CSS Grid. It leverages the existing semantic spacing scale for gutters and global variables for breakpoint definitions.

### 5.1 Core Concepts

* **12 Columns:** Provides a standard 12-column layout foundation.
* **CSS Grid:** Utilizes `display: grid` for robust layout capabilities.
* **Responsive:** Column spans, offsets, ordering, and visibility can be controlled across different breakpoints.
* **Semantic Gutters:** Grid gaps (gutters) are defined using keys from your semantic spacing scale (e.g., `'gutter-m'`), ensuring consistency with the rest of your spacing system. These gutters are responsive if the underlying semantic spacing value uses `clamp()`.
* **Configurable:** Offers SCSS variables to customize default behavior and control the generation of utility classes.

### 5.2 Configuration

The grid system can be configured at the beginning of `_public-grid.scss`:

* `$grid-columns: 12 !default;`
    * Defines the total number of columns in the grid.
* `$grid-default-gutter-key: 'gutter-m' !default;`
    * The default semantic spacing key (from `_s-spacing-scale.scss`) used for column gaps.
* `$grid-default-row-gutter-key: $grid-default-gutter-key !default;`
    * The default semantic spacing key for row gaps. Defaults to the column gutter key.
* `$generate-offset-classes: true !default;`
    * Set to `false` to prevent generation of `.offset-*` utility classes.
* `$generate-order-classes: true !default;`
    * Set to `false` to prevent generation of `.order-*` utility classes.
* `$generate-alignment-classes: true !default;`
    * Set to `false` to prevent generation of container alignment utility classes (`.justify-content-*`, `.align-items-*`).
* `$_grid-breakpoints: (...) !default;`
    * A map defining the breakpoints for responsive modifiers (e.g., `sm`, `md`, `lg`, `xl`).
    * **IMPORTANT:** By default, this map attempts to use values from `g-vars.$MAX_INLINE_SIZES`. These values (e.g., `73rem` for `sm`) are used as **MIN-WIDTHS**. This means `.col-sm-*` would apply when screen width is `>= 73rem`. This might be different from typical breakpoint definitions. Review and adjust this map in `_public-grid.scss` or ensure `_g-variables.scss` provides a suitable map of `min-width` values for screen tiers (e.g., `sm: 36rem, md: 48rem, ...`).

### 5.3 Public API Mixins

* `@include grid-container($gutter-key, $row-gutter-key)`
    * Applies grid container styles.
    * `$gutter-key`: Semantic spacing key for column gaps (defaults to `$grid-default-gutter-key`).
    * `$row-gutter-key`: Semantic spacing key for row gaps (defaults to `$gutter-key`).
* `@include col($span, $offset, $order, $breakpoint-key)`
    * Styles an element as a grid column. All parameters are optional.
    * `$span`: Number of columns to span (1-12, or 'auto'), or `0` to hide.
    * `$offset`: Number of columns to offset by (0 to `$grid-columns - 1`).
    * `$order`: CSS `order` property value (e.g., -1, 0, 1, 'first', 'last').
    * `$breakpoint-key`: Optional breakpoint key (e.g., `'sm'`, `'md'`) to apply these styles at a specific breakpoint.

### 5.4 Utility Classes

#### Container:
* `.grid-container`: Base class for a grid container.
* `.no-gutters`: Modifier for `.grid-container` to remove column and row gaps.
* Container Alignment (if `$generate-alignment-classes: true`):
    * `.justify-content-{value}` & `.justify-content-{bp}-{value}` (value: start, end, center, space-between, space-around, space-evenly)
    * `.align-items-{value}` & `.align-items-{bp}-{value}` (value: start, end, center, stretch, baseline)

#### Columns:
* `.col-{n}`: Spans `n` columns (e.g., `.col-6`).
* `.col-auto`: Automatically sizes the column based on content.
* `.col-hide`: Hides the column (`display: none;`).
* `.col-{bp}-{n}`: Spans `n` columns at the specified breakpoint (e.g., `.col-md-4`).
* `.col-{bp}-auto`: Auto sizes column at the breakpoint.
* `.col-{bp}-show`: Shows the column starting at the breakpoint (use with `.col-hide` for mobile-first hiding).
* `.col-{bp}-hide`: Hides the column starting at the breakpoint.

#### Offsets (if `$generate-offset-classes: true`):
* `.offset-{n}`: Offsets the column by `n` positions.
* `.offset-{bp}-{n}`: Offsets the column by `n` positions at the specified breakpoint.

#### Ordering (if `$generate-order-classes: true`):
* `.order-{n}`: Sets CSS `order` property to `n` (e.g., `.order-1`, `.order-0`).
* `.order-first`: Equivalent to `order: -1;`.
* `.order-last`: Equivalent to `order: $grid-columns + 1;` (or similar large value).
* `.order-none`: Equivalent to `order: 0;`.
* Responsive versions: `.order-{bp}-{n}`, `.order-{bp}-first`, etc.

### 5.5 HTML Usage Example

```html
<div class="grid-container justify-content-center">
  <div class="col-12 col-md-6 col-lg-4 order-md-last">
    Content Block 1 (Full width on mobile, half on medium, third on large. Last on medium+)
  </div>
  <div class="col-12 col-md-6 col-lg-4 offset-lg-1">
    Content Block 2 (Full width on mobile, half on medium. On large, offset by 1 and takes a third)
  </div>
  <div class="col-hide col-lg-show col-lg-3 order-first">
    Content Block 3 (Hidden until large screens, then shown as first item taking quarter width)
  </div>
</div>

<div class="grid-container no-gutters">
  <div class="col-6">Column A (No gutter)</div>
  <div class="col-6">Column B (No gutter)</div>
</div>
````

### 5.6 SCSS Mixin Usage Example

```scss
// components/_custom-layout.scss
@use 'path/to/public/public-grid' as grid; // Or via a main ds import

.custom-feature {
  @include grid.grid-container($gutter-key: 'gutter-s'); // Use small gutters

  .feature__sidebar {
    @include grid.col($span: 12); // Mobile: full width
    @include grid.col($span: 4, $order: -1, $breakpoint-key: 'md'); // Medium+: 4 cols, appears first
  }

  .feature__main-content {
    @include grid.col($span: 12); // Mobile: full width
    @include grid.col($span: 8, $breakpoint-key: 'md'); // Medium+: 8 cols
  }
}
```

## 6\. Key SCSS Features Used

  * **Modules (`@use ... as ...`):** For namespacing and clear dependency management.
  * **Maps (`map.get`, `map.has-key`, `map.merge`):** Extensively used for managing configurations, semantic mappings, and sets of generated responsive values.
  * **Mixins (`@mixin`) and Functions (`@function`):** For creating reusable logic, APIs, and generating dynamic CSS values like `clamp()`.
  * **Meta Functions (`meta.variable-exists`, `meta.module-variable`):** For introspection.
  * **Logical Properties:** Preferred for better internationalization and layout flexibility.
  * **CSS `clamp()`:** The cornerstone of the responsive sizing strategy, generated via the `get-clamp` utility.
  * **CSS Grid:** Used for the layout grid system.

## 7\. How to Use (Example: Spacing & Typography)

1.  **Ensure `main.scss` (or equivalent) imports the public API:**
    ```scss
    // main.scss
    @use 'global/public/public-spacing' as spacing; // Namespace for clarity
    @use 'global/public/public-typography' as typography;
    @use 'global/public/public-grid' as grid;
    // ... other imports
    ```
2.  **Apply spacing and typography in your component SCSS:**
    ```scss
    // components/_my-card.scss
    @use '../../main' as ds; // Assuming main.scss re-exports or you use direct paths
    // Alternatively:
    // @use 'path/to/global/public/public-spacing' as spacing;
    // @use 'path/to/global/public/public-typography' as typography;
    .my-card {
      // Apply 'spacing-md' padding on all sides. This will be a responsive clamp() value.
      @include ds.spacing.apply-padding('spacing-md'); //
      .my-card__title {
        // Apply 'heading-3' text style. Font size will be a responsive clamp() value.
        @include ds.typography.apply-text-style('heading-3'); //
        // Apply 'spacing-sm' margin to the bottom.
        @include ds.spacing.apply-margin('spacing-sm', bottom); //
      }
      .my-card__content {
        // Apply 'gutter-lg' padding to the block (top and bottom).
        @include ds.spacing.apply-padding('gutter-lg', block); //
        @include ds.typography.apply-text-style('body-text'); //
      }
    }
    ```
    **Note:** The actual semantic keys like `'spacing-md'`, `'gutter-lg'`, `'heading-3'`, `'body-text'` are defined in your semantic scale maps (`$_SEMANTIC_SPACING_MAPPINGS`, etc.).

## 8\. Benefits of this Approach

  * **Responsive by Default:** Spacing, typography, and grid layouts adapt fluidly to viewport changes.
  * **Clarity:** Clear separation of concerns between raw values, semantic meanings, responsive calculations, and application logic.
  * **Maintainability:** Changes to base values, viewport settings, or scaling logic in primitive/global layers propagate system-wide.
  * **Consistency:** Ensures consistent application of design tokens and responsive behavior.
  * **Scalability:** Easy to add new tokens, semantic meanings, or public APIs.
  * **Developer Experience:** Provides an intuitive API. Developers request semantic styles, and responsiveness is handled automatically.

## 9\. Architectural Considerations

  * **Unified Token Directory:** Consider unifying the top-level directories for tokens (currently `structure/` for spacing and assumed typography, potentially other token types like colors reside elsewhere or would also go here) into a single, shared directory like `core/` or `tokens/`. This improves architectural consistency as the system grows. (Reflects outstanding recommendation from Memory c8718608)

This documentation should serve as a guide for understanding, using, and extending the SCSS design system.

```
```