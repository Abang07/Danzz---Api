import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";
import http from "node:http";

const API = "https://api.easemate.ai";
const WASM_URL = "https://raw.githubusercontent.com/Ditzzx-vibecoder/Assets/main/chat_generator.wasm";
const SESSION_FILE = "/tmp/easemate-session.json";
const MAX_USE_PER_DEVICE = 3;

const USER_PROMPT = process.env.IMG_PROMPT || "ubah background jadi hitam";
const IMAGE_URL = process.env.IMG_URL;

if (!IMAGE_URL) { console.log(JSON.stringify({ Status: false, Error: "IMG_URL not set" })); process.exit(1); }

const ASPECT_RATIO = "Auto";
const OUTPUT_FILE_TYPE = "png";
const MODEL_ID = 10041;
const TASK_TYPE = 10041;
const OPERATION_ID = 419;
const OPERATION = "IMAGE_GENERATION";

const ua = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36";

let wasm;
let wasmUint8 = null;
let wasmDataView = null;
let wasmLastLen = 0;
const decoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
const encoder = new TextEncoder();
class Window {}

function randomHex(bytes = 16) { return crypto.randomBytes(bytes).toString("hex"); }
function createDeviceId() { return randomHex(16); }
function createTimestamp() { return (BigInt(Date.now()) * 1000000n + BigInt(crypto.randomInt(100000, 999999))).toString(); }
function getExt(url) { const u = url.split("?")[0]; const e = u.split(".").pop().toLowerCase(); return ["jpg","jpeg","png","webp"].includes(e) ? e : "jpg"; }
function getMimeType(ext) { return ext === "png" ? "image/png" : "image/jpeg"; }
function isNullish(v) { return v == null; }

