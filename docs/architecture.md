# web-background 架构

bundle + client 插件：Node half 在 `src/index.ts`，client half 在 `src/client/index.ts`。

## Node half

`src/index.ts` 是空实现，仅用于满足 `bundle-client` 包形态。背景功能完全在浏览器端完成，与官方 `ui-*` 包一致。

## Client half

客户端注入 `slots`、`locale`、`theme` 三个服务：

- `ctx.slots.inject("settings.general.item", ...)`：把设置项挂到 DSH 自带的“设置 → 通用”列表。
- `ctx.locale.register`：注册中文/英文文案。
- `ctx.theme.overrideTokens`：开启背景时把主画布和侧栏 token 覆盖为透明，让固定背景层透出来；关闭时释放覆盖。

背景层是一个 `z-index: -1` 的固定 DOM 层。纯色使用
`background-color`，图片模式由用户选择本地图片，压缩为 data URL 后
通过 `background-image` 显示；不透明度通过 `opacity` 控制。

设置通过 `localStorage` 保存：

- `web-background:type`：`none` / `color` / `image`
- `web-background:color`
- `web-background:image`
- `web-background:opacity`

## 构建

`scripts/build.mjs` 使用 esbuild 生成 `lib/` 下的运行产物。不要手改 `lib/`，改源码后运行：

```sh
pnpm run bundle
```

## 验证

```sh
pnpm run gates
```
