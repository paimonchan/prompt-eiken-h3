import { createIcons, Search, Library, FlaskConical, Bookmark, LayoutTemplate, BookOpen, Github, Sun, Moon, ArrowUpRight, ArrowLeft, Copy, Check, Download, Link, X, SlidersHorizontal, Clapperboard, ChevronRight, PanelLeftClose, Menu, FileText, RotateCcw, ArrowRight, Film } from 'lucide';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { filterEntries, promptSections } from './catalog.js';
import './style.css';
import { enhanceDropdowns } from './dropdown.js';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';

const icons = { Search, Library, FlaskConical, Bookmark, LayoutTemplate, BookOpen, Github, Sun, Moon, ArrowUpRight, ArrowLeft, Copy, Check, Download, Link, X, SlidersHorizontal, Clapperboard, ChevronRight, PanelLeftClose, Menu, FileText, RotateCcw, ArrowRight, Film };
const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
let favorites = read('eiken-favorites', []);
if (!Array.isArray(favorites)) favorites = [];
let data = { entries: [], resources: [] };
let tab = 'prompt';
let mobileDetail = false;
const labels = { all: 'Semua prompt', experiments: 'Eksperimen', library: 'Library', favorites: 'Tersimpan', templates: 'Template', guides: 'Panduan' };
const navIcons = { all: 'library', experiments: 'flask-conical', library: 'film', favorites: 'bookmark', templates: 'layout-template', guides: 'book-open' };
const params = () => new URLSearchParams(location.hash.slice(1));
const state = () => ({ collection: ['all', 'experiments', 'library', 'favorites', 'guides'].includes(params().get('collection')) ? params().get('collection') : 'all', query: params().get('q') || '', mode: params().get('mode') || '', status: params().get('status') || '', tag: params().get('tag') || '', sort: params().get('sort') || 'newest', favorites });
const isResource = () => state().collection === 'guides';
function update(values, replace = false) {
  const next = params();
  for (const [key, value] of Object.entries(values)) value ? next.set(key, value) : next.delete(key);
  history[replace ? 'replaceState' : 'pushState'](null, '', `${location.pathname}${location.search}#${next}`);
  render();
}
function listed() {
  if (isResource()) return data.resources.filter(item => item.collection === state().collection && `${item.title} ${item.content}`.toLowerCase().includes(state().query.toLowerCase().trim()));
  return filterEntries(data.entries, state());
}
function selected() {
  const slug = params().get('prompt');
  return slug ? [...data.entries, ...data.resources].find(item => item.slug === slug) : listed()[0];
}
function count(collection) {
  if (collection === 'all') return data.entries.length;
  if (collection === 'favorites') return data.entries.filter(item => favorites.includes(item.slug)).length;
  return [...data.entries, ...data.resources].filter(item => item.collection === collection).length;
}
function paintIcons() { createIcons({ icons, attrs: { 'stroke-width': 1.7 } }); }
function button(action, symbol, title, extra = '') { return `<button class="icon-button" data-action="${action}" title="${title}" aria-label="${title}" ${extra}>${icon(symbol)}</button>`; }
function markdown(content) { return DOMPurify.sanitize(marked.parse(content || 'Belum ada catatan.')); }

