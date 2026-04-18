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


// ---- Hero Canvas（オーロラ背景） ----
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const orbs = [
    { x: 0.2, y: 0.3, r: 0.45, h: 260, speed: 0.0004 },
    { x: 0.7, y: 0.6, r: 0.40, h: 200, speed: 0.0003 },
    { x: 0.5, y: 0.8, r: 0.35, h: 310, speed: 0.0005 },
    { x: 0.85, y: 0.2, r: 0.30, h: 170, speed: 0.0004 },
  ];

  let t = 0;

  function draw() {
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, W, H);

    orbs.forEach((orb, i) => {
      const x = (orb.x + Math.sin(t * orb.speed * 1000 + i) * 0.12) * W;
      const y = (orb.y + Math.cos(t * orb.speed * 800 + i) * 0.10) * H;
      const r = orb.r * Math.min(W, H);
      const hue = (orb.h + t * 0.015) % 360;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `hsla(${hue}, 80%, 65%, 0.18)`);
      grad.addColorStop(0.5, `hsla(${hue + 30}, 70%, 55%, 0.08)`);
      grad.addColorStop(1, `hsla(${hue + 60}, 60%, 45%, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });

    // 薄いスキャンライン
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    for (let y = 0; y < H; y += 4) {
      ctx.fillRect(0, y, W, 1);
    }

    t += 16;
    requestAnimationFrame(draw);
  }
  draw();
}

// ---- Hero usecase loop ----
function initUsecaseLoop() {
  const el = document.querySelector(".usecase-text");
  if (!el) return;

  const cases = [
    { text: "App Launch に。",        color: "#22d3ee" },
    { text: "Game Start に。",        color: "#a78bfa" },
    { text: "Portfolio の冒頭に。",   color: "#f472b6" },
    { text: "Web サイトの入口に。",   color: "#34d399" },
  ];

  let ci = 0, ti = 0, deleting = false;
  const TYPE_SPEED = 60, DELETE_SPEED = 30, PAUSE = 1800;

  function tick() {
    const current = cases[ci];
    el.style.color = current.color;
    el.style.textShadow = `0 0 20px ${current.color}88`;
    if (!deleting) {
      el.textContent = current.text.slice(0, ++ti);
      if (ti === current.text.length) {
        deleting = true;
        setTimeout(tick, PAUSE);
        return;
      }
    } else {
      el.textContent = current.text.slice(0, --ti);
      if (ti === 0) {
        deleting = false;
        ci = (ci + 1) % cases.length;
      }
    }
    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
  }

  setTimeout(tick, 1400);
}

document.addEventListener("DOMContentLoaded", () => {
  initHeroCanvas();
  initUsecaseLoop();
});
