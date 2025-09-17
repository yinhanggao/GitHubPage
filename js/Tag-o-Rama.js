const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQj2YzRRSrSV4RK4ESvsTSkizgRNPYjFzZDxMTxn-PGzuhZXxc1y4fIi43geRHgBJPggusWccWucOd8/pub?gid=1848526499&single=true&output=csv';

fetch(csvUrl)
  .then(res => res.text())
  .then(data => {
    const rows = data.split('\n').slice(1);
    const container = document.getElementById('csvContainer');
    let lastCategory = '';

    rows.forEach(row => {
      if (!row.trim()) return;
      const cols = row.split(',');
      const category = cols[0].trim();
      const jp = cols[1].trim();
      const cn = cols[2].trim();
      const en = cols[3].trim();

      // 分類列
      if (category && category !== lastCategory) {
        lastCategory = category;
        const catP = document.createElement('p');
        catP.className = 'category';
        catP.textContent = category;
        container.appendChild(catP);
      }

      function createPill(text, cls) {
        const span = document.createElement('span');
        span.className = `pill ${cls}`;

        const top = document.createElement('div');
        top.className = 'top';

        const t = document.createElement('a');
        t.textContent = '@T';
        const i = document.createElement('a');
        i.textContent = '@I';
        const r = document.createElement('a');
        r.textContent = '@R';

        if (text) {
          t.href = `https://twitter.com/search?q=${encodeURIComponent(text)}`;
          t.target = '_blank';
          t.className = 'twitter';
          i.href = `https://www.instagram.com/explore/tags/${encodeURIComponent(text)}`;
          i.target = '_blank';
          i.className = 'instagram';
          r.href = `https://www.reddit.com/search/?q=${encodeURIComponent(text)}`;
          r.target = '_blank';
          r.className = 'reddit';
        } else {
          t.className = 'twitter no-label';
          i.className = 'instagram no-label';
          r.className = 'reddit no-label';
          t.href = i.href = r.href = 'javascript:void(0)';
        }

        top.appendChild(t);
        top.appendChild(i);
        top.appendChild(r);

        const bottom = document.createElement('div');
        bottom.className = 'bottom';
        bottom.textContent = text;

        span.appendChild(top);
        span.appendChild(bottom);
        return span;
      }

      const p = document.createElement('p');
      p.className = 'csv-row';
      p.appendChild(createPill(jp, 'jp'));
      p.appendChild(createPill(cn, 'cn'));
      p.appendChild(createPill(en, 'en'));

      container.appendChild(p);
    });
  })
  .catch(err => console.error('CSV 讀取錯誤:', err));