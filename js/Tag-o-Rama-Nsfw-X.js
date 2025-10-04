const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQj2YzRRSrSV4RK4ESvsTSkizgRNPYjFzZDxMTxn-PGzuhZXxc1y4fIi43geRHgBJPggusWccWucOd8/pub?gid=12707701&single=true&output=csv';

fetch(csvUrl)
    .then(res => res.text())
    .then(data => {
        const container = document.getElementById('csvContainer');

        const rows = data.split('\n').map(r => r.trim());

        rows.forEach(row => {
            const cells = row.split(/\t|,/).map(s => s.trim());

            if (cells.length === 0) return;

            // 將每列資料拆成每 3 個為一組
            for (let i = 0; i < cells.length; i += 3) {
                const chunk = cells.slice(i, i + 3);

                // 判斷這 3 個欄位是否全空，如果全空就跳過
                if (chunk.every(text => text === '')) return;

                const p = document.createElement('p');
                p.className = 'csv-row';

                chunk.forEach((text, idx) => {
                    const span = document.createElement('span');

                    // 分配 jp/cn/en 樣式
                    let cls;
                    if (idx === 0) cls = 'jp';
                    else if (idx === 1) cls = 'cn';
                    else cls = 'en';

                    span.className = `pill ${cls}`;

                    const top = document.createElement('div');
                    top.className = 'top';
                    const a = document.createElement('a');
                    a.textContent = '@T';
                    a.href = text ? `https://twitter.com/search?q=${encodeURIComponent(text)}` : 'javascript:void(0)';
                    a.target = '_blank';
                    a.className = text ? 'twitter' : 'twitter no-label';
                    top.appendChild(a);

                    const bottom = document.createElement('div');
                    bottom.className = 'bottom';
                    bottom.textContent = text || ''; // 空欄位也顯示空字串

                    span.append(top, bottom);
                    p.appendChild(span);
                });

                container.appendChild(p);
            }
        });
    })
    .catch(err => console.error('CSV 讀取錯誤:', err));
