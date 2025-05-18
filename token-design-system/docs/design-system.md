# SCSS Design System Documentation

## 1. Overview

This document outlines the structure, conventions, and usage of the SCSS-based token design system. The system is built with a layered approach, promoting scalability, maintainability, and ease of use. It heavily utilizes Sass modules (`@use`) for clear dependency management and namespacing. It features a robust responsive sizing system for both spacing and typography, powered by a custom `get-clamp` utility.

## 2. Directory Structure

The design system's core SCSS files are organized as follows (assuming a base path like `your-project/src/scss/` or `token-design-system/`):

```
.
├── global/                        # Global configurations and utilities
│   ├── _g-variables.scss          # Global Sass variables (e.g., viewport widths, type scale ratios, base font size for clamp)
│   │
│   ├── structure/                 # Core structural definitions
│   │   ├── primitive/             # Raw, unopinionated design tokens and systems
│   │   │   ├── _p-spacing-scale.scss # Generates base spacing values (min/max) for different scale steps
│   │   │   └── _p-typography-scale.scss  # Primitive typography (base font sizes for min/max, families, etc.)
│   │   │   └── ...                # Other primitive systems (colors, etc.)
│   │   └── semantic/              # Meaningful aliases and responsive calculations for primitive tokens
│   │       ├── _s-spacing-scale.scss # Defines semantic responsive spacing variables using get-clamp()
│   │       └── _s-typography-scale.scss    # Defines semantic responsive typography styles using get-clamp()
│   │       └── ...                # Other semantic layers
│   │
│   ├── public/                    # Public-facing API (mixins and functions)
│   │   ├── _public-spacing.scss   # Mixins for applying responsive spacing (apply-padding, apply-margin)
│   │   └── _public-typography.scss # Mixins/functions for applying responsive typography styles (apply-text-style)
│   │   └── ...                # Other public APIs
│   │
│   └── utils/                     # Utility functions and mixins
│       ├── _u-clamp.scss          # Utility function `get-clamp()` for generating CSS clamp() strings
│       ├── _u-mixtend.scss        # Utility for placeholder selectors and common mixins for layout, responsive, etc.
│
└── main.scss                      # Main SCSS file that imports and orchestrates the system
```

