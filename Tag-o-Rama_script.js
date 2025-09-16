const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQj2YzRRSrSV4RK4ESvsTSkizgRNPYjFzZDxMTxn-PGzuhZXxc1y4fIi43geRHgBJPggusWccWucOd8/pub?gid=1848526499&single=true&output=csv';

const twitterIcon = "images/twitter.png";
const igIcon = "images/instagram.png";
const redditIcon = "images/reddit.png";

fetch(csvUrl)
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1);
    const tbody = document.querySelector('#csvTable tbody');
    let lastCategory = '';

    rows.forEach(row => {
      if (!row.trim()) return;
      const cols = row.split(',');
      const category = cols[0].trim();
      const jp = cols[1].trim();
      const cn = cols[2].trim();
      const en = cols[3].trim();

      // 新分類 → 插入分類列
      if (category && category !== lastCategory) {
        lastCategory = category;
        const catRow = document.createElement('tr');
        catRow.innerHTML = `<td colspan="3" class="category-row">${category}</td>`;
        tbody.appendChild(catRow);
      }

      // 建立垂直 pill，按鈕靠左，文字靠右
      function createCell(text) {
        if (!text) return '';
        return `
          <span class="cell-content">
            <div class="button-row">
              <a href="https://twitter.com/search?q=${encodeURIComponent(text)}" target="_blank">
                <img class="button-icon" src="${twitterIcon}" alt="Twitter">
              </a>
              <a href="https://www.instagram.com/explore/tags/${encodeURIComponent(text)}" target="_blank">
                <img class="button-icon" src="${igIcon}" alt="Instagram">
              </a>
              <a href="https://www.reddit.com/search/?q=${encodeURIComponent(text)}" target="_blank">
                <img class="button-icon" src="${redditIcon}" alt="Reddit">
              </a>
            </div>
            <span class="tag-text">${text}</span>
          </span>
        `;
      }

      // 插入一列三欄
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${createCell(jp)}</td>
        <td>${createCell(cn)}</td>
        <td>${createCell(en)}</td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(err => console.error('讀取 CSV 錯誤:', err));
