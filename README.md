# A demo for showing why multi-threading web application is important

Github Pages Live Demo: https://pupiltong.github.io/dual-thread-demo/

## prepare

```bash
pnpm install
```

## single-thread demo

```bash
cd packages/react-heic-runtime-decode
pnpm preview
```

Then go to `http://localhost:3001/main`

## dual-thread demo

```bash
cd packages/lynx-heic-runtime-decode
pnpm preview
```

Then go to `http://localhost:3000/main/`
