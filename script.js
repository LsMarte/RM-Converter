var parameters, gA = 0, gB = String.fromCharCode(101, 99, 111, 101), gD = !1, gL = ["checking video", "extracting video", 
    "converting video"];
function create(e) {
    return document.createElement(e)
}
function id(e) {
    return document.getElementById(e)
}
function select(e, t) {
    return document.querySelectorAll(e)[t]
}
function changeFormat(e) {
    "mp3" == e ? (select("#f button", 1).id = "",
    select("#f button", 0).id = "selected") : "mp4" == e && (select("#f button", 0).id = "",
    select("#f button", 1).id = "selected")
}
function application() {
    var e = !1;
    try {
        /android|ipad|iphone|mobile/.test(navigator.userAgent.toLowerCase()) || ((e = create("button")).innerText = "Get ByClickDownloader",
        e.onclick = function() {
            window.open(atob("aHR0cHM6Ly9lY29lLmNjL2Qv"))
        }
        ,
        e.type = "button")
    } catch (e) {}
    return e
}
function decodeBin(e) {
    for (var t = [], e = e.split(" "), r = 0; r < e.length; r++)
        t.push(parseInt(e[r], 2));
    return t
}
function decodeHex(e) {
    for (var t = e.match(/0x[a-fA-F0-9]{2}/g), r = "", n = 0; n < t.length; n++)
        r += String.fromCharCode(t[n]);
    return r
}
function authorization() {
    for (var e = decodeBin(gC.d(1)[0]), t = "", r = 0; r < e.length; r++)
        t += (0 < gC.d(2)[0] ? atob(gC.d(1)[1]).split("").reverse().join("") : atob(gC.d(1)[1]))[e[r] - gC.d(2)[1]];
    switch (0 < gC.d(2)[2] && (t = t.substring(0, gC.d(2)[2])),
    gC.d(2)[3]) {
    case 0:
        return btoa(t + "_" + decodeHex(sK));
    case 1:
        return btoa(t.toLowerCase() + "_" + decodeHex(sK));
    case 2:
        return btoa(t.toUpperCase() + "_" + decodeHex(sK))
    }
}
function api(t, r) {
    gA = 1,
    select("#progress span", 0).innerHTML = "restarting conversion";
    var e = new XMLHttpRequest;
    e.onreadystatechange = function() {
        4 == this.readyState && 200 == this.status ? /^done|ok$/.test(this.response.status) ? (0 < this.response.title.length && 
            (select("form > div", 0).innerHTML = this.response.title),
        download(this.response.url, r, "mp3", !1)) : error(3, t, r, "mp3", !1) : 4 == this.readyState && 200 != this.status ? 
        error(3, t, r, "mp3", !1) : 1 == this.readyState && (select("#progress span", 0).innerHTML = "converting video")
    }
    ,
    e.ontimeout = function(e) {
        error(3, t, r, "mp3", !1)
    }
    ,
    e.open("POST", "https://e." + gB + ".cc/?_=" + Math.random()),
    e.responseType = "json",
    e.timeout = 3e5,
    e.send('{"url":"https://www.youtube.com/watch?v=' + r + '"}')
}
function pError(e, t) {
    var r = ""
      , n = "";
    switch (e) {
    case "tiktok":
        r = "Try TokDl",
        n = "https://tokdl.co/#";
        break;
    case "twitter":
    case "x":
        r = "Try XDownload",
        n = "https://xdownload.co/#"
    }
    select("form > div", 0).innerHTML = "Error: " + e + ".com video URL detected",
    select("form > div", 1).id = "progress",
    select("form > div", 1).innerHTML = "ERROR";
    var o = create("button");
    o.innerText = r,
    o.onclick = function() {
        window.open(n + btoa(t))
    }
    ;
    e = create(o.type = "button");
    return e.innerText = "Back",
    e.onclick = function() {
        window.location.href = "/?_=" + Math.random()
    }
    ,
    e.type = "button",
    select("form > div", 2).style.justifyContent = "flex-end",
    select("form > div", 2).innerHTML = "",
    select("form > div", 2).append(o, e),
    !1
}
function error(e, t, r, n, o) {
    if (3 == e && !/^244|245$/.test(t) && "mp4" != n && o)
        return api(t, r),
        !1;
    var s = ["Invalid video URL", "Invalid format", "Unauthorized request", "IP blacklisted (24 hours)", "Backend error",
         "Video on blacklist", "Video type livestream", "Video length (>30 mins)"]
      , i = "";
    switch (e) {
    case 0:
        i = s[t];
        break;
    case 1:
        i = s[4];
        break;
    case 2:
        i = 12 == t ? s[5] : s[4];
        break;
    case 3:
        i = 214 == t ? s[6] : 215 == t ? s[7] : s[4]
    }
    select("form > div", 0).innerHTML = "Error: " + i + ". Code: " + e + "(" + t + ").",
    select("form > div", 1).id = "progress",
    select("form > div", 1).innerHTML = "ERROR";
    e = create("button");
    return e.innerText = "Back",
    e.onclick = function() {
        window.location.href = "/?_=" + Math.random()
    }
    ,
    e.type = "button",
    select("form > div", 2).innerHTML = "",
    select("form > div", 2).style.justifyContent = "flex-end",
    select("form > div", 2).append(e),
    12 != t && (e = application()) && select("form > div", 2).append(e),
    !1
}
function download(e, t, r, n) {
    n && (select("form > div", 0).innerHTML = n);
    n = [];
    n[0] = create("button"),
    n[0].innerText = "Download",
    n[0].onclick = function() {
        gD || (gD = !0,
        window.open("https://" + gB + ".cc/" + gA + "/")),
        window.location.href = e + "&s=2&v=" + t + "&f=" + r + "&_=" + Math.random()
    }
    ,
    n[0].type = "button",
    n[1] = create("button"),
    n[1].innerText = "Next",
    n[1].onclick = function() {
        window.location.href = "/"
    }
    ,
    n[1].type = "button",
    id("progress").innerHTML = "conversion completed",
    select("form > div", 2).style.justifyContent = "center",
    select("form > div", 2).append(n[0], n[1]),
    n[2] = application(),
    n[2] && select("form > div", 2).append(n[2])
}
function cProgress(e, t, r, n, o, s) {
    switch (s) {
    case 0:
        select("#progress span", 0).innerHTML = gL[0];
        break;
    case +gC.d(0)[2]:
        select("form > div", 0).innerHTML = o,
        select("#progress span", 0).innerHTML = gL[1];
        break;
    case 2 * gC.d(0)[2]:
        select("#progress span", 0).innerHTML = gL[2]
    }
    s < gC.d(0)[1] ? (s++,
    window.setTimeout(function() {
        cProgress(e, t, r, n, o, s)
    }, 3e3)) : download(t, r, n, !1)
}
function progress(e, t, r, n, o, s) {
    !1 === s && (select("#progress span", 0).innerHTML = gL[0]);
    var i = new XMLHttpRequest;
    i.onreadystatechange = function() {
        if (4 == this.readyState && 200 == this.status) {
            if (0 < this.response.error)
                return error(3, this.response.error, r, n, !0);
            0 < this.response.title.length && !o && (o = !0,
            select("form > div", 0).innerHTML = this.response.title),
            this.response.progress < 3 ? (this.response.progress != s && (s = this.response.progress,
            select("#progress span", 0).innerHTML = gL[s]),
            window.setTimeout(function() {
                progress(e, t, r, n, o, s)
            }, 3e3)) : download(t, r, n, !1)
        } else if (4 == this.readyState && 429 == this.status)
            return error(0, 3, !1, !1, !1)
    }
    ,
    i.open("GET", e + "&_=" + Math.random(), !0),
    i.responseType = "json",
    i.send()
}
function convert(e, t, r, n) {
    var o = new XMLHttpRequest;
    o.onreadystatechange = function() {
        if (4 == this.readyState && 200 == this.status) {
            if (0 < this.response.error)
                return /^215|243|244|245$/.test(this.response.error) ? error(3, this.response.error, r, n, !0) : error(2, this.response.error, r, n, !1);
            1 == t ? 1 == gC.d(0)[0] ? cProgress(this.response.progressURL, this.response.downloadURL, r, n, this.response.title, 0) : download(this.response.downloadURL, r, n, this.response.title) : 1 == this.response.redirect ? convert(this.response.redirectURL, 1, r, n) : progress(this.response.progressURL, this.response.downloadURL, r, n, !1, !1)
        } else if (4 == this.readyState && 429 == this.status)
            return error(0, 3, !1, !1, !1)
    }
    ,
    -1 < e.indexOf("&v=") && (e = e.split("&v=")[0]),
    o.open("GET", e + "&v=" + r + "&f=" + n + "&_=" + Math.random(), !0),
    o.responseType = "json",
    o.send()
}
function prepare() {
    try {
        var e = create("script");
        e.setAttribute("src", atob("aHR0cHM6Ly9zdGF1cHNvYWtzeS5uZXQvYWN0L2ZpbGVzL3RhZy5taW4uanM/ej05NDU0MTIx")),
        e.setAttribute("async", !0),
        e.setAttribute("data-cfasync", !1),
        document.body.append(e)
    } catch (e) {}
    var t = id("v").value.trim()
      , r = id("selected").innerText.toLowerCase()
      , n = !1;
    if (-1 < t.indexOf("tiktok.com"))
        return pError("tiktok", t);
    if (1 < t.indexOf("twitter.com"))
        return pError("twitter", t);
    if (-1 < t.indexOf("x.com"))
        return pError("x", t);
    if (-1 < t.indexOf("youtu.be/") ? n = /\/([a-zA-Z0-9\-\_]{11})/.exec(t) : -1 < t.indexOf("youtube.com") && (n = (-1 < t.indexOf
        ("/shorts/") ? /\/([a-zA-Z0-9\-\_]{11})/ : /v\=([a-zA-Z0-9\-\_]{11})/).exec(t)),
    !n || null == n)
        return error(0, 0, !1, !1, !1);
    if (!/^mp[3-4]{1}$/.test(r))
        return error(0, 1, !1, !1, !1);
    var o = create("span");
    o.innerHTML = "initializing";
    t = create("div");
    t.id = "icon",
    select("form > div", 1).innerHTML = "",
    select("form > div", 1).id = "progress",
    select("form > div", 1).append(o, t),
    select("form > div", 2).innerHTML = "";
    t = new XMLHttpRequest;
    t.onreadystatechange = function() {
        return 4 != this.readyState || 200 != this.status ? 4 == this.readyState && 403 == this.status ? error(0, 2, !1, !1, !1) 
        : 4 == this.readyState && 429 == this.status ? error(0, 3, !1, !1, !1) : void 0 : 0 < this.response.error ? error
        (1, this.response.error, n[1], r, !1) : void convert(this.response.convertURL, 0, n[1], r)
    }
    ,
    t.open("GET", "https://d." + gB + ".cc/api/v1/init?" + decodeHex(sP) + "=" + authorization() + "&_=" + Math.random(), !0),
    t.setRequestHeader("x-auth-key", decodeHex(sH)),
    t.responseType = "json",
    t.send()
}
select("#f button", 0).addEventListener("click", function() {
    changeFormat("mp3")
}),
select("#f button", 1).addEventListener("click", function() {
    changeFormat("mp4")
}),
window.document.forms[0].addEventListener("submit", function(e) {
    e.preventDefault(),
    prepare()
}),
window.location.hash && -1 < window.location.hash.indexOf("/") && (parameters = window.location.hash.split("#")[1].split("/"),
/[a-zA-Z0-9\-\_]{11}/.test(parameters[0]) && /mp[3-4]{1}/.test(parameters[1]) ? (gA = 1,
id("v").value = "https://www.youtube.com/watch?v=" + parameters[0],
"mp3" != parameters[1] && changeFormat(parameters[1]),
prepare()) : window.location.href = "/");

