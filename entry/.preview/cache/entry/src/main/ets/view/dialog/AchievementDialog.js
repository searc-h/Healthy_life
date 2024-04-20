/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { CommonConstants as Const } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import { AchievementMap } from '@bundle:com.example.healthy_life/entry/ets/model/TaskInitList';
const ANGLE_LARGE = 360;
export class AchievementDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.controller = new CustomDialogController({
            builder: 0
        }, this);
        this.__achievementLevel = this.initializeConsume("achievementLevel", "achievementLevel");
        this.__opacityValue = new ObservedPropertySimplePU(0, this, "opacityValue");
        this.__angle = new ObservedPropertySimplePU(0, this, "angle");
        this.__scaleValue = new ObservedPropertySimplePU(0, this, "scaleValue");
        this.__achievementMapValue = new ObservedPropertyObjectPU({ "id": 16777297, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, this, "achievementMapValue");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.opacityValue !== undefined) {
            this.opacityValue = params.opacityValue;
        }
        if (params.angle !== undefined) {
            this.angle = params.angle;
        }
        if (params.scaleValue !== undefined) {
            this.scaleValue = params.scaleValue;
        }
        if (params.achievementMapValue !== undefined) {
            this.achievementMapValue = params.achievementMapValue;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__opacityValue.purgeDependencyOnElmtId(rmElmtId);
        this.__angle.purgeDependencyOnElmtId(rmElmtId);
        this.__scaleValue.purgeDependencyOnElmtId(rmElmtId);
        this.__achievementMapValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__achievementLevel.aboutToBeDeleted();
        this.__opacityValue.aboutToBeDeleted();
        this.__angle.aboutToBeDeleted();
        this.__scaleValue.aboutToBeDeleted();
        this.__achievementMapValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    setController(ctr) {
        this.controller = ctr;
    }
    get achievementLevel() {
        return this.__achievementLevel.get();
    }
    set achievementLevel(newValue) {
        this.__achievementLevel.set(newValue);
    }
    get opacityValue() {
        return this.__opacityValue.get();
    }
    set opacityValue(newValue) {
        this.__opacityValue.set(newValue);
    }
    get angle() {
        return this.__angle.get();
    }
    set angle(newValue) {
        this.__angle.set(newValue);
    }
    get scaleValue() {
        return this.__scaleValue.get();
    }
    set scaleValue(newValue) {
        this.__scaleValue.set(newValue);
    }
    get achievementMapValue() {
        return this.__achievementMapValue.get();
    }
    set achievementMapValue(newValue) {
        this.__achievementMapValue.set(newValue);
    }
    aboutToAppear() {
        switch (this.achievementLevel) {
            case 3:
                this.achievementMapValue = AchievementMap.on_3;
                break;
            case 7:
                this.achievementMapValue = AchievementMap.on_7;
                break;
            case 30:
                this.achievementMapValue = AchievementMap.on_30;
                break;
            case 50:
                this.achievementMapValue = AchievementMap.on_50;
                break;
            case 73:
                this.achievementMapValue = AchievementMap.on_73;
                break;
            case 99:
                this.achievementMapValue = AchievementMap.on_99;
                break;
            default:
                break;
        }
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/dialog/AchievementDialog.ets(56:5)");
            Column.height(Const.THOUSANDTH_800);
            Column.width(Const.THOUSANDTH_1000);
            Column.justifyContent(FlexAlign.Center);
            Gesture.create(GesturePriority.Low);
            TapGesture.create();
            TapGesture.onAction(() => {
                this.controller.close();
            });
            TapGesture.pop();
            Gesture.pop();
            Column.scale({ x: this.scaleValue, y: this.scaleValue });
            Column.rotate({ x: 0, y: 1, z: 0, angle: this.angle });
            Column.opacity(this.opacityValue);
            Column.onAppear(() => {
                Context.animateTo({
                    duration: Const.DURATION_800,
                    curve: Curve.EaseOut,
                    delay: Const.DURATION_100,
                    iterations: 1
                }, () => {
                    this.opacityValue = 1;
                    this.scaleValue = 1;
                    this.angle = ANGLE_LARGE;
                });
            });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(this.achievementMapValue);
            Image.debugLine("view/dialog/AchievementDialog.ets(58:7)");
            Image.width(Const.THOUSANDTH_560);
            Image.height(Const.THOUSANDTH_400);
            Image.objectFit(ImageFit.Contain);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777342, "type": 10003, params: [this.achievementLevel], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/AchievementDialog.ets(63:7)");
            Text.fontSize({ "id": 16777379, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(Const.FONT_WEIGHT_500);
            Text.fontColor({ "id": 16777291, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontFamily({ "id": 16777309, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.margin({ top: { "id": 16777370, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
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
//# sourceMappingURL=AchievementDialog.js.map