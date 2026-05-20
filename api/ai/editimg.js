/*
 * Endpoint: GET /api/ai/editimg?url=...&prompt=...
 * Source  : easemate.ai
 * By      : Danzz
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const API = 'https://api.easemate.ai';
const WASM_URL = 'https://raw.githubusercontent.com/Ditzzx-vibecoder/Assets/main/chat_generator.wasm';
const ua = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36';

const MODEL_ID = 10041;
const TASK_TYPE = 10041;
const OPERATION_ID = 419;
const OPERATION = 'IMAGE_GENERATION';
const ASPECT_RATIO = 'Auto';
const OUTPUT_FILE_TYPE = 'png';

// WASM state
let wasmInstance;
let wasmUint8 = null;
let wasmDataView = null;
let wasmLastLen = 0;
const decoder = new (require('string_decoder').StringDecoder)('utf8');
const encoder = new TextEncoder();

class Window {}

function randomHex(bytes = 16) { return crypto.randomBytes(bytes).toString('hex'); }
function createDeviceId() { return randomHex(16); }
function createTimestamp() {
  return (BigInt(Date.now()) * 1000000n + BigInt(crypto.randomInt(100000, 999999))).toString();
}
function getExt(filePath) { return path.extname(filePath).toLowerCase().replace('.', ''); }
function getMimeType(ext) {
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'png') return 'image/png';
  throw new Error('Format tidak didukung. Gunakan JPG/PNG.');
}
function isNullish(v) { return v == null; }

function getWasmMemory() {
  if (!wasmUint8 || wasmUint8.byteLength === 0) wasmUint8 = new Uint8Array(wasmInstance.memory.buffer);
  return wasmUint8;
}
function getWasmDataView() {
  if (!wasmDataView || wasmDataView.buffer !== wasmInstance.memory.buffer)
    wasmDataView = new DataView(wasmInstance.memory.buffer);
  return wasmDataView;
}
function readWasmString(ptr, len) {
  ptr = ptr >>> 0;
  const bytes = getWasmMemory().subarray(ptr, ptr + len);
  return Buffer.from(bytes).toString('utf8');
}
function passStringToWasm(text, malloc, realloc) {
  if (!realloc) {
    const buf = Buffer.from(text, 'utf8');
    const ptr = malloc(buf.length, 1) >>> 0;
    getWasmMemory().subarray(ptr, ptr + buf.length).set(buf);
    wasmLastLen = buf.length;
    return ptr;
  }
  let len = text.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getWasmMemory();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = text.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) text = text.slice(offset);
    ptr = realloc(ptr, len, (len = offset + text.length * 3), 1) >>> 0;
    const view = getWasmMemory().subarray(ptr + offset, ptr + len);
    const ret = { written: 0 };
    const encoded = Buffer.from(text, 'utf8');
    view.set(encoded);
    ret.written = encoded.length;
    offset += ret.written || 0;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  wasmLastLen = offset;
  return ptr;
}
function addExternRef(value) {
  const idx = wasmInstance.__externref_table_alloc();
  wasmInstance.__wbindgen_export_2.set(idx, value);
  return idx;
}
function handleWasmError(fn, args) {
  try { return fn.apply(null, args); } catch (e) {
    const idx = addExternRef(e);
    wasmInstance.__wbindgen_exn_store(idx);
  }
}

function setupBrowserMock(session) {
  globalThis.Window = Window;
  const localStorage = {
    store: new Map(),
    getItem(key) { return this.store.has(key) ? this.store.get(key) : null; },
    setItem(key, value) { this.store.set(key, String(value)); }
  };
  localStorage.setItem('app-main', JSON.stringify({
    visitorId: session.deviceId,
    identityId: session.identityId || '',
    browserLang: 'en-US',
    iResult: { os: { name: 'Android' }, browser: { name: 'Chrome' }, device: { type: 'mobile' } }
  }));
  const win = new Window();
  win.location = { origin: 'https://www.easemate.ai' };
  win.localStorage = localStorage;
  globalThis.window = win;
  globalThis.self = win;
  return localStorage;
}

function createImports() {
  const imports = { wbg: {} };
  imports.wbg.__wbg_call_13410aac570ffff7 = (...a) => handleWasmError((fn, self) => fn.call(self), a);
  imports.wbg.__wbg_getItem_9fc74b31b896f95a = (...a) => handleWasmError((retPtr, storage, keyPtr, keyLen) => {
    const key = readWasmString(keyPtr, keyLen);
    const value = storage.getItem(key);
    const ptr = isNullish(value) ? 0 : passStringToWasm(value, wasmInstance.__wbindgen_malloc, wasmInstance.__wbindgen_realloc);
    const len = wasmLastLen;
    getWasmDataView().setInt32(retPtr + 4, len, true);
    getWasmDataView().setInt32(retPtr + 0, ptr, true);
  }, a);
  imports.wbg.__wbg_instanceof_Window_12d20d558ef92592 = (v) => { try { return v instanceof Window; } catch { return false; } };
  imports.wbg.__wbg_localStorage_9330af8bf39365ba = (...a) => handleWasmError((v) => {
    const s = v.localStorage; return isNullish(s) ? 0 : addExternRef(s);
  }, a);
  imports.wbg.__wbg_location_92d89c32ae076cab = (v) => v.location;
  imports.wbg.__wbg_log_6c7b5f4f00b8ce3f = () => {};
  imports.wbg.__wbg_newnoargs_254190557c45b4ec = (ptr, len) => new Function(readWasmString(ptr, len));
  imports.wbg.__wbg_origin_00892013881c6e2b = (...a) => handleWasmError((retPtr, v) => {
    const ptr = passStringToWasm(v.origin, wasmInstance.__wbindgen_malloc, wasmInstance.__wbindgen_realloc);
    const len = wasmLastLen;
    getWasmDataView().setInt32(retPtr + 4, len, true);
    getWasmDataView().setInt32(retPtr + 0, ptr, true);
  }, a);
  imports.wbg.__wbg_static_accessor_GLOBAL_8921f820c2ce3f12 = () => { const v = typeof globalThis === 'undefined' ? null : globalThis; return isNullish(v) ? 0 : addExternRef(v); };
  imports.wbg.__wbg_static_accessor_GLOBAL_THIS_f0a4409105898184 = () => { const v = typeof globalThis === 'undefined' ? null : globalThis; return isNullish(v) ? 0 : addExternRef(v); };
  imports.wbg.__wbg_static_accessor_SELF_995b214ae681ff99 = () => { const v = typeof self === 'undefined' ? null : self; return isNullish(v) ? 0 : addExternRef(v); };
  imports.wbg.__wbg_static_accessor_WINDOW_cde3890479c675ea = () => { const v = typeof window === 'undefined' ? null : window; return isNullish(v) ? 0 : addExternRef(v); };
  imports.wbg.__wbg_stringify_b98c93d0a190446a = (...a) => handleWasmError((v) => JSON.stringify(v), a);
  imports.wbg.__wbg_wbindgenisnull_f3037694abe4d97a = (v) => v === null;
  imports.wbg.__wbg_wbindgenisobject_307a53c6bd97fbf8 = (v) => typeof v === 'object' && v !== null;
  imports.wbg.__wbg_wbindgenisstring_d4fa939789f003b0 = (v) => typeof v === 'string';
  imports.wbg.__wbg_wbindgenisundefined_c4b71d073b92f3c5 = (v) => v === undefined;
  imports.wbg.__wbg_wbindgenstringget_0f16a6ddddef376f = (retPtr, value) => {
    const text = typeof value === 'string' ? value : undefined;
    let ptr = 0, len = 0;
    if (!isNullish(text)) { ptr = passStringToWasm(text, wasmInstance.__wbindgen_malloc, wasmInstance.__wbindgen_realloc); len = wasmLastLen; }
    getWasmDataView().setInt32(retPtr + 4, len, true);
    getWasmDataView().setInt32(retPtr + 0, ptr, true);
  };
  imports.wbg.__wbg_wbindgenthrow_451ec1a8469d7eb6 = (ptr, len) => { throw new Error(readWasmString(ptr, len)); };
  imports.wbg.__wbindgen_cast_2241b6af4c4b2941 = (ptr, len) => readWasmString(ptr, len);
  imports.wbg.__wbindgen_init_externref_table = () => {
    const table = wasmInstance.__wbindgen_export_2;
    const offset = table.grow(4);
    table.set(0, undefined); table.set(offset + 0, undefined); table.set(offset + 1, null); table.set(offset + 2, true); table.set(offset + 3, false);
  };
  return imports;
}

async function initWasm(session) {
  if (wasmInstance) return;
  setupBrowserMock(session);
  const res = await axios.get(WASM_URL, { responseType: 'arraybuffer', headers: { 'user-agent': ua }, timeout: 30000 });
  const buf = Buffer.from(res.data);
  const { instance } = await WebAssembly.instantiate(buf, createImports());
  wasmInstance = instance.exports;
  wasmUint8 = null; wasmDataView = null;
  if (wasmInstance.__wbindgen_start) wasmInstance.__wbindgen_start();
}

async function getSigns(body) {
  const timestamp = createTimestamp();
  const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
  const bodyPtr = passStringToWasm(bodyStr, wasmInstance.__wbindgen_malloc, wasmInstance.__wbindgen_realloc);
  const bodyLen = wasmLastLen;
  const tsPtr = passStringToWasm(timestamp, wasmInstance.__wbindgen_malloc, wasmInstance.__wbindgen_realloc);
  const tsLen = wasmLastLen;
  const result = wasmInstance.get_signs(bodyPtr, bodyLen, tsPtr, tsLen);
  const text = readWasmString(result[0], result[1]);
  wasmInstance.__wbindgen_free(result[0], result[1], 1);
  return JSON.parse(text);
}

async function apiPost(session, endpoint, body = {}) {
  await initWasm(session);
  const { sign, timestamp } = await getSigns(body);
  const headers = {
    language: 'en-US', lang: 'en', 'device-type': 'web',
    'device-identifier': session.deviceId, 'device-uuid': session.deviceId,
    'device-platform': 'Android,Chrome', 'sec-ch-ua-platform': '"Android"',
    'sec-ch-ua': '"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',
    'sec-ch-ua-mobile': '?1', accept: 'application/json',
    'content-type': 'application/json;charset=UTF-8',
    sign, timestamp, site: 'www.easemate.ai', 'client-type': 'web',
    'client-name': 'chatpdf', 'product-code': '888', 'user-agent': ua,
    origin: 'https://www.easemate.ai', referer: 'https://www.easemate.ai/'
  };
  if (session.identityId) headers['identity-id'] = session.identityId;
  const res = await axios.post(`${API}${endpoint}`, body, { headers, timeout: 30000 });
  return { code: res.status, json: res.data };
}

async function ensureIdentity(session) {
  if (session.identityId) return;
  const result = await apiPost(session, '/api2/task/identity_id', {});
  const id = result.json?.data?.identity_id;
  if (!id) throw new Error('IdentityId tidak ditemukan');
  session.identityId = id;
  setupBrowserMock(session);
}

async function editImage(imageUrl, prompt) {
  const session = { deviceId: createDeviceId(), identityId: '', usedCount: 0 };

  await ensureIdentity(session);

  // Download gambar dari URL
  const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 30000 });
  const imgBuf = Buffer.from(imgRes.data);
  const contentType = imgRes.headers['content-type'] || 'image/jpeg';
  const ext = contentType.includes('png') ? 'png' : 'jpg';
  const mime = getMimeType(ext);

  // Query upload URL
  const safeExt = ext === 'jpeg' ? 'jpg' : ext;
  const key = `pro/${session.deviceId}/${randomHex(16)}_${Date.now()}.${safeExt}`;
  const uploadRes = await apiPost(session, '/api2/task/query_upload_url', { key, value: randomHex(16) });
  if (uploadRes.json?.code !== 200) throw new Error(JSON.stringify(uploadRes.json));
  const { upload_url, download_url } = uploadRes.json.data;

  // Upload ke S3
  await axios.put(upload_url, imgBuf, {
    headers: { 'content-type': mime, 'content-length': String(imgBuf.length) },
    timeout: 60000,
    maxBodyLength: Infinity
  });

  // Buat task
  const taskBody = {
    model_id: MODEL_ID,
    operation_info: { id: OPERATION_ID, operation: OPERATION },
    object_info: [{ img_info: { s3_name: key, s3_url: download_url, size: imgBuf.length, origin_name: `image.${ext}` } }],
    parameters: JSON.stringify({ prompt, file_type: OUTPUT_FILE_TYPE, aspectRatio: ASPECT_RATIO })
  };
  const taskRes = await apiPost(session, '/api2/async/create_generate_image', taskBody);
  if (taskRes.json?.code === 6101) throw new Error('Free token hari ini sudah habis. Coba lagi besok.');
  if (taskRes.json?.code !== 200) throw new Error(JSON.stringify(taskRes.json));
  const taskId = taskRes.json.data.taskId;

  // Polling hasil
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 3000));
    const poll = await apiPost(session, '/api2/async/query_generate_image', { taskId, task_type: TASK_TYPE });
    const data = poll.json?.data || {};
    if (data.status === 'SUCCESS' && data.url) {
      // Sign URL
      const rawKey = data.url.split('/').pop()?.split('?')[0] || 'image.png';
      const urlObj = new URL(data.url);
      urlObj.search = '';
      urlObj.searchParams.set('filename', rawKey);
      const signRes = await apiPost(session, '/api2/task/url_sign', { key: urlObj.toString() });
      if (signRes.json?.code !== 200) throw new Error(JSON.stringify(signRes.json));
      return signRes.json.data.url;
    }
    if (data.status === 'FAILED' || data.status === 'FAILURE') throw new Error(data.msg || 'Generate failed');
  }
  throw new Error('Timeout menunggu hasil gambar.');
}

async function handler(req, res) {
  const { url, prompt, text } = req.query;
  const input = prompt || text;

  if (!url || !input) {
    return res.status(400).json({
      status: false,
      message: 'Parameter "url" dan "prompt" wajib diisi!\nContoh: /api/ai/editimg?url=https://...&prompt=ubah background jadi hitam'
    });
  }

  try {
    const result = await editImage(url, input.trim());
    res.json({ status: true, creator: 'Danzz', result });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}

module.exports = { handler };
