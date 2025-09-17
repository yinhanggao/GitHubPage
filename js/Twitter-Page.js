const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQj2YzRRSrSV4RK4ESvsTSkizgRNPYjFzZDxMTxn-PGzuhZXxc1y4fIi43geRHgBJPggusWccWucOd8/pub?gid=286341113&single=true&output=csv';
async function fetchTweetUrls() {
    const res = await fetch(csvUrl);
    const text = await res.text();
    const lines = text.split('\n').filter(l => l.trim() !== '');
    return lines.slice(1).map(line => line.split(',')[0].trim());
}
function embedTweetById(tweetId, container) {
    const div = document.createElement('div');
    container.appendChild(div);
    twttr.widgets.createTweet(tweetId, div, { align: 'center' }).catch(err => console.error('Embed failed:', tweetId, err));
}
async function init() {
    const container = document.getElementById('tweet-container');
    const urls = await fetchTweetUrls();
    urls.forEach(url => {
        const parts = url.split("/status/");
        if (parts.length >= 2) {
            const tweetId = parts[1].split(/[?]/)[0];
            embedTweetById(tweetId, container);
        } else console.warn("網址格式錯誤，無法拆出 Tweet ID:", url);
    });
}
window.addEventListener('load', () => { if (window.twttr) init(); else console.error('Twitter widgets.js 尚未載入'); });
