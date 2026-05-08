const WHEELS_KEY = "skillWheelWheels";
const ACTIVE_WHEEL_KEY = "skillWheelActiveWheelId";
const MAX_SLICES = 10;
const IMAGE_DB_NAME = "skillWheelSpinnerImages";
const IMAGE_STORE = "images";
const ALL_RINGS = ["outer", "middle", "inner", "core"];
const CORE_DEFAULTS = ["Share", "Write", "Record", "Photo", "Call", "Thank You"];

const compass = document.getElementById("compass");
const centerOrb = document.getElementById("centerOrb");
const wheelMoveHandle = document.getElementById("wheelMoveHandle");
const powerBarFill = document.getElementById("powerBarFill");
const wheelDragResizeHandle = document.getElementById("wheelCornerResizeHandle");
const spiralLayer = document.getElementById("spinSpiralLayer");
const themeSpiralEffect = document.getElementById("themeSpiralEffect");
const selectedOuter = document.getElementById("selectedOuter");
const selectedMiddle = document.getElementById("selectedMiddle");
const selectedInner = document.getElementById("selectedInner");
const selectedCore = document.getElementById("selectedCore");
const selectedOuterBox = document.getElementById("selectedOuterBox");
const selectedMiddleBox = document.getElementById("selectedMiddleBox");
const selectedInnerBox = document.getElementById("selectedInnerBox");
const selectedCoreBox = document.getElementById("selectedCoreBox");
const completionPanel = document.getElementById("completionPanel");
const completionSummary = document.getElementById("completionSummary");
const completionLog = document.getElementById("completionLog");
const resetCompletionLog = document.getElementById("resetCompletionLog");
const latestSpinPanel = document.getElementById("latestSpinPanel");
const latestSpinRows = document.getElementById("latestSpinRows");
const wheelTitle = document.getElementById("wheelTitle");
const editWheelButton = document.getElementById("editWheelButton");
const editorPanel = document.getElementById("editorPanel");
const closeEditorButton = document.getElementById("closeEditorButton");
const saveEditorButton = document.getElementById("saveEditorButton");

const editor = {
  name: document.getElementById("wheelNameInput"),
  theme: document.getElementById("themeSelect"),
  wheelColor: document.getElementById("wheelColorInput"),
  interfaceColor: document.getElementById("interfaceColorInput"),
  textColor: document.getElementById("textColorInput"),
  pageBg: document.getElementById("pageBgInput"),
  pageBgImage: document.getElementById("pageBgImageInput"),
  clearPageBgImage: document.getElementById("clearPageBgImage"),
  wheelSize: document.getElementById("wheelSizeInput"),
  centerBgInput: document.getElementById("centerBgInput"),
  clearCenterBg: document.getElementById("clearCenterBg"),
  ringCount: document.getElementById("ringCountInput"),
  counts: {
    outer: document.getElementById("outerCountInput"),
    middle: document.getElementById("middleCountInput"),
    inner: document.getElementById("innerCountInput"),
    core: document.getElementById("coreCountInput")
  },
  nameLists: {
    outer: document.getElementById("outerNamesEditor"),
    middle: document.getElementById("middleNamesEditor"),
    inner: document.getElementById("innerNamesEditor"),
    core: document.getElementById("coreNamesEditor")
  },
  prompts: {
    outer: document.getElementById("outerPromptInput"),
    middle: document.getElementById("middlePromptInput"),
    inner: document.getElementById("innerPromptInput"),
    core: document.getElementById("corePromptInput")
  },
  bgInputs: {
    outer: document.getElementById("outerBgInput"),
    middle: document.getElementById("middleBgInput"),
    inner: document.getElementById("innerBgInput"),
    core: document.getElementById("coreBgInput")
  },
  clearBg: {
    outer: document.getElementById("clearOuterBg"),
    middle: document.getElementById("clearMiddleBg"),
    inner: document.getElementById("clearInnerBg"),
    core: document.getElementById("clearCoreBg")
  },
  ringCards: {
    outer: document.getElementById("outerEditorCard"),
    middle: document.getElementById("middleEditorCard"),
    inner: document.getElementById("innerEditorCard"),
    core: document.getElementById("coreEditorCard")
  }
};

let wheel = null;
let wheels = [];
let rotations = makeRingState();
let velocities = makeRingState();
let spinFrame = null;
let chargeStart = 0;
let isCharging = false;
let chargeBaseRotations = makeRingState();
let pendingSpinProfile = null;
let pendingEditorBackgrounds = makePendingBackgroundState();
let saveTimer = null;
let spiralTimer = null;
let completionNoticeTimer = null;
const imageCache = new Map();
const CHARGE_MAX_MS = 1500;
const DECAY = 0.982;
const MAX_WHEEL_SCALE = 3;

