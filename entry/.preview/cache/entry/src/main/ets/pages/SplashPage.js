import router from '@ohos:router';
import data_preferences from '@ohos:data.preferences';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
import { CommonConstants as Const } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import UserPrivacyDialog from '@bundle:com.example.healthy_life/entry/ets/view/dialog/UserPrivacyDialog';
// app preferences name
const H_STORE = 'healthAppStore';
const IS_PRIVACY = 'isPrivacy';
class SplashIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.context = getContext(this);
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new UserPrivacyDialog(this, {
                    cancel: () => { this.exitApp(); },
                    confirm: () => { this.onConfirm(); }
                });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
            },
            cancel: () => { this.exitApp(); },
            autoCancel: false,
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: Const.OFFSET_24 }
        }, this);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    onConfirm() {
        let preferences = data_preferences.getPreferences(this.context, H_STORE);
        preferences.then((res) => {
            res.put(IS_PRIVACY, true).then(() => {
                res.flush();
                Logger.info('SplashPage', 'isPrivacy is put success');
            }).catch((err) => {
                Logger.info('SplashPage', 'isPrivacy put failed. Cause:' + err);
            });
        });
        this.jumpAdPage();
    }
    exitApp() {
        this.context.terminateSelf();
    }
    jumpAdPage() {
        setTimeout(() => {
            router.replaceUrl({ url: 'pages/AdvertisingPage' });
        }, Const.LAUNCHER_DELAY_TIME);
    }
    aboutToAppear() {
        let preferences = data_preferences.getPreferences(this.context, H_STORE);
        preferences.then((res) => {
            res.get(IS_PRIVACY, false).then((isPrivate) => {
                if (isPrivate === true) {
                    this.jumpAdPage();
                }
                else {
                    this.dialogController.open();
                }
            });
        });
    }
    aboutToDisappear() {
        clearTimeout();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/SplashPage.ets(85:5)");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundImagePosition({ x: 0, y: 0 });
            Column.backgroundImage({ "id": 16777226, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundImageSize({ width: '100%', height: '100%' });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777218, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("pages/SplashPage.ets(86:7)");
            Image.width({ "id": 16777304, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.aspectRatio(1);
            Image.margin({ top: { "id": 16777304, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777272, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("pages/SplashPage.ets(90:7)");
            Text.fontFamily({ "id": 16777352, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777269, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(Const.FONT_WEIGHT_700);
            Text.letterSpacing(Const.LETTER_1);
            Text.margin({
                top: { "id": 16777309, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                bottom: { "id": 16777332, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777271, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("pages/SplashPage.ets(99:7)");
            Text.fontFamily({ "id": 16777351, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777269, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(Const.FONT_WEIGHT_400);
            Text.letterSpacing(Const.LETTER_34);
            Text.opacity(Const.OPACITY_6);
            Text.fontSize({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new SplashIndex(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=SplashPage.js.map