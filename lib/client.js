window.__ModuleLoader__.load({ id: "web-background", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = __toESM(require("react"), 1);
var SETTINGS_NS = "settings.web-background";
var OVERRIDE_SOURCE = "web-background:background";
var STORAGE_TYPE = "web-background:type";
var STORAGE_COLOR = "web-background:color";
var STORAGE_IMAGE = "web-background:image";
var STORAGE_OPACITY = "web-background:opacity";
var TYPES = ["none", "color", "image"];
var DEFAULT_COLOR = "#1c1c20";
var DEFAULT_OPACITY = 0.8;
var MAX_DATA_URL = 2 * 1024 * 1024;
var BUILTIN_BASE = {
  light: "#ffffff",
  dark: "#151517"
};
var styles = {
  group: {
    borderBottom: "1px solid var(--dsw-alias-border-l2)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "16px 0"
  },
  title: {
    color: "var(--dsw-alias-label-primary)",
    fontSize: "14px",
    lineHeight: "22px"
  },
  hint: {
    color: "var(--dsw-alias-label-tertiary)",
    fontSize: "12px",
    lineHeight: "18px"
  },
  error: {
    color: "var(--dsw-alias-state-error-primary)",
    fontSize: "12px",
    lineHeight: "18px"
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap"
  },
  typeRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },
  typeButton: {
    height: "32px",
    padding: "0 14px",
    borderRadius: "8px",
    border: "1px solid var(--dsw-alias-border-l2)",
    background: "var(--dsw-alias-bg-layer-1)",
    color: "var(--dsw-alias-label-secondary)",
    cursor: "pointer",
    fontSize: "13px",
    font: "inherit",
    boxSizing: "border-box"
  },
  typeButtonSelected: {
    borderColor: "var(--dsw-alias-brand-primary)",
    background: "var(--dsw-alias-interactive-bg-hover)",
    color: "var(--dsw-alias-label-primary)"
  },
  button: {
    height: "32px",
    padding: "0 14px",
    borderRadius: "8px",
    border: "1px solid var(--dsw-alias-border-l2)",
    background: "var(--dsw-alias-button-elevated-fill)",
    color: "var(--dsw-alias-label-primary)",
    cursor: "pointer",
    fontSize: "13px",
    font: "inherit",
    boxSizing: "border-box"
  },
  buttonDanger: {
    color: "var(--dsw-alias-state-error-primary)"
  },
  colorInput: {
    width: "44px",
    height: "32px",
    padding: "0",
    border: "1px solid var(--dsw-alias-border-l2)",
    borderRadius: "8px",
    background: "transparent",
    cursor: "pointer"
  },
  sliderRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: "240px"
  },
  sliderLabel: {
    color: "var(--dsw-alias-label-secondary)",
    fontSize: "13px",
    whiteSpace: "nowrap",
    width: "72px"
  },
  slider: {
    flex: 1,
    accentColor: "var(--dsw-alias-brand-primary)"
  },
  sliderValue: {
    color: "var(--dsw-alias-label-secondary)",
    fontSize: "12px",
    whiteSpace: "nowrap",
    width: "44px",
    textAlign: "right"
  },
  preview: {
    width: "72px",
    height: "44px",
    objectFit: "cover",
    borderRadius: "6px",
    border: "1px solid var(--dsw-alias-border-l2)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }
};
var zh = {
  "title": "\u7F51\u9875\u80CC\u666F",
  "none": "\u65E0",
  "color": "\u7EAF\u8272",
  "image": "\u56FE\u7247",
  "colorLabel": "\u989C\u8272",
  "chooseImage": "\u9009\u62E9\u56FE\u7247",
  "removeImage": "\u79FB\u9664\u56FE\u7247",
  "chooseImageFirst": "\u8BF7\u5148\u9009\u62E9\u4E00\u5F20\u672C\u5730\u56FE\u7247\u3002",
  "opacity": "\u4E0D\u900F\u660E\u5EA6",
  "hint": "\u7EAF\u8272\u6216\u56FE\u7247\u4F1A\u663E\u793A\u5728\u4E3B\u5185\u5BB9\u533A\u548C\u4FA7\u680F\u540E\u9762\uFF0C\u6D88\u606F\u6C14\u6CE1\u4FDD\u6301\u539F\u6709\u80CC\u666F\u3002",
  "errorTooLarge": "\u56FE\u7247\u592A\u5927\uFF0C\u65E0\u6CD5\u4FDD\u5B58\u3002",
  "errorRead": "\u65E0\u6CD5\u8BFB\u53D6\u8FD9\u5F20\u56FE\u7247\u3002",
  "errorSave": "\u4FDD\u5B58\u5931\u8D25\uFF0C\u53EF\u80FD\u6D4F\u89C8\u5668\u5B58\u50A8\u7A7A\u95F4\u4E0D\u8DB3\u6216\u88AB\u7981\u7528\u3002"
};
var en = {
  "title": "Web background",
  "none": "None",
  "color": "Solid color",
  "image": "Image",
  "colorLabel": "Color",
  "chooseImage": "Choose image",
  "removeImage": "Remove image",
  "chooseImageFirst": "Choose a local image first.",
  "opacity": "Opacity",
  "hint": "The color or image appears behind the main canvas and sidebar; message bubbles keep their original background.",
  "errorTooLarge": "Image is too large to save.",
  "errorRead": "Could not read that image.",
  "errorSave": "Could not save; storage may be full or blocked."
};
function readStorage(key) {
  try {
    const value = window.localStorage.getItem(key);
    return typeof value === "string" ? value : null;
  } catch {
    return null;
  }
}
function writeStorage(key, value) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
function clampOpacity(value) {
  if (value === null || value === void 0 || value === "") return DEFAULT_OPACITY;
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(1, Math.max(0, number)) : DEFAULT_OPACITY;
}
function sanitizeColor(value) {
  if (typeof value !== "string") return DEFAULT_COLOR;
  const color = value.trim();
  return /^#[0-9a-f]{6}$/i.test(color) ? color : DEFAULT_COLOR;
}
function sanitizeImageUrl(raw) {
  if (typeof raw !== "string") return null;
  const value = raw.trim();
  if (!value || /["'\n\r]/.test(value)) return null;
  if (/javascript:/i.test(value) || /^data:text\/html/i.test(value)) return null;
  if (/^blob:/i.test(value)) return null;
  if (/^data:image\/svg/i.test(value)) return null;
  if (/^(https?:|data:image\/)/i.test(value)) return value;
  return null;
}
function readState() {
  const storedType = readStorage(STORAGE_TYPE);
  const type = TYPES.includes(storedType) ? storedType : "none";
  const color = sanitizeColor(readStorage(STORAGE_COLOR));
  const image = sanitizeImageUrl(readStorage(STORAGE_IMAGE));
  const opacity = clampOpacity(readStorage(STORAGE_OPACITY));
  if (type === "image" && image === null) return { type: "none", color, image: null, opacity };
  return { type, color, image, opacity };
}
function resolveBase(scheme, active) {
  if (active && active.colorScheme === scheme && active.tokens && typeof active.tokens["--dsw-alias-bg-base"] === "string") {
    return active.tokens["--dsw-alias-bg-base"];
  }
  return BUILTIN_BASE[scheme] || BUILTIN_BASE.dark;
}
function currentScheme(ctx) {
  try {
    const snapshot = ctx.theme.getTheme();
    if (snapshot && snapshot.active && snapshot.active.colorScheme) return snapshot.active.colorScheme;
  } catch {
  }
  return document.body && document.body.getAttribute("data-ds-dark-theme") === "true" ? "dark" : "light";
}
function ensureBackdrop() {
  let element = document.getElementById("web-background-backdrop");
  if (element) return element;
  element = document.createElement("div");
  element.id = "web-background-backdrop";
  element.style.cssText = "position:fixed;inset:0;z-index:-1;pointer-events:none;background-position:center;background-repeat:no-repeat;background-size:cover;";
  document.body.prepend(element);
  return element;
}
function teardownBackdrop(overrideDispose) {
  const element = document.getElementById("web-background-backdrop");
  element?.remove();
  if (document.body) document.body.style.backgroundColor = "";
  if (typeof overrideDispose === "function") {
    try {
      overrideDispose();
    } catch {
    }
  }
}
var backgroundOverrideDispose = null;
function applyBackground(ctx) {
  if (!document.body) return;
  const state = readState();
  if (typeof backgroundOverrideDispose === "function") {
    try {
      backgroundOverrideDispose();
    } catch {
    }
  }
  backgroundOverrideDispose = null;
  if (state.type !== "none") {
    try {
      backgroundOverrideDispose = ctx.theme.overrideTokens(OVERRIDE_SOURCE, {
        "--dsw-alias-bg-base": { light: "transparent", dark: "transparent" },
        "--dsw-specific-sidebar-fill": { light: "transparent", dark: "transparent" }
      });
    } catch {
    }
  }
  if (state.type === "none") {
    teardownBackdrop(null);
    return;
  }
  const element = ensureBackdrop();
  document.body.style.backgroundColor = resolveBase(currentScheme(ctx), (() => {
    try {
      const snapshot = ctx.theme.getTheme();
      return snapshot && snapshot.active ? snapshot.active : null;
    } catch {
      return null;
    }
  })());
  if (state.type === "color") {
    element.style.backgroundImage = "none";
    element.style.backgroundColor = state.color;
  } else {
    element.style.backgroundColor = "transparent";
    element.style.backgroundImage = `url("${state.image}")`;
  }
  element.style.opacity = String(state.opacity);
}
function compressImage(image, maxSide, quality) {
  const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}
function readImageAsDataUrl(file, onDone) {
  const reader = new FileReader();
  reader.onerror = () => onDone(null, "read");
  reader.onload = () => {
    const image = new Image();
    image.onerror = () => onDone(null, "read");
    image.onload = () => {
      try {
        let dataUrl = compressImage(image, 1600, 0.75);
        if (dataUrl.length > MAX_DATA_URL) dataUrl = compressImage(image, 1e3, 0.6);
        if (dataUrl.length > MAX_DATA_URL) dataUrl = compressImage(image, 800, 0.5);
        onDone(dataUrl.length > MAX_DATA_URL ? null : dataUrl, dataUrl.length > MAX_DATA_URL ? "tooLarge" : null);
      } catch {
        onDone(null, "read");
      }
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
}
function BackgroundRow(props) {
  const [state, setState] = import_react.default.useState(() => readState());
  const [error, setError] = import_react.default.useState(null);
  const fileRef = import_react.default.useRef(null);
  const t = props.t || ((key) => key);
  const commit = (next) => {
    setState(next);
    if (next.type === "color") {
      writeStorage(STORAGE_COLOR, next.color);
    }
    if (next.type === "image" && next.image) {
      writeStorage(STORAGE_IMAGE, next.image);
    }
    writeStorage(STORAGE_TYPE, next.type);
    writeStorage(STORAGE_OPACITY, String(next.opacity));
    applyBackground(props.ctx);
  };
  const setType = (type) => {
    commit({ ...state, type });
  };
  const setColor = (color) => {
    const nextColor = sanitizeColor(color);
    commit({ ...state, type: "color", color: nextColor });
  };
  const setOpacity = (percent) => {
    commit({ ...state, opacity: clampOpacity(percent / 100) });
  };
  const removeImage = () => {
    writeStorage(STORAGE_IMAGE, null);
    commit({ ...state, type: "none", image: null });
  };
  const onFile = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    event.target.value = "";
    readImageAsDataUrl(file, (dataUrl, code) => {
      if (dataUrl === null) {
        setError(code === "tooLarge" ? "errorTooLarge" : "errorRead");
        return;
      }
      if (!writeStorage(STORAGE_IMAGE, dataUrl)) {
        setError("errorSave");
        return;
      }
      setError(null);
      commit({ ...state, type: "image", image: dataUrl });
    });
  };
  const typeButtons = TYPES.map((type) => import_react.default.createElement("button", {
    key: type,
    type: "button",
    "aria-pressed": state.type === type,
    style: {
      ...styles.typeButton,
      ...state.type === type ? styles.typeButtonSelected : {}
    },
    onClick: () => setType(type)
  }, t(type)));
  const preview = state.type === "image" && state.image ? import_react.default.createElement("div", {
    style: {
      ...styles.preview,
      backgroundImage: `url("${state.image}")`
    }
  }) : null;
  return import_react.default.createElement(
    "div",
    { style: styles.group },
    import_react.default.createElement("div", { style: styles.title }, t("title")),
    import_react.default.createElement("div", { style: styles.typeRow }, typeButtons),
    state.type === "color" ? import_react.default.createElement(
      "div",
      { style: styles.row },
      import_react.default.createElement("span", { style: styles.sliderLabel }, t("colorLabel")),
      import_react.default.createElement("input", {
        type: "color",
        value: state.color,
        style: styles.colorInput,
        onChange: (event) => setColor(event.target.value)
      })
    ) : null,
    state.type === "image" ? import_react.default.createElement(
      "div",
      { style: styles.row },
      preview,
      import_react.default.createElement("button", {
        type: "button",
        style: styles.button,
        onClick: () => fileRef.current && fileRef.current.click()
      }, t("chooseImage")),
      import_react.default.createElement("button", {
        type: "button",
        style: { ...styles.button, ...styles.buttonDanger },
        onClick: removeImage
      }, t("removeImage")),
      import_react.default.createElement("input", {
        ref: fileRef,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: onFile
      })
    ) : null,
    import_react.default.createElement(
      "div",
      { style: styles.sliderRow },
      import_react.default.createElement("span", { style: styles.sliderLabel }, t("opacity")),
      import_react.default.createElement("input", {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
        value: Math.round(state.opacity * 100),
        style: styles.slider,
        onChange: (event) => setOpacity(Number(event.target.value))
      }),
      import_react.default.createElement("span", { style: styles.sliderValue }, `${Math.round(state.opacity * 100)}%`)
    ),
    error ? import_react.default.createElement("div", { style: styles.error }, t(error)) : null,
    import_react.default.createElement("div", { style: styles.hint }, t("hint"))
  );
}
var inject = ["slots", "locale", "theme"];
function apply(ctx) {
  ctx.effect(() => ctx.locale.register(SETTINGS_NS, { zh, en }), "web-background: locale");
  applyBackground(ctx);
  const observer = new MutationObserver(() => applyBackground(ctx));
  if (document.body) observer.observe(document.body, { attributes: true, attributeFilter: ["data-ds-dark-theme"] });
  const offSettings = ctx.slots.inject("settings.general.item", () => ctx.slots.register({
    name: "settings.general.item",
    id: "web-background",
    order: 40,
    locale: SETTINGS_NS,
    inject: () => ({ ctx })
  }, BackgroundRow));
  ctx.effect(() => () => {
    if (typeof offSettings === "function") offSettings();
    observer.disconnect();
    if (typeof backgroundOverrideDispose === "function") {
      try {
        backgroundOverrideDispose();
      } catch {
      }
    }
    backgroundOverrideDispose = null;
    const element = document.getElementById("web-background-backdrop");
    element?.remove();
    if (document.body) document.body.style.backgroundColor = "";
  }, "web-background: slots and background");
}
return module.exports; } });
