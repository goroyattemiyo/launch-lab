async function loadWorks() {
  const grid = document.getElementById("works-grid");
  if (!grid) return;

  try {
    const response = await fetch("./data/works.json");
    const works = await response.json();

    grid.innerHTML = works
      .map(
        (work) => `
          <article class="works-card">
            <div class="works-thumb thumb-${escapeHtml(work.preview || "pulse")}">
              <span class="thumb-center"></span>
              <span class="thumb-accent"></span>
            </div>

            <h3>${escapeHtml(work.title)}</h3>
            <p>${escapeHtml(work.subtitle)}</p>

            <div class="badge-list">
              ${work.tags
                .map((tag) => `<span class="badge">${escapeHtml(tag)}</span>`)
                .join("")}
            </div>

            <div class="works-meta">
              <span>難易度</span>
              <strong>${escapeHtml(work.difficulty)}</strong>
            </div>

            <a href="#" class="btn btn-primary">詳細を見る</a>
          </article>
        `
      )
      .join("");
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", loadWorks);
