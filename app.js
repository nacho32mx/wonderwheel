const WHEELS_KEY = "skillWheelWheels";
const ACTIVE_WHEEL_KEY = "skillWheelActiveWheelId";
const MAX_SLICES = 20;
const IMAGE_DB_NAME = "skillWheelSpinnerImages";
const IMAGE_STORE = "images";
const ALL_RINGS = ["outer", "middle", "inner", "core", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
const CORE_DEFAULTS = ["Share", "Write", "Record", "Photo", "Call", "Thank You"];
const EXTRA_DEFAULTS = ["Imagine", "Build", "Ask", "Swap", "Stretch", "Celebrate"];
const RING_LABELS = { outer: "Ring 1", middle: "Ring 2", inner: "Ring 3", core: "Ring 4", fifth: "Ring 5", sixth: "Ring 6", seventh: "Ring 7", eighth: "Ring 8", ninth: "Ring 9", tenth: "Ring 10" };
const WHEEL_FRAME_BACKGROUNDS = {
  "classic-glow": "assets/wheel-styles/Space/background.png",
  arcane: "assets/wheel-styles/Arcane/background.png",
  steampunk: "assets/wheel-styles/Steampunk/background.png",
  "neon-circuit": "assets/wheel-styles/Neon Circuit/background.png",
  nature: "assets/wheel-styles/Koi Pond/background.png"
};
const WHEEL_FRAME_CENTERS = {
  "classic-glow": "assets/wheel-styles/Space/center.png",
  arcane: "assets/wheel-styles/Arcane/center.png",
  steampunk: "assets/wheel-styles/Steampunk/center.png",
  "neon-circuit": "assets/wheel-styles/Neon Circuit/center.png",
  nature: "assets/wheel-styles/Koi Pond/center.png"
};
const WHEEL_FRAME_PAGE_BACKGROUNDS = {
  "classic-glow": "assets/wheel-styles/Space/page-background.jpg",
  arcane: "assets/wheel-styles/Arcane/page-background.jpg",
  steampunk: "assets/wheel-styles/Steampunk/page-background.jpg",
  "neon-circuit": "assets/wheel-styles/Neon Circuit/page-background.jpg",
  nature: "assets/wheel-styles/Koi Pond/page-background.jpg"
};
const WHEEL_FRAME_ARROWS = {
  "classic-glow": "assets/wheel-styles/Space/arrow.png",
  arcane: "assets/wheel-styles/Arcane/arrow.png",
  steampunk: "assets/wheel-styles/Steampunk/arrow.png",
  "neon-circuit": "assets/wheel-styles/Neon Circuit/arrow.png",
  nature: "assets/wheel-styles/Koi Pond/arrow.png"
};

const compass = document.getElementById("compass");
const compassSelectionArrow = document.querySelector(".compass-selection-arrow");
const centerOrb = document.getElementById("centerOrb");
const wheelMoveHandle = document.getElementById("wheelMoveHandle");
const spiralLayer = document.getElementById("spinSpiralLayer");
const selectedOuter = document.getElementById("selectedOuter");
const selectedMiddle = document.getElementById("selectedMiddle");
const selectedInner = document.getElementById("selectedInner");
const selectedCore = document.getElementById("selectedCore");
const selectedFifth = document.getElementById("selectedFifth");
const selectedSixth = document.getElementById("selectedSixth");
const selectedSeventh = document.getElementById("selectedSeventh");
const selectedEighth = document.getElementById("selectedEighth");
const selectedNinth = document.getElementById("selectedNinth");
const selectedTenth = document.getElementById("selectedTenth");
const selectedOuterBox = document.getElementById("selectedOuterBox");
const selectedMiddleBox = document.getElementById("selectedMiddleBox");
const selectedInnerBox = document.getElementById("selectedInnerBox");
const selectedCoreBox = document.getElementById("selectedCoreBox");
const selectedFifthBox = document.getElementById("selectedFifthBox");
const selectedSixthBox = document.getElementById("selectedSixthBox");
const selectedSeventhBox = document.getElementById("selectedSeventhBox");
const selectedEighthBox = document.getElementById("selectedEighthBox");
const selectedNinthBox = document.getElementById("selectedNinthBox");
const selectedTenthBox = document.getElementById("selectedTenthBox");
const selectedPanel = document.getElementById("selectedPanel");
const copySelectedButton = document.getElementById("copySelectedButton");
const hideSectionLinesInput = document.getElementById("hideSectionLinesInput");
const hideWheelTextInput = document.getElementById("hideWheelTextInput");
const completionPanel = document.getElementById("completionPanel");
const completionSummary = document.getElementById("completionSummary");
const completionLog = document.getElementById("completionLog");
const toggleCompletionLog = document.getElementById("toggleCompletionLog");
const resetCompletionLog = document.getElementById("resetCompletionLog");
const downloadCompletionLog = document.getElementById("downloadCompletionLog");
const wheelTitle = document.getElementById("wheelTitle");
const editWheelButton = document.getElementById("editWheelButton");
const resetViewButton = document.getElementById("resetViewButton");
const editorPanel = document.getElementById("editorPanel");
const closeEditorButton = document.getElementById("closeEditorButton");
const saveEditorButton = document.getElementById("saveEditorButton");

const editor = {
  name: document.getElementById("wheelNameInput"),
  wheelFrame: document.getElementById("wheelFrameSelect"),
  customWheelStyleImage: document.getElementById("customWheelStyleImageInput"),
  customWheelStyleImageLabel: document.getElementById("customWheelStyleImageLabel"),
  clearCustomWheelStyleImage: document.getElementById("clearCustomWheelStyleImage"),
  wheelColor: document.getElementById("wheelColorInput"),
  hideWheelLines: document.getElementById("hideWheelLinesInput"),
  preventRepeatSelections: document.getElementById("preventRepeatSelections"),
  interfaceColor: document.getElementById("interfaceColorInput"),
  textColor: document.getElementById("textColorInput"),
  pageBg: document.getElementById("pageBgInput"),
  pageBgImageLabel: document.getElementById("pageBgImageLabel"),
  pageBgImage: document.getElementById("pageBgImageInput"),
  clearPageBgImage: document.getElementById("clearPageBgImage"),
  showWheelLines: null,
  allowSound: document.getElementById("allowSoundInput"),
  centerBgLabel: document.getElementById("centerBgLabel"),
  centerBgInput: document.getElementById("centerBgInput"),
  clearCenterBg: document.getElementById("clearCenterBg"),
  ringCount: document.getElementById("ringCountInput"),
  counts: {
    outer: document.getElementById("outerCountInput"),
    middle: document.getElementById("middleCountInput"),
    inner: document.getElementById("innerCountInput"),
    core: document.getElementById("coreCountInput"),
    fifth: document.getElementById("fifthCountInput"),
    sixth: document.getElementById("sixthCountInput"),
    seventh: document.getElementById("seventhCountInput"),
    eighth: document.getElementById("eighthCountInput"),
    ninth: document.getElementById("ninthCountInput"),
    tenth: document.getElementById("tenthCountInput")
  },
  nameLists: {
    outer: document.getElementById("outerNamesEditor"),
    middle: document.getElementById("middleNamesEditor"),
    inner: document.getElementById("innerNamesEditor"),
    core: document.getElementById("coreNamesEditor"),
    fifth: document.getElementById("fifthNamesEditor"),
    sixth: document.getElementById("sixthNamesEditor"),
    seventh: document.getElementById("seventhNamesEditor"),
    eighth: document.getElementById("eighthNamesEditor"),
    ninth: document.getElementById("ninthNamesEditor"),
    tenth: document.getElementById("tenthNamesEditor")
  },
  prompts: {
    outer: document.getElementById("outerPromptInput"),
    middle: document.getElementById("middlePromptInput"),
    inner: document.getElementById("innerPromptInput"),
    core: document.getElementById("corePromptInput"),
    fifth: document.getElementById("fifthPromptInput"),
    sixth: document.getElementById("sixthPromptInput"),
    seventh: document.getElementById("seventhPromptInput"),
    eighth: document.getElementById("eighthPromptInput"),
    ninth: document.getElementById("ninthPromptInput"),
    tenth: document.getElementById("tenthPromptInput")
  },
  connectors: {
    outer: document.getElementById("outerContextInput"),
    middle: document.getElementById("middleContextInput"),
    inner: document.getElementById("innerContextInput"),
    core: document.getElementById("coreContextInput"),
    fifth: document.getElementById("fifthContextInput"),
    sixth: document.getElementById("sixthContextInput"),
    seventh: document.getElementById("seventhContextInput"),
    eighth: document.getElementById("eighthContextInput"),
    ninth: document.getElementById("ninthContextInput"),
    tenth: document.getElementById("tenthContextInput")
  },
  limitEnabled: {
    outer: document.getElementById("outerLimitEnabledInput"),
    middle: document.getElementById("middleLimitEnabledInput"),
    inner: document.getElementById("innerLimitEnabledInput"),
    core: document.getElementById("coreLimitEnabledInput"),
    fifth: document.getElementById("fifthLimitEnabledInput"),
    sixth: document.getElementById("sixthLimitEnabledInput"),
    seventh: document.getElementById("seventhLimitEnabledInput"),
    eighth: document.getElementById("eighthLimitEnabledInput"),
    ninth: document.getElementById("ninthLimitEnabledInput"),
    tenth: document.getElementById("tenthLimitEnabledInput")
  },
  limitCounts: {
    outer: document.getElementById("outerLimitCountInput"),
    middle: document.getElementById("middleLimitCountInput"),
    inner: document.getElementById("innerLimitCountInput"),
    core: document.getElementById("coreLimitCountInput"),
    fifth: document.getElementById("fifthLimitCountInput"),
    sixth: document.getElementById("sixthLimitCountInput"),
    seventh: document.getElementById("seventhLimitCountInput"),
    eighth: document.getElementById("eighthLimitCountInput"),
    ninth: document.getElementById("ninthLimitCountInput"),
    tenth: document.getElementById("tenthLimitCountInput")
  },
  ringCards: {
    outer: document.getElementById("outerEditorCard"),
    middle: document.getElementById("middleEditorCard"),
    inner: document.getElementById("innerEditorCard"),
    core: document.getElementById("coreEditorCard"),
    fifth: document.getElementById("fifthEditorCard"),
    sixth: document.getElementById("sixthEditorCard"),
    seventh: document.getElementById("seventhEditorCard"),
    eighth: document.getElementById("eighthEditorCard"),
    ninth: document.getElementById("ninthEditorCard"),
    tenth: document.getElementById("tenthEditorCard")
  }
};

let wheel = null;
let wheels = [];
let displayedCombination = null;
let rotations = makeRingState();
let velocities = makeRingState();
let spinFrame = null;
let chargeStart = 0;
let isCharging = false;
let chargeBaseRotations = makeRingState();
let pendingSpinProfile = null;
let spinAccelerationProfile = null;
let spinFrameCount = 0;
let superSpinActive = false;
let superSpinFrame = null;
let superSpinStopTimer = null;
let deferredTapSpinTimer = null;
let lastCenterTapAt = 0;
let pendingEditorBackgrounds = makePendingBackgroundState();
let saveTimer = null;
let editorAutoSaveTimer = null;
let editorAutoSaving = false;
let editorOpening = false;
let completionNoticeTimer = null;
let audioContext = null;
let chargeOscillator = null;
let chargeGain = null;
let lastClickStep = null;
let lastClickAt = 0;
let idleStartedAt = performance.now();
let idleFrame = null;
let idleLastRender = 0;
let hapticHoldTimer = null;
const imageCache = new Map();
const CHARGE_MAX_MS = 1500;
const DECAY = 0.982;
const MAX_WHEEL_SCALE = 3;
const IDLE_RING_ROTATION_MS = 120000;
const IDLE_RENDER_INTERVAL_MS = 34;
const SUPER_SPIN_MAX_MS = 10000;
const DOUBLE_TAP_MS = 320;

function makeRingState(value = 0) {
  return Object.fromEntries(ALL_RINGS.map(ring => [ring, value]));
}
function makePendingBackgroundState() {
  return { page: undefined, wheel: undefined, center: undefined };
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
function vibrate(pattern) {
  if (!("vibrate" in navigator)) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    // Haptics are optional and browser/device dependent.
  }
}
function startHoldHaptics() {
  stopHoldHaptics();
  vibrate(12);
  hapticHoldTimer = setInterval(() => {
    if (!isCharging) {
      stopHoldHaptics();
      return;
    }
    const power = Math.min(1, (performance.now() - chargeStart) / CHARGE_MAX_MS);
    vibrate(power > 0.86 ? 14 : 8);
  }, 360);
}
function stopHoldHaptics() {
  if (hapticHoldTimer) clearInterval(hapticHoldTimer);
  hapticHoldTimer = null;
}
function clearDeferredTapSpin() {
  clearTimeout(deferredTapSpinTimer);
  deferredTapSpinTimer = null;
}
function isTouchPointer(event) {
  return event?.pointerType === "touch" || event?.pointerType === "pen";
}
function getRingCount() { return Math.max(1, Math.min(ALL_RINGS.length, Number(wheel?.ringCount) || 3)); }
function getActiveRings() { return ALL_RINGS.slice(0, getRingCount()); }
function isRingActive(ring) { return getActiveRings().includes(ring); }
function ringDisplayName(ring) { return RING_LABELS[ring] || ring.charAt(0).toUpperCase() + ring.slice(1); }
function getIdleDirection(ring) {
  const index = ALL_RINGS.indexOf(ring);
  return index % 2 === 0 ? 1 : -1;
}
function getIdleOffset(ring, now = performance.now()) {
  if (!isRingActive(ring) || spinFrame || isCharging) return 0;
  const elapsed = Math.max(0, now - idleStartedAt);
  return getIdleDirection(ring) * (elapsed / IDLE_RING_ROTATION_MS) * 360;
}
function getVisualRotation(ring, now = performance.now()) {
  return normalizeAngle((rotations[ring] || 0) + getIdleOffset(ring, now));
}
function updateWheelBackgroundMotion(now = performance.now()) {
  const visualRing = getActiveRings()[0];
  if (!compass || !visualRing) return;
  compass.style.setProperty("--wheel-bg-rotation", `${getVisualRotation(visualRing, now)}deg`);
}
function commitIdleRotations() {
  const now = performance.now();
  getActiveRings().forEach(ring => {
    rotations[ring] = normalizeAngle((rotations[ring] || 0) + getIdleOffset(ring, now));
  });
  idleStartedAt = now;
}
function makeSpinProfile() {
  const directions = {};
  const speedVariance = {};
  const ringOffsets = {};
  const releaseJitter = {};
  getActiveRings().forEach((ring, index) => {
    directions[ring] = randomFloat() > 0.5 ? 1 : -1;
    speedVariance[ring] = randomFloat(0.68, 1.32);
    ringOffsets[ring] = randomFloat(-4.8, 4.8) + index * randomFloat(-1.15, 1.15);
    releaseJitter[ring] = getSliceDeg(ring) * randomFloat(-0.46, 0.46);
  });
  return { directions, speedVariance, ringOffsets, releaseJitter, spinSeed: randomFloat(-240, 240) };
}
function makeSpinAccelerationProfile(activeRings, power) {
  const profile = {};
  activeRings.forEach((ring, index) => {
    const pulseCount = randomInt(2, 4);
    profile[ring] = Array.from({ length: pulseCount }, () => ({
      at: randomInt(4, 56 + index * 5),
      duration: randomInt(8, 22),
      force: randomFloat(-0.18, 0.18) * (0.65 + power * 1.35) * (1 + index * 0.06)
    }));
  });
  return profile;
}
function applySpinAcceleration() {
  if (!spinAccelerationProfile) return;
  getActiveRings().forEach(ring => {
    const pulses = spinAccelerationProfile[ring] || [];
    pulses.forEach(pulse => {
      const age = spinFrameCount - pulse.at;
      if (age < 0 || age > pulse.duration) return;
      const envelope = Math.sin((age / pulse.duration) * Math.PI);
      velocities[ring] += pulse.force * envelope;
    });
  });
}
function isMobileLayout() {
  return window.matchMedia?.("(max-width: 720px)").matches || window.innerWidth <= 720;
}
function getLayoutOuterSize() {
  if (!isMobileLayout()) return 620;
  const viewportWidth = window.visualViewport?.width || window.innerWidth || 620;
  const viewportHeight = window.visualViewport?.height || window.innerHeight || 620;
  return Math.round(clamp(Math.min(viewportWidth - 28, viewportHeight * 0.43, 430), 260, 620));
}
function getEffectiveWheelScale(outerSize) {
  const requested = Number(wheel?.sizeScale) || 1;
  if (!isMobileLayout()) return requested;
  const viewportWidth = window.visualViewport?.width || window.innerWidth || outerSize;
  const maxScale = Math.max(0.45, (viewportWidth - 28) / outerSize);
  return Math.min(requested, maxScale);
}
function updateWheelScaleCss(outerSize = getLayoutOuterSize()) {
  document.documentElement.style.setProperty("--wheel-scale", String(getEffectiveWheelScale(outerSize)));
}
function applyRingLayout() {
  const outerSize = getLayoutOuterSize();
  const centerSize = Math.round(clamp(outerSize * (88 / 620), 64, 88));
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
    const innerStop = Math.max(0, Math.min(96, innerBoundary / outerBoundary * 100));
    rootStyle.setProperty(`--${ring}-size`, `${diameter}px`);
    rootStyle.setProperty(`--${ring}-label-radius`, `${labelRadius}px`);
    rootStyle.setProperty(`--${ring}-label-width`, `${labelWidth}px`);
    rootStyle.setProperty(`--${ring}-label-font`, `${Math.max(0.68, Math.min(1.04, band / 82))}rem`);
    rootStyle.setProperty(`--${ring}-inner-stop`, `${innerStop}%`);
  });
  updateWheelScaleCss(outerSize);
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
function fillSliceSelect(select) {
  if (!select || select.dataset.sliceOptionsReady) return;
  const current = String(select.value || "6");
  select.innerHTML = Array.from({ length: MAX_SLICES }, (_, index) => {
    const value = String(index + 1);
    return `<option value="${value}">${value}</option>`;
  }).join("");
  select.value = current;
  if (select.value !== current) select.value = String(Math.min(MAX_SLICES, Math.max(1, Number(current) || 6)));
  select.dataset.sliceOptionsReady = "true";
}
function fillRingCountSelect(select) {
  if (!select || select.dataset.ringOptionsReady) return;
  const current = String(select.value || "3");
  select.innerHTML = Array.from({ length: ALL_RINGS.length }, (_, index) => {
    const value = String(index + 1);
    return `<option value="${value}">${value} ${index === 0 ? "ring" : "rings"}</option>`;
  }).join("");
  select.value = current;
  if (select.value !== current) select.value = String(Math.min(ALL_RINGS.length, Math.max(1, Number(current) || 3)));
  select.dataset.ringOptionsReady = "true";
}
function normalizeAngle(angle) { return ((Number(angle) || 0) % 360 + 360) % 360; }
function clamp(value, min, max) { return Math.max(min, Math.min(max, Number(value) || min)); }
function getImageKey(part) { return `${wheel.id}:${part}`; }
function normalizedWheelFrame(frame = wheel?.wheelFrame) {
  if (!frame || frame === "classic" || frame === "standard") return "none";
  return frame;
}
function wheelFrameBackgroundSrc() {
  const frame = normalizedWheelFrame();
  if (frame === "custom") return "";
  return WHEEL_FRAME_BACKGROUNDS[frame] || "";
}
function wheelFrameCenterSrc() {
  const frame = normalizedWheelFrame();
  if (frame === "custom") return "";
  return WHEEL_FRAME_CENTERS[frame] || "";
}
function wheelFramePageBackgroundSrc() {
  const frame = normalizedWheelFrame();
  if (frame === "custom") return "";
  return WHEEL_FRAME_PAGE_BACKGROUNDS[frame] || "";
}
function wheelFrameArrowSrc() {
  const frame = normalizedWheelFrame();
  if (frame === "custom") return "";
  return WHEEL_FRAME_ARROWS[frame] || "";
}

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
  const wheelBg = wheel.colors?.wheelBgImage;
  if (typeof wheelBg === "string" && wheelBg.startsWith("data:image/")) {
    const key = getImageKey("wheel");
    await putStoredImage(key, wheelBg);
    wheel.colors.wheelBgImage = "";
    wheel.colors.wheelBgImageRef = key;
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
  wheel.ringCount = Math.max(1, Math.min(ALL_RINGS.length, Number(wheel.ringCount) || 3));
  ALL_RINGS.forEach(ring => {
    const defaults = ring === "core" ? CORE_DEFAULTS : (ALL_RINGS.indexOf(ring) >= 4 ? EXTRA_DEFAULTS : [`${ring} 1`]);
    wheel.rings[ring] ||= { names: defaults, background: "", backgroundRef: "", rotation: 0 };
    if (!Array.isArray(wheel.rings[ring].names) || !wheel.rings[ring].names.length) wheel.rings[ring].names = defaults;
    wheel.rings[ring].names = wheel.rings[ring].names.slice(0, MAX_SLICES);
    wheel.rings[ring].prompt = String(wheel.rings[ring].prompt || "");
    wheel.rings[ring].connector = String(wheel.rings[ring].connector || "");
    wheel.rings[ring].background ||= "";
    wheel.rings[ring].backgroundRef ||= "";
    wheel.rings[ring].rotation = Number(wheel.rings[ring].rotation) || 0;
    wheel.rings[ring].limitSelectionCount = Boolean(wheel.rings[ring].limitSelectionCount);
    wheel.rings[ring].selectionLimit = Math.max(1, Math.min(10, Number(wheel.rings[ring].selectionLimit) || 1));
    if (!wheel.rings[ring].selectionCounts || typeof wheel.rings[ring].selectionCounts !== "object" || Array.isArray(wheel.rings[ring].selectionCounts)) {
      wheel.rings[ring].selectionCounts = {};
    }
    const validNames = new Set(wheel.rings[ring].names);
    Object.keys(wheel.rings[ring].selectionCounts).forEach(name => {
      if (!validNames.has(name)) delete wheel.rings[ring].selectionCounts[name];
      else wheel.rings[ring].selectionCounts[name] = Math.max(0, Number(wheel.rings[ring].selectionCounts[name]) || 0);
    });
  });
  wheel.colors ||= { wheel: "#ffd700", interface: "#ffd700", text: "#ffd700", pageBg: "#111111", pageBgImageRef: "" };
  wheel.colors.pageBgImageRef ||= "";
  wheel.colors.wheelBgImage ||= "";
  wheel.colors.wheelBgImageRef ||= "";
  wheel.center ||= { background: "", backgroundRef: "" };
  wheel.center.background ||= "";
  wheel.center.backgroundRef ||= "";
  wheel.completed ||= [];
  if (!Array.isArray(wheel.completed)) wheel.completed = [];
  wheel.preventRepeatSelections = Boolean(wheel.preventRepeatSelections);
  wheel.allowSound = Boolean(wheel.allowSound);
  wheel.hideWheelLines = wheel.hideWheelLines === undefined ? true : Boolean(wheel.hideWheelLines);
  wheel.showWheelLines = Boolean(wheel.showWheelLines);
  wheel.hideWheelText = Boolean(wheel.hideWheelText);
  wheel.wheelFrame = normalizedWheelFrame(wheel.wheelFrame);
  wheel.sizeScale = clamp(wheel.sizeScale || 1, 0.45, MAX_WHEEL_SCALE);
}
async function applyColors() {
  applyRingLayout();
  document.documentElement.style.setProperty("--wheel-line", wheel.colors.wheel || "#ffd700");
  document.documentElement.style.setProperty("--interface", wheel.colors.interface || wheel.colors.wheel || "#ffd700");
  document.documentElement.style.setProperty("--wheel-text", wheel.colors.text || "#ffd700");
  document.documentElement.style.setProperty("--bg", wheel.colors.pageBg || "#111111");
  updateWheelScaleCss();
  const [themeA, themeB, themeC] = themeColors();
  document.documentElement.style.setProperty("--theme-a", themeA);
  document.documentElement.style.setProperty("--theme-b", themeB);
  document.documentElement.style.setProperty("--theme-c", themeC);
  let pageImage = wheelFramePageBackgroundSrc();
  if (!pageImage && wheel.wheelFrame === "custom" && wheel.colors.pageBgImageRef) {
    pageImage = await getStoredImage(wheel.colors.pageBgImageRef).catch(() => "");
  }
  document.documentElement.style.setProperty("--page-bg-image", pageImage ? `url("${pageImage}")` : "none");
  let wheelImage = wheelFrameBackgroundSrc();
  if (!wheelImage && wheel.wheelFrame === "custom") {
    wheelImage = wheel.colors?.wheelBgImage || "";
    if (!wheelImage && wheel.colors?.wheelBgImageRef) wheelImage = await getStoredImage(wheel.colors.wheelBgImageRef).catch(() => "");
  }
  document.documentElement.style.setProperty("--wheel-bg-image", wheelImage ? `url("${wheelImage}")` : "none");
  let centerImage = wheelFrameCenterSrc();
  if (!centerImage && wheel.wheelFrame === "custom") {
    centerImage = wheel.center?.background || "";
    if (!centerImage && wheel.center?.backgroundRef) centerImage = await getStoredImage(wheel.center.backgroundRef).catch(() => "");
  }
  document.documentElement.style.setProperty("--center-bg-image", centerImage ? `url("${centerImage}")` : "none");
  const arrowImage = wheelFrameArrowSrc();
  document.documentElement.style.setProperty("--arrow-image", arrowImage ? `url("${arrowImage}")` : "none");
  compass?.classList.toggle("has-arrow-image", Boolean(arrowImage));
  compass?.classList.toggle("hide-wheel-lines", Boolean(wheel.hideWheelLines));
  compass?.classList.toggle("show-wheel-lines", Boolean(wheel.showWheelLines));
  compass?.classList.toggle("hide-wheel-text", Boolean(wheel.hideWheelText));
}
function getRingAllNames(ring) { return (wheel.rings?.[ring]?.names || []).filter(name => String(name).trim()); }
function getRingLimit(ring) { return Math.max(1, Math.min(10, Number(wheel.rings?.[ring]?.selectionLimit) || 1)); }
function getRingSelectionCounts(ring) { return wheel.rings?.[ring]?.selectionCounts || {}; }
function getRingNames(ring) {
  const names = getRingAllNames(ring);
  if (!wheel.rings?.[ring]?.limitSelectionCount) return names;
  const limit = getRingLimit(ring);
  const counts = getRingSelectionCounts(ring);
  return names.filter(name => (Number(counts[name]) || 0) < limit);
}
function getRingPrompt(ring) { return String(wheel.rings?.[ring]?.prompt || "").trim(); }
function getRingConnector(ring) { return String(wheel.rings?.[ring]?.connector || "").trim(); }
function hasContextConnectors() { return getActiveRings().some(ring => getRingConnector(ring)); }
function formatSelectedInstruction(ring, name) {
  const value = String(name || "").trim();
  const connector = getRingConnector(ring);
  if (hasContextConnectors()) return [connector, value].filter(Boolean).join(" ") || "-";
  const prompt = getRingPrompt(ring);
  return [prompt, value].filter(Boolean).join(" ") || "-";
}
function combinationSentence(combo = null) {
  const parts = combo?.parts || [];
  if (!parts.length) return "";
  if (!hasContextConnectors()) return parts.map(part => part.displayName || part.name).filter(Boolean).join(" + ");
  return parts.map(part => part.displayName || part.name).filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}
