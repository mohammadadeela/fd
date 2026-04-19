import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { useLanguage } from "./i18n";

function showFatalError(err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  const stack = err instanceof Error ? (err.stack ?? "") : "";
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `<div style="padding:40px;font-family:monospace;max-width:800px;margin:0 auto">
      <h1 style="color:#c00;font-size:20px">Fatal Startup Error</h1>
      <p style="color:#333;margin-top:12px">${msg}</p>
      <pre style="background:#f5f5f5;padding:16px;border-radius:6px;overflow:auto;font-size:13px;margin-top:16px;white-space:pre-wrap">${stack}</pre>
    </div>`;
  }
}

window.addEventListener("error", (e) => showFatalError(e.error ?? e.message));
window.addEventListener("unhandledrejection", (e) => showFatalError(e.reason));

try {
  const lang = useLanguage.getState().language;
  const dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;

  createRoot(document.getElementById("root")!).render(<App />);
} catch (err) {
  showFatalError(err);
}