**Note on User's Current Path:** The user's current workspace is `c:\Users\benmo\Downloads\token-design-system\token-design-system\`. The paths in this document are relative to this root.

## 3. Naming Conventions

*   **Files:** SCSS partials are prefixed with an underscore (e.g., `_g-variables.scss`).
    *   `_g-`: Global scope (e.g., `_g-variables.scss`).
    *   `_p-`: Primitive layer (e.g., `_p-spacing-scale.scss`).
    *   `_s-`: Semantic layer (e.g., `_s-spacing-scale.scss`).
    *   `_public-`: Public API layer (e.g., `_public-spacing.scss`).
    *   `_u-`: Utility files (e.g., `_u-clamp.scss`).
*   **Maps:**
    *   !!! NO STRING VALUES ALLOWED IN MAPS !!! (This seems like a specific project rule, keeping it).
    *   Semantic mapping variables like `$_SEMANTIC_SPACING_MAPPINGS` and responsive value maps like `$RESPONSIVE_SPACING_VALUES` are uppercase with underscores.
*   **Variables:**
    *   Global configuration maps are often uppercase with underscores (e.g., `$_TYPE_SCALE_RATIOS`, `$PAGE_MIN_INLINE`).
    *   Private variables within a module (not intended for direct external use) can be prefixed with an underscore (e.g., `$_SPACING_CONFIG_DEFAULT`).
    *   Publicly exported semantic variables (like those in `$RESPONSIVE_SPACING_VALUES`) use kebab-case keys (e.g., `'spacing-xs'`, `'gutter-m'`). Helper functions like `get-responsive-spacing()` are used to access them.
*   **Mixins & Functions:**
    *   Public API mixins/functions: `apply-<property>` (e.g., `apply-padding`, `apply-text-style`).
    *   Utility functions/mixins:
        *   Prefixes like `get-`, `create-`, `is-` are common (e.g., `get-clamp`, `get-responsive-spacing`).
        *   The primary clamp utility is `get-clamp`.
    *   Private helper functions/mixins within modules can be prefixed with an underscore.

## 4. SCSS Flow & Layer Architecture

The system follows a one-way data flow: `Global -> Primitive -> Semantic -> Public API`. Responsive values are generated at the Semantic layer using utilities.

1.  **Global Layer (`global/_g-variables.scss`)**
    *   Defines foundational configurations used across multiple systems.
    *   Examples:
        *   `$PAGE_MIN_INLINE`, `$PAGE_MAX_INLINE`: Define minimum and maximum viewport widths for responsive calculations via `get-clamp`.
        *   `$CLAMP_BASE_FONT_SIZE`: Base font size (typically 16, configurable in `_g-variables.scss`) used by `get-clamp` for `rem` conversions.
        *   Type scale ratios, color palettes, etc.
2.  **Primitive Layer (`global/structure/primitive/`)**
    *   Generates raw, unopinionated design tokens or base system logic. These serve as the foundational values for responsive calculations.
    *   **`_p-spacing-scale.scss`**:
        *   Uses a base spacing unit and a scale (e.g., type scale ratio) to generate a map of spacing values (e.g., `$PRIMITIVE_SPACING_SCALE`).
        *   This map contains numeric or named keys (e.g., `0, 12, 25, 50, 100, 200` or `s1, s2, s3`) mapped to calculated `rem` values.
        *   These values represent the *minimum* and *maximum* sizes for use with the `get-clamp` function in the semantic layer.
    *   **`_p-typography-scale.scss`**:
        *   Defines base font families, font weights.
        *   Generates maps of font sizes (e.g., `$PRIMITIVE_FONT_SIZES`) and potentially line heights based on type scales.
        *   These font sizes serve as the *minimum* and *maximum* values for responsive typography generated by `get-clamp` in the semantic layer.
3.  **Semantic Layer (`global/structure/semantic/`)**
    *   Provides meaningful aliases for primitive tokens and orchestrates the generation of responsive CSS `clamp()` values.
    *   **`_s-spacing-scale.scss`**:
        *   Imports primitive spacing values from `_p-spacing-scale.scss`, the `get-clamp` utility from `_u-clamp.scss`, and global viewport variables from `_g-variables.scss`.
        *   Defines `$_SEMANTIC_SPACING_MAPPINGS`: A map associating semantic names (e.g., 'spacing-xs', 'gutter-m') with keys from the primitive spacing scale for both mobile (min) and desktop (max) values.
        *   Defines `$_CLAMP_MIN_VIEWPORT` and `$_CLAMP_MAX_VIEWPORT` using global variables (e.g., `g-vars.$PAGE_MIN_INLINE`, `g-vars.$PAGE_MAX_INLINE`).
        *   Generates `$RESPONSIVE_SPACING_VALUES`: A map where keys are semantic names and values are CSS `clamp()` strings. These are calculated using the `get-clamp` function with min/max values derived from the primitive scale (via mappings) and the configured viewport widths.
        *   Includes a helper function `get-responsive-spacing($semantic-name)` to retrieve specific `clamp()` values from `$RESPONSIVE_SPACING_VALUES`.
    *   **`_s-typography-scale.scss`**:
        *   Mirrors the logic of `_s-spacing-scale.scss` for typography.
        *   Imports primitive font sizes from `_p-typography-scale.scss`, `get-clamp` from `_u-clamp.scss`, and global viewport/font-size variables from `_g-variables.scss`.
        *   Defines semantic typography mappings (e.g., 'heading-1', 'body-text') linking them to primitive font size keys for min and max values.
        *   Generates a map (e.g., `$RESPONSIVE_TYPOGRAPHY_STYLES`) where keys are semantic style names and values include `font-size: clamp(...)`, and potentially `line-height: clamp(...)` if responsive line height is also implemented. Font family and weight are typically applied directly from semantic mappings.
4.  **Public API Layer (`global/public/`)**
    *   Exposes user-friendly mixins and functions for applying styles in components. This is the primary interface for developers using the design system, now providing responsive styles by default.
    *   **`_public-spacing.scss`**:
        *   Provides mixins like `apply-padding($semantic-name, $side: null)` and `apply-margin($semantic-name, $side: null)`.
        *   These mixins accept a semantic name (e.g., `'spacing-xs'`, `'gutter-m'`) and an optional side.
        *   They use `get-responsive-spacing()` from `_s-spacing-scale.scss` to fetch the corresponding `clamp()` CSS value and apply it using logical properties.
    *   **`_public-typography.scss`**:
        *   Provides an `apply-text-style($style-key)` mixin.
        *   This mixin accepts a semantic style key (e.g., `'heading-1'`, `'body-text'`).
        *   It applies the corresponding responsive `font-size` (a `clamp()` value) and other properties like `font-family`, `font-weight`, and `line-height` defined in or derived from `_s-typography-scale.scss`.
5.  **Utilities Layer (`global/utils/`)**
    *   Contains general-purpose helper functions and mixins.
    *   **`_u-clamp.scss`**:
        *   Provides the core `get-clamp($min-value, $max-value, $min-viewport, $max-viewport)` function.
        *   **Purpose:** Generates a CSS `clamp()` string for fluid typography or spacing.
        *   **Parameters:**
            *   `$min-value`: Minimum value (accepts unitless, px, or rem).
            *   `$max-value`: Maximum value (accepts unitless, px, or rem).
            *   `$min-viewport`: Viewport width at which the `$min-value` applies (accepts unitless, px, or rem).
            *   `$max-viewport`: Viewport width at which the `$max-value` applies (accepts unitless, px, or rem).
        *   **Output:** A string in the format `clamp(min_rem, preferred_rem_vw, max_rem)` (e.g., `clamp(1rem, 0.5rem + 2.5vw, 2rem)`).
        *   **Details:** It uses a global `$CLAMP_BASE_FONT_SIZE` (default 16, configurable in `_g-variables.scss`) for `rem` conversions, handles unit conversions, and edge cases (e.g., min-value > max-value).
    *   **`_u-mixtend.scss`**:
        *   Contains reusable placeholder selectors (e.g., `%visually-hidden`) and common utility mixins.
        *   These can cover typography, layout, spacing, responsive helpers, and visual utilities, promoting DRY CSS and providing quick access to common patterns.

## 5. Key SCSS Features Used

*   **Modules (`@use ... as ...`):** For namespacing and clear dependency management.
*   **Maps (`map.get`, `map.has-key`, `map.merge`):** Extensively used for managing configurations, semantic mappings, and sets of generated responsive values.
*   **Mixins (`@mixin`) and Functions (`@function`):** For creating reusable logic, APIs, and generating dynamic CSS values like `clamp()`.
*   **Meta Functions (`meta.variable-exists`, `meta.module-variable`):** For introspection.
*   **Logical Properties:** Preferred for better internationalization and layout flexibility.
*   **CSS `clamp()`:** The cornerstone of the responsive sizing strategy, generated via the `get-clamp` utility.

## 6. How to Use (Example: Spacing)

1.  **Ensure `main.scss` (or equivalent) imports the public API:**
    ```scss
    // main.scss
    @use 'global/public/public-spacing' as spacing; // Namespace for clarity
    @use 'global/public/public-typography' as typography;
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
      @include ds.spacing.apply-padding('spacing-md');
      .my-card__title {
        // Apply 'heading-3' text style. Font size will be a responsive clamp() value.
        @include ds.typography.apply-text-style('heading-3');
        // Apply 'spacing-sm' margin to the bottom.
        @include ds.spacing.apply-margin('spacing-sm', bottom);
      }
      .my-card__content {
        // Apply 'gutter-lg' padding to the block (top and bottom).
        @include ds.spacing.apply-padding('gutter-lg', block);
        @include ds.typography.apply-text-style('body-text');
      }
    }
    ```
    **Note:** The actual semantic keys like `'spacing-md'`, `'gutter-lg'`, `'heading-3'`, `'body-text'` are defined in your semantic scale maps (`$_SEMANTIC_SPACING_MAPPINGS`, etc.).

## 7. Benefits of this Approach

*   **Responsive by Default:** Spacing and typography adapt fluidly to viewport changes.
*   **Clarity:** Clear separation of concerns between raw values, semantic meanings, responsive calculations, and application logic.
*   **Maintainability:** Changes to base values, viewport settings, or scaling logic in primitive/global layers propagate system-wide.
*   **Consistency:** Ensures consistent application of design tokens and responsive behavior.
*   **Scalability:** Easy to add new tokens, semantic meanings, or public APIs.
*   **Developer Experience:** Provides an intuitive API. Developers request semantic styles, and responsiveness is handled automatically.

## 8. Architectural Considerations

*   **Unified Token Directory:** Consider unifying the top-level directories for tokens (currently `structure/` for spacing and assumed typography, potentially other token types like colors reside elsewhere or would also go here) into a single, shared directory like `core/` or `tokens/`. This improves architectural consistency as the system grows. (Reflects outstanding recommendation from Memory c8718608)

This documentation should serve as a guide for understanding, using, and extending the SCSS design system.