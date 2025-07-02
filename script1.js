/**
 * @typedef {{ error: number, title: string, progress?: number, progressURL?: string, downloadURL?: string, convertURL?: string, redirect?: number, redirectURL?: string }} ApiResponse
 */

const STATES = ["checking video", "extracting video", "converting video"];
let isDownloading = false;

/** @param {string} tag */
function injectScript(tagSrc) {
  const script = document.createElement("script");
  script.src = atob(tagSrc);
  script.async = true;
  script.dataset.cfasync = "false";
  document.body.appendChild(script);
}

/** @param {string} binStr */
function decodeBinary(binStr) {
  return binStr
    .split(" ")
    .map(b => parseInt(b, 2))
    .map(code => String.fromCharCode(code))
    .join("");
}

/** @param {string} hexString */
function decodeHex(hexString) {
  const matches = hexString.match(/0x[a-fA-F0-9]{2}/g);
  return matches
    ? matches.map(h => String.fromCharCode(Number(h))).join("")
    : "";
}

// Example gC structure with d()
const gC = {
  gTJ: [1, 9, 3],
  GVU: ["11100 …", "UHh…"],
  whD: [0, 0, 24, 2],
  qVn: ["Z1RK","R1ZV","d2hE"],
  d(index) {
    const key = atob(this.qVn[index]);
    return this[key];
  }
};

/** Generate auth key */
function getAuthKey() {
  const binArr = decodeBinary(gC.d(1)[0]).split("");
  let t = "";
  const residue = gC.d(2)[0] > 0;
  const str1 = residue
    ? atob(gC.d(1)[1]).split("").reverse().join("")
    : atob(gC.d(1)[1]);
  binArr.forEach((_, i) => {
    const idx = binArr[i] - gC.d(2)[1];
    t += str1[idx];
  });

  if (gC.d(2)[2] > 0) t = t.substring(0, gC.d(2)[2]);
  const suffix = decodeHex(window.sK);

  switch (gC.d(2)[3]) {
    case 0: return btoa(`${t}_${suffix}`);
    case 1: return btoa(`${t.toLowerCase()}_${suffix}`);
    case 2: return btoa(`${t.toUpperCase()}_${suffix}`);
    default: return "";
  }
}

/** @param {string} url @param {string} verb @param {string} fmt */
async function requestConvert(url, verb = "GET", fmt) {
  const res = await fetch(url, { method: verb, headers: {
    "x-auth-key": decodeHex(window.sH)
  }});
  if (!res.ok) {
    if (res.status === 429) throw { type: "rate", code: 3 };
    if (res.status === 403) throw { type: "unauth", code: 2 };
    throw { type: "network", code: res.status };
  }
  return res.json();
}

/** Update UI spinner text */
function updateProgressText(step) {
  const span = document.querySelector("#progress span");
  if (span) span.textContent = STATES[step] || "";
}

/**
 * @param {string} downloadURL
 * @param {string} vidId
 * @param {string} fmt
 * @param {string} [title]
 */
function finalizeDownload(downloadURL, vidId, fmt, title) {
  if (title) {
    document.querySelector("form > .form-group").textContent = title;
  }

  const div2 = document.querySelector("form > .form-actions");
  div2.innerHTML = "";

  const downloadBtn = document.createElement("button");
  downloadBtn.textContent = "Download";
  downloadBtn.type = "button";
  downloadBtn.addEventListener("click", () => {
    if (!isDownloading) {
      isDownloading = true;
      window.open(downloadURL + "&s=2&v=" + vidId + "&f=" + fmt + "&_=" + Math.random());
    }
  });

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.type = "button";
  nextBtn.addEventListener("click", () => {
    window.location.href = "/";
  });

  div2.append(downloadBtn, nextBtn);

  const appBtn = createAppButton();
  if (appBtn) div2.appendChild(appBtn);

  document.getElementById("progress").textContent = "Conversion complete";
}

/** Format error display */
function showError(msg) {
  const grp = document.querySelectorAll("form > .form-group")[0];
  grp.textContent = "Error: " + msg;

  const progressDiv = document.getElementById("progress");
  if (progressDiv) {
    progressDiv.textContent = "ERROR";
  }

  const actions = document.querySelector(".form-actions");
  actions.innerHTML = "";
  const backBtn = document.createElement("button");
  backBtn.textContent = "Back";
  backBtn.type = "button";
  backBtn.addEventListener("click", () => {
    window.location.reload();
  });
  actions.appendChild(backBtn);
}

