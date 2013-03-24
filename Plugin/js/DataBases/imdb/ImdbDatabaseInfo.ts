/// <reference path="../IDatabaseInfo.ts"/> 
/// <reference path="../../xhr.ts"/>
/// <reference path="ImdbInfo.ts"/> 

class ImdbDatabaseInfo implements IDatabaseInfo {
    public CreateItemRatingImg(id: any, parent: Node): bool {
        if (id instanceof ImdbInfo === false)
            return false;
        var itemInfo: ImdbInfo = id;

        var img = "http://tracker.0day.kiev.ua/imdb/imdb_" + itemInfo.id + ".gif";
        var url = "http://www.imdb.com/title/" + itemInfo.id;
        var name = "imdb";

        var item: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        item.style.display = "table-cell";
        parent.appendChild(item);

        var input: HTMLInputElement = <HTMLInputElement> document.createElement("input");
        item.appendChild(input);
        input.type = "hidden";
        input.name = name + "_id";
        input.value = itemInfo.id;

        var link = <HTMLAnchorElement> document.createElement("a");
        item.appendChild(link);
        link.href = url;

        var image = <HTMLImageElement> document.createElement("img");
        link.appendChild(image);
        image.src = img;

        var txt = document.createElement("p");
        link.appendChild(txt);
        txt.innerText = this.htmlDecode(itemInfo.title);

    }

    private htmlDecode(value) {
        if (value) {
            return $('<div />').html(value).text();
        } else {
            return '';
        }
    }

}