function makeRingState(value = 0) {
  return Object.fromEntries(ALL_RINGS.map(ring => [ring, value]));
}
function makePendingBackgroundState() {
  return { ...Object.fromEntries(ALL_RINGS.map(ring => [ring, undefined])), page: undefined, center: undefined };
}
function randomFloat(min = 0, max = 1) {
  if (window.crypto?.getRandomValues) {
    const values = new Uint32Array(1);
    window.crypto.getRandomValues(values);
    return min + (values[0] / 0xffffffff) * (max - min);
  }
  return min + Math.random() * (max - min);
}
function randomInt(min, max) { return Math.floor(randomFloat(min, max + 1)); }
function getRingCount() { return Math.max(1, Math.min(4, Number(wheel?.ringCount) || 3)); }
function getActiveRings() { return ALL_RINGS.slice(0, getRingCount()); }
function isRingActive(ring) { return getActiveRings().includes(ring); }
function ringDisplayName(ring) { return ring.charAt(0).toUpperCase() + ring.slice(1); }
function makeSpinProfile() {
  const directions = {};
  const speedVariance = {};
  const ringOffsets = {};
  const releaseJitter = {};
  getActiveRings().forEach((ring, index) => {
    directions[ring] = randomFloat() > 0.5 ? 1 : -1;
    speedVariance[ring] = randomFloat(0.74, 1.22);
    ringOffsets[ring] = randomFloat(-2.8, 2.8) + index * randomFloat(-0.85, 0.85);
    releaseJitter[ring] = getSliceDeg(ring) * randomFloat(-0.34, 0.34);
  });
  return { directions, speedVariance, ringOffsets, releaseJitter, spinSeed: randomFloat(-180, 180) };
}
function applyRingLayout() {
  const outerSize = 620;
  const centerSize = 88;
  const outerRadius = outerSize / 2;
  const centerRadius = centerSize / 2;
  const count = getRingCount();
  const band = (outerRadius - centerRadius) / count;
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty("--outer-size", `${outerSize}px`);
  rootStyle.setProperty("--center-size", `${centerSize}px`);
  ALL_RINGS.forEach((ring, index) => {
    const outerBoundary = outerRadius - band * index;
    const innerBoundary = index === count - 1 ? centerRadius : outerRadius - band * (index + 1);
    const diameter = Math.max(centerSize + 30, outerBoundary * 2);
    const labelRadius = Math.max(42, (outerBoundary + innerBoundary) / 2);
    const labelWidth = Math.max(58, Math.min(128, band * 1.25));
    rootStyle.setProperty(`--${ring}-size`, `${diameter}px`);
    rootStyle.setProperty(`--${ring}-label-radius`, `${labelRadius}px`);
    rootStyle.setProperty(`--${ring}-label-width`, `${labelWidth}px`);
    rootStyle.setProperty(`--${ring}-label-font`, `${Math.max(0.68, Math.min(1.04, band / 82))}rem`);
  });
}

function openImageDb() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) { reject(new Error("IndexedDB is not available.")); return; }
    const request = indexedDB.open(IMAGE_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IMAGE_STORE)) db.createObjectStore(IMAGE_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Unable to open image storage."));
  });
}
async function putStoredImage(key, dataUrl) {
  const db = await openImageDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, "readwrite");
    tx.objectStore(IMAGE_STORE).put(dataUrl, key);
    tx.oncomplete = () => { imageCache.set(key, dataUrl); db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}
async function getStoredImage(key) {
  if (!key) return "";
  if (imageCache.has(key)) return imageCache.get(key);
  const db = await openImageDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, "readonly");
    const request = tx.objectStore(IMAGE_STORE).get(key);
    request.onsuccess = () => { const value = request.result || ""; imageCache.set(key, value); resolve(value); };
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
  });
}
async function deleteStoredImage(key) {
  if (!key) return;
  try {
    const db = await openImageDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IMAGE_STORE, "readwrite");
      tx.objectStore(IMAGE_STORE).delete(key);
      tx.oncomplete = () => { imageCache.delete(key); db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    });
  } catch (error) { console.warn("Unable to delete stored image", error); }
}
function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; } catch { return fallback; } }
function stripLargeImageData(value) {
  if (typeof value === "string" && value.startsWith("data:image/")) return "";
  if (Array.isArray(value)) return value.map(stripLargeImageData);
  if (value && typeof value === "object") {
    const next = {};
    Object.entries(value).forEach(([key, item]) => next[key] = stripLargeImageData(item));
    return next;
  }
  return value;
}
function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(stripLargeImageData(value)));
    return true;
  } catch (error) {
    console.warn("Unable to save data", error);
    alert("Browser storage is full. This version stores images outside localStorage, but your browser may still contain older large saved wheels. Use the dashboard to delete unused wheels, or clear site data for localhost if the warning continues.");
    return false;
  }
}
function normalizeAngle(angle) { return ((Number(angle) || 0) % 360 + 360) % 360; }
function clamp(value, min, max) { return Math.max(min, Math.min(max, Number(value) || min)); }
function getImageKey(part) { return `${wheel.id}:${part}`; }

