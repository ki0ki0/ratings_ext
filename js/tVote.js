function tVote(containerId, settings) {
    this.STAR = chrome.extension.getURL("images/star.png");
    this.DARK_STAR = chrome.extension.getURL("images/dark_star.png");
    this.VOTE_STAR = this.STAR;

    this.container = containerId;
    this.settings = settings;
    this.images = [];
    this.info = null;

    this.index = settings.def - 1;

    this.init();
}

tVote.prototype.init = function () {
    var that = this;

    var parent = document.getElementById(this.container);
    if (parent == undefined)
        return;

    for (var i = 0, m = this.settings.max; i < m; i++) {
        var image = document.createElement('img');
        this.images[i] = image;
        this.images[i].value = i + 1;
        this.images[i].alt = i + 1;
        image.style.cursor = 'pointer';

        image.onmouseover = function () {
            that.set(this.value - 1, 1);
        };

        image.addEventListener('click', function (event) {
            var e = event || window.event;
            if (that.settings.click) {
                that.index = this.value - 1;
                that.settings.click(event, this.value);
            }
        }, false);

        parent.appendChild(image);
    }

    this.info = document.createTextNode("");
    parent.appendChild(this.info);

    parent.onmouseout = function (event) {
        that.set(that.index);
    }

    this.set(this.index);
}

tVote.prototype.addHandler = function (callback) {
    var parent = document.getElementById(this.container);

    for (var i = 0; i < parent.children.length; i++) {
        parent.children[i].addEventListener('click', function (event) {
            var e = event || window.event;
            if (callback) {
                callback(event, this.value);
            }
        }, false);
    }
}

tVote.prototype.clear = function () {
    for (var i = 0; i < this.settings.max; i++) {
        this.images[i].src = this.DARK_STAR;
    }
}

tVote.prototype.set = function (idx, voting) {
    this.updateInfo(idx + 1);
    if (idx < 0) {
        this.clear();
        return;
    }
    else if (idx >= this.settings.max) {
        idx = this.settings.max - 1;
    }

    if (arguments.length == 1) voting = 0;
    var imgsrc = (voting != 0) ? this.VOTE_STAR : this.STAR;

    var image = this.images[idx];
    image.src = imgsrc;

    var next = image.nextSibling;
    while (next) {
        next.off = true;
        next.src = this.DARK_STAR;
        next = next.nextSibling;
    }

    var prev = image.previousSibling;
    while (prev) {
        prev.off = false;
        prev.src = imgsrc;
        prev = prev.previousSibling;
    }
}

tVote.prototype.updateInfo = function (idx) {
    var text;
    if (idx > 0)
        text = idx + "/" + this.settings.max;
    else
        text = "-/" + this.settings.max;

    //this.info.nodeValue = text;
    this.info.textContent = " " + text;
}

tVote.prototype.reset = function (num) {
    this.index = (num) ? num : this.settings.def;
    this.set(--this.index);
}