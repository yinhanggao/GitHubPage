const pasteArea = document.getElementById('paste-area');
const placeholder = document.getElementById('placeholder');
const preview = document.getElementById('preview');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const cancelBtn = document.getElementById('cancel-btn');
const filenameInput = document.getElementById('filename-input');
const filetypeSelect = document.getElementById('filetype-select');
let currentBlob = null, timer = null, cancelled = false;
function getCurrentTimestamp() { const now = new Date(); return now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0') + String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0'); }
filenameInput.value = getCurrentTimestamp();
function handleImageFile(file) {
    if (!file.type.startsWith('image/')) return;
    currentBlob = file;
    cancelled = false;
    const url = URL.createObjectURL(currentBlob);
    preview.src = url; preview.style.display = 'block'; placeholder.style.display = 'none';
    progressContainer.style.display = 'block'; progressBar.style.width = '0%';
    setTimeout(() => { progressBar.style.width = '100%'; }, 50);
    timer = setTimeout(() => {
        progressContainer.style.display = 'none';
        if (!cancelled) downloadImage();
    }, 1000);
}
function downloadImage() {
    if (!currentBlob) return;
    let filename = filenameInput.value || getCurrentTimestamp();
    const ext = filetypeSelect.value;
    filename = filename.replace(/\.[^/.]+$/, "") + "." + ext;
    const url = URL.createObjectURL(currentBlob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
    currentBlob = null; preview.style.display = 'none'; placeholder.style.display = 'block'; filenameInput.value = getCurrentTimestamp();
}
pasteArea.addEventListener('paste', e => { const items = e.clipboardData.items; for (const item of items) { handleImageFile(item.getAsFile()); return; } });
pasteArea.addEventListener('dragover', e => { e.preventDefault(); pasteArea.classList.add('hover'); });
pasteArea.addEventListener('dragleave', () => pasteArea.classList.remove('hover'));
pasteArea.addEventListener('drop', e => { e.preventDefault(); pasteArea.classList.remove('hover'); if (e.dataTransfer.files.length > 0) handleImageFile(e.dataTransfer.files[0]); });
cancelBtn.addEventListener('click', () => { cancelled = true; clearTimeout(timer); progressBar.style.width = '0%'; progressContainer.style.display = 'none'; });