async function migrateLegacyImages() {
  if (!wheel?.id) return;
  const parts = ALL_RINGS;
  for (const ring of parts) {
    const data = wheel.rings?.[ring]?.background;
    if (typeof data === "string" && data.startsWith("data:image/")) {
      const key = getImageKey(ring);
      await putStoredImage(key, data);
      wheel.rings[ring].background = "";
      wheel.rings[ring].backgroundRef = key;
    }
  }
  const page = wheel.colors?.pageBgImage;
  if (typeof page === "string" && page.startsWith("data:image/")) {
    const key = getImageKey("page");
    await putStoredImage(key, page);
    wheel.colors.pageBgImage = "";
    wheel.colors.pageBgImageRef = key;
  }
  const center = wheel.center?.background;
  if (typeof center === "string" && center.startsWith("data:image/")) {
    const key = getImageKey("center");
    await putStoredImage(key, center);
    wheel.center.background = "";
    wheel.center.backgroundRef = key;
  }
}
async function loadWheel() {
  wheels = readJson(WHEELS_KEY, []);
  const activeId = localStorage.getItem(ACTIVE_WHEEL_KEY);
  wheel = wheels.find(item => item.id === activeId) || wheels[0];
  if (!wheel) {
    window.location.href = "setup.html?mode=new";
    return;
  }
  localStorage.setItem(ACTIVE_WHEEL_KEY, wheel.id);
  ensureWheelShape();
  await migrateLegacyImages();
  ALL_RINGS.forEach(ring => {
    rotations[ring] = Number(wheel.rings?.[ring]?.rotation) || 0;
  });
  saveWheel();
}
function saveWheel() {
  wheel.updatedAt = new Date().toISOString();
  ALL_RINGS.forEach(ring => wheel.rings[ring].rotation = normalizeAngle(rotations[ring]));
  wheels = wheels.map(item => item.id === wheel.id ? wheel : item);
  writeJson(WHEELS_KEY, wheels);
}
function queueSaveWheel(delay = 350) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveWheel(), delay);
}
function ensureWheelShape() {
  wheel.rings ||= {};
  wheel.ringCount = Math.max(1, Math.min(4, Number(wheel.ringCount) || 3));
  ALL_RINGS.forEach(ring => {
    const defaults = ring === "core" ? CORE_DEFAULTS : [`${ring} 1`];
    wheel.rings[ring] ||= { names: defaults, background: "", backgroundRef: "", rotation: 0 };
    if (!Array.isArray(wheel.rings[ring].names) || !wheel.rings[ring].names.length) wheel.rings[ring].names = defaults;
    wheel.rings[ring].names = wheel.rings[ring].names.slice(0, MAX_SLICES);
    wheel.rings[ring].prompt = String(wheel.rings[ring].prompt || "");
    wheel.rings[ring].background ||= "";
    wheel.rings[ring].backgroundRef ||= "";
    wheel.rings[ring].rotation = Number(wheel.rings[ring].rotation) || 0;
  });
  wheel.colors ||= { wheel: "#ffd700", interface: "#ffd700", text: "#ffd700", pageBg: "#111111", pageBgImageRef: "" };
  wheel.colors.pageBgImageRef ||= "";
  wheel.center ||= { background: "", backgroundRef: "" };
  wheel.center.background ||= "";
  wheel.center.backgroundRef ||= "";
  wheel.completed ||= [];
  if (!Array.isArray(wheel.completed)) wheel.completed = [];
  wheel.theme ||= "lightning";
  wheel.sizeScale = clamp(wheel.sizeScale || 1, 0.45, MAX_WHEEL_SCALE);
}
async function applyColors() {
  applyRingLayout();
  document.documentElement.style.setProperty("--wheel-line", wheel.colors.wheel || "#ffd700");
  document.documentElement.style.setProperty("--interface", wheel.colors.interface || wheel.colors.wheel || "#ffd700");
  document.documentElement.style.setProperty("--wheel-text", wheel.colors.text || "#ffd700");
  document.documentElement.style.setProperty("--bg", wheel.colors.pageBg || "#111111");
  document.documentElement.style.setProperty("--wheel-scale", String(wheel.sizeScale || 1));
  const [themeA, themeB, themeC] = themeColors();
  document.documentElement.style.setProperty("--theme-a", themeA);
  document.documentElement.style.setProperty("--theme-b", themeB);
  document.documentElement.style.setProperty("--theme-c", themeC);
  let pageImage = "";
  if (wheel.colors.pageBgImageRef) pageImage = await getStoredImage(wheel.colors.pageBgImageRef).catch(() => "");
  document.documentElement.style.setProperty("--page-bg-image", pageImage ? `url("${pageImage}")` : "none");
  let centerImage = wheel.center?.background || "";
  if (!centerImage && wheel.center?.backgroundRef) centerImage = await getStoredImage(wheel.center.backgroundRef).catch(() => "");
  document.documentElement.style.setProperty("--center-bg-image", centerImage ? `url("${centerImage}")` : "none");
  themeSpiralEffect?.setAttribute("data-theme", wheel.theme || "lightning");
}
function getRingNames(ring) { return (wheel.rings?.[ring]?.names || []).filter(name => String(name).trim()); }
function getRingPrompt(ring) { return String(wheel.rings?.[ring]?.prompt || "").trim(); }
function formatSelectedInstruction(ring, name) {
  const prompt = getRingPrompt(ring);
  return [prompt, name].filter(Boolean).join(" ") || "—";
}
function getSliceDeg(ring) { return 360 / Math.max(1, getRingNames(ring).length); }
function getSelectedIndex(ring) {
  const names = getRingNames(ring);
  if (!names.length) return 0;
  const sliceDeg = 360 / names.length;
  const arrowCssAngle = 270;
  const unrotated = normalizeAngle(arrowCssAngle - rotations[ring]);
  return Math.floor((unrotated + sliceDeg / 2) / sliceDeg) % names.length;
}
async function applyRingBackground(ring, ringEl) {
  if (!ringEl) return;
  const bg = ringEl.querySelector(".ring-bg");
  let value = wheel.rings[ring].background || "";
  if (!value && wheel.rings[ring].backgroundRef) value = await getStoredImage(wheel.rings[ring].backgroundRef).catch(() => "");
  bg.style.setProperty("--ring-bg", value ? `url("${value}")` : "none");
}
function renderRing(ring) {
  const ringEl = document.getElementById(`${ring}Ring`);
  const labels = document.getElementById(`${ring}Labels`);
  if (!ringEl || !labels) return;
  ringEl.classList.toggle("hidden", !isRingActive(ring));
  if (!isRingActive(ring)) return;
  const names = getRingNames(ring);
  const sliceDeg = 360 / Math.max(1, names.length);
  applyRingBackground(ring, ringEl);
  ringEl.style.setProperty("--slice-deg", `${sliceDeg}deg`);
  ringEl.style.setProperty("--line-from", `${90 - sliceDeg / 2 + rotations[ring]}deg`);
  ringEl.style.setProperty("--selected-from", `${90 - sliceDeg / 2 + getSelectedIndex(ring) * sliceDeg + rotations[ring]}deg`);
  ringEl.style.setProperty("--selected-size", `${sliceDeg}deg`);
  labels.innerHTML = "";
  names.forEach((name, index) => {
    const div = document.createElement("div");
    div.className = "slice-label";
    if (index === getSelectedIndex(ring)) div.classList.add("selected");
    div.textContent = name;
    div.style.setProperty("--angle", `${index * sliceDeg + rotations[ring]}deg`);
    labels.appendChild(div);
  });
}
async function renderWheel() {
  await applyColors();
  wheelTitle.textContent = wheel.name || "Wheel";
  ALL_RINGS.forEach(renderRing);
  updateSelectedPanel();
  renderCompletionLog();
}
function updateWheelRotations() {
  ALL_RINGS.forEach(ring => {
    rotations[ring] = normalizeAngle(rotations[ring]);
    renderRing(ring);
  });
  updateSelectedPanel();
}
function updateSelectedPanel() {
  const fields = {
    outer: { box: selectedOuterBox, value: selectedOuter },
    middle: { box: selectedMiddleBox, value: selectedMiddle },
    inner: { box: selectedInnerBox, value: selectedInner },
    core: { box: selectedCoreBox, value: selectedCore }
  };
  ALL_RINGS.forEach(ring => {
    fields[ring].box?.classList.toggle("hidden", !isRingActive(ring));
    if (fields[ring].value) {
      const selectedName = getRingNames(ring)[getSelectedIndex(ring)] || "";
      fields[ring].value.textContent = formatSelectedInstruction(ring, selectedName);
    }
  });
}
function getTotalCombinations() {
  return getActiveRings().reduce((total, ring) => total * getRingNames(ring).length, 1);
}
function comboKeyFromNames(names) { return names.map(name => String(name).trim()).join("||"); }
function getCurrentCombination() {
  const parts = getActiveRings().map(ring => {
    const names = getRingNames(ring);
    const index = getSelectedIndex(ring);
    const name = names[index] || "";
    return { ring, index, name, displayName: formatSelectedInstruction(ring, name) };
  });
  return { parts, names: parts.map(part => part.name), displayNames: parts.map(part => part.displayName), key: comboKeyFromNames(parts.map(part => part.name)) };
}
function renderLatestSpin(combo) {
  if (!latestSpinPanel || !latestSpinRows || !combo) return;
  latestSpinPanel.classList.remove("hidden");
  latestSpinRows.innerHTML = combo.parts.map(part => `
    <div class="latest-spin-row">
      <span>${escapeHtml(ringDisplayName(part.ring))}</span>
      <strong>${escapeHtml(part.displayName || part.name || "—")}</strong>
      <em>Value: ${escapeHtml(part.name || "—")}</em>
    </div>`).join("");
}
function getCompletedKeys() { return new Set((wheel.completed || []).map(item => item.key)); }
function findUnusedCombination() {
  const completed = getCompletedKeys();
  const rings = getActiveRings();
  const candidates = [];
  const collect = (ringIndex, indexes, names) => {
    if (ringIndex >= rings.length) {
      const key = comboKeyFromNames(names);
      if (!completed.has(key)) candidates.push({ indexes, names, key });
      return;
    }
    const ring = rings[ringIndex];
    const ringNames = getRingNames(ring);
    for (let index = 0; index < ringNames.length; index++) {
      collect(ringIndex + 1, { ...indexes, [ring]: index }, [...names, ringNames[index]]);
    }
  };
  collect(0, {}, []);
  return candidates.length ? candidates[randomInt(0, candidates.length - 1)] : null;
}
function setSelectedIndexes(indexes) {
  getActiveRings().forEach(ring => {
    const names = getRingNames(ring);
    const sliceDeg = 360 / Math.max(1, names.length);
    rotations[ring] = normalizeAngle(270 - indexes[ring] * sliceDeg);
  });
  updateWheelRotations();
}
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[char]));
}
function showCompletionNotice(message) {
  if (!completionPanel) return;
  completionPanel.dataset.notice = message;
  completionPanel.classList.add("show-notice");
  clearTimeout(completionNoticeTimer);
  completionNoticeTimer = setTimeout(() => completionPanel.classList.remove("show-notice"), 1900);
}
function renderCompletionLog() {
  if (!completionSummary || !completionLog) return;
  const total = getTotalCombinations();
  const completed = wheel.completed || [];
  completionSummary.textContent = `${completed.length} / ${total}`;
  completionPanel?.classList.toggle("complete", total > 0 && completed.length >= total);
  completionLog.innerHTML = completed.slice(-24).reverse().map(item => `
    <li><span>${escapeHtml((item.displayNames || item.names)?.join(" + ") || item.key || "")}</span></li>`).join("");
}
function completeCurrentCombination() {
  const total = getTotalCombinations();
  if (!total) return null;
  wheel.completed ||= [];
  const completed = getCompletedKeys();
  let combo = getCurrentCombination();
  if (completed.has(combo.key)) {
    const unused = findUnusedCombination();
    if (!unused) {
      renderCompletionLog();
      showCompletionNotice("All combinations completed");
      return combo;
    }
    setSelectedIndexes(unused.indexes);
    combo = getCurrentCombination();
    showCompletionNotice("Used result skipped");
  }
  if (!getCompletedKeys().has(combo.key)) {
    wheel.completed.push({ key: combo.key, names: combo.names, displayNames: combo.displayNames, completedAt: new Date().toISOString() });
    showCompletionNotice("Combination completed");
  }
  renderCompletionLog();
  return combo;
}
function flashSelectedFields() {
  document.querySelectorAll(".selected-grid div:not(.hidden)").forEach(field => {
    field.classList.remove("selected-field-flash");
    void field.offsetWidth;
    field.classList.add("selected-field-flash");
  });
  getActiveRings().forEach(ring => {
    const ringEl = document.getElementById(`${ring}Ring`);
    const label = ringEl?.querySelector(".slice-label.selected");
    ringEl?.classList.remove("selected-slice-flash");
    label?.classList.remove("selected-slice-label-flash");
    void ringEl?.offsetWidth;
    ringEl?.classList.add("selected-slice-flash");
    label?.classList.add("selected-slice-label-flash");
  });
}
function setThemeSpiralActive(active) {
  if (!themeSpiralEffect) return;
  clearTimeout(spiralTimer);
  themeSpiralEffect.classList.toggle("active", active);
  compass?.classList.toggle("layer-spin-active", active);
  themeSpiralEffect.setAttribute("data-theme", wheel?.theme || "lightning");
}
function pulseThemeSpiral(duration = 600) {
  setThemeSpiralActive(true);
  clearTimeout(spiralTimer);
  spiralTimer = setTimeout(() => setThemeSpiralActive(false), duration);
}
function themeColors() {
  switch (wheel.theme) {
    case "fire": return ["#ff6a00", "#ff2400", "#ffd000"];
    case "water": return ["#39d4ff", "#147cff", "#aaf4ff"];
    case "plant": return ["#31c45b", "#9cff70", "#1f7a34"];
    case "flowers": return ["#ff66cc", "#ffe866", "#ff9ad5"];
    case "earth": return ["#8a6232", "#63aa38", "#caa472"];
    case "steel": return ["#d8d8d8", "#888", "#f1f1f1"];
    case "lightning": return ["#ffffff", "#8dd7ff", "#4a8cff"];
    default: return [wheel.colors.wheel || "#ffd700"];
  }
}
function spawnSpinParticles() {
  if (!spiralLayer) return;
  const speed = Math.max(...getActiveRings().map(ring => Math.abs(velocities[ring] || 0)));
  if (speed < 1.1) return;
  const colors = themeColors();
  const count = Math.min(34, Math.ceil(speed * 1.7));
  const rect = compass.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  const maxRadius = Math.hypot(window.innerWidth, window.innerHeight) * 0.7;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "spiral-particle";
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.color = color;
    particle.style.background = color;
    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    particle.style.setProperty("--angle", `${Math.random() * 360}deg`);
    particle.style.setProperty("--radius", `${160 + Math.random() * maxRadius}px`);
    const size = 4 + Math.random() * 10;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    spiralLayer.appendChild(particle);
    setTimeout(() => particle.remove(), 1700);
  }
}
function spawnEdgeSparks() {
  if (!spiralLayer) return;
  const speed = Math.max(...getActiveRings().map(ring => Math.abs(velocities[ring] || 0)));
  if (speed < 1.4) return;
  const colors = themeColors();
  const rect = compass.getBoundingClientRect();
  const radius = rect.width / 2;
  const cx = rect.left + radius;
  const cy = rect.top + radius;
  const count = Math.min(22, Math.ceil(speed * 1.15));
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spark = document.createElement("div");
    spark.className = "edge-spark";
    const color = colors[Math.floor(Math.random() * colors.length)];
    spark.style.left = `${cx + Math.cos(angle) * radius}px`;
    spark.style.top = `${cy + Math.sin(angle) * radius}px`;
    spark.style.color = color;
    spark.style.background = color;
    spark.style.setProperty("--spark-x", `${Math.cos(angle) * (70 + Math.random() * 130)}px`);
    spark.style.setProperty("--spark-y", `${Math.sin(angle) * (70 + Math.random() * 130)}px`);
    spark.style.setProperty("--spark-rotate", `${Math.random() * 220 - 110}deg`);
    spiralLayer.appendChild(spark);
    setTimeout(() => spark.remove(), 800);
  }
}
function spawnFinishConfetti() {
  if (!spiralLayer || !compass) return;
  const colors = themeColors();
  const rect = compass.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  const count = 84;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "finish-confetti";
    const color = colors[Math.floor(Math.random() * colors.length)];
    const launchX = (Math.random() - 0.5) * Math.min(window.innerWidth * 0.72, 760);
    const launchY = -(120 + Math.random() * 260);
    const driftX = launchX + (Math.random() - 0.5) * 220;
    const driftY = 180 + Math.random() * 240;
    const width = 5 + Math.random() * 8;
    const height = 8 + Math.random() * 14;
    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.width = `${width}px`;
    piece.style.height = `${height}px`;
    piece.style.background = color;
    piece.style.color = color;
    piece.style.setProperty("--launch-x", `${launchX}px`);
    piece.style.setProperty("--launch-y", `${launchY}px`);
    piece.style.setProperty("--drift-x", `${driftX}px`);
    piece.style.setProperty("--drift-y", `${driftY}px`);
    piece.style.setProperty("--confetti-rotate", `${Math.random() * 720 - 360}deg`);
    piece.style.animationDuration = `${2.2 + Math.random() * 1.2}s`;
    piece.style.animationDelay = `${Math.random() * 0.18}s`;
    spiralLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 3800);
  }
}
function animateSpin() {
  getActiveRings().forEach(ring => {
    rotations[ring] += velocities[ring];
    velocities[ring] *= DECAY;
  });
  updateWheelRotations();
  spawnSpinParticles();
  spawnEdgeSparks();
  const moving = Math.max(...getActiveRings().map(ring => Math.abs(velocities[ring] || 0)));
  if (moving > 0.03) spinFrame = requestAnimationFrame(animateSpin);
  else {
    velocities = makeRingState();
    spinFrame = null;
    setThemeSpiralActive(false);
    const combo = completeCurrentCombination();
    renderLatestSpin(combo);
    saveWheel();
    flashSelectedFields();
    spawnFinishConfetti();
  }
}
function startSpin(power) {
  if (spinFrame) cancelAnimationFrame(spinFrame);
  setThemeSpiralActive(true);
  const safePower = Math.max(0, Math.min(1, power));
  const lowZone = safePower < 0.15;
  const curved = lowZone ? Math.pow(safePower / 0.15, 1.8) * 0.15 : Math.pow(safePower, 1.2);
  const base = lowZone ? 0.45 : 1.2;
  const max = 32;
  const activeRings = getActiveRings();
  const profile = pendingSpinProfile || makeSpinProfile();
  activeRings.forEach((ring, index) => {
    const direction = profile.directions[ring] || (randomFloat() > 0.5 ? 1 : -1);
    rotations[ring] += direction * randomFloat(5, 18) + profile.releaseJitter[ring] + profile.spinSeed * (index + 1) * 0.08;
  });
  updateWheelRotations();
  setTimeout(() => {
    activeRings.forEach((ring, index) => {
      const direction = profile.directions[ring] || (randomFloat() > 0.5 ? 1 : -1);
      const velocity = Math.min(max, base + curved * randomFloat(25, 36)) * profile.speedVariance[ring] + profile.ringOffsets[ring];
      velocities[ring] = direction * Math.max(0.35, velocity);
    });
    pendingSpinProfile = null;
    spinFrame = requestAnimationFrame(animateSpin);
  }, 95);
}
function updateChargeUi() {
  if (!isCharging) return;
  const elapsed = performance.now() - chargeStart;
  const power = Math.min(1, elapsed / CHARGE_MAX_MS);
  compass.style.setProperty("--charge-tension", power.toFixed(3));
  const pullPower = Math.pow(power, 1.45);
  getActiveRings().forEach((ring, index) => {
    const direction = pendingSpinProfile?.directions?.[ring] || 1;
    const pull = (14 + index * 5 + getSliceDeg(ring) * 0.28) * pullPower;
    rotations[ring] = normalizeAngle(chargeBaseRotations[ring] - direction * pull);
  });
  updateWheelRotations();
  powerBarFill.style.width = `${power * 100}%`;
  centerOrb.classList.toggle("max-charge", power >= 1);
  requestAnimationFrame(updateChargeUi);
}
function startCharge(event) {
  if (event.target === wheelMoveHandle) return;
  if (event.target === wheelDragResizeHandle) return;
  event.preventDefault();
  if (spinFrame) cancelAnimationFrame(spinFrame);
  spinFrame = null;
  velocities = makeRingState();
  isCharging = true;
  chargeStart = performance.now();
  chargeBaseRotations = { ...rotations };
  pendingSpinProfile = makeSpinProfile();
  compass.classList.add("charging-tension");
  compass.style.setProperty("--charge-tension", "0");
  centerOrb.classList.add("charging");
  centerOrb.setPointerCapture?.(event.pointerId);
  updateChargeUi();
}
function endCharge(event) {
  if (!isCharging) return;
  event.preventDefault();
  const power = Math.min(1, (performance.now() - chargeStart) / CHARGE_MAX_MS);
  isCharging = false;
  compass.classList.remove("charging-tension");
  compass.style.setProperty("--charge-tension", "0");
  centerOrb.classList.remove("charging", "max-charge");
  powerBarFill.style.width = "0%";
  startSpin(power);
}
function middleClickReset(event) {
  if (event.button !== 1) return;
  event.preventDefault();
  const targetRing = event.target.closest(".outer-ring, .middle-ring, .inner-ring-simple, .core-ring, .center-orb");
  if (!targetRing) return;
  if (targetRing.classList.contains("outer-ring")) rotations.outer = 0;
  else if (targetRing.classList.contains("middle-ring")) rotations.middle = 0;
  else if (targetRing.classList.contains("inner-ring-simple")) rotations.inner = 0;
  else if (targetRing.classList.contains("core-ring")) rotations.core = 0;
  else rotations = makeRingState();
  updateWheelRotations();
  saveWheel();
}
function ringFromElement(element) {
  const ringEl = element?.closest?.(".outer-ring, .middle-ring, .inner-ring-simple, .core-ring");
  if (!ringEl) return "";
  if (ringEl.classList.contains("outer-ring")) return "outer";
  if (ringEl.classList.contains("middle-ring")) return "middle";
  if (ringEl.classList.contains("inner-ring-simple")) return "inner";
  if (ringEl.classList.contains("core-ring")) return "core";
  return "";
}
function angleFromCenter(event) {
  const rect = compass.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  return Math.atan2(event.clientY - cy, event.clientX - cx) * 180 / Math.PI;
}
function setupRingDrag() {
  ALL_RINGS.forEach(ring => {
    const ringEl = document.getElementById(`${ring}Ring`);
    let dragging = false;
    let lastAngle = 0;
    let lastTime = 0;
    let lastVelocity = 0;
    ringEl?.addEventListener("pointerdown", event => {
      if (event.button !== 0) return;
      if (event.target.closest(".center-orb, button")) return;
      event.preventDefault();
      if (spinFrame) cancelAnimationFrame(spinFrame);
      spinFrame = null;
      velocities = makeRingState();
      setThemeSpiralActive(true);
      dragging = true;
      lastVelocity = 0;
      lastAngle = angleFromCenter(event);
      lastTime = performance.now();
      ringEl.setPointerCapture?.(event.pointerId);
      ringEl.classList.add("drag-spinning");
    });
    ringEl?.addEventListener("pointermove", event => {
      if (!dragging) return;
      const now = performance.now();
      const angle = angleFromCenter(event);
      const delta = normalizeAngle(angle - lastAngle + 180) - 180;
      rotations[ring] += delta;
      lastVelocity = delta / Math.max(16, now - lastTime) * 16.67;
      lastAngle = angle;
      lastTime = now;
      updateWheelRotations();
    });
    const endDrag = event => {
      if (!dragging) return;
      dragging = false;
      ringEl.releasePointerCapture?.(event.pointerId);
      ringEl.classList.remove("drag-spinning");
      velocities[ring] = Math.max(-24, Math.min(24, lastVelocity * 1.8));
      if (Math.abs(velocities[ring]) > 0.2) {
        setThemeSpiralActive(true);
        spinFrame = requestAnimationFrame(animateSpin);
      } else {
        setThemeSpiralActive(false);
        saveWheel();
      }
    };
    ringEl?.addEventListener("pointerup", endDrag);
    ringEl?.addEventListener("pointercancel", endDrag);
  });
}
function setupWheelScrollSpin() {
  compass.addEventListener("wheel", event => {
    if (event.target.closest("button, input, select")) return;
    event.preventDefault();
    const targetRing = ringFromElement(event.target);
    const delta = Math.max(-28, Math.min(28, event.deltaY * 0.13));
    const rings = targetRing ? [targetRing] : getActiveRings();
    rings.forEach((ring, index) => {
      const direction = targetRing ? 1 : (index === 1 ? -1 : 1);
      rotations[ring] += delta * direction;
    });
    pulseThemeSpiral(520);
    updateWheelRotations();
    queueSaveWheel();
  }, { passive: false });
}
function makePanelDraggable(panel) {
  const handle = panel.querySelector(".panel-handle") || panel;
  let dragging = false, sx = 0, sy = 0, sl = 0, st = 0;
  handle.addEventListener("pointerdown", event => {
    dragging = true; sx = event.clientX; sy = event.clientY;
    const rect = panel.getBoundingClientRect(); sl = rect.left; st = rect.top;
    panel.style.left = `${sl}px`; panel.style.top = `${st}px`; panel.style.right = "auto"; panel.style.bottom = "auto";
    handle.setPointerCapture?.(event.pointerId);
  });
  handle.addEventListener("pointermove", event => { if (!dragging) return; panel.style.left = `${sl + event.clientX - sx}px`; panel.style.top = `${st + event.clientY - sy}px`; });
  handle.addEventListener("pointerup", () => dragging = false);
}
function setupMoveHandle() {
  let moving = false, sx = 0, sy = 0, left = 0, top = 0;
  wheelMoveHandle.addEventListener("pointerdown", event => {
    event.preventDefault(); event.stopPropagation();
    moving = true; sx = event.clientX; sy = event.clientY;
    const rect = compass.getBoundingClientRect();
    left = rect.left + rect.width / 2; top = rect.top + rect.height / 2;
    compass.style.position = "fixed";
    compass.style.left = `${left}px`;
    compass.style.top = `${top}px`;
    compass.style.transform = "translate(-50%, -50%) scale(var(--wheel-scale))";
    wheelMoveHandle.setPointerCapture?.(event.pointerId);
  });
  wheelMoveHandle.addEventListener("pointermove", event => { if (!moving) return; compass.style.left = `${left + event.clientX - sx}px`; compass.style.top = `${top + event.clientY - sy}px`; });
  wheelMoveHandle.addEventListener("pointerup", () => moving = false);
}
function renderEditorNameInputs(ring) {
  if (!editor.counts[ring] || !editor.nameLists[ring]) return;
  const names = getEditorNames(ring);
  const count = Math.max(1, Math.min(MAX_SLICES, Number(editor.counts[ring].value) || names.length || 1));
  editor.counts[ring].value = String(count);
  editor.nameLists[ring].innerHTML = "";
  for (let i = 0; i < count; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 38;
    input.value = names[i] || `${ring} ${i + 1}`;
    editor.nameLists[ring].appendChild(input);
  }
}
function getEditorNames(ring) {
  if (!editor.nameLists[ring]) return getRingNames(ring);
  const inputs = Array.from(editor.nameLists[ring].querySelectorAll("input"));
  if (inputs.length) return inputs.map(input => input.value.trim()).filter(Boolean);
  return getRingNames(ring);
}
function updateEditorRingVisibility() {
  const count = Math.max(1, Math.min(4, Number(editor.ringCount?.value) || getRingCount()));
  ALL_RINGS.forEach((ring, index) => editor.ringCards[ring]?.classList.toggle("hidden", index >= count));
}
function openEditor() {
  pendingEditorBackgrounds = makePendingBackgroundState();
  editor.name.value = wheel.name || "";
  editor.theme.value = wheel.theme || "lightning";
  editor.wheelColor.value = wheel.colors.wheel || "#ffd700";
  editor.interfaceColor.value = wheel.colors.interface || "#ffd700";
  editor.textColor.value = wheel.colors.text || "#ffd700";
  editor.pageBg.value = wheel.colors.pageBg || "#111111";
  if (editor.ringCount) editor.ringCount.value = String(getRingCount());
  if (editor.wheelSize) editor.wheelSize.value = String(wheel.sizeScale || 1);
  ALL_RINGS.forEach(ring => {
    editor.counts[ring].value = String(getRingNames(ring).length);
    if (editor.prompts[ring]) editor.prompts[ring].value = getRingPrompt(ring);
    editor.nameLists[ring].innerHTML = "";
    renderEditorNameInputs(ring);
  });
  updateEditorRingVisibility();
  editorPanel.classList.remove("hidden");
}
function readFileAsDataUrl(file, callback) {
  if (!file || !file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = () => {
    const raw = String(reader.result || "");
    const img = new Image();
    img.onload = () => {
      const maxSize = 1400;
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) { callback(raw); return; }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => callback(raw);
    img.src = raw;
  };
  reader.readAsDataURL(file);
}
async function saveEditor() {
  saveEditorButton.disabled = true;
  saveEditorButton.textContent = "Saving...";
  try {
    wheel.name = editor.name.value.trim() || "Untitled Wheel";
    wheel.theme = editor.theme.value;
    const previousSignature = JSON.stringify({ ringCount: getRingCount(), rings: getActiveRings().map(ring => getRingNames(ring)) });
    wheel.ringCount = Math.max(1, Math.min(4, Number(editor.ringCount?.value) || 3));
    ensureWheelShape();
    wheel.sizeScale = clamp(editor.wheelSize?.value || wheel.sizeScale || 1, 0.45, MAX_WHEEL_SCALE);
    wheel.colors = { ...wheel.colors, wheel: editor.wheelColor.value, interface: editor.interfaceColor.value, text: editor.textColor.value, pageBg: editor.pageBg.value };
    ALL_RINGS.forEach(ring => {
      wheel.rings[ring].names = getEditorNames(ring).slice(0, MAX_SLICES);
      wheel.rings[ring].prompt = editor.prompts[ring]?.value.trim() || "";
    });
    const nextSignature = JSON.stringify({ ringCount: getRingCount(), rings: getActiveRings().map(ring => getRingNames(ring)) });
    if (previousSignature !== nextSignature) wheel.completed = [];

    for (const ring of ALL_RINGS) {
      if (pendingEditorBackgrounds[ring] === undefined) continue;
      await deleteStoredImage(wheel.rings[ring].backgroundRef);
      wheel.rings[ring].background = "";
      if (pendingEditorBackgrounds[ring]) {
        const key = getImageKey(ring);
        await putStoredImage(key, pendingEditorBackgrounds[ring]);
        wheel.rings[ring].backgroundRef = key;
      } else {
        wheel.rings[ring].backgroundRef = "";
      }
    }
    if (pendingEditorBackgrounds.page !== undefined) {
      await deleteStoredImage(wheel.colors.pageBgImageRef);
      wheel.colors.pageBgImage = "";
      if (pendingEditorBackgrounds.page) {
        const key = getImageKey("page");
        await putStoredImage(key, pendingEditorBackgrounds.page);
        wheel.colors.pageBgImageRef = key;
      } else {
        wheel.colors.pageBgImageRef = "";
      }
    }
    if (pendingEditorBackgrounds.center !== undefined) {
      await deleteStoredImage(wheel.center.backgroundRef);
      wheel.center.background = "";
      if (pendingEditorBackgrounds.center) {
        const key = getImageKey("center");
        await putStoredImage(key, pendingEditorBackgrounds.center);
        wheel.center.backgroundRef = key;
      } else {
        wheel.center.backgroundRef = "";
      }
    }
    saveWheel();
    await renderWheel();
    editorPanel.classList.add("hidden");
  } catch (error) {
    console.error(error);
    alert("Unable to save images. Please try a smaller image or a different browser.");
  } finally {
    saveEditorButton.disabled = false;
    saveEditorButton.textContent = "Save Changes";
  }
}

editWheelButton.addEventListener("click", openEditor);
closeEditorButton.addEventListener("click", () => editorPanel.classList.add("hidden"));
saveEditorButton.addEventListener("click", saveEditor);
resetCompletionLog?.addEventListener("click", event => {
  event.stopPropagation();
  if (!confirm("Reset the completed combination log for this wheel?")) return;
  wheel.completed = [];
  saveWheel();
  renderCompletionLog();
});
ALL_RINGS.forEach(ring => {
  editor.counts[ring]?.addEventListener("change", () => renderEditorNameInputs(ring));
  editor.counts[ring]?.addEventListener("input", () => renderEditorNameInputs(ring));
  editor.bgInputs[ring]?.addEventListener("change", () => {
    const file = editor.bgInputs[ring].files && editor.bgInputs[ring].files[0];
    readFileAsDataUrl(file, dataUrl => { pendingEditorBackgrounds[ring] = dataUrl; editor.bgInputs[ring].value = ""; });
  });
  editor.clearBg[ring]?.addEventListener("click", () => { pendingEditorBackgrounds[ring] = ""; });
});
editor.ringCount?.addEventListener("change", updateEditorRingVisibility);
editor.pageBgImage?.addEventListener("change", () => {
  const file = editor.pageBgImage.files && editor.pageBgImage.files[0];
  readFileAsDataUrl(file, dataUrl => { pendingEditorBackgrounds.page = dataUrl; document.documentElement.style.setProperty("--page-bg-image", `url("${dataUrl}")`); editor.pageBgImage.value = ""; });
});
editor.clearPageBgImage?.addEventListener("click", () => { pendingEditorBackgrounds.page = ""; document.documentElement.style.setProperty("--page-bg-image", "none"); });
editor.centerBgInput?.addEventListener("change", () => {
  const file = editor.centerBgInput.files && editor.centerBgInput.files[0];
  readFileAsDataUrl(file, dataUrl => { pendingEditorBackgrounds.center = dataUrl; document.documentElement.style.setProperty("--center-bg-image", `url("${dataUrl}")`); editor.centerBgInput.value = ""; });
});
editor.clearCenterBg?.addEventListener("click", () => { pendingEditorBackgrounds.center = ""; document.documentElement.style.setProperty("--center-bg-image", "none"); });
editor.pageBg?.addEventListener("input", () => {
  document.documentElement.style.setProperty("--bg", editor.pageBg.value);
});

editor.wheelSize?.addEventListener("input", () => {
  wheel.sizeScale = clamp(editor.wheelSize.value, 0.45, MAX_WHEEL_SCALE);
  document.documentElement.style.setProperty("--wheel-scale", String(wheel.sizeScale));
});
editor.wheelSize?.addEventListener("change", () => saveWheel());

function setWheelSize(nextSize, { save = false } = {}) {
  wheel.sizeScale = clamp(nextSize, 0.45, MAX_WHEEL_SCALE);
  document.documentElement.style.setProperty("--wheel-scale", String(wheel.sizeScale));
  if (editor.wheelSize) editor.wheelSize.value = String(wheel.sizeScale);
  if (save) saveWheel();
}

wheelDragResizeHandle?.addEventListener("pointerdown", event => {
  if (event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();
  const startX = event.clientX;
  const startY = event.clientY;
  const startSize = Number(wheel.sizeScale) || 1;
  wheelDragResizeHandle.setPointerCapture?.(event.pointerId);
  wheelDragResizeHandle.classList.add("resizing");

  const move = moveEvent => {
    const delta = ((moveEvent.clientX - startX) + (moveEvent.clientY - startY)) / 420;
    setWheelSize(startSize + delta);
  };
  const up = upEvent => {
    wheelDragResizeHandle.releasePointerCapture?.(upEvent.pointerId);
    wheelDragResizeHandle.classList.remove("resizing");
    saveWheel();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    window.removeEventListener("pointercancel", up);
  };

  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
  window.addEventListener("pointercancel", up);
});
centerOrb.addEventListener("pointerdown", startCharge);
centerOrb.addEventListener("pointerup", endCharge);
centerOrb.addEventListener("pointercancel", endCharge);
compass.addEventListener("mousedown", middleClickReset);
makePanelDraggable(document.getElementById("selectedPanel"));
makePanelDraggable(completionPanel);
setupMoveHandle();
setupRingDrag();
setupWheelScrollSpin();

(async function init() {
  await loadWheel();
  await renderWheel();
})();
