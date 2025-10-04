# angular-app-book

Simple example App with Angular 20.x using the standalone components

## Install Project

```bash
  pnpm install
```

## Run App

```bash
  pnpm start
```

## Settings url endpoint on file ```environment.ts```

```ts
    export const environment = {
      production: false,
      endpointApi: 'url-endpoint',
    };
```

## Development server

Run `ng serve` for a dev server or alias `ng s`.
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Or Command from terminal:

```
  open -n http://localhost:4200/
```

## Build Project

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
