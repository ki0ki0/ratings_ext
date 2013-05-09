/// <reference path="../IDatabaseInfo.ts"/>
/// <reference path="../../xhr.ts"/>
/// <reference path="KpInfo.ts"/>
var KpDatabaseInfo = (function () {
    function KpDatabaseInfo() { }
    KpDatabaseInfo.prototype.CreateItemRatingImg = function (id, parent) {
        if(id instanceof KpInfo === false) {
            return false;
        }
        var itemInfo = id;
        var img = "http://tracker.0day.kiev.ua/kinopoisk/f" + itemInfo.id + ".gif";
        var url = "http://www.kinopoisk.ru/level/1/film/" + itemInfo.id;
        var name = "kinopoisk";
        var item = document.createElement("div");
        item.style.display = "table-cell";
        parent.appendChild(item);
        var input = document.createElement("input");
        item.appendChild(input);
        input.type = "hidden";
        input.name = name + "_id";
        input.value = itemInfo.id;
        var link = document.createElement("a");
        item.appendChild(link);
        link.href = url;
        var image = document.createElement("img");
        link.appendChild(image);
        image.src = img;
        var txt = document.createElement("p");
        link.appendChild(txt);
        txt.innerText = this.htmlDecode(itemInfo.title);
    };
    KpDatabaseInfo.prototype.htmlDecode = function (value) {
        if(value) {
            var a = document.createElement('a');
            a.innerHTML = value;
            return a.textContent;
        } else {
            return '';
        }
    };
    return KpDatabaseInfo;
})();
//@ sourceMappingURL=KpDatabaseInfo.js.map
