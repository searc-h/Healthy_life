// tabId
export var TabId;
(function (TabId) {
    TabId[TabId["HOME"] = 0] = "HOME";
    TabId[TabId["ACHIEVEMENT"] = 1] = "ACHIEVEMENT";
    TabId[TabId["MINE"] = 2] = "MINE";
})(TabId || (TabId = {}));
export const NavList = [
    {
        icon: { "id": 16777396, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon_selected: { "id": 16777233, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        text: { "id": 16777380, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        id: TabId.HOME
    },
    {
        icon: { "id": 16777228, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon_selected: { "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        text: { "id": 16777379, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        id: TabId.ACHIEVEMENT
    },
    {
        icon: { "id": 16777288, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon_selected: { "id": 16777223, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        text: { "id": 16777381, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        id: TabId.MINE
    },
];
//# sourceMappingURL=NavItemModel.js.map