function getWasmMemory() {
  if (!wasmUint8 || wasmUint8.byteLength === 0) wasmUint8 = new Uint8Array(wasm.memory.buffer);
  return wasmUint8;
}
function getWasmDataView() {
  if (!wasmDataView || wasmDataView.buffer !== wasm.memory.buffer) wasmDataView = new DataView(wasm.memory.buffer);
  return wasmDataView;
}
function readWasmString(ptr, len) { ptr = ptr >>> 0; return decoder.decode(getWasmMemory().subarray(ptr, ptr + len)); }
function passStringToWasm(text, malloc, realloc) {
  if (!realloc) {
    const buf = encoder.encode(text);
    const ptr = malloc(buf.length, 1) >>> 0;
    getWasmMemory().subarray(ptr, ptr + buf.length).set(buf);
    wasmLastLen = buf.length;
    return ptr;
  }
  let len = text.length, ptr = malloc(len, 1) >>> 0;
  const mem = getWasmMemory();
  let offset = 0;
  for (; offset < len; offset++) { const c = text.charCodeAt(offset); if (c > 127) break; mem[ptr + offset] = c; }
  if (offset !== len) {
    if (offset !== 0) text = text.slice(offset);
    ptr = realloc(ptr, len, (len = offset + text.length * 3), 1) >>> 0;
    const view = getWasmMemory().subarray(ptr + offset, ptr + len);
    const ret = encoder.encodeInto(text, view);
    offset += ret.written || 0;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  wasmLastLen = offset;
  return ptr;
}
function addExternRef(value) { const idx = wasm.__externref_table_alloc(); wasm.__wbindgen_export_2.set(idx, value); return idx; }
function handleWasmError(fn, args) { try { return fn.apply(null, args); } catch(e) { wasm.__wbindgen_exn_store(addExternRef(e)); } }

function setupBrowserMock(session) {
  globalThis.Window = Window;
  const localStorage = { store: new Map(), getItem(k) { return this.store.has(k) ? this.store.get(k) : null; }, setItem(k, v) { this.store.set(k, String(v)); } };
  localStorage.setItem("app-main", JSON.stringify({ visitorId: session.deviceId, identityId: session.identityId || "", browserLang: "en-US", iResult: { os: { name: "Android" }, browser: { name: "Chrome" }, device: { type: "mobile" } } }));
  const win = new Window();
  win.location = { origin: "https://www.easemate.ai" };
  win.localStorage = localStorage;
  globalThis.window = win; globalThis.self = win;
}

function createImports() {
  const I = { wbg: {} };
  I.wbg.__wbg_call_13410aac570ffff7 = (...a) => handleWasmError((fn, self) => fn.call(self), a);
  I.wbg.__wbg_getItem_9fc74b31b896f95a = (...a) => handleWasmError((rp, st, kp, kl) => { const k = readWasmString(kp, kl), v = st.getItem(k); const ptr = isNullish(v) ? 0 : passStringToWasm(v, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc), len = wasmLastLen; getWasmDataView().setInt32(rp+4,len,true); getWasmDataView().setInt32(rp+0,ptr,true); }, a);
  I.wbg.__wbg_instanceof_Window_12d20d558ef92592 = (v) => { try { return v instanceof Window; } catch { return false; } };
  I.wbg.__wbg_localStorage_9330af8bf39365ba = (...a) => handleWasmError((v) => { const s = v.localStorage; return isNullish(s) ? 0 : addExternRef(s); }, a);
  I.wbg.__wbg_location_92d89c32ae076cab = (v) => v.location;
  I.wbg.__wbg_log_6c7b5f4f00b8ce3f = () => {};
  I.wbg.__wbg_newnoargs_254190557c45b4ec = (p, l) => new Function(readWasmString(p, l));
  I.wbg.__wbg_origin_00892013881c6e2b = (...a) => handleWasmError((rp, v) => { const ptr = passStringToWasm(v.origin, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc), len = wasmLastLen; getWasmDataView().setInt32(rp+4,len,true); getWasmDataView().setInt32(rp+0,ptr,true); }, a);
  I.wbg.__wbg_static_accessor_GLOBAL_8921f820c2ce3f12 = () => { const v = typeof globalThis==="undefined"?null:globalThis; return isNullish(v)?0:addExternRef(v); };
  I.wbg.__wbg_static_accessor_GLOBAL_THIS_f0a4409105898184 = () => { const v = typeof globalThis==="undefined"?null:globalThis; return isNullish(v)?0:addExternRef(v); };
  I.wbg.__wbg_static_accessor_SELF_995b214ae681ff99 = () => { const v = typeof self==="undefined"?null:self; return isNullish(v)?0:addExternRef(v); };
  I.wbg.__wbg_static_accessor_WINDOW_cde3890479c675ea = () => { const v = typeof window==="undefined"?null:window; return isNullish(v)?0:addExternRef(v); };
  I.wbg.__wbg_stringify_b98c93d0a190446a = (...a) => handleWasmError((v) => JSON.stringify(v), a);
  I.wbg.__wbg_wbindgenisnull_f3037694abe4d97a = (v) => v === null;
  I.wbg.__wbg_wbindgenisobject_307a53c6bd97fbf8 = (v) => typeof v==="object"&&v!==null;
  I.wbg.__wbg_wbindgenisstring_d4fa939789f003b0 = (v) => typeof v==="string";
  I.wbg.__wbg_wbindgenisundefined_c4b71d073b92f3c5 = (v) => v===undefined;
  I.wbg.__wbg_wbindgenstringget_0f16a6ddddef376f = (rp, v) => { const t = typeof v==="string"?v:undefined; let ptr=0,len=0; if(!isNullish(t)){ptr=passStringToWasm(t,wasm.__wbindgen_malloc,wasm.__wbindgen_realloc);len=wasmLastLen;} getWasmDataView().setInt32(rp+4,len,true); getWasmDataView().setInt32(rp+0,ptr,true); };
  I.wbg.__wbg_wbindgenthrow_451ec1a8469d7eb6 = (p, l) => { throw new Error(readWasmString(p, l)); };
  I.wbg.__wbindgen_cast_2241b6af4c4b2941 = (p, l) => readWasmString(p, l);
  I.wbg.__wbindgen_init_externref_table = () => { const t = wasm.__wbindgen_export_2, o = t.grow(4); t.set(0,undefined); t.set(o+0,undefined); t.set(o+1,null); t.set(o+2,true); t.set(o+3,false); };
  return I;
}

async function fetchUrl(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.request(url, { method: opts.method || "GET", headers: opts.headers || {} }, (res) => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => resolve({ status: res.statusCode, ok: res.statusCode < 400, buffer: () => Promise.resolve(Buffer.concat(chunks)), text: () => Promise.resolve(Buffer.concat(chunks).toString("utf8")), json: () => Promise.resolve(JSON.parse(Buffer.concat(chunks).toString("utf8"))) }));
    });
    req.on("error", reject);
    if (opts.body) req.write(typeof opts.body === "string" ? opts.body : opts.body);
    req.end();
  });
}

async function initWasm(session) {
  if (wasm) return;
  setupBrowserMock(session);
  const res = await fetchUrl(WASM_URL, { headers: { "user-agent": ua } });
  const buf = await res.buffer();
  const { instance } = await WebAssembly.instantiate(buf, createImports());
  wasm = instance.exports;
  wasmUint8 = null; wasmDataView = null;
  if (wasm.__wbindgen_start) wasm.__wbindgen_start();
}

