# Style Guide

## Folder Structure

### App Folder Structure

```
src/
    app/
    components/
    hooks/
    modules/
    types/
    config/
    utils/
    styles/
    __tests__/
```

- `/src/app/` : All routes and route-specific UI
- `/src/components/` : Shared UI React components like `NavBar`, `ProductCard`
- `/src/hooks/` : Shared hooks like `useCart`
- `/src/modules/` : Functions associated with a module like collection, cart, checkout
- `/src/types/` : Shared types and interfaces
- `/src/config/` : App level configs
- `/src/utils/` : Functions that are project agnostic. The functions here could be used in other projects as well without any change. Eg: `formatCurrency()`, `dateDiff()`, `getUniqueValues()`
- `/src/styles/` : Global styles, CSS variables
- `/src/__tests__` : Test cases

The `components` folder can further be divided:

```
src/
  app/

  components/
    base/                      # low-level primitives (usually wrapping design system)
      button/
        Button.tsx
        index.ts             # re-export, so imports stay clean
        button.types.ts      # optional: local types/variants
        button.scss          # or .module.css / .ts styles if needed

      input/
        Input.tsx
        index.ts
        input.types.ts

      select/
        Select.tsx
        index.ts

      textarea/
        Textarea.tsx
        index.ts

      checkbox/
        Checkbox.tsx
        index.ts

    blocks/
      login-form/
        LoginForm.tsx
        index.ts
      profile-form/
        ProfileForm.tsx
        index.ts
```

### React Component Folder Structure

```
component-name/
    ComponentName.tsx
    ComponentName.test.tsx
    component-name.scss
```

## Naming Convention

Folder names are in **kebab-case**.

- ✅ `product-card`
- ✅ `cart`
- ❌ `ProductCard`
- ❌ `productCard`
- ❌ `Product Card`

Files that exports React components are named in **PascalCase**.

- ✅ `Navbar.tsx`
- ✅ `ProductCard.tsx`
- ❌ `product-card.tsx`

## React Styleguide

**Extensions**: Use `.tsx` extension for React components

**File name**: Use PascalCase for file names. Eg: `ProductCard.tsx`

**Reference Naming**: Use PascalCase for React components and camelCase for their instances. eslint: `react/jsx-pascal-case`

### Component Type

- Define a component as **functional** Component
- Use **arrow** functions to define a component
- There can be only one component per `.tsx` file
- The component name should match the file name

```jsx
const UniversalBanner = () => {};
```

- Use named export for a component if required

```jsx
export const UniversalBanner = () => {};
```

## References

- https://airbnb.io/javascript/react/
- https://developer.dynatrace.com/develop/react-style-guide/
