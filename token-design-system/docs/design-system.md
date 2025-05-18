# SCSS Design System Documentation

## 1. Overview

This document outlines the structure, conventions, and usage of the SCSS-based token design system. The system is built with a layered approach, promoting scalability, maintainability, and ease of use. It heavily utilizes Sass modules (`@use`) for clear dependency management and namespacing.

## 2. Directory Structure

The design system's core SCSS files are organized as follows (assuming a base path like `your-project/src/scss/` or `token-design-system/`):

```
.
├── global/                        # Global configurations and utilities
│   ├── _g-variables.scss          # Global Sass variables (e.g., type scale ratios, breakpoints)
│   │
│   ├── structure/                 # Core structural definitions
│   │   ├── primitive/             # Raw, unopinionated design tokens and systems
│   │   │   ├── _p-spacing-scale.scss # Generates spacing values based on a scale
│   │   │   └── _p-typography-*.scss  # Primitive typography (font sizes, families, etc.)
│   │   │   └── ...                # Other primitive systems (colors, etc.)
│   │   └── semantic/              # Meaningful aliases for primitive tokens
│   │       ├── _s-spacing-scale.scss # Defines semantic spacing variables (e.g., $space-sm)
│   │       └── _s-typography.scss    # Defines semantic typography variables (e.g., $font-size-heading-1)
│   │       └── ...                # Other semantic layers
│   │
│   ├── public/                    # Public-facing API (mixins and functions)
│   │   ├── _public-spacing.scss   # Mixins for applying spacing (apply-padding, apply-margin)
│   │   └── _public-typography.scss # Mixins/functions for applying typography styles
│   │   └── ...                # Other public APIs
│   │
│   └── utils/                     # Utility functions and mixins
│       ├── _u-clamp.scss          # Utility for generating CSS clamp()
│       ├── _u-mixtend.scss        # Utility for placeholder selectors and common mixins
│       └── ...                # Other general utilities
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
*   **Variables:**
    *   Global configuration maps are often uppercase with underscores (e.g., `$_TYPE_SCALE_RATIOS`).
    *   Private variables within a module (not intended for direct external use) can be prefixed with an underscore (e.g., `$_SPACING_CONFIG_DEFAULT`).
    *   Publicly exported variables (like semantic tokens) use a clear, descriptive naming (e.g., `$space-sm`, `$font-body`).
*   **Mixins & Functions:**
    *   Public API mixins/functions: `apply-<property>` (e.g., `apply-padding`) or descriptive names.
    *   Utility functions/mixins: `u-<name>` (e.g., `u-clamp`).
    *   Private helper functions/mixins within modules can be prefixed with an underscore.

## 4. SCSS Flow & Layer Architecture

The system follows a one-way data flow: `Global -> Primitive -> Semantic -> Public API`.

1.  **Global Layer (`global/_g-variables.scss`)**
    *   Defines foundational configurations used across multiple systems.
    *   Example: `$_TYPE_SCALE_RATIOS` map defines various typographic scales (minor-third, perfect-fourth, etc.). This map is crucial for both typography and the spacing system to ensure consistency.

2.  **Primitive Layer (`global/structure/primitive/`)**
    *   Generates raw, unopinionated design tokens or base system logic.
    *   **`_p-spacing-scale.scss`**:
        *   Uses a base spacing unit (e.g., `1rem`) and a selected type scale ratio (from `_g-variables.scss`) to generate a map of spacing values (e.g., `$SPACING_VALUES_DEFAULT`).
        *   This map contains numeric keys (e.g., `0, 12, 25, 50, 100, 200 ...`) mapped to calculated `rem` values.
    *   **`_p-typography-*.scss`**: (Conceptual, based on existing files)
        *   Defines base font families, font weights, and functions to generate font size and line height maps based on type scales.

3.  **Semantic Layer (`global/structure/semantic/`)**
    *   Provides meaningful aliases for the primitive tokens. This layer bridges the gap between raw values and their intended use.
    *   **`_s-spacing-scale.scss`** (formerly `_s-spacing.scss`):
        *   Imports the `$SPACING_VALUES_DEFAULT` map from `_p-spacing-scale.scss`.
        *   Defines human-readable variables that map to values from this map (e.g., `$space-xs: map.get(p_spacing.$SPACING_VALUES_DEFAULT, 50);`).
        *   Includes generic sizes (`$space-xs`, `$space-md`) and contextual sizes (`$space-inset-sm`, `$space-stack-md`).
    *   **`_s-typography.scss`**:
        *   Defines variables for specific typographic styles like `$font-size-heading-1`, `$font-body-text`, potentially combining primitive font size, weight, and family tokens.

4.  **Public API Layer (`global/public/`)**
    *   Exposes user-friendly mixins and functions for applying styles in components. This is the primary interface for developers using the design system.
    *   **`_public-spacing.scss`**:
        *   Provides mixins like `apply-padding($size-key, $side: null)` and `apply-margin($size-key, $side: null)`.
        *   These mixins accept a semantic size key (e.g., `xs`, `md`, `inset-sm`) and an optional side (e.g., `top`, `block`, `inline`).
        *   They fetch the corresponding semantic variable (e.g., `$space-xs`) and apply the CSS using logical properties (`padding-block-start`, `margin-inline-end`).
    *   **`_public-typography.scss`**: (Conceptual)
        *   Would provide mixins like `apply-text-style($style-key)` to apply predefined semantic typographic styles.

5.  **Utilities Layer (`global/utils/`)**
    *   Contains general-purpose helper functions and mixins.
    *   **`_u-clamp.scss`**: Provides a `u-clamp($min, $preferred, $max)` function to generate CSS `clamp()` values for fluid typography/spacing.
    *   **`_u-mixtend.scss`**: Contains reusable placeholder selectors (e.g., `%visually-hidden`, `%clearfix`) and mixins to apply them, promoting DRY CSS.

## 5. Key SCSS Features Used

*   **Modules (`@use ... as ...`):** For namespacing and clear dependency management. All internal variables/mixins/functions from an imported module are accessed via its namespace (e.g., `p_spacing.$SPACING_VALUES_DEFAULT`, `meta.module-variable()`).
*   **Maps (`map.get`, `map.has-key`, `map.merge`):** Extensively used for managing configurations and sets of related values (e.g., type scales, spacing steps, generated values).
*   **Mixins (`@mixin`) and Functions (`@function`):** For creating reusable logic and APIs.
*   **Meta Functions (`meta.variable-exists`, `meta.module-variable`):** For introspection, allowing mixins to dynamically check for and use variables from other modules.
*   **Logical Properties:** CSS logical properties (e.g., `padding-block-start`, `margin-inline-end`) are preferred for better internationalization and layout flexibility.

## 6. How to Use (Example: Spacing)

1.  **Ensure `main.scss` (or equivalent) imports the public API:**
    ```scss
    // main.scss
    @use 'global/public/public-spacing'; // No namespace needed if only using mixins
    // or
    // @use 'global/public/public-spacing' as spacing; // If you prefer to namespace mixin calls

    // ... other imports
    ```

2.  **Apply spacing in your component SCSS:**
    ```scss
    // components/_my-card.scss
    @use '../../main' as ds; // Or directly use 'global/public/public-spacing'

    .my-card {
      // Apply medium padding on all sides
      @include ds.apply-padding(md);
      // Or if public-spacing was imported without 'as':
      // @include apply-padding(md);

      .my-card__title {
        // Apply small margin to the bottom
        @include ds.apply-margin(sm, bottom);
      }

      .my-card__content {
        // Apply 'inset-lg' padding to the block (top and bottom)
        @include ds.apply-padding(inset-lg, block);
      }
    }
    ```

## 7. Benefits of this Approach

*   **Clarity:** Clear separation of concerns between raw values, semantic meanings, and application logic.
*   **Maintainability:** Changes to the underlying scale or base values in the primitive layer automatically propagate through the system without needing to update every component.
*   **Consistency:** Ensures consistent application of design tokens.
*   **Scalability:** Easy to add new tokens, semantic meanings, or public APIs.
*   **Developer Experience:** Provides an intuitive API for developers to consume the design system.

This documentation should serve as a guide for understanding, using, and extending the SCSS design system.