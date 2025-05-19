# Grid System Cheatsheet

This cheatsheet provides a quick reference for using the 12-column responsive grid system, with a focus on applying styles via SCSS mixins.

## 1. Setup

### 1.1 SCSS Import

To use the grid mixins in your SCSS files, you first need to import the public grid file. If you have a central `main.scss` or an index file for your public APIs, you might already have it forwarded.

```scss
// Example: Directly importing the grid
@use 'path/to/your/design-system/public/public-grid' as grid;

// Example: If your main.scss forwards public APIs
// @use 'path/to/your/design-system/main' as ds;
// Then use ds.grid.grid-container() or ds.grid.col()
2. Core Concepts12 Columns: The grid is based on a 12-column layout.Breakpoints: The grid uses two primary breakpoints for responsive modifiers:tablet: Applies styles from the tablet min-width defined in _u-breakpoints.scss (e.g., 48rem).desktop: Applies styles from the desktop min-width defined in _u-breakpoints.scss (e.g., 64rem).Mobile-First: Styles applied without a breakpoint key in mixins are mobile-first. Base styles should target mobile, and then layer tablet/desktop styles.Gutters: Column and row gaps are controlled by semantic spacing keys (e.g., gutter-m) from your _s-spacing-scale.scss file. These gutters are responsive if the underlying semantic spacing value uses clamp().Mixins vs. Utility Classes: This system uses a u_mixtend utility which generates both SCSS mixins (for @include) and corresponding CSS utility classes. This cheatsheet focuses on the mixin-based approach for styling directly within your SCSS. Utility classes can be used in HTML for rapid prototyping or when SCSS compilation isn't practical for a specific element.3. SCSS Mixins (Primary Usage)3.1 grid-containerApplies CSS Grid container properties.@mixin grid.grid-container(
  $gutter-key: $grid-default-gutter-key, // Default: gutter-m
  $row-gutter-key: $grid-default-row-gutter-key // Default: same as $gutter-key
) { /* ... */ }
$gutter-key (String): Semantic spacing key for column gaps.$row-gutter-key (String | Null): Semantic spacing key for row gaps. If null or not provided, it uses the value of $gutter-key.Example SCSS:.my-custom-layout {
  @include grid.grid-container; // Uses default gutters
}

.another-layout {
  @include grid.grid-container($gutter-key: gutter-s, $row-gutter-key: gutter-xs);
}

.no-gutter-layout {
  @include grid.grid-container; // Apply base container
  @include grid.no-gutters;     // Then include the no-gutters mixin
                                // (Note: .no-gutters utility class is also generated)
}
3.2 colStyles an element as a grid column with options for span, offset, order, and responsiveness.@mixin grid.col(
  $span: null,
  $offset: null,
  $order: null,
  $breakpoint-key: null
) { /* ... */ }
$span (Number | Keyword | Null):Number (1-12): Number of columns to span.auto: Column sizes based on its content.0: Hides the column (display: none).$offset (Number | Null): Number of columns to offset from the start (0-11).$order (Number | String | Null): CSS order property value (e.g., -1, 0, 5).$breakpoint-key (String | Null): Optional breakpoint key (tablet or desktop) to apply these styles at and above that breakpoint.Example SCSS:.sidebar {
  // Mobile: Full width
  @include grid.col($span: 12);

  // Tablet and up: Span 4 columns and appear first
  @include grid.col($span: 4, $order: -1, $breakpoint-key: tablet);
}

.main-content {
  // Mobile: Full width
  @include grid.col($span: 12);

  // Tablet and up: Span 8 columns
  @include grid.col($span: 8, $breakpoint-key: tablet);

  // Desktop and up: Span 6 columns, offset by 1
  @include grid.col($span: 6, $offset: 1, $breakpoint-key: desktop);
}

.hidden-item {
    @include grid.col($span: 0); // Hides the column
}

.auto-sized-item {
    @include grid.col($span: auto, $breakpoint-key: tablet); // Auto size on tablet and up
}
4. Applying Grid Styles (Focus on Mixins)While utility classes are generated, the focus here is on using mixins for styling within SCSS.4.1 ContainerUse the grid.grid-container mixin. For a container without gutters, you can use the grid.no-gutters mixin..my-grid {
  @include grid.grid-container($gutter-key: gutter-l);
}

.my-tight-grid {
  @include grid.grid-container; // Base container
  @include grid.no-gutters;     // Remove gutters
}
(Utility classes .grid-container and .no-gutters are also available for direct HTML use.)4.2 Column SpansUse the grid.col mixin with the $span parameter..article-body {
  // Mobile: Full width
  @include grid.col($span: 12);
  // Tablet and up: 8 columns
  @include grid.col($span: 8, $breakpoint-key: tablet);
  // Desktop and up: 6 columns
  @include grid.col($span: 6, $breakpoint-key: desktop);
}

.visually-hidden-element {
    @include grid.col($span: 0); // Hides via display: none
}

.content-fit-column {
    @include grid.col($span: auto);
}
(Utility classes like .col-12, .col-tablet-8, .col-hide, .col-auto are also available.)4.3 OffsetsUse the grid.col mixin with the $offset parameter..centered-content {
  // Mobile: Full width
  @include grid.col($span: 12);

  // Tablet and up: Span 6 columns, offset by 3 to center
  @include grid.col($span: 6, $offset: 3, $breakpoint-key: tablet);
}
(Utility classes like .offset-tablet-3 are also available.)4.4 OrderingUse the grid.col mixin with the $order parameter..image-block {
  // Mobile: Order 2
  @include grid.col($order: 2);
  // Tablet and up: Order 1
  @include grid.col($order: 1, $breakpoint-key: tablet);
}

.text-block {
  // Mobile: Order 1
  @include grid.col($order: 1);
  // Tablet and up: Order 2
  @include grid.col($order: 2, $breakpoint-key: tablet);
}
(Utility classes like .order-1, .order-tablet-first are also available. The u_mixtend system generates mixins like @include order-1; and @include order-tablet-first; as well.)4.5 Container AlignmentThe u_mixtend system generates mixins for alignment properties..my-aligned-grid {
  @include grid.grid-container; // Base container
  @include grid.justify-content-center; // Center columns horizontally

  // Align items to the start vertically on tablet and up
  @include grid.align-items-start($breakpoint-key: tablet);
}
(Utility classes like .justify-content-center and .align-items-tablet-start are also available. The u_mixtend system generates corresponding mixins like @mixin justify-content-center { ... } and @mixin align-items-tablet-start { ... } which can be included.)To use the responsive alignment mixins, you would typically include the specific mixin generated by u_mixtend. For example, if _public-grid.scss generates @include u_mixtend.create-mixtend('justify-content-tablet-center'), you would use @include grid.justify-content-tablet-center;. The col mixin itself doesn't handle container alignment.Corrected Mixin Usage for Alignment (assuming generated mixins):.my-aligned-grid {
  @include grid.grid-container;

  // Assuming u_mixtend created these mixins:
  // For base alignment (mobile-first)
  // @include grid.justify-content-center;
  // @include grid.align-items-start;

  // For responsive alignment
  // @include grid.justify-content-tablet-between;
  // @include grid.align-items-desktop-end;
}
Refer to the generated mixin names from _public-grid.scss for exact alignment mixin usage. The _generate-property-value-classes mixin in _public-grid.scss creates these. For example, @include u-mixtend.create-mixtend('justify-content-center') makes @mixin justify-content-center available (namespaced by your import).5. Structure Example: SCSS Mixins ApproachHere's how you might structure the HTML and apply styles using SCSS mixins for a common layout.HTML:<div class="feature-layout">
  <div class="feature-layout__main-content">
    Content Block 1
  </div>
  <div class="feature-layout__sidebar">
    Content Block 2
  </div>
  <div class="feature-layout__auxiliary-info">
    Content Block 3 (Desktop only)
  </div>
</div>

<div class="simple-row">
  <div class="simple-row__item">Column A (No gutter)</div>
  <div class="simple-row__item">Column B (No gutter)</div>
</div>
SCSS using Mixins:@use 'path/to/your/design-system/public/public-grid' as grid;

.feature-layout {
  @include grid.grid-container($gutter-key: gutter-m); // Example gutter

  &__main-content {
    @include grid.col($span: 12); // Mobile: full width
    @include grid.col($span: 6, $order: 2, $breakpoint-key: tablet); // Tablet: half width, second
    @include grid.col($span: 4, $order: 2, $breakpoint-key: desktop); // Desktop: third width, second
  }

  &__sidebar {
    @include grid.col($span: 12); // Mobile: full width
    @include grid.col($span: 6
