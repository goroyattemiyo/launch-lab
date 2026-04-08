const PREVIEW_MAP = {
  "glass-entry":   "glass-entry.html",
  "start-orbit":   "start-orbit.html",
  "candy-pop":     "candy-pop.html",
  "moon-gate":     "moon-gate.html",
  "signal-rise":   "signal-rise.html",
  "glow-pulse":    "glow-pulse.html",
  "neon-drift":    "neon-drift.html",
  "paper-lantern": "paper-lantern.html",
  "velvet-shine":  "velvet-shine.html",
  "soft-bloom":    "soft-bloom.html",
};

// works.jsonのtitleからファイル名に変換
function titleToKey(title) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

async function loadWorks() {
  const grid = document.getElementById("works-grid");
  if (!grid) return;

  try {
    const response = await fetch("./data/works.json");
    const works = await response.json();

    grid.innerHTML = works
      .map((work) => {
        const key = titleToKey(work.title);
        const previewFile = PREVIEW_MAP[key] || null;
        const previewSrc = previewFile ? `./previews/${previewFile}` : null;

        return `
          <article class="works-card" data-key="${escapeHtml(key)}" data-title="${escapeHtml(work.title)}">
            <div class="works-thumb">
              ${previewSrc
                ? `<iframe
                    class="thumb-iframe"
                    src="${escapeHtml(previewSrc)}"
                    scrolling="no"
                    tabindex="-1"
                    aria-hidden="true"
                    loading="lazy"
                  ></iframe>`
                : `<span class="thumb-fallback">${escapeHtml(work.preview || "●")}</span>`
              }
              <div class="thumb-overlay"></div>
            </div>

            <h3>${escapeHtml(work.title)}</h3>
            <p>${escapeHtml(work.subtitle)}</p>

            <div class="badge-list">
              ${work.tags.map((tag) => `<span class="badge">${escapeHtml(tag)}</span>`).join("")}
            </div>

            <div class="works-meta">
              <span>難易度</span>
              <strong>${escapeHtml(work.difficulty)}</strong>
            </div>

            <button class="btn btn-primary open-modal-btn" data-src="${escapeHtml(previewSrc || "")}">
              プレビューを見る
            </button>
          </article>
        `;
      })
      .join("");

    // モーダルを開くイベント
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".open-modal-btn");
      if (!btn) return;
      const src = btn.dataset.src;
      if (src) openModal(src);
    });

  } catch (error) {
    console.error("works.json の読み込みに失敗しました", error);
    grid.innerHTML = `
      <article class="works-card">
        <h3>作品データを読み込めませんでした</h3>
        <p>web/data/works.json の配置と内容を確認してください。</p>
      </article>
    `;
  }
}

// ---- モーダル ----

function buildModal() {
  if (document.getElementById("preview-modal")) return;

  const modal = document.createElement("div");
  modal.id = "preview-modal";
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-window">
      <button class="modal-close" aria-label="閉じる">✕</button>
      <iframe id="modal-iframe" src="" allowfullscreen></iframe>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
  modal.querySelector(".modal-close").addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function openModal(src) {
  buildModal();
  const modal = document.getElementById("preview-modal");
  const iframe = document.getElementById("modal-iframe");
  iframe.src = src;
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("preview-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
  // iframeをリセット（アニメを止める）
  setTimeout(() => {
    const iframe = document.getElementById("modal-iframe");
    if (iframe) iframe.src = "";
  }, 300);
}

// ---- ユーティリティ ----

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", loadWorks);
