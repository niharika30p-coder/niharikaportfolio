/* ===== CONFIG: edit these ===== */
const EMAIL = "";   // e.g. "name@example.com". Leave empty until you want a mailto link.
const TYPED_LINES = ["Learning to detect threats.", "Practising with Suricata, Wireshark and Nmap.", "Building towards a SOC analyst role."];

document.documentElement.classList.add("js");
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Mobile menu */
const menuBtn = $("#menuBtn"), menu = $("#menu");
function setMenu(open) { menu.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", open); }
menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("#menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

/* Theme toggle (remembered if storage is available) */
const root = document.documentElement, themeBtn = $("#themeBtn");
function setTheme(t) {
  root.dataset.theme = t;
  themeBtn.setAttribute("aria-label", t === "light" ? "Switch to dark theme" : "Switch to light theme");
  try { localStorage.setItem("theme", t); } catch (e) {}
}
let saved = null; try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || "dark");
themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "light" ? "dark" : "light"));

/* Typing animation (static text if reduced motion) */
const typed = $("#typed");
(function type(line = 0, ch = 0, del = false) {
  const text = TYPED_LINES[line];
  if (reduceMotion) { typed.textContent = TYPED_LINES[0]; return; }
  typed.textContent = text.slice(0, ch);
  let next = del ? 28 : 55;
  if (!del && ch === text.length) { del = true; next = 1800; }
  else if (del && ch === 0) { del = false; line = (line + 1) % TYPED_LINES.length; next = 350; }
  setTimeout(() => type(line, ch + (del ? -1 : 1), del), next);
})();

/* Scroll reveal */
const reveals = $$(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .08 });
  reveals.forEach(r => io.observe(r));
} else reveals.forEach(r => r.classList.add("in"));

/* Lab filter */
const chips = $$(".chip"), labs = $$(".lab");
chips.forEach(c => c.addEventListener("click", () => {
  chips.forEach(x => { x.classList.toggle("active", x === c); x.setAttribute("aria-pressed", x === c); });
  const f = c.dataset.filter; let shown = 0;
  labs.forEach(l => { const ok = f === "all" || l.dataset.status === f; l.hidden = !ok; if (ok) shown++; });
  $("#labEmpty").hidden = shown > 0;
}));

/* Back to top */
const toTop = $("#toTop");
addEventListener("scroll", () => { toTop.hidden = scrollY < 600; }, { passive: true });
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

/* Email link */
if (EMAIL) { $("#emailLink").href = "mailto:" + EMAIL; $("#emailText").textContent = EMAIL; }
else $("#emailLink").addEventListener("click", e => e.preventDefault());

/* Resume: if the PDF is missing, show instructions instead of a broken page */
let resumeOk = true;
fetch("assets/resume.pdf", { method: "HEAD" }).then(r => { resumeOk = r.ok; }).catch(() => { resumeOk = true; /* e.g. file:// preview, cannot check */ });
$$(".js-resume").forEach(a => a.addEventListener("click", e => {
  if (resumeOk) return;
  e.preventDefault();
  const note = $("#resumeNote"); note.hidden = false;
  note.closest("section").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}));

/* Footer year */
$("#year").textContent = new Date().getFullYear();
