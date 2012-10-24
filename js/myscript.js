noAd();

function addScript(text) {
    var start = document.createElement("script");
    start.type = "text/javascript";
    start.innerHTML = text;
    document.body.appendChild(start);
}

if (window.location.href.indexOf("http://www.ex.ua/view/") != -1)
    getFilmInfoExUa();
if (window.location.href.indexOf("http://fs.ua/item/") != -1)
    getFilmInfoFsUa();
if ((window.location.href.indexOf("http://fs.ua/view") != -1) && (window.location.href.indexOf("?play") != -1)) 
    playerPage();

function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function playerPage()
{
    var script = '\
    function changeUrl(clip)\
    {\
        var file = document.location.href.match("file=([0-9]*)");\
        var fileId = clip.fsData.file_id;\
        if ((file == null) || (file.length < 2) || (file[1] == fileId))\
            return;\
        var newUrl = document.location.href.replace(/file=[0-9]*/,"file="+fileId);\
        history.replaceState(null, newUrl, newUrl);\
    }\
    $f().onStart(changeUrl);';

    addScript(script);
    setCookie("preroll", 1);

    if (settings.playerOnly == false)
        return;
    playerOnly();
}

function playerOnly()
{
    var item = player.parentNode.parentNode.parentNode;
    while (document.body.children.length > 0 ) 
    {
        document.body.removeChild(document.body.children[0]);
    }
    document.body.appendChild(item);
    var item = document.getElementsByClassName("l-top");
    if ((item != undefined)&&(item.length > 0)) item[0].parentNode.removeChild(item[0]);

    var item = document.getElementsByClassName("b-tab-item m-wide");
    if ((item != undefined)&&(item.length > 0)) item[0].className = "";

    var item = document.getElementsByClassName("main");
    if ((item != undefined)&&(item.length > 0)) item[0].style.height = "100%"

    var item = document.getElementById("player");
    if (item != undefined)
    {
        item.style.height = "100%"
        item.style.width = "100%"
    }
	
//	var act = document.getElementsByClassName("b-actions")[0];
//	var nw = document.createElement("a");
//	nw.href = "";
//	nw.onclick = function(){
//		addScript('window.open(document.location.href, "location=0,menubar=0,status=0,titlebar=0,toolbar=0")');
//		window.open(document.location.href, "location=0,menubar=0,status=0,titlebar=0,toolbar=0");
//		return false;
//	};
//	nw.textContent = "NewWindow";
//	act.insertBefore(nw, act.firstChild);
//	act.appendChild(nw);
    }


function getFilmInfoExUa() {
    var titles = null;
    var year = null;

    var header = document.getElementsByTagName("h1");
    if (header.length == 0)
        return null;

    var text = header[0].textContent.trim();
    titles = text.match(/[^|/\(\)\[\]]*/g);
    if (titles.length == 0)
        return null;
    for (i in titles) {
        titles[i] = titles[i].trim();
        var dates = titles[i].match("^[0-9][0-9][0-9][0-9]$");
        if ((dates != null) && (dates.length > 0))
            year = dates[dates.length - 1];
    }

    getAllRatings(titles, year, header[0]);
}

function getFilmInfoFsUa() {
    var titles = null;
    var year = null;

    var category = document.getElementsByClassName("b-subcategory-title");
    if (category.length != 1)
        return null;

    var text =  category[0].nextSibling.textContent.trim();
    titles = text.split(String.fromCharCode(160, 47, 160));
    if (titles.length == 0)
        return null;

    var item_info = document.getElementsByClassName("item-info");
    if (item_info.length == 0)
        return null; 

    if (item_info.length > 0) {
        var td = item_info[0].getElementsByTagName("td");
        for (var i=0; i < td.length; i++) {
            var yearInfo = td[i].textContent.trim();
            var match = yearInfo.match(/[0-9][0-9][0-9][0-9]/g);
            if ((match != null) && (match.length > 0 ))
            {
                year = match[0];
                break;
            }
        }
    }

    var table = document.createElement("table");
    item_info[0].appendChild(table);
    var tr = document.createElement("tr");
    table.appendChild(tr);

    var act = document.getElementsByClassName("item-actions");
    if ((act == null) || (act.length == 0))
        return null;
    
    var div = document.createElement("div");
    act[0].parentNode.appendChild(div);

    getAllRatings(titles, year, tr);
}

function noAd(){
    if (document.location.href.search('fs.ua') != -1) {
        var static = document.getElementsByClassName("b-tab-item m-wide");
        var actions = document.getElementsByClassName("b-actions");
        if ((static.length > 0) && (actions.length > 0))
        {
            var popup = actions[0].getElementsByClassName("b-dropdown m-popup");
            for (; popup.length > 0; )
            {
                var item = popup[0];
                item.parentElement.removeChild(item);
                static[0].appendChild(item);

                item.style.position = "static";

                var a = item.getElementsByTagName("a");
                for (var j = 0; j < a.length; j++)
                {
                    a[j].style.display = "inline";
                    a[j].style.padding = 0;
                    a[j].style.backgroundImage = "none";
                }

                
            }
        }
    }
	
    if (document.location.href.search('www.ex.ua') != -1) {
	    var ad = document.getElementById("ad_block");
        if (ad != null) ad.innerHTML = '';
    }
}

