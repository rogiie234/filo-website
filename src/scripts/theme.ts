export function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  const toggle = document.getElementById("theme-toggle");
  toggle?.setAttribute("aria-checked", String(theme === "dark"));
  toggle?.setAttribute("title", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0f1a17" : "#f9faf5");
  try {
    localStorage.setItem("filo:theme", theme);
  } catch {
    // Theme switching still works when browser storage is unavailable.
  }
}
