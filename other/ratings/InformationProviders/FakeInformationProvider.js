var FakeInformation = (function () {
    function FakeInformation() { }
    return FakeInformation;
})();
var FakeInformationProvider = (function () {
    function FakeInformationProvider() { }
    FakeInformationProvider.prototype.GetInfo = function () {
        var info = new FakeInformation();
        info.titles = [
            "Ïèëà", 
            "Saw"
        ];
        info.years = [
            2005, 
            2004
        ];
        info.container = null;
        return info;
    };
    return FakeInformationProvider;
})();
//@ sourceMappingURL=FakeInformationProvider.js.map
