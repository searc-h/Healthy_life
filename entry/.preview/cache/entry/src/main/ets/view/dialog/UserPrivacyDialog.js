/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { CommonConstants as Const } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
function __Text__descStyle() {
    Text.fontSize({ "id": 16777306, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontWeight(Const.FONT_WEIGHT_400);
    Text.fontFamily({ "id": 16777351, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontColor($r(`app.element.color.titleColor`));
    Text.width(Const.FULL_WIDTH);
    Text.lineHeight({ "id": 16777309, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.margin({ top: { "id": 16777332, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
}
export default class UserPrivacyDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.controller = new CustomDialogController({
            builder: ''
        }, this);
        this.cancel = () => { };
        this.confirm = () => { };
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
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
    setController(ctr) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/dialog/UserPrivacyDialog.ets(35:5)");
            Column.padding({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777375, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/UserPrivacyDialog.ets(36:7)");
            __Text__descStyle();
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777374, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/UserPrivacyDialog.ets(38:7)");
            __Text__descStyle();
            Text.opacity(Const.OPACITY_6);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/dialog/UserPrivacyDialog.ets(41:7)");
            Row.width(Const.FULL_WIDTH);
            Row.margin({ top: { "id": 16777310, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Row.justifyContent(FlexAlign.SpaceEvenly);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel({ "id": 16777361, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.debugLine("view/dialog/UserPrivacyDialog.ets(42:9)");
            Button.backgroundColor(Color.White);
            Button.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.onClick(() => {
                this.controller.close();
                this.cancel();
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("view/dialog/UserPrivacyDialog.ets(49:9)");
            Divider.vertical(true);
            Divider.height({ "id": 16777310, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Divider.opacity(Const.OPACITY_4);
            if (!isInitialRender) {
                Divider.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel({ "id": 16777378, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.debugLine("view/dialog/UserPrivacyDialog.ets(53:9)");
            Button.backgroundColor(Color.White);
            Button.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.onClick(() => {
                this.controller.close();
                this.confirm();
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=UserPrivacyDialog.js.map