document.querySelector('#app').innerHTML = `
  <aside class="sidebar" id="sidebar">
    <a class="brand" href="#" aria-label="Prompt Eiken H3 beranda"><span class="brand-mark">${icon('clapperboard')}</span><span>Eiken<span class="brand-sub">PROMPT ARCHIVE</span></span><span class="h3">H3</span></a>
    <div class="sidebar-label">WORKSPACE</div><nav id="navigation" aria-label="Navigasi utama"></nav>
    <div class="sidebar-label resources-label">RESOURCES</div><nav id="resources" aria-label="Sumber referensi"></nav>
    <div class="sidebar-bottom"><div class="studio-photo"><img src="${import.meta.env.BASE_URL}images/projector.jpg" alt="Clapperboard pada proses pengambilan gambar" loading="lazy"><span>From words<br>to motion.</span></div><a class="repository" href="https://github.com/paimonchan/prompt-eiken-h3" target="_blank" rel="noopener noreferrer">${icon('github')} Repository ${icon('arrow-up-right')}</a><div class="sidebar-foot"><span><b class="live-dot"></b> MiniMax H3</span><span>v1.0</span></div></div>
  </aside>
  <button class="nav-backdrop" data-action="close-menu" aria-label="Tutup navigasi" tabindex="-1"></button>
  <div class="workspace">
    <header class="topbar">${button('menu', 'menu', 'Buka navigasi')}<div class="breadcrumb">Workspace ${icon('chevron-right')} <span id="breadcrumb-label">Semua prompt</span></div><div class="top-actions"><span class="engine-label">VIDEO + AUDIO</span>${button('theme', 'moon', 'Ubah tema')}</div></header>
    <main id="main" tabindex="-1">
      <section class="page-heading"><div><div class="eyebrow">THE PROMPT COLLECTION</div><h1 id="page-title">Semua prompt<span class="title-dot">.</span></h1><p id="page-description">Eksplorasi gerak, gambar, dan suara.</p></div><div class="collection-stats" id="stats"></div></section>
      <section class="search-toolbar" aria-label="Pencarian dan filter"><div class="search-box">${icon('search')}<input id="search" type="search" placeholder="Cari prompt, tag, atau isi adegan..." aria-label="Cari prompt" autocomplete="off"><span class="search-key" aria-hidden="true">/</span></div><label class="select-wrap">${icon('sliders-horizontal')}<select id="status" aria-label="Filter status"><option value="">Semua status</option>${['draft', 'tested', 'working', 'failed'].map(s => `<option value="${s}">${s[0].toUpperCase() + s.slice(1)}</option>`).join('')}</select></label><label class="select-wrap"><select id="tag" aria-label="Filter tag"><option value="">Semua tag</option></select></label></section>
      <button class="text-button reset-filters" id="reset-filters" data-action="reset" hidden>${icon('x')} Reset filter</button><div class="mode-bar" id="modes" aria-label="Filter mode"></div>
      <div class="content-layout" id="content-layout"><section class="results" aria-label="Daftar prompt"><div class="results-heading"><span id="result-count" role="status"></span><select id="sort" aria-label="Urutkan prompt"><option value="newest">Terbaru</option><option value="oldest">Terlama</option><option value="title">Judul A-Z</option></select></div><div id="list"><div class="empty">Memuat koleksi...</div></div><div class="list-footer" id="list-footer"></div></section><section class="detail" id="detail" aria-label="Detail prompt"><div class="empty">Memuat prompt...</div></section></div>
      <footer class="page-footer"><span>PROMPT EIKEN H3</span><span id="updated"></span></footer>
    </main>
  </div>`;
paintIcons();

