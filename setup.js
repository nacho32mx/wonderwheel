const WHEELS_KEY = "skillWheelWheels";
const ACTIVE_WHEEL_KEY = "skillWheelActiveWheelId";
const MAX_SLICES = 12;
const IMAGE_DB_NAME = "skillWheelSpinnerImages";
const IMAGE_STORE = "images";

const form = document.getElementById("wheelWizardForm");
const steps = Array.from(document.querySelectorAll(".wizard-step"));
const pills = Array.from(document.querySelectorAll(".wizard-step-pill"));
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const finishButton = document.getElementById("finishButton");
const review = document.getElementById("wizardReview");
const nameInput = document.getElementById("wizardName");
const themeSelect = document.getElementById("themeSelect");
const wheelColor = document.getElementById("wheelColor");
const interfaceColor = document.getElementById("interfaceColor");
const textColor = document.getElementById("textColor");
const pageBgColor = document.getElementById("pageBgColor");
const pageBgImage = document.getElementById("pageBgImage");
const centerBg = document.getElementById("centerBg");
const wheelSize = document.getElementById("wheelSize");
const allowAnimations = document.getElementById("allowAnimations");
const ringCountSelect = document.getElementById("ringCountSelect");
const RINGS = ["outer", "middle", "inner", "core", "fifth", "sixth"];
const countInputs = { outer: document.getElementById("outerCount"), middle: document.getElementById("middleCount"), inner: document.getElementById("innerCount"), core: document.getElementById("coreCount"), fifth: document.getElementById("fifthCount"), sixth: document.getElementById("sixthCount") };
const promptInputs = { outer: document.getElementById("outerPrompt"), middle: document.getElementById("middlePrompt"), inner: document.getElementById("innerPrompt"), core: document.getElementById("corePrompt"), fifth: document.getElementById("fifthPrompt"), sixth: document.getElementById("sixthPrompt") };
const inputContainers = { outer: document.getElementById("outerInputs"), middle: document.getElementById("middleInputs"), inner: document.getElementById("innerInputs"), core: document.getElementById("coreInputs"), fifth: document.getElementById("fifthInputs"), sixth: document.getElementById("sixthInputs") };
const bgInputs = { outer: document.getElementById("outerBg"), middle: document.getElementById("middleBg"), inner: document.getElementById("innerBg"), core: document.getElementById("coreBg"), fifth: document.getElementById("fifthBg"), sixth: document.getElementById("sixthBg") };
const DEFAULTS = {
  outer: ["Mom", "Dad", "Kirstie", "Tyler", "Greta", "Home"],
  middle: ["Trip", "Gathering", "Holiday", "Food", "Photos", "Music"],
  inner: ["Funny Story", "Compliment", "Memory", "Grateful", "Wisdom", "Adventure"],
  core: ["Share", "Write", "Record", "Photo", "Call", "Thank You"],
  fifth: ["Imagine", "Build", "Ask", "Swap", "Stretch", "Celebrate"],
  sixth: ["Today", "Tomorrow", "Together", "Solo", "Fast", "Slow"]
};
let currentStep = 0;
let backgrounds = { outer: "", middle: "", inner: "", core: "", fifth: "", sixth: "", page: "", center: "" };
const params = new URLSearchParams(window.location.search);
const editWheelId = params.get("mode") === "edit" ? params.get("id") || localStorage.getItem(ACTIVE_WHEEL_KEY) : "";
let editingWheel = null;

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
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}
async function deleteStoredImage(key) {
  if (!key) return;
  try {
    const db = await openImageDb();
    await new Promise(resolve => {
      const tx = db.transaction(IMAGE_STORE, "readwrite");
      tx.objectStore(IMAGE_STORE).delete(key);
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); resolve(); };
    });
  } catch {}
}
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
function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; } catch { return fallback; } }
function writeJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(stripLargeImageData(value))); return true; }
  catch (error) {
    console.warn("Unable to save", error);
    alert("Browser storage is full. This version stores images outside localStorage, but older saved image data may still be taking space. Delete old wheels or clear site data for localhost if this continues.");
    return false;
  }
}
function clampCount(value) { return Math.max(1, Math.min(MAX_SLICES, Math.round(Number(value) || 1))); }
function clamp(value, min, max) { return Math.max(min, Math.min(max, Number(value) || min)); }
function ringLabel(ring) {
  return ({ outer: "Outer", middle: "Middle", inner: "Inner", core: "Core", fifth: "Ring 5", sixth: "Ring 6" })[ring] || ring.charAt(0).toUpperCase() + ring.slice(1);
}
function getRingCount() { return Math.max(1, Math.min(6, Number(ringCountSelect?.value) || 3)); }
function getActiveRings() { return RINGS.slice(0, getRingCount()); }
function isRingActive(ring) { return getActiveRings().includes(ring); }
function isStepAvailable(step) {
  const ring = step?.dataset?.ringStep;
  return !ring || isRingActive(ring);
}
function moveStep(direction) {
  let next = currentStep;
  do {
    next += direction;
  } while (steps[next] && !isStepAvailable(steps[next]));
  currentStep = Math.max(0, Math.min(steps.length - 1, next));
}
function currentNames(ring) {
  return Array.from(inputContainers[ring].querySelectorAll("input"))
    .map(input => input.value.trim())
    .filter(Boolean)
    .slice(0, MAX_SLICES);
}
function currentPrompt(ring) { return promptInputs[ring]?.value.trim() || ""; }
function setRingNames(ring, names) {
  const safeNames = Array.isArray(names) && names.length ? names.slice(0, MAX_SLICES) : DEFAULTS[ring];
  countInputs[ring].value = String(Math.max(1, Math.min(MAX_SLICES, safeNames.length || 1)));
  inputContainers[ring].innerHTML = "";
  for (let index = 0; index < Number(countInputs[ring].value); index++) {
    const label = document.createElement("label");
    label.textContent = `${ringLabel(ring)} Slice ${index + 1}`;
    const input = document.createElement("input");
    input.type = "text";
    input.name = `${ring}Slice${index + 1}`;
    input.maxLength = 38;
    input.value = safeNames[index] || DEFAULTS[ring][index] || `${ringLabel(ring)} ${index + 1}`;
    label.appendChild(input);
    inputContainers[ring].appendChild(label);
  }
}
function renderNameInputs(ring) {
  const count = clampCount(countInputs[ring].value);
  countInputs[ring].value = String(count);
  const existing = currentNames(ring);
  inputContainers[ring].innerHTML = "";
  for (let index = 0; index < count; index++) {
    const label = document.createElement("label");
    label.textContent = `${ringLabel(ring)} Slice ${index + 1}`;
    const input = document.createElement("input");
    input.type = "text";
    input.name = `${ring}Slice${index + 1}`;
    input.maxLength = 38;
    input.value = existing[index] || DEFAULTS[ring][index] || `${ringLabel(ring)} ${index + 1}`;
    label.appendChild(input);
    inputContainers[ring].appendChild(label);
  }
}
function getWheelSignatureFrom(wheel) {
  const count = Math.max(1, Math.min(6, Number(wheel?.ringCount) || 3));
  return JSON.stringify({
    ringCount: count,
    rings: RINGS.slice(0, count).map(ring => Array.isArray(wheel?.rings?.[ring]?.names) ? wheel.rings[ring].names.filter(Boolean) : [])
  });
}
function loadEditWheel() {
  if (!editWheelId) return;
  const wheels = readJson(WHEELS_KEY, []);
  editingWheel = wheels.find(wheel => wheel.id === editWheelId) || null;
  if (!editingWheel) {
    alert("Unable to find that wheel for editing.");
    window.location.href = "dashboard.html";
    return;
  }
  document.querySelector(".wizard-header h1").textContent = "Edit Wonder Wheel";
  finishButton.textContent = "Save Wheel";
  nameInput.value = editingWheel.name || "";
  ringCountSelect.value = String(Math.max(1, Math.min(6, Number(editingWheel.ringCount) || 3)));
  themeSelect.value = editingWheel.theme || "lightning";
  wheelColor.value = editingWheel.colors?.wheel || "#ffd700";
  interfaceColor.value = editingWheel.colors?.interface || "#ffd700";
  textColor.value = editingWheel.colors?.text || "#ffd700";
  pageBgColor.value = editingWheel.colors?.pageBg || "#111111";
  wheelSize.value = String(clamp(Number(editingWheel.sizeScale) || 1, 0.45, 3));
  if (allowAnimations) allowAnimations.checked = editingWheel.allowAnimations !== false;
  RINGS.forEach(ring => {
    promptInputs[ring].value = editingWheel.rings?.[ring]?.prompt || "";
    setRingNames(ring, editingWheel.rings?.[ring]?.names || DEFAULTS[ring]);
  });
  localStorage.setItem(ACTIVE_WHEEL_KEY, editingWheel.id);
}
function updateStep() {
  RINGS.forEach(ring => {
    document.querySelectorAll(`[data-ring-step="${ring}"]`).forEach(el => el.classList.toggle("hidden", !isRingActive(ring)));
  });
  if (!isStepAvailable(steps[currentStep])) {
    currentStep = steps.findIndex(isStepAvailable);
    if (currentStep < 0) currentStep = 0;
  }
  steps.forEach((step, index) => step.classList.toggle("active", index === currentStep));
  pills.forEach((pill, index) => pill.classList.toggle("active", index === currentStep));
  backButton.disabled = currentStep === 0;
  nextButton.classList.toggle("hidden", currentStep === steps.length - 1);
  finishButton.classList.toggle("hidden", currentStep !== steps.length - 1);
  if (currentStep === steps.length - 1) renderReview();
}
function showFieldError(input, message, stepIndex = currentStep) {
  currentStep = stepIndex;
  updateStep();
  input.setCustomValidity(message);
  input.reportValidity();
  input.addEventListener("input", () => input.setCustomValidity(""), { once: true });
  input.addEventListener("change", () => input.setCustomValidity(""), { once: true });
  return false;
}
function validateStep(stepIndex) {
  if (stepIndex === 0 && !nameInput.value.trim()) {
    return showFieldError(nameInput, "Please enter a wheel name.", 0);
  }
  const ringByStep = { 0: "outer", 1: "middle", 2: "inner", 3: "core", 4: "fifth", 5: "sixth" };
  const ring = ringByStep[stepIndex];
  if (ring) {
    if (!isRingActive(ring)) return true;
    const countInput = countInputs[ring];
    const count = Number(countInput.value);
    if (!Number.isFinite(count) || count < 1 || count > MAX_SLICES) {
      return showFieldError(countInput, `Choose between 1 and ${MAX_SLICES} slices.`, stepIndex);
    }
    const firstEmpty = Array.from(inputContainers[ring].querySelectorAll("input"))
      .find(input => !input.value.trim());
    if (firstEmpty) {
      return showFieldError(firstEmpty, "Please name this slice, or reduce the slice count.", stepIndex);
    }
  }
  return true;
}
function validateWizard() {
  for (let index = 0; index < steps.length - 1; index++) {
    if (!validateStep(index)) return false;
  }
  return true;
}
function renderReview() {
  review.innerHTML = `
    <p><strong>Name:</strong> ${escapeHtml(nameInput.value || "Untitled Wheel")}</p>
    <p><strong>Rings:</strong> ${getRingCount()}</p>
    ${getActiveRings().map(ring => `
      <p><strong>${ringLabel(ring)} prompt:</strong> ${escapeHtml(currentPrompt(ring) || "No prompt")}</p>
      <p><strong>${ringLabel(ring)} slices:</strong> ${currentNames(ring).map(escapeHtml).join(", ")}</p>`).join("")}
    <p><strong>Theme:</strong> ${escapeHtml(themeSelect.value)}</p>
    <p><strong>Animations:</strong> ${allowAnimations?.checked ? "Allowed" : "Off"}</p>`;
}
function escapeHtml(value) { return String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[char])); }
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
Object.keys(countInputs).forEach(ring => {
  renderNameInputs(ring);
  countInputs[ring].addEventListener("change", () => renderNameInputs(ring));
  countInputs[ring].addEventListener("input", () => renderNameInputs(ring));
});
Object.keys(bgInputs).forEach(ring => {
  bgInputs[ring].addEventListener("change", () => {
    const file = bgInputs[ring].files && bgInputs[ring].files[0];
    readFileAsDataUrl(file, dataUrl => { backgrounds[ring] = dataUrl; bgInputs[ring].value = ""; });
  });
});
ringCountSelect?.addEventListener("change", () => updateStep());
pageBgImage?.addEventListener("change", () => {
  const file = pageBgImage.files && pageBgImage.files[0];
  readFileAsDataUrl(file, dataUrl => { backgrounds.page = dataUrl; pageBgImage.value = ""; });
});
centerBg?.addEventListener("change", () => {
  const file = centerBg.files && centerBg.files[0];
  readFileAsDataUrl(file, dataUrl => { backgrounds.center = dataUrl; centerBg.value = ""; });
});
backButton.addEventListener("click", () => {
  moveStep(-1);
  updateStep();
});
nextButton.addEventListener("click", () => {
  if (!validateStep(currentStep)) return;
  moveStep(1);
  updateStep();
});
document.addEventListener("keydown", event => {
  if (event.key !== "Enter") return;
  if (event.target?.tagName === "TEXTAREA") return;
  const activeStep = steps[currentStep];
  const fields = Array.from(activeStep.querySelectorAll("input[type='text'], input[type='number'], select"))
    .concat([backButton, nextButton, finishButton].filter(button => !button.classList.contains("hidden")));
  const index = fields.indexOf(event.target);
  if (index >= 0 && event.target.tagName !== "BUTTON") {
    event.preventDefault();
    const next = fields[index + 1];
    if (next) next.focus();
  }
});
form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!validateWizard()) return;
  finishButton.disabled = true;
  finishButton.textContent = editingWheel ? "Saving..." : "Creating...";
  try {
    const id = editingWheel?.id || `wheel-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const activeRings = getActiveRings();
    const refs = { outer: "", middle: "", inner: "", core: "", fifth: "", sixth: "", page: "", center: "" };
    activeRings.forEach(ring => refs[ring] = editingWheel?.rings?.[ring]?.backgroundRef || "");
    refs.page = editingWheel?.colors?.pageBgImageRef || "";
    refs.center = editingWheel?.center?.backgroundRef || "";

    for (const ring of RINGS.filter(ring => !activeRings.includes(ring))) {
      await deleteStoredImage(editingWheel?.rings?.[ring]?.backgroundRef);
    }
    for (const part of [...activeRings, "page", "center"]) {
      if (backgrounds[part]) {
        const key = `${id}:${part}`;
        await putStoredImage(key, backgrounds[part]);
        refs[part] = key;
      }
    }
    const previousSignature = editingWheel ? getWheelSignatureFrom(editingWheel) : "";
    const wheel = {
      id,
      name: nameInput.value.trim() || "Untitled Wheel",
      createdAt: editingWheel?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ringCount: getRingCount(),
      theme: themeSelect.value,
      allowAnimations: allowAnimations ? allowAnimations.checked : true,
      sizeScale: clamp(Number(wheelSize?.value) || 1, 0.45, 3),
      colors: {
        wheel: wheelColor.value,
        interface: interfaceColor.value,
        text: textColor.value,
        pageBg: pageBgColor.value,
        pageBgImageRef: refs.page
      },
      center: { background: "", backgroundRef: refs.center },
      rings: Object.fromEntries(activeRings.map(ring => [
        ring,
        {
          names: currentNames(ring),
          prompt: currentPrompt(ring),
          background: "",
          backgroundRef: refs[ring],
          rotation: Number(editingWheel?.rings?.[ring]?.rotation) || 0
        }
      ])),
      completed: Array.isArray(editingWheel?.completed) ? editingWheel.completed : [],
      preventRepeatSelections: Boolean(editingWheel?.preventRepeatSelections)
    };
    const wheels = readJson(WHEELS_KEY, []);
    const nextSignature = getWheelSignatureFrom(wheel);
    if (editingWheel && previousSignature !== nextSignature) wheel.completed = [];
    const nextWheels = editingWheel ? wheels.map(item => item.id === id ? wheel : item) : [...wheels, wheel];
    if (editingWheel && !nextWheels.some(item => item.id === id)) nextWheels.push(wheel);
    if (!writeJson(WHEELS_KEY, nextWheels)) return;
    localStorage.setItem(ACTIVE_WHEEL_KEY, id);
    window.location.href = "index.html";
  } catch (error) {
    console.error(error);
    alert(`Unable to ${editingWheel ? "save" : "create"} the wheel. Try a smaller image or a different browser.`);
  } finally {
    finishButton.disabled = false;
    finishButton.textContent = editingWheel ? "Save Wheel" : "Create Wheel";
  }
});
loadEditWheel();
updateStep();
