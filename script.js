const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQj2YzRRSrSV4RK4ESvsTSkizgRNPYjFzZDxMTxn-PGzuhZXxc1y4fIi43geRHgBJPggusWccWucOd8/pub?gid=1848526499&single=true&output=csv';

const twitterIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAAA/0lEQVR4AbXPIazCMACE4d+L2qoZFEGSIGcRc/gJJB5XMzGJmK9EN0HMi+qaibkKVF1txdQe4g0YzPK5yyWXHL9TaPNQ89LojH87N1rbJcXkMF4Fk31UMrf34hm14KUeoQxGArALHTMuQD2cAWQfJXOpgTbksGr9ng8qluShJTPhyCdx63POg7rEim95ZyR68I1ggQpnCEGwyPicw6hZtPEGmnhkycqOio1zm6XuFtyw5XDXfGvuau0dXHzJp8pfBPuhIXO9ZK5ILUCdSvLYMpc6ASBtl3EaC97I4KaFaOCaBE9Zn5jUsVqR2vcTJZO1DdbGoZryVp94Ka/mQfE7f2T3df0WBhLDAAAAAElFTkSuQmCC";
const igIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAABOFBMVEVHcExxF/13F/1zFf2AFv2MCu+iBOmyAuLEAd7SANraBMzwHpedI+XeANfmANHmAr+PF/6fD/vxAL7qArV7GP21FvnRVurnZ+P2Z9roQeDzGtXzB8v7AqvWiPn+7fn////7ftv/A7z0BKH3v/H+3fT+ruj+AJr/9/r/RcD/bMDKFff/Bo3iG+r8GrX/AIH+H5r/yeP+BHj/t9n/V5r+Am7+H37+BGT/ssX/Imz/RXv/ucz+e4z+JFT/XI3/MGL+LUf/u7f/yc7/Alr+OUf+MSz+QzT+R0T+iHD+SRj+VzH+WQX+AkL+c2L/0sT+aCX+cBL/7+j+aQL+eRv/oUX/fwL+iBD/wXz+jgD/3rr/1rn+dgz+nAP9FpT+lw7+qgH+tQD+vQD/w1f9kwf/xAD9PFn9ogj/ywD9uAfgLZLBAAAAaHRSTlMAW9H+////////xEsC///N////zFz/////////////////uP////7///////////7////////////////////////////////////////////////////////F/7VQ///+/87/vsj/uqL0GQwAAAHcSURBVHgBRMlFehwxEEDhV1VS04yZ7U04m+AmcBjfLLscJ4xLHyA0YGqSlJ7P9MT6BRC52EEQuDjlFITx2eWvXJsDQWYIKgJj4VQW5gBJAg75K5vTgZDTFUEu/kUEzqGaiC6DMBbhpqQyoyKTNYD1Hp+Ui6J0ZH1HhXNA0RfzyRIZl5WprroK3BZwwvx0aUGdB87HCIN5VBUVP9i468ZLxWLv+pg6vJmDaSiSW2eyIRNg84/HxfVJmTD3DxFWGmWjrosRpxMNGr3iIqYbG7IGK5lKvZE3jVuTynsDzHRoD3xpxaTQvIKumGBWgCouM9bPKEisJg0VTV4X0aBqQEuXQ2kGlmVmZCtgCoxBJfeAz0b8NQbWI7wOAKCZMgbn9E6tItG1HFTKRQ4jgSYpiiPu6BFJW1fW9J7oDFWWgpf0MH09YnB6yIEYnIJhLhqkpw3aC4OuUJ4QlDzX55/Um5m4Ue6dmXr59LwkBM0xy/ieVNV7zSSTZMU3fs8UNBomr+v3jQx5X1XmB7tdgnNu1JqDl+0nbnp+HpLp+WM5bB0mIMJFc/ouSgjd+U99O1qYONOhFEMonPcZCZ6eGp9eRcSwhWkSRCIxKnfeIMBh1WRcFOhTaENo/096OTA7AACDzKODDThakgAAAABJRU5ErkJggg==";
const redditIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAllBMVEVHcEz/RQD/RQD/RQD/RQD/RQD/RQD/RQD/RQD/RQD/RQD/RQD/RgD/RQD+////RQD/PAD/NQD+QgDP3+fb6e7n8PLx9vcKEhX0/f/L1tz+jXL718/+XCr4+vv0e1/olIP6pJDi3N3PqqbfNAn7cU//VgP+9vQyODv1bEb+49rdzc3/v66xu77IXlHlXDhqcHKsLABrLBlRGkQ3AAAADnRSTlMAwkSK1tA47GYdh31HPrF7ujQAAAF5SURBVCiRbZOHcoMwDIahyYUkbW3Z2GbvlT3e/+UqQSCkiY4D5A9bvwaWNdpqYTucO/ZiZf23NYLRnPUL2iyfiEvJl5sn+5khLuJacP41sq85gyNje5joZs7kLWCMhUiHk+fxKu9+YswnuOx1zvd5FZRKHYAc0jzlIAFudwCoU9RLGWHuJEIIABHnx7I85jE6eOHyylqg+DCKwnDPHrYPycd0tpbNIWcfLAduU8hPjDEKymXs07spi2GxKA09/FhyCwNrkzB2FruEFpMqPtO3GgEeC5lKmK4aGRGMRFNplqgM8Fgb1eZ+4l8a3hJseXNBN0e1NqUid9oYE7VDzDYyiTE7San0RSi0Nv6p6zyv606+0boYikC5QOoqpZXXm9JaqRT68vWFh8x1XRVcPe8aKHzN4FH4vmUiDdwgwP10D1JUM7RsaDbw7FDgHrc4ZLzv2GOMfof5gLhO0zoG6Bs2DtH3NHYgh1a+s5lNo7l+Q7OhfoWOvX3+Dn+Ini8glo+XBwAAAABJRU5ErkJggg==";

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

      const displayCategory = category && category !== lastCategory ? category : '';
      if (displayCategory) lastCategory = category;

      function createCell(text) {
        if (!text) return '';
        return `
          <span class="cell-content">
            <a href="https://twitter.com/search?q=%23${encodeURIComponent(text)}" target="_blank">
              <img class="button-icon" src="${twitterIcon}" alt="Twitter">
            </a>
            <a href="https://www.instagram.com/explore/tags/${encodeURIComponent(text)}" target="_blank">
              <img class="button-icon" src="${igIcon}" alt="Instagram">
            </a>
            <a href="https://www.reddit.com/search/?q=${encodeURIComponent(text)}" target="_blank">
              <img class="button-icon" src="${redditIcon}" alt="Reddit">
            </a>
            <span class="tag-text">${text}</span>
          </span>
        `;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${displayCategory}</td>
        <td>${createCell(jp)}</td>
        <td>${createCell(cn)}</td>
        <td>${createCell(en)}</td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(err => console.error('讀取 CSV 錯誤:', err));
