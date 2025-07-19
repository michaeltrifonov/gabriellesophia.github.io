# Astro Portfolio Hydration Strategy

## Overview

This document defines the standardized hydration strategy for all interactive components in the Astro portfolio.

## Hydration Directives

### `client:load`
**Use for:** Critical interactive components that must be immediately available
- **Header** - Navigation must be interactive immediately
- **Hero** - Main CTA and interactions above the fold
- **ContactForm** - Critical functionality that users expect to work immediately

### `client:visible`
**Use for:** Components that become interactive when they enter the viewport
- **ProjectCard** - Consistent across all pages for predictable behavior
- **PhilosophyCard** - Below fold on homepage
- **TimelineEntry** - Career timeline interactions
- **SkillItem** - Skills list interactions
- **Case Study Components** - Charts, panels, and interactive demos

### `client:idle`
**Use for:** Nice-to-have interactions that can wait until the browser is idle
- Currently not used after standardization

### `client:only`
**Use for:** Components that should only render on the client
- Not currently needed in this portfolio

### `client:media`
**Use for:** Components that only need interactivity at certain breakpoints
- Consider for mobile-only or desktop-only interactive features

## Component Guidelines

1. **Consistency**: The same component should use the same hydration strategy across all pages
2. **Performance**: Minimize the number of `client:load` components
3. **User Experience**: Ensure critical interactions are available when users expect them
4. **Progressive Enhancement**: Components should have meaningful static content before hydration

## Implementation Checklist

- [ ] Header: `client:load`
- [ ] Hero: `client:load`
- [ ] ContactForm: `client:load`
- [ ] ProjectCard: `client:visible` (all instances)
- [ ] PhilosophyCard: `client:visible`
- [ ] TimelineEntry: `client:visible`
- [ ] SkillItem: `client:visible`
- [ ] Interactive Case Study Components: `client:visible`