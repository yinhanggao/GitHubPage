
document.addEventListener("DOMContentLoaded", () => {
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQj2YzRRSrSV4RK4ESvsTSkizgRNPYjFzZDxMTxn-PGzuhZXxc1y4fIi43geRHgBJPggusWccWucOd8/pub?gid=1669167343&single=true&output=csv";
    const tbody = document.querySelector("#searchTable tbody");
    const selectAllCheckbox = document.getElementById("selectAllCheckbox");

    // 建立按鈕列函數
    function createBtnGroup(arr, defaultVal, symbol = "❤️") {
        const td = document.createElement("td");
        const group = document.createElement("div");
        group.className = "btn-group";
        group.dataset.value = defaultVal;

        arr.forEach(val => {
            const btn = document.createElement("button");
            if (val === "any") {
                btn.textContent = symbol;
                btn.dataset.val = "any";
            } else if (Array.isArray(val)) {
                btn.textContent = val[1] + val[0];
                btn.dataset.val = val[0];
            } else {
                btn.textContent = symbol + val;
                btn.dataset.val = val;
            }

            if (Array.isArray(val) && val[0] === defaultVal) btn.classList.add("selected");
            if (val === defaultVal) btn.classList.add("selected");
            btn.addEventListener("click", () => {
                group.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                group.dataset.value = btn.dataset.val;
            });

            group.appendChild(btn);
        });

        td.appendChild(group);
        return td;
    }

    // 讀取資料
    fetch(sheetURL).then(res => res.text()).then(data => {
        const lines = data.split('\n').map(l => l.trim()).filter(Boolean);

        lines.forEach(keyword => {
            const tr = document.createElement("tr");

            // 核取框
            const tdCheck = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = true;
            tdCheck.appendChild(checkbox);
            tr.appendChild(tdCheck);

            // 關鍵字
            const tdKeyword = document.createElement("td");
            // 去掉括號和 AND/OR，但保留 #
            const cleanKeyword = keyword
                .replace(/\(|\)/g, "")        // 去掉括號
                .replace(/\bAND\b|\bOR\b/g, "") // 去掉 AND 和 OR
                .replace(/\s+/g, " ")          // 多空格合併
                .trim();

            tdKeyword.textContent = cleanKeyword;
            tr.appendChild(tdKeyword);
            // 愛心數
            tr.appendChild(createBtnGroup(["any", 10, 100], 10, "❤️"));

            // 日期
            tr.appendChild(createBtnGroup(["any", 1, 7, 30], 7, "📅"));

            // 排序
            tr.appendChild(createBtnGroup([["live", "✨"], ["top", "🔥"]], "live", ""));

            // 單列搜尋
            const tdLink = document.createElement("td");
            const linkBtn = document.createElement("button");
            linkBtn.textContent = "🔗";
            linkBtn.addEventListener("click", () => {
                const faves = tr.cells[2].querySelector(".btn-group").dataset.value;
                const days = tr.cells[3].querySelector(".btn-group").dataset.value;
                const sort = tr.cells[4].querySelector(".btn-group").dataset.value;
                const today = new Date();
                const until = today.toISOString().split("T")[0];
                let sinceDate = "";
                if (days !== "any") {
                    sinceDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
                }
                let query = keyword;
                if (faves !== "any") query += " min_faves:" + faves;
                let url = `https://x.com/search?q=${encodeURIComponent(query)}`;
                if (sinceDate) url += `%20since%3A${sinceDate}%20until%3A${until}`;
                url += `&src=typed_query&f=${sort}`;
                window.open(url, "_blank");
            });
            tdLink.appendChild(linkBtn);
            tr.appendChild(tdLink);

            tbody.appendChild(tr);
        });
    });

    // 表頭核取框控制所有列
    selectAllCheckbox.addEventListener("change", () => {
        const checked = selectAllCheckbox.checked;
        document.querySelectorAll("#searchTable tbody tr").forEach(tr => {
            tr.querySelector("input[type=checkbox]").checked = checked;
        });
    });

    // 表頭愛心、日期、排序控制整欄
    function setupHeaderControl(headerId, colIndex) {
        const header = document.getElementById(headerId);
        header.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", () => {
                header.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                const val = btn.dataset.val;
                document.querySelectorAll(`#searchTable tbody tr`).forEach(tr => {
                    const g = tr.cells[colIndex].querySelector(".btn-group");
                    g.dataset.value = val;
                    g.querySelectorAll("button").forEach(b => {
                        b.classList.remove("selected");
                        if (b.dataset.val === val) b.classList.add("selected");
                    });
                });
            });
        });
    }

    setupHeaderControl("favesHeader", 2);
    setupHeaderControl("daysHeader", 3);
    setupHeaderControl("sortHeader", 4);

    // 🌐 開啟已選搜尋
    document.getElementById("openSelected").addEventListener("click", () => {
        document.querySelectorAll("#searchTable tbody tr").forEach(tr => {
            const cb = tr.querySelector("input[type=checkbox]");
            if (cb.checked) {
                const keyword = tr.cells[1].textContent;
                const faves = tr.cells[2].querySelector(".btn-group").dataset.value;
                const days = tr.cells[3].querySelector(".btn-group").dataset.value;
                const sort = tr.cells[4].querySelector(".btn-group").dataset.value;
                const today = new Date();
                const until = today.toISOString().split("T")[0];
                let sinceDate = "";
                if (days !== "any") {
                    sinceDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
                }
                let query = keyword;
                if (faves !== "any") query += " min_faves:" + faves;
                let url = `https://x.com/search?q=${encodeURIComponent(query)}`;
                if (sinceDate) url += `%20since%3A${sinceDate}%20until%3A${until}`;
                url += `&src=typed_query&f=${sort}`;
                window.open(url, "_blank");
            }
        });
    });

});