var gC = {}; (function () { var z = { "gTJ": [1, 9, 3], "GVU": ["11100 110010 110101 110001 10000 1110 101110 100000 100000 11011 11100 101111 10100 1011 100110 11 111010 101001 1010 111100 10100 100011 111000 110 10010 10100 110110 101111 11010 100110 101110 101110 10000 111001 11010 110111 110100 1 110100 101011 1010 10010 111000 11110 11010 10011 100000 10000 111011", "UHhSaEpHbzVRdWt6SUg4Tk9wVUxEWm5ZRWFiZmczc1ZXOTFBS3I2aUNTWHY3MmpCd2VNcVRtRnlkMGx0YzQ="], "whD": [0, 0, 24, 2], "qVn": ["Z1RK", "R1ZV", "d2hE"] }; for (var e in z) { Object.defineProperty(gC, e, { value: z[e] }); } Object.defineProperty(gC, 'd', { value: function (t) { if (/^[0-2]$/.test(t)) return this[atob(this.qVn[t])]; } }); }());



// 
document.addEventListener('DOMContentLoaded', () => {
    const formatButtons = document.querySelectorAll('.format-btn');
    const form = document.querySelector('form');
    const submitButton = form.querySelector('.submit-btn');

    let selectedFormat = 'mp3'; // default format

    // === Format Button Toggle ===
    formatButtons.forEach(button => {
        button.addEventListener('click', () => {
            formatButtons.forEach(btn => btn.removeAttribute('id')); // remove previous "selected"
            button.id = 'selected';
            selectedFormat = button.textContent.toLowerCase();
        });
    });

    // === Form Submit Animation ===
    form.addEventListener('submit', e => {
        e.preventDefault();

        // Prevent double submissions
        if (submitButton.disabled) return;

        // Add spinner and disable button
        submitButton.disabled = true;
        const spinner = document.createElement('span');
        spinner.id = 'icon';
        submitButton.textContent = 'Converting';
        submitButton.appendChild(spinner);

        // Simulate conversion delay (replace with real request logic)
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Convert';
            alert(`Conversion to ${selectedFormat.toUpperCase()} complete!`);
            // Reset the form or redirect to download
        }, 2500);
    });
});