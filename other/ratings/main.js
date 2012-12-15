var providers = [
    new FSUAInformationProvider(), 
    new EXUAInformationProvider(), 
    new FakeInformationProvider()
];
var info = null;
for(var i = 0; i < providers.length; i++) {
    var infoTmp = providers[i].GetInfo();
    if(infoTmp != null) {
        info = infoTmp;
        break;
    }
}
var lookupers = [
    new ImdbLookuper()
];
for(var i = 0; i < lookupers.length; i++) {
    lookupers[i].GetId(info, function (id) {
        alert(id);
    });
}
//@ sourceMappingURL=main.js.map
