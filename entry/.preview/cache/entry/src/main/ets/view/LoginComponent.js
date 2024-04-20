import router from '@ohos:router';
import { CommonConstants } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
export class LoginComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__isMinHeight = this.createStorageProp('isMinHeight', false, "isMinHeight");
        this.__userName = new ObservedPropertySimplePU('', this, "userName");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__userName.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isMinHeight.aboutToBeDeleted();
        this.__userName.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get isMinHeight() {
        return this.__isMinHeight.get();
    }
    set isMinHeight(newValue) {
        this.__isMinHeight.set(newValue);
    }
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue) {
        this.__userName.set(newValue);
    }
    get password() {
        return this.__password.get();
    }
    set password(newValue) {
        this.__password.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            GridRow.create({
                columns: {
                    sm: CommonConstants.GRID_ROW_SM,
                    md: CommonConstants.GRID_ROW_MD,
                    lg: CommonConstants.GRID_ROW_LG
                },
                gutter: { x: CommonConstants.GUTTER_X },
                breakpoints: { value: CommonConstants.BREAK_POINT }
            });
            GridRow.debugLine("view/LoginComponent.ets(14:5)");
            if (!isInitialRender) {
                GridRow.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            GridCol.create({
                span: {
                    sm: CommonConstants.SPAN_SM,
                    md: CommonConstants.SPAN_MD,
                    lg: CommonConstants.SPAN_LG
                },
                offset: {
                    sm: CommonConstants.OFFSET_SM,
                    md: CommonConstants.OFFSET_MD,
                    lg: CommonConstants.OFFSET_LG
                }
            });
            GridCol.debugLine("view/LoginComponent.ets(23:7)");
            if (!isInitialRender) {
                GridCol.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/LoginComponent.ets(35:9)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({ placeholder: "请输入用户名（唯一）" });
            TextInput.debugLine("view/LoginComponent.ets(36:11)");
            TextInput.width(CommonConstants.TEXT_INPUT_WIDTH_PERCENT);
            TextInput.height({ "id": 16777464, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            TextInput.placeholderColor({ "id": 16777287, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            TextInput.placeholderFont({ size: { "id": 16777463, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            TextInput.backgroundColor({ "id": 16777267, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            TextInput.fontSize({ "id": 16777463, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            TextInput.padding({ left: { "id": 16777470, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            TextInput.border({
                width: { bottom: { "id": 16777416, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
                color: { "id": 16777257, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                radius: { "id": 16777415, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
            TextInput.onChange((value) => {
                this.userName = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({ placeholder: "请输入密码" });
            TextInput.debugLine("view/LoginComponent.ets(53:11)");
            TextInput.width(CommonConstants.TEXT_INPUT_WIDTH_PERCENT);
            TextInput.height({ "id": 16777464, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            TextInput.placeholderColor({ "id": 16777287, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            TextInput.placeholderFont({ size: { "id": 16777463, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            TextInput.fontSize({ "id": 16777463, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            TextInput.backgroundColor({ "id": 16777267, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            TextInput.type(InputType.Password);
            TextInput.padding({ left: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            TextInput.border({
                width: { bottom: { "id": 16777416, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
                color: { "id": 16777257, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                radius: { "id": 16777415, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
            TextInput.margin({ bottom: { "id": 16777417, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            TextInput.onChange((value) => {
                this.password = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        GridCol.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            GridCol.create({
                span: {
                    sm: CommonConstants.BUTTON_SPAN_SM,
                    md: this.isMinHeight ? CommonConstants.BUTTON_SPAN_MD_SMALL : CommonConstants.BUTTON_SPAN_MD_BIG,
                    lg: CommonConstants.BUTTON_SPAN_LG
                },
                offset: {
                    sm: CommonConstants.BUTTON_OFFSET_SM,
                    md: CommonConstants.BUTTON_OFFSET_MD,
                    lg: CommonConstants.BUTTON_OFFSET_LG
                }
            });
            GridCol.debugLine("view/LoginComponent.ets(74:7)");
            if (!isInitialRender) {
                GridCol.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel("登陆");
            Button.debugLine("view/LoginComponent.ets(86:9)");
            Button.width(CommonConstants.BUTTON_WIDTH_PERCENT);
            Button.height({ "id": 16777429, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.borderRadius({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.fontSize({ "id": 16777463, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.margin({ top: { "id": 16777451, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Button.fontWeight(CommonConstants.LOGIN_TEXT_FONT_WEIGHT);
            Button.enabled(isLoginButtonClickable(this.userName, this.password));
            Button.fontColor(isLoginButtonClickable(this.userName, this.password) ?
                Color.White : { "id": 16777266, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.backgroundColor(isLoginButtonClickable(this.userName, this.password) ? { "id": 16777264, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777265, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.onClick(() => {
                router.pushUrl({
                    url: CommonConstants.MINE_PAGE_URL
                });
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        GridCol.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            GridCol.create({
                span: {
                    sm: CommonConstants.BUTTON_SPAN_SM,
                    md: this.isMinHeight ? CommonConstants.BUTTON_SPAN_MD_SMALL : CommonConstants.BUTTON_SPAN_MD_BIG,
                    lg: CommonConstants.BUTTON_SPAN_LG
                },
                offset: {
                    sm: CommonConstants.BUTTON_OFFSET_SM,
                    md: this.isMinHeight ? CommonConstants.BUTTON_OFFSET_SM : CommonConstants.BUTTON_OFFSET_MD,
                    lg: CommonConstants.BUTTON_OFFSET_LG
                }
            });
            GridCol.debugLine("view/LoginComponent.ets(105:7)");
            if (!isInitialRender) {
                GridCol.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel("注册");
            Button.debugLine("view/LoginComponent.ets(117:9)");
            Button.width(CommonConstants.BUTTON_WIDTH_PERCENT);
            Button.height({ "id": 16777429, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.fontSize({ "id": 16777463, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.fontWeight(CommonConstants.BUTTON_FONT_WEIGHT);
            Button.borderRadius({ "id": 16777450, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.margin({ top: { "id": 16777451, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Button.fontColor({ "id": 16777279, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777278, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.onClick(() => {
                router.pushUrl({
                    url: CommonConstants.REGISTRATION_SUCCESS_PAGE_URL
                });
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        GridCol.pop();
        GridRow.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
/**
 * Calculate login button clickable by the input of username and password.
 *
 * @return {boolean} isLoginButtonClickable.
 */
function isLoginButtonClickable(userName, password) {
    return userName !== '' && password !== '';
}
//# sourceMappingURL=LoginComponent.js.map