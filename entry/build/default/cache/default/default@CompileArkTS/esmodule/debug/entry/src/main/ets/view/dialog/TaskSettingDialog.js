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
import prompt from '@ohos:prompt';
import { frequencyRange } from '@bundle:com.example.healthy_life/entry/ets/common/utils/Utils';
import { returnTimeStamp, createAppleRange, createDrinkRange, formatTime } from '@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskViewModel';
import { taskType } from '@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo';
import { CommonConstants as Const } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
export class TargetSettingDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.controller = new CustomDialogController({
            builder: ''
        }, this);
        this.drinkRange = createDrinkRange();
        this.appleRange = createAppleRange();
        this.currentValue = this.settingParams.targetValue;
        this.currentTime = Const.DEFAULT_TIME;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.drinkRange !== undefined) {
            this.drinkRange = params.drinkRange;
        }
        if (params.appleRange !== undefined) {
            this.appleRange = params.appleRange;
        }
        if (params.currentValue !== undefined) {
            this.currentValue = params.currentValue;
        }
        if (params.currentTime !== undefined) {
            this.currentTime = params.currentTime;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue) {
        this.__settingParams.set(newValue);
    }
    setController(ctr) {
        this.controller = ctr;
    }
    compareTime(startTime, endTime) {
        if (returnTimeStamp(this.currentTime) < returnTimeStamp(startTime) ||
            returnTimeStamp(this.currentTime) > returnTimeStamp(endTime)) {
            prompt.showToast({
                message: Const.CHOOSE_TIME_OUT_RANGE
            });
            return false;
        }
        return true;
    }
    setTargetValue() {
        var _a, _b;
        if (((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.taskID) === taskType.getup) {
            if (!this.compareTime(Const.GET_UP_EARLY_TIME, Const.GET_UP_LATE_TIME)) {
                return;
            }
            this.settingParams.targetValue = this.currentTime;
            return;
        }
        if (((_b = this.settingParams) === null || _b === void 0 ? void 0 : _b.taskID) === taskType.sleepEarly) {
            if (!this.compareTime(Const.SLEEP_EARLY_TIME, Const.SLEEP_LATE_TIME)) {
                return;
            }
            this.settingParams.targetValue = this.currentTime;
            return;
        }
        this.settingParams.targetValue = this.currentValue;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.height(Const.THOUSANDTH_560);
            Column.padding(Const.DEFAULT_12);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.Start);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777259, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.margin({ right: Const.DEFAULT_12 });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            var _a, _b;
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.taskID) === taskType.getup ?
                Const.GET_UP_TIME_RANGE :
                ((_b = this.settingParams) === null || _b === void 0 ? void 0 : _b.taskID) === taskType.sleepEarly ?
                    Const.SLEEP_TIME_RANGE : '');
            Text.fontSize(Const.DEFAULT_16);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            var _a;
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if ([taskType.getup, taskType.sleepEarly].indexOf((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.taskID) > Const.HAS_NO_INDEX) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        TimePicker.create({
                            selected: new Date(`${new Date().toDateString()} 8:00:00`),
                        });
                        TimePicker.height(Const.THOUSANDTH_800);
                        TimePicker.useMilitaryTime(true);
                        TimePicker.onChange((value) => {
                            this.currentTime = formatTime(value);
                        });
                        if (!isInitialRender) {
                            TimePicker.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    TimePicker.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        var _a;
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        TextPicker.create({ range: ((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.taskID) === taskType.drinkWater ? this.drinkRange : this.appleRange });
                        TextPicker.width(Const.THOUSANDTH_900);
                        TextPicker.height(Const.THOUSANDTH_800);
                        TextPicker.onChange((value) => {
                            this.currentValue = value === null || value === void 0 ? void 0 : value.split(' ')[0];
                        });
                        if (!isInitialRender) {
                            TextPicker.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    TextPicker.pop();
                });
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.DEFAULT_28);
            Row.margin({ bottom: Const.DEFAULT_20 });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777271, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.currentTime = Const.DEFAULT_TIME;
                this.currentValue = '';
                this.controller.close();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777236, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777271, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.setTargetValue();
                this.controller.close();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class RemindTimeDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.controller = new CustomDialogController({
            builder: ''
        }, this);
        this.currentTime = Const.DEFAULT_TIME;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.currentTime !== undefined) {
            this.currentTime = params.currentTime;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue) {
        this.__settingParams.set(newValue);
    }
    setController(ctr) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.height(Const.THOUSANDTH_560);
            Column.padding(Const.DEFAULT_12);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width(Const.THOUSANDTH_900);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777252, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.margin({ top: Const.DEFAULT_10 });
            Text.width(Const.THOUSANDTH_1000);
            Text.textAlign(TextAlign.Start);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TimePicker.create({
                selected: new Date(`${new Date().toDateString()} 8:00:00`),
            });
            TimePicker.height(Const.THOUSANDTH_800);
            TimePicker.useMilitaryTime(true);
            TimePicker.onChange((value) => {
                this.currentTime = formatTime(value);
            });
            if (!isInitialRender) {
                TimePicker.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TimePicker.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.DEFAULT_28);
            Row.margin({ bottom: Const.DEFAULT_20 });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777271, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.currentTime = Const.DEFAULT_TIME;
                this.controller.close();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777236, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777271, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.settingParams.startTime = this.currentTime;
                this.controller.close();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class FrequencyDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.__frequency = this.initializeConsume("frequency", "frequency");
        this.controller = new CustomDialogController({
            builder: ''
        }, this);
        this.currentFrequency = Const.EVERYDAY;
        this.frequencyChooseRange = frequencyRange();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.currentFrequency !== undefined) {
            this.currentFrequency = params.currentFrequency;
        }
        if (params.frequencyChooseRange !== undefined) {
            this.frequencyChooseRange = params.frequencyChooseRange;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        this.__frequency.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue) {
        this.__settingParams.set(newValue);
    }
    get frequency() {
        return this.__frequency.get();
    }
    set frequency(newValue) {
        this.__frequency.set(newValue);
    }
    setController(ctr) {
        this.controller = ctr;
    }
    setFrequency() {
        const checkedArr = this.frequencyChooseRange.filter((item) => item === null || item === void 0 ? void 0 : item.isChecked);
        if (checkedArr.length === this.frequencyChooseRange.length || checkedArr.length === Const.NO_LENGTH) {
            this.currentFrequency = Const.EVERYDAY;
            this.settingParams.frequency = Const.INIT_WEEK_IDS;
            return;
        }
        this.currentFrequency = checkedArr.reduce((sum, current) => {
            return sum + ' ' + (current === null || current === void 0 ? void 0 : current.label);
        }, '');
        this.settingParams.frequency = checkedArr.reduce((sum, current) => {
            return sum === '' ? sum + (current === null || current === void 0 ? void 0 : current.id) : sum + ',' + (current === null || current === void 0 ? void 0 : current.id);
        }, '');
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.height(Const.THOUSANDTH_900);
            Column.padding(Const.DEFAULT_12);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width(Const.THOUSANDTH_900);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777253, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.margin({ top: Const.DEFAULT_10 });
            Text.width(Const.THOUSANDTH_1000);
            Text.textAlign(TextAlign.Start);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create();
            List.divider({
                strokeWidth: Const.DEFAULT_2,
                color: { "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
            List.flexGrow(1);
            List.padding(Const.DEFAULT_12);
            List.width(Const.THOUSANDTH_1000);
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const isLazyCreate = true;
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, isLazyCreate);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedShallowRender = () => {
                        this.observeComponentCreation(itemCreation);
                        ListItem.pop();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Row.create();
                            Row.width(Const.THOUSANDTH_1000);
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.height(Const.DEFAULT_60);
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item === null || item === void 0 ? void 0 : item.label);
                            Text.fontSize(Const.DEFAULT_20);
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Toggle.create({ type: ToggleType.Checkbox });
                            Toggle.onChange((isOn) => {
                                item.isChecked = isOn;
                            });
                            if (!isInitialRender) {
                                Toggle.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Toggle.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Row.create();
                            Row.width(Const.THOUSANDTH_1000);
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.height(Const.DEFAULT_60);
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item === null || item === void 0 ? void 0 : item.label);
                            Text.fontSize(Const.DEFAULT_20);
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Toggle.create({ type: ToggleType.Checkbox });
                            Toggle.onChange((isOn) => {
                                item.isChecked = isOn;
                            });
                            if (!isInitialRender) {
                                Toggle.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Toggle.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    if (isLazyCreate) {
                        observedShallowRender();
                    }
                    else {
                        observedDeepRender();
                    }
                }
            };
            this.forEachUpdateFunction(elmtId, this.frequencyChooseRange, forEachItemGenFunction, (item) => JSON.stringify(item), false, false);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        List.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width(Const.THOUSANDTH_900);
            Row.height(Const.DEFAULT_28);
            Row.margin({ bottom: Const.DEFAULT_16 });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777271, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.controller.close();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777236, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontColor({ "id": 16777271, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.setFrequency();
                this.frequency = this.currentFrequency;
                this.controller.close();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=TaskSettingDialog.js.map