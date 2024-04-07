export class UserBaseInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__nickname = new SynchedPropertySimpleOneWayPU(params.nickname, this, "nickname");
        this.__signature = new SynchedPropertySimpleOneWayPU(params.signature, this, "signature");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.nickname !== undefined) {
            this.__nickname.set(params.nickname);
        }
        else {
            this.__nickname.set('');
        }
        if (params.signature !== undefined) {
            this.__signature.set(params.signature);
        }
        else {
            this.__signature.set('');
        }
    }
    updateStateVars(params) {
        this.__nickname.reset(params.nickname);
        this.__signature.reset(params.signature);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__signature.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__nickname.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue) {
        this.__nickname.set(newValue);
    }
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue) {
        this.__signature.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/UserBaseInfo.ets(22:5)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // userIcon
            Image.create({ "id": 16777221, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("view/UserBaseInfo.ets(24:7)");
            // userIcon
            Image.objectFit(ImageFit.Contain);
            // userIcon
            Image.height({ "id": 16777328, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // userIcon
            Image.width({ "id": 16777328, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // userIcon
            Image.margin({ top: { "id": 16777330, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            if (!isInitialRender) {
                // userIcon
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/UserBaseInfo.ets(30:7)");
            Column.width({ "id": 16777321, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.height({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.margin({ top: { "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Column.border({ radius: { "id": 16777324, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Column.backgroundColor({ "id": 16777255, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.justifyContent(FlexAlign.Center);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('LV.7');
            Text.debugLine("view/UserBaseInfo.ets(31:9)");
            Text.fontSize({ "id": 16777303, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bolder);
            Text.fontColor({ "id": 16777256, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // nickname
            Text.create(this.nickname);
            Text.debugLine("view/UserBaseInfo.ets(44:7)");
            // nickname
            Text.fontSize({ "id": 16777309, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // nickname
            Text.fontFamily({ "id": 16777354, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // nickname
            Text.margin({ bottom: { "id": 16777326, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            // nickname
            Text.fontWeight(FontWeight.Normal);
            // nickname
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                // nickname
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // nickname
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // signature
            Text.create(this.signature);
            Text.debugLine("view/UserBaseInfo.ets(52:7)");
            // signature
            Text.fontSize({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // signature
            Text.fontWeight(FontWeight.Normal);
            // signature
            Text.fontFamily({ "id": 16777355, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // signature
            Text.fontColor({ "id": 16777265, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                // signature
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // signature
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=UserBaseInfo.js.map