function getSliceDeg(ring) { return 360 / Math.max(1, getRingNames(ring).length); }
function getSelectedIndex(ring, visualRotation = getVisualRotation(ring)) {
  const names = getRingNames(ring);
  if (!names.length) return 0;
  const sliceDeg = 360 / names.length;
  const arrowCssAngle = 270;
  const unrotated = normalizeAngle(arrowCssAngle - visualRotation);
  return Math.floor((unrotated + sliceDeg / 2) / sliceDeg) % names.length;
}
function rotationForSelectedIndex(ring, index) {
  const names = getRingNames(ring);
  const sliceDeg = 360 / Math.max(1, names.length);
  return normalizeAngle(270 - index * sliceDeg);
}
function directedAngleDelta(current, target, direction) {
  const positiveDelta = normalizeAngle(target - current);
  if (direction >= 0) return positiveDelta;
  return positiveDelta === 0 ? 0 : positiveDelta - 360;
}
function renderRing(ring) {
  const ringEl = document.getElementById(`${ring}Ring`);
  const labels = document.getElementById(`${ring}Labels`);
  if (!ringEl || !labels) return;
  ringEl.classList.toggle("hidden", !isRingActive(ring));
  if (!isRingActive(ring)) return;
  const names = getRingNames(ring);
  ringEl.classList.toggle("depleted", !names.length);
  const sliceDeg = 360 / Math.max(1, names.length);
  const visualRotation = getVisualRotation(ring);
  const selectedIndex = getSelectedIndex(ring, visualRotation);
  ringEl.style.setProperty("--slice-deg", `${sliceDeg}deg`);
  ringEl.style.setProperty("--line-from", `${90 - sliceDeg / 2 + visualRotation}deg`);
  ringEl.style.setProperty("--selected-from", `${90 - sliceDeg / 2 + selectedIndex * sliceDeg + visualRotation}deg`);
  ringEl.style.setProperty("--selected-size", `${sliceDeg}deg`);
  labels.innerHTML = "";
  names.forEach((name, index) => {
    const div = document.createElement("div");
    div.className = "slice-label";
    if (index === selectedIndex) div.classList.add("selected");
    div.textContent = name;
    div.style.setProperty("--angle", `${index * sliceDeg + visualRotation}deg`);
    labels.appendChild(div);
  });
}
function updateRingVisualPosition(ring) {
  const ringEl = document.getElementById(`${ring}Ring`);
  const labels = document.getElementById(`${ring}Labels`);
  if (!ringEl || !labels || !isRingActive(ring)) return;
  const names = getRingNames(ring);
  ringEl.classList.toggle("depleted", !names.length);
  const sliceDeg = 360 / Math.max(1, names.length);
  const visualRotation = getVisualRotation(ring);
  const selectedIndex = getSelectedIndex(ring, visualRotation);
  ringEl.style.setProperty("--line-from", `${90 - sliceDeg / 2 + visualRotation}deg`);
  ringEl.style.setProperty("--selected-from", `${90 - sliceDeg / 2 + selectedIndex * sliceDeg + visualRotation}deg`);
  labels.querySelectorAll(".slice-label").forEach((label, index) => {
    label.classList.toggle("selected", index === selectedIndex);
    label.style.setProperty("--angle", `${index * sliceDeg + visualRotation}deg`);
  });
}
async function renderWheel() {
  await applyColors();
  wheelTitle.textContent = wheel.name || "Wheel";
  syncSelectedControls();
  ALL_RINGS.forEach(renderRing);
  updateWheelBackgroundMotion();
  updateSelectedPanel();
  renderCompletionLog();
}
function syncSelectedControls() {
  if (editor.hideWheelLines) editor.hideWheelLines.checked = !Boolean(wheel.hideWheelLines);
  if (hideSectionLinesInput) hideSectionLinesInput.checked = Boolean(wheel.showWheelLines);
  if (hideWheelTextInput) hideWheelTextInput.checked = !Boolean(wheel.hideWheelText);
  if (editor.allowSound) editor.allowSound.checked = Boolean(wheel.allowSound);
}
function updateWheelRotations({ liveSelection = true } = {}) {
  idleStartedAt = performance.now();
  ALL_RINGS.forEach(ring => {
    rotations[ring] = normalizeAngle(rotations[ring]);
    renderRing(ring);
  });
  updateWheelBackgroundMotion();
  updateSelectedPanel(liveSelection ? getCurrentCombination() : undefined);
}
function updateIdleRingMotion(now) {
  if (wheel && !spinFrame && !isCharging && now - idleLastRender >= IDLE_RENDER_INTERVAL_MS) {
    ALL_RINGS.forEach(updateRingVisualPosition);
    updateWheelBackgroundMotion(now);
    idleLastRender = now;
  }
  idleFrame = requestAnimationFrame(updateIdleRingMotion);
}
function startIdleRingMotion() {
  if (idleFrame) return;
  idleStartedAt = performance.now();
  idleFrame = requestAnimationFrame(updateIdleRingMotion);
}
function updateSelectedPanel(combo = displayedCombination || getCurrentCombination()) {
  const fields = {
    outer: { box: selectedOuterBox, value: selectedOuter },
    middle: { box: selectedMiddleBox, value: selectedMiddle },
    inner: { box: selectedInnerBox, value: selectedInner },
    core: { box: selectedCoreBox, value: selectedCore },
    fifth: { box: selectedFifthBox, value: selectedFifth },
    sixth: { box: selectedSixthBox, value: selectedSixth },
    seventh: { box: selectedSeventhBox, value: selectedSeventh },
    eighth: { box: selectedEighthBox, value: selectedEighth },
    ninth: { box: selectedNinthBox, value: selectedNinth },
    tenth: { box: selectedTenthBox, value: selectedTenth }
  };
  ALL_RINGS.forEach(ring => {
    fields[ring].box?.classList.toggle("hidden", !isRingActive(ring));
    if (fields[ring].value) {
      const part = combo?.parts?.find(item => item.ring === ring);
      const selectedName = part?.name ?? getRingNames(ring)[getSelectedIndex(ring)] ?? "";
      const label = fields[ring].box?.querySelector("span");
      if (label) label.textContent = getRingPrompt(ring) || ringDisplayName(ring);
      fields[ring].value.textContent = part?.displayName || formatSelectedInstruction(ring, selectedName);
    }
  });
}
function getTotalCombinations() {
  return getActiveRings().reduce((total, ring) => total * getRingNames(ring).length, 1);
}
function resetSelectionCounts() {
  ALL_RINGS.forEach(ring => {
    if (wheel.rings?.[ring]) wheel.rings[ring].selectionCounts = {};
  });
}
function recordRingSelectionCounts(combo) {
  combo?.parts?.forEach(part => {
    if (!part.name || !wheel.rings?.[part.ring]?.limitSelectionCount) return;
    const counts = wheel.rings[part.ring].selectionCounts ||= {};
    counts[part.name] = (Number(counts[part.name]) || 0) + 1;
  });
}
function comboKeyFromNames(names) { return names.map(name => String(name).trim()).join("||"); }
function getCurrentCombination() {
  const parts = getActiveRings().map(ring => {
    const names = getRingNames(ring);
    const index = getSelectedIndex(ring);
    const name = names[index] || "";
    return { ring, index, name, displayName: formatSelectedInstruction(ring, name) };
  });
  const combo = { parts, names: parts.map(part => part.name), displayNames: parts.map(part => part.displayName), key: comboKeyFromNames(parts.map(part => part.name)) };
  combo.sentence = combinationSentence(combo);
  return combo;
}
function setDisplayedCombination(combo = getCurrentCombination()) {
  displayedCombination = combo;
  updateSelectedPanel(displayedCombination);
}
async function copySelectedText() {
  const combo = displayedCombination || getCurrentCombination();
  const lines = [
    wheel?.name || "Wheel",
    combo.sentence || combinationSentence(combo),
    "",
    ...combo.parts.map(part => `${getRingPrompt(part.ring) || ringDisplayName(part.ring)}: ${part.name}`)
  ];
  const text = lines.join("\n");
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
    else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    if (copySelectedButton) {
      copySelectedButton.classList.add("copied");
      copySelectedButton.setAttribute("aria-label", "Copied");
      copySelectedButton.title = "Copied";
      setTimeout(() => {
        copySelectedButton.classList.remove("copied");
        copySelectedButton.setAttribute("aria-label", "Copy all");
        copySelectedButton.title = "Copy all";
      }, 1200);
    }
  } catch {
    alert("Unable to copy selected text. Please try again.");
  }
}
function getCompletedKeys() { return new Set((wheel.completed || []).map(item => item.key)); }
function findUnusedCombination() {
  const completed = getCompletedKeys();
  const rings = getActiveRings();
  const ringNames = rings.map(ring => getRingNames(ring));
  const total = ringNames.reduce((value, names) => value * names.length, 1);
  if (!total || completed.size >= total) return null;
  const comboFromOffset = offset => {
    const indexes = {};
    const names = [];
    rings.forEach((ring, ringIndex) => {
      const namesForRing = ringNames[ringIndex];
      const index = offset % namesForRing.length;
      offset = Math.floor(offset / namesForRing.length);
      indexes[ring] = index;
      names.push(namesForRing[index]);
    });
    return { indexes, names, key: comboKeyFromNames(names) };
  };
  for (let attempt = 0; attempt < 80; attempt++) {
    const combo = comboFromOffset(randomInt(0, total - 1));
    if (!completed.has(combo.key)) return combo;
  }
  const start = randomInt(0, total - 1);
  for (let scanned = 0; scanned < total; scanned++) {
    const combo = comboFromOffset((start + scanned) % total);
    if (!completed.has(combo.key)) return combo;
  }
  return null;
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
function soundAllowed() { return Boolean(wheel?.allowSound); }
function unlockAudio() {
  if (!soundAllowed()) return;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return;
  audioContext ||= new AudioCtor();
  if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
}
function playSpinClick(intensity = 1) {
  if (!soundAllowed() || !audioContext) return;
  const now = audioContext.currentTime;
  if (now - lastClickAt < 0.018) return;
  lastClickAt = now;
  const gain = audioContext.createGain();
  const osc = audioContext.createOscillator();
  const safeIntensity = clamp(intensity, 0.3, 1.6);
  osc.type = "square";
  osc.frequency.setValueAtTime(520 + safeIntensity * 360, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035 + safeIntensity * 0.025, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.026);
  osc.connect(gain).connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + 0.03);
}
function playUiClick() {
  if (!soundAllowed() || !audioContext) return;
  const now = audioContext.currentTime;
  const gain = audioContext.createGain();
  const osc = audioContext.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(420, now);
  osc.frequency.exponentialRampToValueAtTime(620, now + 0.018);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.03, now + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
  osc.connect(gain).connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + 0.06);
}
function playSelectionChime() {
  if (!soundAllowed() || !audioContext) return;
  const now = audioContext.currentTime;
  [659.25, 987.77].forEach((frequency, index) => {
    const start = now + index * 0.09;
    const gain = audioContext.createGain();
    const osc = audioContext.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.06, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.28);
    osc.connect(gain).connect(audioContext.destination);
    osc.start(start);
    osc.stop(start + 0.32);
  });
}
function startChargeTone() {
  if (!soundAllowed() || !audioContext || chargeOscillator) return;
  const now = audioContext.currentTime;
  chargeGain = audioContext.createGain();
  chargeOscillator = audioContext.createOscillator();
  chargeOscillator.type = "sine";
  chargeOscillator.frequency.setValueAtTime(180, now);
  chargeGain.gain.setValueAtTime(0.0001, now);
  chargeGain.gain.exponentialRampToValueAtTime(0.045, now + 0.08);
  chargeOscillator.connect(chargeGain).connect(audioContext.destination);
  chargeOscillator.start(now);
}
function updateChargeTone(power) {
  if (!chargeOscillator || !chargeGain || !audioContext) return;
  const now = audioContext.currentTime;
  chargeOscillator.frequency.setTargetAtTime(180 + Math.pow(power, 1.25) * 620, now, 0.035);
  chargeGain.gain.setTargetAtTime(0.025 + power * 0.045, now, 0.04);
}
function stopChargeTone() {
  if (!chargeOscillator || !chargeGain || !audioContext) return;
  const now = audioContext.currentTime;
  chargeGain.gain.cancelScheduledValues(now);
  chargeGain.gain.setTargetAtTime(0.0001, now, 0.025);
  chargeOscillator.stop(now + 0.12);
  chargeOscillator = null;
  chargeGain = null;
}
function playSpinWhoosh(power = 1) {
  if (!soundAllowed() || !audioContext) return;
  const now = audioContext.currentTime;
  const duration = 0.36 + Math.max(0, Math.min(1, power)) * 0.34;
  const bufferSize = Math.max(1, Math.floor(audioContext.sampleRate * duration));
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  noise.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(950, now);
  filter.frequency.exponentialRampToValueAtTime(160, now + duration);
  filter.Q.setValueAtTime(0.7, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  noise.connect(filter).connect(gain).connect(audioContext.destination);
  noise.start(now);
  noise.stop(now + duration);
}
function resetSpinClickTracker() {
  const ring = getActiveRings()[0];
  lastClickStep = ring ? Math.floor(normalizeAngle(rotations[ring]) / getSliceDeg(ring)) : null;
}
function updateSpinClicks() {
  if (!soundAllowed()) return;
  const ring = getActiveRings()[0];
  if (!ring) return;
  const sliceDeg = getSliceDeg(ring);
  const step = Math.floor(normalizeAngle(rotations[ring]) / sliceDeg);
  if (lastClickStep === null) {
    lastClickStep = step;
    return;
  }
  if (step === lastClickStep) return;
  const speed = Math.abs(velocities[ring] || 0);
  playSpinClick(Math.min(1.6, 0.35 + speed / 18));
  lastClickStep = step;
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
  const collapsed = completionPanel?.classList.contains("collapsed");
  toggleCompletionLog?.classList.toggle("active", !collapsed);
  toggleCompletionLog?.setAttribute("aria-pressed", collapsed ? "false" : "true");
  toggleCompletionLog?.setAttribute("aria-label", collapsed ? "Show spins" : "Hide spins");
  if (toggleCompletionLog) toggleCompletionLog.title = collapsed ? "Show spins" : "Hide spins";
  const total = getTotalCombinations();
  const completed = wheel.completed || [];
  if (editor.preventRepeatSelections) editor.preventRepeatSelections.checked = Boolean(wheel.preventRepeatSelections);
  const uniqueCompleted = getCompletedKeys().size;
  const depletedRings = getActiveRings().filter(ring => !getRingNames(ring).length).length;
  completionSummary.textContent = depletedRings
    ? `${completed.length} spin${completed.length === 1 ? "" : "s"} - ${depletedRings} ring${depletedRings === 1 ? "" : "s"} depleted`
    : `${completed.length} spin${completed.length === 1 ? "" : "s"}${wheel.preventRepeatSelections ? ` - ${uniqueCompleted} / ${total} unique` : ""}`;
  completionPanel?.classList.toggle("complete", Boolean(wheel.preventRepeatSelections) && total > 0 && uniqueCompleted >= total);
  completionLog.innerHTML = completed.slice().reverse().map((item, index) => {
    const spinNumber = completed.length - index;
    const names = escapeHtml(item.sentence || (item.displayNames || item.names)?.join(" + ") || item.key || "");
    const date = item.completedAt ? new Date(item.completedAt) : null;
    const timestamp = date && !Number.isNaN(date.getTime()) ? escapeHtml(date.toLocaleString()) : "";
    return `<li><span>${spinNumber}. ${names}</span>${timestamp ? `<small>${timestamp}</small>` : ""}</li>`;
  }).join("");
}
function completeCurrentCombination() {
  const total = getTotalCombinations();
  if (!total) {
    showCompletionNotice("Limited sections used");
    return null;
  }
  wheel.completed ||= [];
  let combo = getCurrentCombination();
  if (wheel.preventRepeatSelections && getCompletedKeys().has(combo.key)) {
    const unused = findUnusedCombination();
    if (!unused) {
      showCompletionNotice("All combinations completed");
    } else {
      setSelectedIndexes(unused.indexes);
      combo = getCurrentCombination();
      showCompletionNotice("Used result skipped");
    }
  }
  const wasNewCombination = !getCompletedKeys().has(combo.key);
  recordRingSelectionCounts(combo);
  wheel.completed.push({ key: combo.key, names: combo.names, displayNames: combo.displayNames, sentence: combo.sentence || combinationSentence(combo), completedAt: new Date().toISOString() });
  if (wheel.preventRepeatSelections && wasNewCombination) showCompletionNotice("Combination completed");
  renderCompletionLog();
  return combo;
}
function spinLogRows() {
  return (wheel.completed || []).map((item, index) => ({
    spin: index + 1,
    completedAt: item.completedAt || "",
    result: item.sentence || (item.displayNames || item.names || []).join(" + "),
    key: item.key || ""
  }));
}
function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
function downloadSpinLog() {
  const rows = spinLogRows();
  const csv = [
    ["Spin", "Completed At", "Result", "Key"].map(csvCell).join(","),
    ...rows.map(row => [row.spin, row.completedAt, row.result, row.key].map(csvCell).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeName = (wheel.name || "wonder-wheel").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "wonder-wheel";
  link.href = url;
  link.download = `${safeName}-spin-log.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 250);
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
function themeColors() {
  return [
    wheel.colors?.interface || wheel.colors?.wheel || "#ffd700",
    wheel.colors?.wheel || "#ffd700",
    wheel.colors?.text || "#ffffff"
  ];
}
function spawnFinishRipple() {
  if (!spiralLayer || !compass) return;
  const colors = themeColors();
  const rect = compass.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  const maxSize = rect.width * 1.1;
  colors.slice(0, 3).forEach((color, index) => {
    const ripple = document.createElement("div");
    ripple.className = "finish-ripple";
    ripple.style.left = `${originX}px`;
    ripple.style.top = `${originY}px`;
    ripple.style.width = `${maxSize}px`;
    ripple.style.height = `${maxSize}px`;
    ripple.style.color = color;
    ripple.style.animationDelay = `${index * 0.16}s`;
    spiralLayer.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1600 + index * 180);
  });
}
function animateSuperSpin() {
  if (!superSpinActive) return;
  spinFrameCount += 1;
  applySpinAcceleration();
  getActiveRings().forEach((ring, index) => {
    rotations[ring] += velocities[ring];
    const drift = Math.sin((spinFrameCount + index * 17) / 14) * 0.018 + randomFloat(-0.035, 0.035);
    velocities[ring] = Math.max(-44, Math.min(44, (velocities[ring] || 0) + drift));
  });
  updateWheelRotations();
  updateSpinClicks();
  superSpinFrame = requestAnimationFrame(animateSuperSpin);
}
function startSuperSpin() {
  clearDeferredTapSpin();
  commitIdleRotations();
  if (spinFrame) cancelAnimationFrame(spinFrame);
  if (superSpinFrame) cancelAnimationFrame(superSpinFrame);
  clearTimeout(superSpinStopTimer);
  unlockAudio();
  stopHoldHaptics();
  stopChargeTone();
  isCharging = false;
  centerOrb.classList.remove("charging", "max-charge");
  compass.classList.remove("charging-tension");
  compass.classList.add("super-spinning");
  setCenterCharge(1);
  resetSpinClickTracker();
  spinFrame = null;
  superSpinActive = true;
  spinFrameCount = 0;
  const profile = makeSpinProfile();
  const activeRings = getActiveRings();
  spinAccelerationProfile = makeSpinAccelerationProfile(activeRings, 1);
  activeRings.forEach((ring, index) => {
    const direction = profile.directions[ring] || (index % 2 === 0 ? 1 : -1);
    rotations[ring] += direction * randomFloat(10, 28);
    velocities[ring] = direction * randomFloat(23, 34) * (profile.speedVariance[ring] || 1);
  });
  vibrate([18, 20, 18]);
  playSpinWhoosh(1);
  superSpinFrame = requestAnimationFrame(animateSuperSpin);
  superSpinStopTimer = setTimeout(() => stopSuperSpin(), SUPER_SPIN_MAX_MS);
}
function stopSuperSpin() {
  if (!superSpinActive) return;
  superSpinActive = false;
  clearTimeout(superSpinStopTimer);
  superSpinStopTimer = null;
  if (superSpinFrame) cancelAnimationFrame(superSpinFrame);
  superSpinFrame = null;
  compass.classList.remove("super-spinning");
  setCenterCharge(0);
  spinAccelerationProfile = makeSpinAccelerationProfile(getActiveRings(), 0.55);
  spinFrameCount = 0;
  getActiveRings().forEach((ring, index) => {
    velocities[ring] = Math.max(-38, Math.min(38, (velocities[ring] || 0) * randomFloat(0.72, 0.94) + randomFloat(-2.2, 2.2)));
    if (Math.abs(velocities[ring]) < 0.55) velocities[ring] = (index % 2 === 0 ? 1 : -1) * randomFloat(5, 9);
  });
  vibrate([16, 26, 22]);
  spinFrame = requestAnimationFrame(animateSpin);
}
function toggleSuperSpin() {
  if (superSpinActive) stopSuperSpin();
  else startSuperSpin();
}
function animateSpin() {
  spinFrameCount += 1;
  applySpinAcceleration();
  getActiveRings().forEach(ring => {
    rotations[ring] += velocities[ring];
    velocities[ring] *= DECAY;
  });
  updateWheelRotations();
  updateSpinClicks();
  const moving = Math.max(...getActiveRings().map(ring => Math.abs(velocities[ring] || 0)));
  if (moving > 0.03) spinFrame = requestAnimationFrame(animateSpin);
  else {
    spinAccelerationProfile = null;
    spinFrameCount = 0;
    clearTimeout(superSpinStopTimer);
    superSpinStopTimer = null;
    velocities = makeRingState();
    spinFrame = null;
    const combo = completeCurrentCombination();
    setDisplayedCombination(combo || getCurrentCombination());
    ALL_RINGS.forEach(renderRing);
    saveWheel();
    flashSelectedFields();
    playSelectionChime();
    spawnFinishRipple();
  }
}
function startSpin(power) {
  if (spinFrame) cancelAnimationFrame(spinFrame);
  unlockAudio();
  resetSpinClickTracker();
  const safePower = Math.max(0, Math.min(1, power));
  const lowZone = safePower < 0.15;
  const curved = lowZone ? Math.pow(safePower / 0.15, 1.8) * 0.15 : Math.pow(safePower, 1.2);
  const base = lowZone ? 0.45 : 1.2;
  const max = 38;
  const activeRings = getActiveRings();
  const profile = pendingSpinProfile || makeSpinProfile();
  const targetCombo = wheel.preventRepeatSelections ? findUnusedCombination() : null;
  spinAccelerationProfile = targetCombo ? null : makeSpinAccelerationProfile(activeRings, curved);
  spinFrameCount = 0;
  activeRings.forEach((ring, index) => {
    const direction = profile.directions[ring] || (randomFloat() > 0.5 ? 1 : -1);
    rotations[ring] += direction * randomFloat(8, 26) + profile.releaseJitter[ring] + profile.spinSeed * (index + 1) * randomFloat(0.08, 0.18);
  });
  updateWheelRotations();
  setTimeout(() => {
    activeRings.forEach((ring, index) => {
      const direction = profile.directions[ring] || (randomFloat() > 0.5 ? 1 : -1);
      if (Number.isInteger(targetCombo?.indexes?.[ring])) {
        const sliceDeg = getSliceDeg(ring);
        const landingJitter = sliceDeg * randomFloat(-0.34, 0.34);
        const targetRotation = normalizeAngle(rotationForSelectedIndex(ring, targetCombo.indexes[ring]) + landingJitter);
        const extraTurns = Math.round(2 + curved * randomFloat(1.2, 3.4) + randomFloat(0, 2.4));
        const travel = directedAngleDelta(rotations[ring], targetRotation, direction) + direction * 360 * extraTurns;
        velocities[ring] = direction * Math.max(0.45, Math.min(42, Math.abs(travel) * (1 - DECAY)));
        return;
      }
      const velocity = Math.min(max, base + curved * randomFloat(22, 42) + randomFloat(0, 10)) * profile.speedVariance[ring] + profile.ringOffsets[ring];
      velocities[ring] = direction * Math.max(0.35, velocity);
    });
    pendingSpinProfile = null;
    spinFrame = requestAnimationFrame(animateSpin);
  }, randomInt(70, 135));
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
  updateSelectedPanel(getCurrentCombination());
  setCenterCharge(power);
  centerOrb.classList.toggle("max-charge", power >= 1);
  updateChargeTone(power);
  requestAnimationFrame(updateChargeUi);
}
function setCenterCharge(power = 0) {
  const safePower = Math.max(0, Math.min(1, Number(power) || 0));
  centerOrb.style.setProperty("--orb-charge", safePower.toFixed(3));
  centerOrb.style.setProperty("--orb-brightness", (1 + safePower * 0.72).toFixed(3));
  centerOrb.style.setProperty("--orb-saturation", (1 + safePower * 0.5).toFixed(3));
  centerOrb.style.setProperty("--orb-inner-glow", `${Math.round(18 + safePower * 22)}px`);
  centerOrb.style.setProperty("--orb-outer-glow", `${Math.round(16 + safePower * 34)}px`);
}
function startCharge(event) {
  if (event.target === wheelMoveHandle) return;
  if (event.target.closest?.(".compass-selection-arrow")) return;
  event.preventDefault();
  unlockAudio();
  const now = performance.now();
  if (event.ctrlKey || (isTouchPointer(event) && now - lastCenterTapAt <= DOUBLE_TAP_MS)) {
    lastCenterTapAt = 0;
    if (isCharging) {
      isCharging = false;
      centerOrb.classList.remove("charging", "max-charge");
      compass.classList.remove("charging-tension");
      stopHoldHaptics();
      stopChargeTone();
      setCenterCharge(0);
    }
    toggleSuperSpin();
    return;
  }
  if (superSpinActive) {
    lastCenterTapAt = 0;
    stopSuperSpin();
    return;
  }
  commitIdleRotations();
  if (spinFrame) cancelAnimationFrame(spinFrame);
  if (superSpinActive) stopSuperSpin();
  spinFrame = null;
  spinAccelerationProfile = null;
  spinFrameCount = 0;
  velocities = makeRingState();
  isCharging = true;
  chargeStart = now;
  chargeBaseRotations = { ...rotations };
  pendingSpinProfile = makeSpinProfile();
  compass.classList.add("charging-tension");
  compass.style.setProperty("--charge-tension", "0");
  setCenterCharge(0);
  centerOrb.classList.add("charging");
  centerOrb.setPointerCapture?.(event.pointerId);
  startHoldHaptics();
  startChargeTone();
  updateChargeUi();
}
function endCharge(event) {
  if (!isCharging) return;
  event.preventDefault();
  const now = performance.now();
  const power = Math.min(1, (now - chargeStart) / CHARGE_MAX_MS);
  isCharging = false;
  compass.classList.remove("charging-tension");
  compass.style.setProperty("--charge-tension", "0");
  centerOrb.classList.remove("charging", "max-charge");
  setCenterCharge(0);
  stopHoldHaptics();
  vibrate(power > 0.82 ? [20, 28, 28] : [16, 22, 16]);
  stopChargeTone();
  playSpinWhoosh(power);
  if (isTouchPointer(event) && power < 0.18) {
    lastCenterTapAt = now;
    clearDeferredTapSpin();
    deferredTapSpinTimer = setTimeout(() => {
      deferredTapSpinTimer = null;
      startSpin(power);
    }, DOUBLE_TAP_MS);
    return;
  }
  lastCenterTapAt = 0;
  startSpin(power);
}
function middleClickReset(event) {
  if (event.button !== 1) return;
  event.preventDefault();
  commitIdleRotations();
  const targetRing = event.target.closest(".ring, .center-orb");
  if (!targetRing) return;
  const ring = ringFromElement(targetRing);
  if (ring) rotations[ring] = 0;
  else rotations = makeRingState();
  updateWheelRotations();
  saveWheel();
}
function ringFromElement(element) {
  const ringEl = element?.closest?.(".ring");
  if (!ringEl) return "";
  return ALL_RINGS.find(ring => ringEl.id === `${ring}Ring`) || "";
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
      commitIdleRotations();
      if (spinFrame) cancelAnimationFrame(spinFrame);
      spinFrame = null;
      spinAccelerationProfile = null;
  spinFrameCount = 0;
      velocities = makeRingState();
      unlockAudio();
      resetSpinClickTracker();
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
      updateSpinClicks();
    });
    const endDrag = event => {
      if (!dragging) return;
      dragging = false;
      ringEl.releasePointerCapture?.(event.pointerId);
      ringEl.classList.remove("drag-spinning");
      velocities[ring] = Math.max(-24, Math.min(24, lastVelocity * 1.8));
      if (Math.abs(velocities[ring]) > 0.2) {
        spinFrame = requestAnimationFrame(animateSpin);
      } else {
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
    commitIdleRotations();
    if (event.ctrlKey) {
      const factor = Math.exp(-event.deltaY * 0.0018);
      setWheelSize((Number(wheel.sizeScale) || 1) * factor);
      queueSaveWheel();
      return;
    }
    const targetRing = ringFromElement(event.target);
    const delta = Math.max(-28, Math.min(28, event.deltaY * 0.13));
    const rings = targetRing ? [targetRing] : getActiveRings();
    rings.forEach((ring, index) => {
      const direction = targetRing ? 1 : (index === 1 ? -1 : 1);
      rotations[ring] += delta * direction;
    });
    updateWheelRotations();
    updateSpinClicks();
    queueSaveWheel();
  }, { passive: false });
}
function setupPinchResize() {
  let pinching = false;
  let startDistance = 0;
  let startSize = 1;
  let lastResizeTick = 0;
  const distance = touches => Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);

  compass.addEventListener("touchstart", event => {
    if (event.touches.length !== 2) return;
    event.preventDefault();
    pinching = true;
    isCharging = false;
    compass.classList.remove("charging-tension");
    compass.style.setProperty("--charge-tension", "0");
    centerOrb.classList.remove("charging", "max-charge");
    setCenterCharge(0);
    stopHoldHaptics();
    stopChargeTone();
    commitIdleRotations();
    startDistance = Math.max(1, distance(event.touches));
    startSize = Number(wheel.sizeScale) || 1;
    lastResizeTick = Math.round(startSize * 20);
    compass.classList.add("pinch-resizing");
    vibrate(8);
  }, { passive: false });

  compass.addEventListener("touchmove", event => {
    if (!pinching || event.touches.length !== 2) return;
    event.preventDefault();
    const ratio = distance(event.touches) / startDistance;
    const dampedRatio = Math.pow(Math.max(0.2, ratio), 0.68);
    const targetSize = startSize * dampedRatio;
    const currentSize = Number(wheel.sizeScale) || 1;
    const nextSize = currentSize + (targetSize - currentSize) * 0.32;
    setWheelSize(nextSize);
    const resizeTick = Math.round((Number(wheel.sizeScale) || 1) * 20);
    if (Math.abs(resizeTick - lastResizeTick) >= 2) {
      lastResizeTick = resizeTick;
      vibrate(5);
    }
  }, { passive: false });

  const endPinch = () => {
    if (!pinching) return;
    pinching = false;
    compass.classList.remove("pinch-resizing");
    vibrate(10);
    saveWheel();
  };
  compass.addEventListener("touchend", endPinch);
  compass.addEventListener("touchcancel", endPinch);
}
function makePanelDraggable(panel) {
  const handle = panel.querySelector(".panel-handle") || panel;
  let dragging = false, sx = 0, sy = 0, sl = 0, st = 0;
  handle.addEventListener("pointerdown", event => {
    if (panel === selectedPanel && isMobileLayout()) return;
    if (event.target.closest("button, input, select, textarea, label, a")) return;
    dragging = true; sx = event.clientX; sy = event.clientY;
    const rect = panel.getBoundingClientRect(); sl = rect.left; st = rect.top;
    panel.style.left = `${sl}px`; panel.style.top = `${st}px`; panel.style.right = "auto"; panel.style.bottom = "auto";
    panel.style.transform = "none";
    handle.setPointerCapture?.(event.pointerId);
  });
  handle.addEventListener("pointermove", event => { if (!dragging) return; panel.style.left = `${sl + event.clientX - sx}px`; panel.style.top = `${st + event.clientY - sy}px`; });
  handle.addEventListener("pointerup", () => dragging = false);
}
function setupMoveHandle() {
  const moveHandle = compassSelectionArrow || wheelMoveHandle;
  if (!moveHandle) return;
  let moving = false, sx = 0, sy = 0, left = 0, top = 0;
  moveHandle.addEventListener("pointerdown", event => {
    event.preventDefault(); event.stopPropagation();
    moving = true; sx = event.clientX; sy = event.clientY;
    const rect = compass.getBoundingClientRect();
    left = rect.left + rect.width / 2; top = rect.top + rect.height / 2;
    compass.style.position = "fixed";
    compass.style.left = `${left}px`;
    compass.style.top = `${top}px`;
    compass.style.transform = "translate(-50%, -50%) scale(var(--wheel-scale))";
    moveHandle.setPointerCapture?.(event.pointerId);
  });
  moveHandle.addEventListener("pointermove", event => { if (!moving) return; compass.style.left = `${left + event.clientX - sx}px`; compass.style.top = `${top + event.clientY - sy}px`; });
  const stopMoving = event => {
    if (!moving) return;
    moving = false;
    moveHandle.releasePointerCapture?.(event.pointerId);
  };
  moveHandle.addEventListener("pointerup", stopMoving);
  moveHandle.addEventListener("pointercancel", stopMoving);
}
function resetPanelPosition(panel) {
  if (!panel) return;
  panel.style.left = "";
  panel.style.top = "";
  panel.style.right = "";
  panel.style.bottom = "";
  panel.style.transform = "";
}
function resetView() {
  if (spinFrame) cancelAnimationFrame(spinFrame);
  if (superSpinFrame) cancelAnimationFrame(superSpinFrame);
  clearTimeout(superSpinStopTimer);
  clearDeferredTapSpin();
  superSpinActive = false;
  superSpinFrame = null;
  superSpinStopTimer = null;
  spinFrame = null;
  spinAccelerationProfile = null;
  spinFrameCount = 0;
  velocities = makeRingState();
  isCharging = false;
  compass.classList.remove("charging-tension", "super-spinning");
  centerOrb.classList.remove("charging", "max-charge");
  stopHoldHaptics();
  setCenterCharge(0);
  stopChargeTone();
  compass.style.position = "";
  compass.style.left = "";
  compass.style.top = "";
  compass.style.transform = "";
  resetPanelPosition(selectedPanel);
  resetPanelPosition(completionPanel);
  completionPanel?.classList.add("collapsed");
  toggleCompletionLog?.classList.remove("active");
  toggleCompletionLog?.setAttribute("aria-pressed", "false");
  wheel.sizeScale = 1;
  applyRingLayout();
  ALL_RINGS.forEach(renderRing);
  saveWheel();
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
  if (!editor.nameLists[ring]) return getRingAllNames(ring);
  const inputs = Array.from(editor.nameLists[ring].querySelectorAll("input"));
  if (inputs.length) return inputs.map(input => input.value.trim()).filter(Boolean);
  return getRingAllNames(ring);
}
function updateEditorRingVisibility() {
  const count = Math.max(1, Math.min(ALL_RINGS.length, Number(editor.ringCount?.value) || getRingCount()));
  ALL_RINGS.forEach((ring, index) => editor.ringCards[ring]?.classList.toggle("hidden", index >= count));
}
function updateCustomStyleControls() {
  const custom = editor.wheelFrame?.value === "custom";
  editor.customWheelStyleImageLabel?.classList.toggle("hidden", !custom);
  editor.clearCustomWheelStyleImage?.classList.toggle("hidden", !custom);
  editor.pageBgImageLabel?.classList.toggle("hidden", !custom);
  editor.clearPageBgImage?.classList.toggle("hidden", !custom);
  editor.centerBgLabel?.classList.toggle("hidden", !custom);
  editor.clearCenterBg?.classList.toggle("hidden", !custom);
}
function previewSelectedWheelFrame() {
  if (!wheel || !editor.wheelFrame) return;
  wheel.wheelFrame = editor.wheelFrame.value || "none";
  if (wheel.wheelFrame !== "custom") {
    pendingEditorBackgrounds.wheel = "";
    pendingEditorBackgrounds.center = "";
    pendingEditorBackgrounds.page = "";
  }
  applyColors();
}
function openEditor() {
  editorOpening = true;
  fillRingCountSelect(editor.ringCount);
  Object.values(editor.counts).forEach(fillSliceSelect);
  pendingEditorBackgrounds = makePendingBackgroundState();
  editor.name.value = wheel.name || "";
  if (editor.wheelFrame) editor.wheelFrame.value = normalizedWheelFrame(wheel.wheelFrame);
  updateCustomStyleControls();
  editor.wheelColor.value = wheel.colors.wheel || "#ffd700";
  editor.interfaceColor.value = wheel.colors.interface || "#ffd700";
  editor.textColor.value = wheel.colors.text || "#ffd700";
  editor.pageBg.value = wheel.colors.pageBg || "#111111";
  if (editor.ringCount) editor.ringCount.value = String(getRingCount());
  if (editor.hideWheelLines) editor.hideWheelLines.checked = !Boolean(wheel.hideWheelLines);
  if (editor.showWheelLines) editor.showWheelLines.checked = Boolean(wheel.showWheelLines);
  if (editor.allowSound) editor.allowSound.checked = Boolean(wheel.allowSound);
  if (editor.preventRepeatSelections) editor.preventRepeatSelections.checked = Boolean(wheel.preventRepeatSelections);
  ALL_RINGS.forEach(ring => {
    editor.counts[ring].value = String(getRingAllNames(ring).length);
    if (editor.prompts[ring]) editor.prompts[ring].value = getRingPrompt(ring);
    if (editor.connectors?.[ring]) editor.connectors[ring].value = getRingConnector(ring);
    if (editor.limitEnabled[ring]) editor.limitEnabled[ring].checked = Boolean(wheel.rings[ring].limitSelectionCount);
    if (editor.limitCounts[ring]) {
      editor.limitCounts[ring].value = String(getRingLimit(ring));
      editor.limitCounts[ring].disabled = !Boolean(wheel.rings[ring].limitSelectionCount);
    }
    editor.nameLists[ring].innerHTML = "";
    renderEditorNameInputs(ring);
  });
  updateEditorRingVisibility();
  editorPanel.classList.remove("hidden");
  editorOpening = false;
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
function refreshEditorPreview() {
  if (!wheel) return;
  wheel.name = editor.name.value.trim() || "Untitled Wheel";
  wheel.wheelFrame = editor.wheelFrame?.value || "none";
  wheel.hideWheelLines = editor.hideWheelLines ? !editor.hideWheelLines.checked : Boolean(wheel.hideWheelLines);
  wheel.showWheelLines = hideSectionLinesInput ? hideSectionLinesInput.checked : Boolean(wheel.showWheelLines);
  wheel.hideWheelText = hideWheelTextInput ? !hideWheelTextInput.checked : Boolean(wheel.hideWheelText);
  wheel.allowSound = editor.allowSound ? editor.allowSound.checked : false;
  wheel.preventRepeatSelections = editor.preventRepeatSelections ? editor.preventRepeatSelections.checked : Boolean(wheel.preventRepeatSelections);
  wheel.sizeScale = clamp(wheel.sizeScale || 1, 0.45, MAX_WHEEL_SCALE);
  wheel.colors = {
    ...wheel.colors,
    wheel: editor.wheelColor.value,
    interface: editor.interfaceColor.value,
    text: editor.textColor.value,
    pageBg: editor.pageBg.value
  };
  updateWheelScaleCss();
  previewSelectedWheelFrame();
  if (wheelTitle) wheelTitle.textContent = wheel.name || "Wheel";
}
function scheduleEditorAutoSave() {
  if (editorOpening || editorPanel.classList.contains("hidden")) return;
  refreshEditorPreview();
  clearTimeout(editorAutoSaveTimer);
  editorAutoSaveTimer = setTimeout(() => saveEditor({ close: false, silent: true }), 650);
}
async function saveEditor({ close = true, silent = false } = {}) {
  if (editorAutoSaving) {
    scheduleEditorAutoSave();
    return;
  }
  editorAutoSaving = true;
  if (!silent) {
    saveEditorButton.disabled = true;
    saveEditorButton.textContent = "Saving...";
  }
  try {
    wheel.name = editor.name.value.trim() || "Untitled Wheel";
    wheel.wheelFrame = editor.wheelFrame?.value || "none";
    if (wheel.wheelFrame !== "custom") {
      pendingEditorBackgrounds.wheel = "";
      pendingEditorBackgrounds.center = "";
      pendingEditorBackgrounds.page = "";
    }
    const previousSignature = JSON.stringify({ ringCount: getRingCount(), rings: getActiveRings().map(ring => getRingAllNames(ring)), limits: getActiveRings().map(ring => [Boolean(wheel.rings[ring].limitSelectionCount), getRingLimit(ring)]) });
    wheel.ringCount = Math.max(1, Math.min(ALL_RINGS.length, Number(editor.ringCount?.value) || 3));
    ensureWheelShape();
    wheel.hideWheelLines = editor.hideWheelLines ? !editor.hideWheelLines.checked : Boolean(wheel.hideWheelLines);
    wheel.showWheelLines = hideSectionLinesInput ? hideSectionLinesInput.checked : Boolean(wheel.showWheelLines);
    wheel.hideWheelText = hideWheelTextInput ? !hideWheelTextInput.checked : Boolean(wheel.hideWheelText);
    wheel.allowSound = editor.allowSound ? editor.allowSound.checked : false;
    wheel.preventRepeatSelections = editor.preventRepeatSelections ? editor.preventRepeatSelections.checked : Boolean(wheel.preventRepeatSelections);
    unlockAudio();
    wheel.sizeScale = clamp(wheel.sizeScale || 1, 0.45, MAX_WHEEL_SCALE);
    wheel.colors = { ...wheel.colors, wheel: editor.wheelColor.value, interface: editor.interfaceColor.value, text: editor.textColor.value, pageBg: editor.pageBg.value };
    ALL_RINGS.forEach(ring => {
      wheel.rings[ring].names = getEditorNames(ring).slice(0, MAX_SLICES);
      wheel.rings[ring].prompt = editor.prompts[ring]?.value.trim() || "";
      wheel.rings[ring].connector = editor.connectors?.[ring]?.value.trim() || "";
      wheel.rings[ring].limitSelectionCount = Boolean(editor.limitEnabled[ring]?.checked);
      wheel.rings[ring].selectionLimit = Math.max(1, Math.min(10, Number(editor.limitCounts[ring]?.value) || 1));
    });
    const nextSignature = JSON.stringify({ ringCount: getRingCount(), rings: getActiveRings().map(ring => getRingAllNames(ring)), limits: getActiveRings().map(ring => [Boolean(wheel.rings[ring].limitSelectionCount), getRingLimit(ring)]) });
    if (previousSignature !== nextSignature) {
      resetSelectionCounts();
      displayedCombination = null;
    }

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
    if (pendingEditorBackgrounds.wheel !== undefined) {
      await deleteStoredImage(wheel.colors.wheelBgImageRef);
      wheel.colors.wheelBgImage = "";
      if (pendingEditorBackgrounds.wheel) {
        const key = getImageKey("wheel");
        await putStoredImage(key, pendingEditorBackgrounds.wheel);
        wheel.colors.wheelBgImageRef = key;
      } else {
        wheel.colors.wheelBgImageRef = "";
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
    wheel.wheelFrame = editor.wheelFrame?.value || "none";
    saveWheel();
    await renderWheel();
    pendingEditorBackgrounds = makePendingBackgroundState();
    if (close) editorPanel.classList.add("hidden");
  } catch (error) {
    console.error(error);
    alert("Unable to save images. Please try a smaller image or a different browser.");
  } finally {
    editorAutoSaving = false;
    if (!silent) {
      saveEditorButton.disabled = false;
      saveEditorButton.textContent = "Save Changes";
    }
  }
}

editWheelButton.addEventListener("click", () => {
  if (editorPanel.classList.contains("hidden")) openEditor();
  else editorPanel.classList.add("hidden");
});
closeEditorButton.addEventListener("click", () => editorPanel.classList.add("hidden"));
saveEditorButton.addEventListener("click", () => {
  clearTimeout(editorAutoSaveTimer);
  saveEditor();
});
resetViewButton?.addEventListener("click", resetView);
copySelectedButton?.addEventListener("click", event => {
  event.stopPropagation();
  copySelectedText();
});
editor.hideWheelLines?.addEventListener("change", event => {
  event.stopPropagation();
  wheel.hideWheelLines = !editor.hideWheelLines.checked;
  applyColors();
  saveWheel();
});
hideSectionLinesInput?.addEventListener("change", event => {
  event.stopPropagation();
  wheel.showWheelLines = hideSectionLinesInput.checked;
  applyColors();
  saveWheel();
});
hideWheelTextInput?.addEventListener("change", event => {
  event.stopPropagation();
  wheel.hideWheelText = !hideWheelTextInput.checked;
  applyColors();
  saveWheel();
});
resetCompletionLog?.addEventListener("click", event => {
  event.stopPropagation();
  if (!confirm("Clear the spin log for this wheel?")) return;
  wheel.completed = [];
  displayedCombination = null;
  saveWheel();
  updateSelectedPanel();
  renderCompletionLog();
});
downloadCompletionLog?.addEventListener("click", event => {
  event.stopPropagation();
  downloadSpinLog();
});
toggleCompletionLog?.addEventListener("click", event => {
  event.stopPropagation();
  completionPanel?.classList.toggle("collapsed");
  const collapsed = completionPanel?.classList.contains("collapsed");
  toggleCompletionLog.classList.toggle("active", !collapsed);
  toggleCompletionLog.setAttribute("aria-pressed", collapsed ? "false" : "true");
  toggleCompletionLog.setAttribute("aria-label", collapsed ? "Show spins" : "Hide spins");
  toggleCompletionLog.title = collapsed ? "Show spins" : "Hide spins";
  renderCompletionLog();
});
editor.preventRepeatSelections?.addEventListener("change", event => {
  event.stopPropagation();
  wheel.preventRepeatSelections = editor.preventRepeatSelections.checked;
  saveWheel();
  renderCompletionLog();
});
editor.allowSound?.addEventListener("change", () => {
  wheel.allowSound = editor.allowSound.checked;
  unlockAudio();
  playUiClick();
  saveWheel();
});
document.addEventListener("click", event => {
  const control = event.target.closest?.("button, a.utility-link, input[type='checkbox'], input[type='color'], select");
  if (!control || control === editor.allowSound) return;
  unlockAudio();
  playUiClick();
});
document.addEventListener("change", event => {
  const control = event.target.closest?.("select, input[type='color'], input[type='file'], input[type='range'], input[type='number']");
  if (!control) return;
  unlockAudio();
  playUiClick();
});
fillRingCountSelect(editor.ringCount);
Object.values(editor.counts).forEach(fillSliceSelect);
ALL_RINGS.forEach(ring => {
  editor.counts[ring]?.addEventListener("change", () => renderEditorNameInputs(ring));
  editor.counts[ring]?.addEventListener("input", () => renderEditorNameInputs(ring));
  editor.limitEnabled[ring]?.addEventListener("change", () => {
    if (editor.limitCounts[ring]) editor.limitCounts[ring].disabled = !editor.limitEnabled[ring].checked;
    scheduleEditorAutoSave();
  });
  editor.limitCounts[ring]?.addEventListener("input", scheduleEditorAutoSave);
  editor.limitCounts[ring]?.addEventListener("change", scheduleEditorAutoSave);
});
editor.ringCount?.addEventListener("change", updateEditorRingVisibility);
editor.wheelFrame?.addEventListener("change", () => {
  updateCustomStyleControls();
  previewSelectedWheelFrame();
  scheduleEditorAutoSave();
});
editor.pageBgImage?.addEventListener("change", () => {
  const file = editor.pageBgImage.files && editor.pageBgImage.files[0];
  readFileAsDataUrl(file, dataUrl => { pendingEditorBackgrounds.page = dataUrl; document.documentElement.style.setProperty("--page-bg-image", `url("${dataUrl}")`); editor.pageBgImage.value = ""; scheduleEditorAutoSave(); });
});
editor.clearPageBgImage?.addEventListener("click", () => { pendingEditorBackgrounds.page = ""; document.documentElement.style.setProperty("--page-bg-image", "none"); scheduleEditorAutoSave(); });
editor.customWheelStyleImage?.addEventListener("change", () => {
  const file = editor.customWheelStyleImage.files && editor.customWheelStyleImage.files[0];
  readFileAsDataUrl(file, dataUrl => { pendingEditorBackgrounds.wheel = dataUrl; document.documentElement.style.setProperty("--wheel-bg-image", `url("${dataUrl}")`); editor.customWheelStyleImage.value = ""; scheduleEditorAutoSave(); });
});
editor.clearCustomWheelStyleImage?.addEventListener("click", () => { pendingEditorBackgrounds.wheel = ""; document.documentElement.style.setProperty("--wheel-bg-image", "none"); scheduleEditorAutoSave(); });
editor.centerBgInput?.addEventListener("change", () => {
  const file = editor.centerBgInput.files && editor.centerBgInput.files[0];
  readFileAsDataUrl(file, dataUrl => { pendingEditorBackgrounds.center = dataUrl; document.documentElement.style.setProperty("--center-bg-image", `url("${dataUrl}")`); editor.centerBgInput.value = ""; scheduleEditorAutoSave(); });
});
editor.clearCenterBg?.addEventListener("click", () => { pendingEditorBackgrounds.center = ""; document.documentElement.style.setProperty("--center-bg-image", "none"); scheduleEditorAutoSave(); });
editor.pageBg?.addEventListener("input", () => {
  document.documentElement.style.setProperty("--bg", editor.pageBg.value);
});
editorPanel?.addEventListener("input", event => {
  if (!event.target.closest("input, select")) return;
  scheduleEditorAutoSave();
});
editorPanel?.addEventListener("change", event => {
  if (!event.target.closest("input, select")) return;
  scheduleEditorAutoSave();
});

function setWheelSize(nextSize, { save = false } = {}) {
  wheel.sizeScale = clamp(nextSize, 0.45, MAX_WHEEL_SCALE);
  updateWheelScaleCss();
  if (save) saveWheel();
}

centerOrb.addEventListener("pointerdown", startCharge);
centerOrb.addEventListener("pointerup", endCharge);
centerOrb.addEventListener("pointercancel", endCharge);
compass.addEventListener("mousedown", middleClickReset);
makePanelDraggable(document.getElementById("selectedPanel"));
makePanelDraggable(completionPanel);
setupMoveHandle();
setupRingDrag();
setupWheelScrollSpin();
setupPinchResize();
window.addEventListener("resize", () => {
  if (!wheel) return;
  applyRingLayout();
  ALL_RINGS.forEach(renderRing);
});
window.visualViewport?.addEventListener("resize", () => {
  if (!wheel) return;
  applyRingLayout();
  ALL_RINGS.forEach(renderRing);
});

(async function init() {
  await loadWheel();
  await renderWheel();
  startIdleRingMotion();
})();