function render() {
  const current = state();
  const entries = listed();
  const item = selected();
  document.querySelector('#navigation').innerHTML = ['all', 'experiments', 'library', 'favorites'].map(key => `<button class="nav-item ${current.collection === key ? 'active' : ''}" data-collection="${key}" ${current.collection === key ? 'aria-current="page"' : ''}>${icon(navIcons[key])}<span>${labels[key]}</span><span class="nav-count">${count(key)}</span></button>`).join('');
  document.querySelector('#resources').innerHTML = ['guides'].map(key => `<button class="nav-item ${current.collection === key ? 'active' : ''}" data-collection="${key}" ${current.collection === key ? 'aria-current="page"' : ''}>${icon(navIcons[key])}<span>${labels[key]}</span><span class="nav-count">${count(key)}</span></button>`).join('');
  document.querySelector('#breadcrumb-label').textContent = labels[current.collection] || labels.all;
  document.querySelector('#page-title').innerHTML = `${escape(labels[current.collection] || labels.all)}<span class="title-dot">.</span>`;
  document.querySelector('#page-description').textContent = ({ all: 'Eksplorasi gerak, gambar, dan suara.', experiments: 'Catatan proses. Ruang untuk mencoba.', library: 'Prompt yang sudah matang dan siap digunakan.', favorites: 'Koleksi pilihanmu, tersimpan di browser ini.', templates: 'Titik awal untuk setiap mode generasi.', guides: 'Referensi penulisan prompt MiniMax H3.' })[current.collection] || '';
  document.querySelector('#stats').innerHTML = `<div><strong>${data.entries.length.toString().padStart(2, '0')}</strong><span>prompt</span></div><div><strong>${new Set(data.entries.map(e => e.mode)).size.toString().padStart(2, '0')}</strong><span>mode aktif</span></div><div><strong>${data.entries.filter(e => e.status === 'working').length.toString().padStart(2, '0')}</strong><span>working</span></div>`;
  document.querySelector('#search').value = current.query;
  document.querySelector('#status').value = current.status;
  document.querySelector('#tag').innerHTML = '<option value="">Semua tag</option>' + [...new Set(data.entries.flatMap(e => e.tags || []))].sort().map(tag => `<option value="${escape(tag)}">${escape(tag)}</option>`).join('');
  document.querySelector('#tag').value = current.tag;
  document.querySelector('#status').closest('label').hidden = isResource();
  document.querySelector('#tag').closest('label').hidden = isResource();
  document.querySelector('#sort').dataset.unavailable = String(isResource());
  document.querySelector('#sort').value = current.sort;
  document.querySelector('#modes').innerHTML = isResource() ? `<span class="resource-count">${icon(navIcons[current.collection])} ${count(current.collection)} ${labels[current.collection].toLowerCase()}</span>` : ['', 't2va', 'i2va', 'fl2va', 'ref2va'].map(mode => `<button class="mode-tab ${current.mode === mode ? 'active' : ''}" data-mode="${mode}" aria-pressed="${current.mode === mode}">${mode ? mode.toUpperCase() : 'Semua mode'}${!mode ? `<span>${data.entries.length}</span>` : ''}</button>`).join('');
  document.querySelector('#result-count').textContent = `${entries.length} ${isResource() ? 'dokumen' : 'prompt'}`;
  document.querySelector('#list').innerHTML = entries.length ? entries.map((entry, index) => `<article class="prompt-card ${item?.slug === entry.slug ? 'selected' : ''}"><button class="open-prompt" data-open="${escape(entry.slug)}" ${item?.slug === entry.slug ? 'aria-current="true"' : ''}><div class="card-top"><span class="mode-badge ${entry.mode || 'document'}">${icon(entry.mode === 'fl2va' ? 'film' : isResource() ? navIcons[current.collection] : 'clapperboard')}${escape(entry.mode?.toUpperCase() || labels[entry.collection])}</span><span class="card-version">${entry.ver ? `v${escape(entry.ver)}` : `${String(index + 1).padStart(2, '0')}`}</span></div><h2>${escape(entry.title)}</h2>${entry.status ? `<div class="card-meta"><span class="status ${escape(entry.status)}"><b></b>${escape(entry.status)}</span><span>${escape(entry.duration)}s</span><span>${escape(entry.ratio)}</span><span>${escape(entry.resolution)}</span></div><div class="card-tags">${(entry.tags || []).slice(0, 3).map(tag => `<span>#${escape(tag)}</span>`).join('')}${entry.tags?.length > 3 ? `<span>+${entry.tags.length - 3}</span>` : ''}</div>` : `<p class="resource-preview">${escape(entry.content.split('\n').filter(line => line.trim() && !line.startsWith('#'))[0]?.replace(/^> /, '') || '')}</p>`}<div class="card-bottom"><span>${escape(labels[entry.collection])}</span><span>${entry.date ? formatDate(entry.date) : 'Markdown'} ${icon('arrow-right')}</span></div></button>${entry.mode ? `<button class="card-bookmark icon-button ${favorites.includes(entry.slug) ? 'saved' : ''}" data-save="${escape(entry.slug)}" aria-label="${favorites.includes(entry.slug) ? 'Hapus dari tersimpan' : 'Simpan prompt'}" title="${favorites.includes(entry.slug) ? 'Hapus dari tersimpan' : 'Simpan prompt'}" aria-pressed="${favorites.includes(entry.slug)}">${icon('bookmark')}</button>` : ''}</article>`).join('') : `<div class="empty">${icon(current.collection === 'favorites' ? 'bookmark' : 'search')}<h3>${current.collection === 'favorites' && !current.query ? 'Belum ada prompt tersimpan' : 'Tidak ada hasil'}</h3><p>${current.collection === 'library' ? 'Prompt yang sudah matang akan muncul di sini.' : 'Coba kata kunci atau filter lain.'}</p><button class="text-button" data-action="reset">${icon('rotate-ccw')} Reset pencarian</button></div>`;
  document.querySelector('#list-footer').innerHTML = entries.length ? `<span class="small-line"></span> Akhir koleksi <span class="small-line"></span>` : '';
  document.querySelector('#content-layout').classList.toggle('show-detail', mobileDetail);
  renderDetail(item);
  document.querySelector('#updated').textContent = data.generated_at ? `Diperbarui ${formatDate(data.generated_at)}` : '';
  const dark = document.documentElement.dataset.theme === 'dark';
  const themeButton = document.querySelector('[data-action="theme"]');
  themeButton.innerHTML = icon(dark ? 'sun' : 'moon');
  themeButton.title = themeButton.ariaLabel = dark ? 'Gunakan tema terang' : 'Gunakan tema gelap';
  enhanceDropdowns();
  document.querySelector('#reset-filters').hidden = ![current.query, current.mode, current.status, current.tag].some(Boolean);
  paintIcons();
}
function formatDate(date) { return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }); }
function renderDetail(item) {
  const detail = document.querySelector('#detail');
  if (!item) { document.title = `${labels[state().collection] || 'Prompt Library'} | Eiken H3`; detail.innerHTML = `<div class="empty">${icon('file-text')}<h3>${params().has('prompt') ? 'Prompt tidak ditemukan' : 'Belum ada prompt dipilih'}</h3><p>Pilih prompt dari koleksi.</p></div>`; return; }
  const resource = !item.mode;
  const saved = favorites.includes(item.slug);
  document.title = `${item.title} | Eiken H3`;
  detail.innerHTML = `<div class="detail-toolbar"><button class="text-button mobile-back" data-action="back">${icon('arrow-left')} Kembali</button><span class="detail-label">${icon(resource ? 'book-open' : 'file-text')} ${resource ? labels[item.collection] : 'PROMPT DETAIL'}</span><div class="detail-actions">${!resource ? button('save-current', 'bookmark', saved ? 'Hapus dari tersimpan' : 'Simpan prompt', `aria-pressed="${saved}"`) : ''}${button('share', 'link', 'Salin tautan')}${button('download', 'download', 'Unduh Markdown')}<a class="icon-button" href="${escape(item.url)}" target="_blank" rel="noopener noreferrer" title="Buka di GitHub" aria-label="Buka di GitHub">${icon('github')}</a></div></div><div class="detail-heading"><div class="detail-eyebrow">${escape(item.mode?.toUpperCase() || labels[item.collection])}${item.type ? `<span>/</span>${escape(item.type.toUpperCase())}` : ''}${item.status ? `<span class="status ${escape(item.status)}"><b></b>${escape(item.status)}</span>` : ''}</div><h2>${escape(item.title)}</h2><div class="detail-subtitle">${escape(labels[item.collection])}${item.ver ? ` <span>/</span> Versi ${escape(item.ver)}` : ''}${item.date ? ` <span>/</span> ${formatDate(item.date)}` : ''}</div></div>${!resource ? `<dl class="parameters">${[['Durasi', `${item.duration ?? '-'}s`], ['Rasio', item.ratio], ['Resolusi', item.resolution], ['Steps', item.steps], ['Seed', item.seed ?? 'Random']].map(([name, value]) => `<div><dt>${name}</dt><dd>${escape(value ?? '-')}</dd></div>`).join('')}</dl>` : ''}<div class="detail-tabs" role="tablist" aria-label="Isi dokumen">${(resource ? ['prompt', 'raw'] : ['prompt', 'notes', 'raw']).map(name => `<button role="tab" id="tab-${name}" aria-controls="detail-body" aria-selected="${tab === name}" tabindex="${tab === name ? '0' : '-1'}" data-tab="${name}" class="${tab === name ? 'active' : ''}">${({ prompt: resource ? 'Dokumen' : 'Prompt', notes: 'Catatan', raw: 'Raw' })[name]}</button>`).join('')}<button class="copy-all" data-action="copy">${icon('copy')}<span>Salin ${tab === 'notes' ? 'catatan' : 'semua'}</span></button></div><div class="detail-body" id="detail-body" role="tabpanel" aria-labelledby="tab-${tab}" tabindex="0">${tab === 'notes' ? `<div class="markdown">${markdown(item.notes)}</div>` : tab === 'raw' ? `<pre class="raw-content">${escape(item.content)}</pre>` : resource ? `<div class="markdown">${markdown(item.content)}</div>` : promptSections(item.content).map((section, i) => `<section class="prompt-section"><div class="section-heading"><span class="section-number">${String(i + 1).padStart(2, '0')}</span><h3>${escape(section.name.replaceAll('_', ' '))}</h3>${button(`copy-section-${i}`, 'copy', `Salin ${escape(section.name)}`)}</div><pre>${escape(section.content.split(/\n{2,}/).map(paragraph => paragraph.replaceAll('\n', ' ')).join('\n\n'))}</pre></section>`).join('')}</div>${!resource ? `<div class="detail-tags">${(item.tags || []).map(tag => `<button data-tag="${escape(tag)}">#${escape(tag)}</button>`).join('')}</div>` : ''}`;
}

