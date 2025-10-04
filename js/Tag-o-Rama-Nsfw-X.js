const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQj2YzRRSrSV4RK4ESvsTSkizgRNPYjFzZDxMTxn-PGzuhZXxc1y4fIi43geRHgBJPggusWccWucOd8/pub?gid=12707701&single=true&output=csv';

fetch(csvUrl)
    .then(res => res.text())
    .then(data => {
        const rows = data.split('\n').map(r => r.trim()).filter(r => r);
        const container = document.getElementById('csvContainer');

        for (let i = 0; i < rows.length; i += 3) {
            const jp = rows[i] || '';
            const cn = rows[i + 1] || '';
            const en = rows[i + 2] || '';

            function createPill(text, cls) {
                const span = document.createElement('span');
                span.className = `pill ${cls}`;
                const top = document.createElement('div');
                top.className = 'top';

                const t = document.createElement('a'); // 只保留 Twitter
                t.textContent = '@T';

                if (text) {
                    t.href = `https://twitter.com/search?q=${encodeURIComponent(text)}`;
                    t.target = '_blank';
                    t.className = 'twitter';
                } else {
                    t.href = 'javascript:void(0)';
                    t.className = 'twitter no-label';
                }

                top.appendChild(t);

                const bottom = document.createElement('div');
                bottom.className = 'bottom';
                bottom.textContent = text;

                span.append(top, bottom);
                return span;
            }

            const p = document.createElement('p');
            p.className = 'csv-row';
            p.append(
                createPill(jp, 'jp'),
                createPill(cn, 'cn'),
                createPill(en, 'en')
            );

            container.appendChild(p);
        }
    })
    .catch(err => console.error('CSV 讀取錯誤:', err));
