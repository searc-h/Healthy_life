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
import router from '@ohos:router';
import prompt from '@ohos:prompt';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
import { CommonConstants as Const } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import TaskInfo, { taskType } from '@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo';
import { TaskChooseItem, TargetSetItem, OpenRemindItem, RemindTimeItem, FrequencyItem } from '@bundle:com.example.healthy_life/entry/ets/view/task/TaskEditListItem';
import { BroadCastType } from '@bundle:com.example.healthy_life/entry/ets/common/utils/BroadCast';
import { HealthDataSrcMgr } from '@bundle:com.example.healthy_life/entry/ets/common/utils/HealthDataSrcMgr';
import { initFrequencyString, addTask, formatParams } from '@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskViewModel';
import { TaskDialogView } from '@bundle:com.example.healthy_life/entry/ets/view/dialog/TaskDialogView';
import { GlobalContext } from '@bundle:com.example.healthy_life/entry/ets/common/utils/GlobalContext';
export default class TaskDetail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        var _a;
        super(parent, __localStorage, elmtId);
        this.__broadCast = new ObservedPropertyObjectPU(HealthDataSrcMgr.getInstance().getBroadCast(), this, "broadCast");
        this.addProvidedVar("broadCast", this.__broadCast);
        this.__settingParams = new ObservedPropertyObjectPU(this.parseRouterParams(), this, "settingParams");
        this.addProvidedVar("settingParams", this.__settingParams);
        this.__frequency = new ObservedPropertySimplePU(initFrequencyString((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.frequency), this, "frequency");
        this.addProvidedVar("frequency", this.__frequency);
        this.isChanged = false;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("settingParams", this.onParamsChanged);
    }
    setInitiallyProvidedValue(params) {
        if (params.broadCast !== undefined) {
            this.broadCast = params.broadCast;
        }
        if (params.settingParams !== undefined) {
            this.settingParams = params.settingParams;
        }
        if (params.frequency !== undefined) {
            this.frequency = params.frequency;
        }
        if (params.isChanged !== undefined) {
            this.isChanged = params.isChanged;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__broadCast.aboutToBeDeleted();
        this.__settingParams.aboutToBeDeleted();
        this.__frequency.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get broadCast() {
        return this.__broadCast.get();
    }
    set broadCast(newValue) {
        this.__broadCast.set(newValue);
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
    parseRouterParams() {
        let params = router.getParams();
        const routerParams = JSON.parse(params.params);
        return routerParams;
    }
    onParamsChanged() {
        this.isChanged = true;
    }
    backIndexParams() {
        return formatParams(this.settingParams);
    }
    finishTaskEdit() {
        if (this.isChanged) {
            let context = getContext(this);
            let taskInfo = new TaskInfo(Const.ZERO, Const.GLOBAL_KEY, this.settingParams.taskID, this.settingParams.targetValue, this.settingParams.isAlarm, this.settingParams.startTime, this.settingParams.endTime, this.settingParams.frequency, false, '', this.settingParams.isOpen);
            addTask(taskInfo, context).then((res) => {
                GlobalContext.getContext().setObject('taskListChange', true);
                router.back({
                    url: 'pages/MainPage',
                    params: {
                        editTask: this.backIndexParams(),
                    }
                });
                Logger.info('addTaskFinished', JSON.stringify(res));
            }).catch((error) => {
                prompt.showToast({
                    message: Const.SETTING_FINISH_FAILED_MESSAGE
                });
                Logger.error('addTaskFailed', JSON.stringify(error));
            });
            return;
        }
        router.back({
            url: 'pages/MainPage',
        });
    }
    aboutToAppear() {
        this.broadCast.off(BroadCastType.SHOW_TARGET_SETTING_DIALOG, () => { });
        this.broadCast.off(BroadCastType.SHOW_REMIND_TIME_DIALOG, () => { });
        this.broadCast.off(BroadCastType.SHOW_FREQUENCY_DIALOG, () => { });
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/task/TaskDetailComponent.ets(100:5)");
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/task/TaskDetailComponent.ets(101:7)");
            Column.width(Const.THOUSANDTH_1000);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create({ space: Const.LIST_ITEM_SPACE });
            List.debugLine("view/task/TaskDetailComponent.ets(102:9)");
            List.width(Const.THOUSANDTH_940);
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.backgroundColor({ "id": 16777270, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.debugLine("view/task/TaskDetailComponent.ets(103:11)");
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
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new TaskChooseItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new TaskChooseItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                var _a, _b, _c;
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.backgroundColor({ "id": 16777270, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.enabled(((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.isOpen)
                    && ((_b = this.settingParams) === null || _b === void 0 ? void 0 : _b.taskID) !== taskType.smile
                    && ((_c = this.settingParams) === null || _c === void 0 ? void 0 : _c.taskID) !== taskType.brushTeeth);
                ListItem.onClick(() => {
                    this.broadCast.emit(BroadCastType.SHOW_TARGET_SETTING_DIALOG);
                });
                ListItem.debugLine("view/task/TaskDetailComponent.ets(108:11)");
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
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new TargetSetItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new TargetSetItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                var _a;
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.backgroundColor({ "id": 16777270, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.enabled((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.isOpen);
                ListItem.debugLine("view/task/TaskDetailComponent.ets(122:11)");
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
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new OpenRemindItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new OpenRemindItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                var _a, _b;
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.backgroundColor({ "id": 16777270, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.enabled(((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.isOpen) && ((_b = this.settingParams) === null || _b === void 0 ? void 0 : _b.isAlarm));
                ListItem.onClick(() => {
                    this.broadCast.emit(BroadCastType.SHOW_REMIND_TIME_DIALOG);
                });
                ListItem.debugLine("view/task/TaskDetailComponent.ets(128:11)");
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
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new RemindTimeItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new RemindTimeItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                var _a, _b;
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.backgroundColor({ "id": 16777270, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.enabled(((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.isOpen) && ((_b = this.settingParams) === null || _b === void 0 ? void 0 : _b.isAlarm));
                ListItem.onClick(() => {
                    this.broadCast.emit(BroadCastType.SHOW_FREQUENCY_DIALOG);
                });
                ListItem.debugLine("view/task/TaskDetailComponent.ets(137:11)");
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
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new FrequencyItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new FrequencyItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
        List.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.debugLine("view/task/TaskDetailComponent.ets(149:9)");
            Button.width(Const.THOUSANDTH_800);
            Button.height(Const.DEFAULT_48);
            Button.backgroundColor({ "id": 16777249, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.onClick(() => {
                this.finishTaskEdit();
            });
            Button.position({
                x: Const.THOUSANDTH_100,
                y: Const.THOUSANDTH_800
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777363, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/task/TaskDetailComponent.ets(150:11)");
            Text.fontSize({ "id": 16777309, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new TaskDialogView(this, {}, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=TaskDetailComponent.js.map