/** Activate app promotion button if applicable */
function createAppButton() {
  if (!/android|ipad|iphone|mobile/i.test(navigator.userAgent)) {
    const btn = document.createElement("button");
    btn.textContent = "Get ByClickDownloader";
    btn.type = "button";
    btn.addEventListener("click", () => {
      window.open(atob("aHR0cHM6Ly9lY29lLmNjL2Qv"));
    });
    return btn;
  }
  return null;
}

/** Start the full conversion */
async function startConversion(videoId, format) {
  try {
    injectScript("aHR0cHM6Ly9zdGF1cHNvYWtzeS5uZXQvYWN0L2ZpbGVzL3RhZy5taW4uanM/ej05NDU0MTIx");

    document.getElementById("progress").innerHTML = `<span>initializing</span><div id="icon"></div>`;
    document.querySelector(".form-actions").innerHTML = "";

    const initUrl = `https://d.${window.gB}.cc/api/v1/init?${decodeHex(window.sP)}=${getAuthKey()}`;
    const initRes = await requestConvert(initUrl, "GET");

    if (initRes.error) throw { type: "api-init", code: initRes.error };

    document.getElementById("progress").querySelector("span").textContent = STATES[0];
    const convUrl = initRes.convertURL;
    handleConvert(convUrl, videoId, format);
  } catch (err) {
    showError(err.type || "Unknown error");
  }
}

/** Control conversion flow */
async function handleConvert(url, videoId, format) {
  try {
    const res = await requestConvert(`${url}&v=${videoId}&f=${format}`, "GET");

    if (res.error) throw { type: "api-conv", code: res.error };
    if (res.redirect) {
      return handleConvert(res.redirectURL, videoId, format);
    }

    if (res.progressURL) {
      return trackProgress(res.progressURL, res.downloadURL, videoId, format);
    }

    if (res.downloadURL) {
      return finalizeDownload(res.downloadURL, videoId, format, res.title);
    }
  } catch (err) {
    if (err.type === "rate") {
      showError("Rate limited (try again later)");
    } else {
      showError("Conversion failed");
    }
  }
}

/** Poll for progress updates */
async function trackProgress(progressUrl, downloadUrl, videoId, format, step = 0) {
  updateProgressText(step);

  try {
    const res = await requestConvert(`${progressUrl}&_=${Math.random()}`, "GET");

    if (res.error) throw { type: "api-progress", code: res.error };

    if (res.progress > step) {
      step = res.progress;
      updateProgressText(step);
    }

    if (res.progress < 3) {
      return setTimeout(() => {
        trackProgress(progressUrl, downloadUrl, videoId, format, step);
      }, 3000);
    } else {
      return finalizeDownload(downloadUrl, videoId, format, res.title);
    }
  } catch (err) {
    showError("Progress check failed");
  }
}

/** Entry point on form submit */
document.addEventListener("DOMContentLoaded", () => {
  const formatBtns = document.querySelectorAll(".format-btn");
  let selectedFmt = "mp3";

  formatBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      formatBtns.forEach(b => b.removeAttribute("id"));
      btn.id = "selected";
      selectedFmt = btn.textContent.toLowerCase();
    });
  });

  document.forms[0].addEventListener("submit", e => {
    e.preventDefault();

    const input = document.getElementById("v").value.trim();
    const match = input.match(/([a-zA-Z0-9_-]{11})/);
    if (!match) return showError("Invalid YouTube URL");

    startConversion(match[1], selectedFmt);
  });

  // Auto-convert from URL hash (#VIDEOID/FORMAT)
  if (location.hash.includes("/")) {
    const [vid, fmt] = location.hash.slice(1).split("/");
    if (/^[a-zA-Z0-9_-]{11}$/.test(vid) && /^mp[34]$/.test(fmt)) {
      document.getElementById("v").value = `https://www.youtube.com/watch?v=${vid}`;
      formatBtns.forEach(b => b.textContent.toLowerCase() === fmt && b.click());
      startConversion(vid, fmt);
    } else {
      location.href = "/";
    }
  }
});
