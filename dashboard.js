const WHEELS_KEY = "skillWheelWheels";
const ACTIVE_WHEEL_KEY = "skillWheelActiveWheelId";
const DASHBOARD_KEY = "skillWheelSpinnerDashboard";
const IMAGE_DB_NAME = "skillWheelSpinnerImages";
const IMAGE_STORE = "images";
const ALL_RINGS = ["outer", "middle", "inner", "core", "fifth", "sixth"];
const RING_LABELS = { outer: "outer", middle: "middle", inner: "inner", core: "core", fifth: "ring 5", sixth: "ring 6" };

const grid = document.getElementById("dashboardGrid");
const empty = document.getElementById("dashboardEmpty");
const aboutButton = document.getElementById("aboutButton");
const aboutModal = document.getElementById("aboutModal");
const closeAboutButton = document.getElementById("closeAboutButton");
const customizeToggle = document.getElementById("dashboardCustomizeToggle");
const customizePanel = document.getElementById("dashboardCustomizePanel");
const tableColorInput = document.getElementById("dashboardTableColor");
const interfaceColorInput = document.getElementById("dashboardInterfaceColor");
const bgColorInput = document.getElementById("dashboardBgColor");
const bgImageInput = document.getElementById("dashboardBgImage");
const clearBgImageButton = document.getElementById("clearDashboardBgImage");
const resetDashboardColors = document.getElementById("resetDashboardColors");

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; }
  catch { return fallback; }
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
function writeJson(key, value) { localStorage.setItem(key, JSON.stringify(stripLargeImageData(value))); }
function openImageDb() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) { reject(new Error("IndexedDB unavailable")); return; }
    const request = indexedDB.open(IMAGE_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IMAGE_STORE)) db.createObjectStore(IMAGE_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function getStoredImage(key) {
  if (!key) return "";
  const db = await openImageDb();
  return new Promise(resolve => {
    const tx = db.transaction(IMAGE_STORE, "readonly");
    const request = tx.objectStore(IMAGE_STORE).get(key);
    request.onsuccess = () => resolve(request.result || "");
    request.onerror = () => resolve("");
    tx.oncomplete = () => db.close();
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
async function putStoredImage(key, dataUrl) {
  const db = await openImageDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, "readwrite");
    tx.objectStore(IMAGE_STORE).put(dataUrl, key);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}
function getWheels() { return readJson(WHEELS_KEY, []); }
function saveWheels(wheels) { writeJson(WHEELS_KEY, wheels); }
function getDashboardSettings() { return readJson(DASHBOARD_KEY, { tableColor: "#ffd700", interfaceColor: "#ffd700", bgColor: "#111111", bgImageRef: "" }); }
function saveDashboardSettings(settings) { writeJson(DASHBOARD_KEY, settings); }
async function applyDashboardSettings() {
  const settings = getDashboardSettings();
  document.documentElement.style.setProperty("--interface", settings.interfaceColor || "#ffd700");
  document.documentElement.style.setProperty("--wheel-line", settings.tableColor || "#ffd700");
  document.documentElement.style.setProperty("--bg", settings.bgColor || "#111111");
  const bgImage = settings.bgImageRef ? await getStoredImage(settings.bgImageRef) : "";
  document.documentElement.style.setProperty("--page-bg-image", bgImage ? `url("${bgImage}")` : "none");
  if (tableColorInput) tableColorInput.value = settings.tableColor || "#ffd700";
  if (interfaceColorInput) interfaceColorInput.value = settings.interfaceColor || "#ffd700";
  if (bgColorInput) bgColorInput.value = settings.bgColor || "#111111";
}
function getRingNames(wheel, ring) {
  return Array.isArray(wheel?.rings?.[ring]?.names) ? wheel.rings[ring].names.filter(Boolean) : [];
}
function getActiveRings(wheel) {
  return ALL_RINGS.slice(0, Math.max(1, Math.min(6, Number(wheel?.ringCount) || 3)));
}
async function makeIcon(cardIcon, wheel) {
  let centerBg = wheel?.center?.background || "";
  if (!centerBg && wheel?.center?.backgroundRef) centerBg = await getStoredImage(wheel.center.backgroundRef);
  let outerBg = wheel?.rings?.outer?.background || "";
  if (!outerBg && wheel?.rings?.outer?.backgroundRef) outerBg = await getStoredImage(wheel.rings.outer.backgroundRef);
  const iconBg = centerBg || outerBg;
  if (iconBg) {
    cardIcon.style.backgroundImage = `url("${iconBg}")`;
    cardIcon.style.backgroundSize = "cover";
    cardIcon.style.backgroundPosition = "center";
  }
  cardIcon.style.setProperty("--wheel-line", wheel.colors?.wheel || "#ffd700");
}
function renderDashboard() {
  const wheels = getWheels();
  grid.innerHTML = "";
  empty.classList.toggle("hidden", wheels.length > 0);
  wheels.forEach(wheel => {
    const card = document.createElement("article");
    card.className = "wheel-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="wheel-card-icon" aria-hidden="true"></div>
      <div>
        <h3>${escapeHtml(wheel.name || "Untitled Wheel")}</h3>
        <p>${getActiveRings(wheel).map(ring => `${getRingNames(wheel, ring).length} ${ring}`).join(" · ")}</p>
        <div class="card-actions">
          <button type="button" data-action="open">Open</button>
          <button type="button" data-action="edit">Edit</button>
          <button type="button" data-action="delete">Delete</button>
        </div>
      </div>`;
    card.querySelector("p").textContent = getActiveRings(wheel).map(ring => `${getRingNames(wheel, ring).length} ${RING_LABELS[ring] || ring}`).join(" - ");
    makeIcon(card.querySelector(".wheel-card-icon"), wheel);
    card.addEventListener("click", event => {
      const action = event.target?.dataset?.action;
      if (action === "delete") {
        event.stopPropagation();
        if (confirm(`Delete "${wheel.name || "this wheel"}"?`)) {
          ALL_RINGS.forEach(r => deleteStoredImage(wheel?.rings?.[r]?.backgroundRef));
          deleteStoredImage(wheel?.colors?.pageBgImageRef);
          deleteStoredImage(wheel?.center?.backgroundRef);
          saveWheels(getWheels().filter(item => item.id !== wheel.id));
          renderDashboard();
        }
        return;
      }
      if (action === "edit") {
        event.stopPropagation();
        localStorage.setItem(ACTIVE_WHEEL_KEY, wheel.id);
        window.location.href = `setup.html?mode=edit&id=${encodeURIComponent(wheel.id)}`;
        return;
      }
      localStorage.setItem(ACTIVE_WHEEL_KEY, wheel.id);
      window.location.href = "index.html";
    });
    card.addEventListener("keydown", event => {
      if (event.key === "Enter") card.click();
    });
    grid.appendChild(card);
  });
}
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[char]));
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
async function updateDashboardSetting(patch) {
  const next = { ...getDashboardSettings(), ...patch };
  saveDashboardSettings(next);
  await applyDashboardSettings();
}
aboutButton?.addEventListener("click", () => aboutModal.classList.remove("hidden"));
closeAboutButton?.addEventListener("click", () => aboutModal.classList.add("hidden"));
aboutModal?.addEventListener("click", event => { if (event.target === aboutModal) aboutModal.classList.add("hidden"); });
customizeToggle?.addEventListener("click", () => customizePanel.classList.toggle("hidden"));
tableColorInput?.addEventListener("input", () => updateDashboardSetting({ tableColor: tableColorInput.value }));
interfaceColorInput?.addEventListener("input", () => updateDashboardSetting({ interfaceColor: interfaceColorInput.value }));
bgColorInput?.addEventListener("input", () => updateDashboardSetting({ bgColor: bgColorInput.value }));
bgImageInput?.addEventListener("change", () => {
  const file = bgImageInput.files && bgImageInput.files[0];
  readFileAsDataUrl(file, async dataUrl => {
    const key = "dashboard:background";
    await putStoredImage(key, dataUrl);
    await updateDashboardSetting({ bgImageRef: key });
    bgImageInput.value = "";
  });
});
clearBgImageButton?.addEventListener("click", async () => {
  const settings = getDashboardSettings();
  await deleteStoredImage(settings.bgImageRef);
  await updateDashboardSetting({ bgImageRef: "" });
});
resetDashboardColors?.addEventListener("click", async () => {
  const settings = getDashboardSettings();
  await deleteStoredImage(settings.bgImageRef);
  saveDashboardSettings({ tableColor: "#ffd700", interfaceColor: "#ffd700", bgColor: "#111111", bgImageRef: "" });
  await applyDashboardSettings();
});
applyDashboardSettings();
renderDashboard();
