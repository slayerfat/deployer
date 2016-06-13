# Deployer

:warning: under construction :tired:

# configuration

make a config.ts in this folder, example:

```typescript
import defaults from './example.config';
defaults.env = 'development';

export const config = defaults;
```

also make a environment.dev.ts and environment.prod.ts 
explained in src/app/environment.ts example:
```typescript
export const environment = {
  production: true,
  endpoints: {
    login: 'something'
  }
};
```