async function getSigns(body) {
  const timestamp = createTimestamp();
  const timestampPtr = passStringToWasm(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const timestampLen = wasmLastLen;
  const result = wasm.get_signs(body, timestampPtr, timestampLen);
  const text = readWasmString(result[0], result[1]);
  wasm.__wbindgen_free(result[0], result[1], 1);
  return JSON.parse(text);
}

async function apiPost(session, endpoint, body = {}) {
  await initWasm(session);
  const { sign, timestamp } = await getSigns(body);
  const headers = { language:"en-US", lang:"en", "device-type":"web", "device-identifier":session.deviceId, "device-uuid":session.deviceId, "device-platform":"Android,Chrome", "sec-ch-ua-platform":'"Android"', "sec-ch-ua":'"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"', "sec-ch-ua-mobile":"?1", accept:"application/json", "content-type":"application/json;charset=UTF-8", sign, timestamp, site:"www.easemate.ai", "client-type":"web", "client-name":"chatpdf", "product-code":"888", "user-agent":ua, origin:"https://www.easemate.ai", referer:"https://www.easemate.ai/" };
  if (session.identityId) headers["identity-id"] = session.identityId;
  const res = await fetchUrl(`${API}${endpoint}`, { method: "POST", headers, body: JSON.stringify(body) });
  return { code: res.status, json: await res.json() };
}

async function loadSession() {
  try { const raw = await fs.readFile(SESSION_FILE, "utf8"); const s = JSON.parse(raw); if (!s.deviceId || s.usedCount >= MAX_USE_PER_DEVICE) return { deviceId: createDeviceId(), identityId: "", usedCount: 0 }; return s; } catch { return { deviceId: createDeviceId(), identityId: "", usedCount: 0 }; }
}
async function saveSession(s) { await fs.writeFile(SESSION_FILE, JSON.stringify(s, null, 2), "utf8"); }

async function ensureIdentity(session) {
  if (session.identityId) return;
  const result = await apiPost(session, "/api2/task/identity_id", {});
  const id = result.json?.data?.identity_id;
  if (!id) throw new Error("IdentityId tidak ditemukan: " + JSON.stringify(result.json));
  session.identityId = id;
  setupBrowserMock(session);
  await saveSession(session);
}

async function ask() {
  const session = await loadSession();
  await ensureIdentity(session);

  // Download image from URL
  const imgRes = await fetchUrl(IMAGE_URL, { headers: { "user-agent": ua } });
  const imgBuf = await imgRes.buffer();
  const ext = getExt(IMAGE_URL);
  const safeExt = ext === "jpeg" ? "jpg" : ext;
  const mime = getMimeType(ext);
  const key = `pro/${session.deviceId}/${randomHex(16)}_${Date.now()}.${safeExt}`;

  // Query upload URL
  const uploadRes = await apiPost(session, "/api2/task/query_upload_url", { key, value: randomHex(16) });
  if (uploadRes.json?.code !== 200) throw new Error(JSON.stringify(uploadRes.json));
  const { upload_url, download_url } = uploadRes.json.data;

  // Upload to S3
  await new Promise((resolve, reject) => {
    const lib = upload_url.startsWith("https") ? https : http;
    const urlObj = new URL(upload_url);
    const req = lib.request({ hostname: urlObj.hostname, path: urlObj.pathname + urlObj.search, method: "PUT", headers: { "content-type": mime, "content-length": String(imgBuf.length) } }, (res) => { res.resume(); res.on("end", resolve); });
    req.on("error", reject);
    req.write(imgBuf);
    req.end();
  });

  // Create task
  const taskBody = { model_id: MODEL_ID, operation_info: { id: OPERATION_ID, operation: OPERATION }, object_info: [{ img_info: { s3_name: key, s3_url: download_url, size: imgBuf.length, origin_name: `image.${ext}` } }], parameters: JSON.stringify({ prompt: USER_PROMPT, file_type: OUTPUT_FILE_TYPE, aspectRatio: ASPECT_RATIO }) };
  const taskRes = await apiPost(session, "/api2/async/create_generate_image", taskBody);
  if (taskRes.json?.code === 6101) throw new Error("Free token habis. Coba lagi besok.");
  if (taskRes.json?.code !== 200) throw new Error(JSON.stringify(taskRes.json));
  const taskId = taskRes.json.data.taskId;

  // Poll result
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 3000));
    const poll = await apiPost(session, "/api2/async/query_generate_image", { taskId, task_type: TASK_TYPE });
    const data = poll.json?.data || {};
    if (data.status === "SUCCESS" && data.url) {
      const rawKey = data.url.split("/").pop()?.split("?")[0] || "image.png";
      const urlObj = new URL(data.url); urlObj.search = ""; urlObj.searchParams.set("filename", rawKey);
      const signRes = await apiPost(session, "/api2/task/url_sign", { key: urlObj.toString() });
      if (signRes.json?.code !== 200) throw new Error(JSON.stringify(signRes.json));
      session.usedCount = (session.usedCount || 0) + 1;
      await saveSession(session);
      return { Status: true, Code: 200, Url: signRes.json.data.url };
    }
    if (data.status === "FAILED" || data.status === "FAILURE") throw new Error(data.msg || "Generate failed");
  }
  throw new Error("Timeout menunggu hasil gambar.");
}

ask().then(r => { process.stdout.write(JSON.stringify(r) + "\n"); }).catch(e => { process.stdout.write(JSON.stringify({ Status: false, Error: e.message }) + "\n"); process.exit(1); });