let toastTimeout;
function toast(message) { const node = document.querySelector('#toast'); node.textContent = message; node.classList.add('visible'); clearTimeout(toastTimeout); toastTimeout = setTimeout(() => node.classList.remove('visible'), 2600); }
async function copy(text) { try { await navigator.clipboard.writeText(text); toast('Berhasil disalin'); } catch { toast('Tidak dapat menyalin. Pilih teks lalu salin secara manual.'); } }
function save(slug) {
  favorites = favorites.includes(slug) ? favorites.filter(id => id !== slug) : [...favorites, slug];
  try { localStorage.setItem('eiken-favorites', JSON.stringify(favorites)); } catch { toast('Penyimpanan browser tidak tersedia.'); }
  render();
}
document.addEventListener('click', event => {
  const target = event.target.closest('button, a');
  if (!target) return;
  if (target.dataset.collection) { mobileDetail = false; tab = 'prompt'; update({ collection: target.dataset.collection === 'all' ? '' : target.dataset.collection, prompt: '', mode: '', status: '', tag: '', q: '' }); document.querySelector('#sidebar').classList.remove('open'); }
  if (target.hasAttribute('data-mode')) update({ mode: target.dataset.mode, prompt: '' });
  if (target.dataset.open) { mobileDetail = true; tab = 'prompt'; update({ prompt: target.dataset.open }); document.querySelector('#detail').scrollIntoView({ block: 'start', behavior: 'instant' }); }
  if (target.dataset.save) save(target.dataset.save);
  if (target.dataset.tab) { tab = target.dataset.tab; renderDetail(selected()); paintIcons(); document.querySelector(`#tab-${tab}`).focus(); }
  if (target.dataset.tag) update({ tag: target.dataset.tag, prompt: '' });
  const action = target.dataset.action;
  const item = selected();
  if (action === 'menu') { const open = document.querySelector('#sidebar').classList.toggle('open'); target.setAttribute('aria-expanded', open); }
  if (action === 'close-menu') { document.querySelector('#sidebar').classList.remove('open'); document.querySelector('[data-action="menu"]').setAttribute('aria-expanded', 'false'); }
  if (action === 'theme') { const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = theme; try { localStorage.setItem('eiken-theme', theme); } catch {} render(); }
  if (action === 'reset') update({ q: '', mode: '', status: '', tag: '', prompt: '' });
  if (action === 'back') { mobileDetail = false; update({ prompt: '' }); }
  if (action === 'save-current' && item) save(item.slug);
  if (action === 'copy' && item) copy(tab === 'notes' ? item.notes || '' : item.content);
  if (action?.startsWith('copy-section-') && item) copy(promptSections(item.content)[Number(action.split('-').at(-1))].content);
  if (action === 'share' && item) { const url = new URL(location.href); const hash = params(); hash.set('prompt', item.slug); url.hash = hash.toString(); copy(url.href); }
  if (action === 'download' && item) { const blob = new Blob([item.content], { type: 'text/markdown;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${item.slug}.md`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
});
document.querySelector('#search').addEventListener('input', event => { mobileDetail = false; update({ q: event.target.value, prompt: '' }, true); });
for (const key of ['status', 'tag', 'sort']) document.querySelector(`#${key}`).addEventListener('change', event => update({ [key]: event.target.value, prompt: '' }));
document.addEventListener('keydown', event => {
  if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) { event.preventDefault(); document.querySelector('#search').focus(); }
  if (event.key === 'Escape') { document.querySelector('#sidebar').classList.remove('open'); if (mobileDetail) { mobileDetail = false; update({ prompt: '' }); } }
  if (event.target.matches('[role="tab"]') && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
    event.preventDefault(); const tabs = [...document.querySelectorAll('[role="tab"]')]; const index = tabs.indexOf(event.target); tabs[event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length].click();
  }
});
window.addEventListener('hashchange', () => { tab = 'prompt'; mobileDetail = params().has('prompt'); render(); });
window.addEventListener('popstate', () => { tab = 'prompt'; mobileDetail = params().has('prompt'); render(); });
async function loadCatalog() {
try {
  const response = await fetch(`${import.meta.env.BASE_URL}index.json`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  data = await response.json();
  if (!Array.isArray(data.entries)) throw new Error('Invalid index');
  data.resources = (data.resources || []).filter(item => item.collection === 'guides');
  mobileDetail = params().has('prompt');
  render();
} catch (error) {
  document.querySelector('#list').innerHTML = `<div class="empty"><h3>Koleksi gagal dimuat</h3><p>Periksa koneksi lalu muat ulang halaman.</p><button class="text-button" onclick="location.reload()">Coba lagi</button></div>`;
  document.querySelector('#detail').innerHTML = '';
  console.error('Unable to load prompt index:', error);
}
}
loadCatalog();
