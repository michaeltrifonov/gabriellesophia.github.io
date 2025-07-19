# Egret Case Study Content Audit Prompt

## Task Overview
You are tasked with auditing and updating the Egret case study content in the Astro portfolio to ensure it matches the original HTML version. The Tailorbird case study has been completed and serves as a reference for the expected quality and approach.

## Files to Work With
- **Current MDX file**: `/Users/gabbyloeff/portfolio/portfolio_structure/astro-portfolio/src/content/case-studies/egret.mdx`
- **Original HTML reference**: `/Users/gabbyloeff/portfolio/portfolio_structure/case-studies/egret.html`
- **Case study CSS**: `/Users/gabbyloeff/portfolio/portfolio_structure/astro-portfolio/src/styles/case-studies/egret.css` (create if doesn't exist)

## Important Context and Guidelines

### 1. DO NOT MODIFY
- Global layout files (BaseLayout.astro, CaseStudyLayout.astro)
- Base CSS files (case-study.css, components.css, theme.css, layout.css)
- Header/Footer components
- Navigation structure
- Any responsive breakpoints or container widths

### 2. Content Parity Requirements
- Every section from the original HTML must be present in the MDX
- All images, text, data visualizations must match exactly
- Interactive components should be preserved or recreated
- Maintain the same visual hierarchy and information architecture

### 3. Established Patterns to Follow

#### Section Structure
```jsx
<section id="section-name" class="cs-section">
  <div class="container">
    <div class="cs-section-grid">
      <div class="cs-sidebar">
        <h2 class="cs-sidebar-title" data-section-id="section-name">Section Title</h2>
      </div>
      <div class="cs-content">
        <!-- Content here -->
      </div>
    </div>
  </div>
</section>
```

#### Common Components Already Available
- **Highlight blocks**: For "How might we" questions
  ```jsx
  <div class="cs-highlight-block">
    <div class="cs-highlight-icon"><!-- SVG icon --></div>
    <div class="cs-highlight-content"><p>Content</p></div>
  </div>
  ```

- **Method/Challenge cards**: 
  ```jsx
  <div class="cs-methods">
    <div class="cs-method">
      <div class="cs-method-icon"><!-- SVG --></div>
      <div class="cs-method-content">
        <h4>Title</h4>
        <p>Description</p>
      </div>
    </div>
  </div>
  ```

- **Metrics display**:
  ```jsx
  <div class="cs-metrics">
    <div class="cs-metric">
      <div class="cs-metric-value">XX%</div>
      <div class="cs-metric-label">Label<br /><span>Additional info</span></div>
    </div>
  </div>
  ```

- **Personas**: Use `cs-persona` class structure (see Tailorbird for reference)
- **Image captions**: Use `<p class="cs-caption">Caption text</p>`

### 4. Interactive Components
Egret has two interactive components already imported:
- `CommentingPanel` - for demonstrating the commenting system
- `HistoryPanel` - for showing the history tracking feature

These should be placed appropriately within the content with proper captions.

### 5. CSS Guidelines
- Keep case-study-specific CSS under ~1000 lines
- Reuse existing patterns where possible
- Follow BEM-like naming: `cs-[component]-[element]`
- Avoid inline styles unless absolutely necessary
- Use CSS variables for colors (--color-primary, etc.)

### 6. Image Handling
- All images should be in `/public/images/Egret/`
- Use relative paths starting with `/images/Egret/`
- Preserve original image names from the HTML
- Add alt text for accessibility

### 7. Specific Things to Check
1. **Problem Statement**: Ensure it includes all pain points and challenges
2. **User Groups/Personas**: Should have detailed breakdown of all user types
3. **Approach/Solution**: Include all design decisions and rationale
4. **Testing/Research**: Preserve all metrics and methodologies
5. **Outcomes/Impact**: Keep all statistics and achievements
6. **Visual Assets**: Every chart, diagram, or screenshot from original

### 8. Quality Checklist
- [ ] All sections from original HTML are present
- [ ] All images are correctly referenced and displayed
- [ ] Interactive components work properly
- [ ] Metrics and data match exactly
- [ ] Visual hierarchy is maintained
- [ ] No content is missing or abbreviated
- [ ] Captions are styled consistently
- [ ] Responsive behavior works correctly

### 9. Common Pitfalls to Avoid
- Don't abbreviate or summarize content - keep it complete
- Don't skip "minor" sections - everything should be included
- Don't use generic placeholder text - use the exact original content
- Don't forget image captions and attributions
- Don't break the established grid layout system

### 10. Development Approach
1. First, thoroughly compare the current MDX with the original HTML
2. Make a list of all missing sections and content
3. Add missing content section by section
4. Create any needed case-study-specific styles in egret.css
5. Test all interactive components
6. Verify responsive behavior
7. Do a final check against the original

## Note on Password Protection
Egret is marked as password protected in the MDX frontmatter. The password functionality is handled at the layout level, so you don't need to implement this - just preserve the comment about it.

## Expected Outcome
The Egret case study should have complete content parity with the original HTML while following the established design system and component patterns. It should look and function identically to the original while being properly integrated into the new Astro/MDX structure.

## Additional Context from Previous Work

### Typography Classes
- `cs-large-text` - For intro paragraphs (1.25rem)
- `cs-subtitle` - For section subheadings
- `cs-caption` - For image/component captions (italic, centered)
- `cs-note-block` - For highlighted note sections

### Spacing Patterns
- Sections use consistent padding
- Images should have proper bottom margin/padding when stacked
- Grid gaps are standardized

### Color Usage
- Primary blue: #0050FF (--color-primary)
- Use existing color variables, not hard-coded values
- Icon containers often use rgba(0, 80, 255, 0.1) background

### Known Issues Fixed in Other Case Studies
- SVG attributes in JSX need kebab-case (stroke-width not strokeWidth)
- Comments in MDX use {/* */} not <!-- -->
- Inline styles use double curly braces: style={{property: 'value'}}
- React components need client:visible or client:load directives

### Development Tips
1. Use the Task tool for complex searches if needed
2. Always Read files before Edit
3. Test one section at a time
4. Keep the browser DevTools open to check for errors
5. Pay attention to console warnings about missing images

### Project Philosophy
The goal is pixel-perfect recreation of the original designs while maintaining clean, maintainable code. When in doubt, check how Tailorbird handled similar patterns. The emphasis is on preserving ALL original content, not creating a "cleaned up" or abbreviated version.