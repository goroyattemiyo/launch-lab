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
        const previewSrc = `./previews/${key}.html`;
        const category = work.category || "minimal";

        return `
          <article class="works-card" data-key="${escapeHtml(key)}" data-category="${escapeHtml(category)}" data-src="${escapeHtml(previewSrc)}">
            <div class="works-thumb">
              <iframe
                class="thumb-iframe"
                src=""
                scrolling="no"
                tabindex="-1"
                aria-hidden="true"
                style="pointer-events:none;"
              ></iframe>
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
            <button class="btn btn-primary open-modal-btn" data-src="${escapeHtml(previewSrc)}">
              プレビューを見る
            </button>
          </article>
        `;
      })
      .join("");

    initTabs();
    initHoverLoad();
    initBrowsePills(); // ← Browseピル連動

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

// ---- ホバーで再生、離したら停止 ----
function initHoverLoad() {
  document.querySelectorAll(".works-card").forEach((card) => {
    const iframe = card.querySelector(".thumb-iframe");
    if (!iframe) return;

    card.addEventListener("mouseenter", () => {
      iframe.src = card.dataset.src;
    });

    card.addEventListener("mouseleave", () => {
      iframe.src = "";
    });
  });
}

// ---- タブ ----
function initTabs() {
  const tabs = document.querySelectorAll(".works-tab");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      filterByCategory(tab.dataset.category);
    });
  });
}

function filterByCategory(key) {
  document.querySelectorAll(".works-card").forEach((card) => {
    const match = key === "all" || card.dataset.category === key;
    card.classList.toggle("is-hidden", !match);
    if (!match) {
      const iframe = card.querySelector(".thumb-iframe");
      if (iframe) iframe.src = "";
    }
  });
}

// ---- Browseピル → worksタブ連動 ----
// ピルクリック → 対応カテゴリのタブをアクティブにして #works へスクロール
function initBrowsePills() {
  document.querySelectorAll(".pill[data-works-category]").forEach((pill) => {
    pill.addEventListener("click", () => {
      const category = pill.dataset.worksCategory;

      // 対応するタブを探してクリック相当の処理を実行
      const tabs = document.querySelectorAll(".works-tab");
      tabs.forEach((t) => t.classList.remove("is-active"));

      const targetTab = [...tabs].find((t) => t.dataset.category === category);
      if (targetTab) {
        targetTab.classList.add("is-active");
      }
      filterByCategory(category);

      // #works セクションへスクロール
      const worksSection = document.getElementById("works");
      if (worksSection) {
        worksSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
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