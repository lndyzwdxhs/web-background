# web-background 插件计划

> 每个阶段只有在上一阶段决策已确定并通过后，才进入下一阶段。

## 阶段 0：目标与能力面

- [x] 插件名：`web-background`
- [x] 一句话目标：DeepSeek Harness web background settings plugin with solid color, image, and opacity controls.
- [x] 能力面清单：浏览器 UI（设置项、主题 token override、localStorage 持久化）
- [x] 目标 profile：默认 `web`

## 阶段 1：形态决策

- [x] 形态：`bundle-client`
- [x] root layout：`否`
- [x] 分发方式：本地目录（README 保留 git/npm 说明）
- [x] 包管理器：pnpm

## 阶段 2：脚手架

- [x] 已运行 `scripts/scaffold.py`
- [x] `pnpm install` 通过
- [x] `pnpm run bundle` 通过
- [x] `pnpm run gates` 通过

## 阶段 3：业务实现

- [x] Node half 完成（空实现）
- [x] client half 完成（设置行 + 背景层 + token override）
- [x] `inject` 已声明所有 `ctx.*` 服务
- [x] 未手改 `lib/`

## 阶段 4：本地验证

- [x] `npm pack --dry-run` 内容正确
- [x] 本地安装冒烟通过（使用 `npx @deepseek-ai/dsh plugin --profile web add -w .`）
- [x] 浏览器加载冒烟通过（HTML boot entries 正确，`/plugins/web-background/client.js` 可访问）

## 阶段 5：发布准备

- [x] Git 仓库初始化并完成首次提交
- [x] 关联真实 remote
- [x] README 使用真实安装 ref
- [x] README 有截图（UI 插件）
- [x] 构建产物已提交
- [ ] 设置 GitHub 仓库 description 和 topics（`gh repo edit` 因 token 权限返回 403）

## 阶段 6：发布与最终验证

- [x] 已推送到 `github:lndyzwdxhs/web-background#main`
- [x] 已从目标 ref 重新安装并重启 web 验证通过

## 迭代记录

### 2026-08-17 第二轮开发

- 修复设置面板中连续操作可能读取到旧状态的问题（改用最新状态引用提交）。
- 新增跨标签页同步：任一标签页修改背景后，其他标签页自动应用。
- 新增“恢复默认”按钮，一键清除背景设置并恢复默认外观。
- 重新完成构建、门禁、打包与安装验证。
