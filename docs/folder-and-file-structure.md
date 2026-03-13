# Folder and File Structure

A well-organized folder and file structure is essential for managing a large-scale application.

## Root Level Folders

Root level folders serve as categorical dividers for our project's contents.

### src/

It contains source code. It contains the util functions, React components, configuration, context providers, app folder required by Next.js.

### public/

It contains static files that does not have to go through build process.

> [!TIP]
> Contents in `public` folder will be hosted in CDN.

### docs/

Any documentation, guidelines for developers is added here.

### .github/

It contains repository-level GitHub configuration such as CI/CD workflows, pull request templates, and issue templates.

### @types/

It contains custom TypeScript declaration files for external modules and generated types that do not ship with built-in typings.
