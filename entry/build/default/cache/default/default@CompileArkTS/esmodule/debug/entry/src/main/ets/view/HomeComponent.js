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
import HealthText from '@bundle:com.example.healthy_life/entry/ets/view/HealthTextComponent';
import AddBtn from '@bundle:com.example.healthy_life/entry/ets/view/home/AddBtnComponent';
import { TaskCard } from '@bundle:com.example.healthy_life/entry/ets/view/home/TaskCardComponent';
import HomeTopComponent from '@bundle:com.example.healthy_life/entry/ets/view/home/HomeTopComponent';
import { CustomDialogView } from '@bundle:com.example.healthy_life/entry/ets/view/dialog/CustomDialogView';
import { TaskMapById } from '@bundle:com.example.healthy_life/entry/ets/model/TaskInitList';
import { HealthDataSrcMgr } from '@bundle:com.example.healthy_life/entry/ets/common/utils/HealthDataSrcMgr';
import { BroadCastType } from '@bundle:com.example.healthy_life/entry/ets/common/utils/BroadCast';
import { CommonConstants as Const } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
const WHITE_COLOR_0X = 255;
function __Text__titleTextStyle() {
    Text.fontSize({ "id": 16777310, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontWeight(Const.FONT_WEIGHT_500);
    Text.width(Const.THOUSANDTH_1000);
    Text.fontFamily({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontColor($r(`app.element.color.titleColor`));
    Text.padding({
        top: Const.THOUSANDTH_15,
        bottom: Const.THOUSANDTH_15,
        left: Const.THOUSANDTH_33
    });
}
export default class HomeIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__broadCast = new ObservedPropertyObjectPU(HealthDataSrcMgr.getInstance().getBroadCast(), this, "broadCast");
        this.addProvidedVar("broadCast", this.__broadCast);
        this.__naviAlpha = new ObservedPropertySimplePU(0, this, "naviAlpha");
        this.__homeStore = new SynchedPropertyObjectTwoWayPU(params.homeStore, this, "homeStore");
        this.__editedTaskInfo = new SynchedPropertyObjectTwoWayPU(params.editedTaskInfo, this, "editedTaskInfo");
        this.__editedTaskID = new SynchedPropertySimpleTwoWayPU(params.editedTaskID, this, "editedTaskID");
        this.scroller = new Scroller();
        this.yOffset = 0;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("editedTaskID", this.taskChange);
    }
    setInitiallyProvidedValue(params) {
        if (params.broadCast !== undefined) {
            this.broadCast = params.broadCast;
        }
        if (params.naviAlpha !== undefined) {
            this.naviAlpha = params.naviAlpha;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.yOffset !== undefined) {
            this.yOffset = params.yOffset;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__naviAlpha.purgeDependencyOnElmtId(rmElmtId);
        this.__homeStore.purgeDependencyOnElmtId(rmElmtId);
        this.__editedTaskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__editedTaskID.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__broadCast.aboutToBeDeleted();
        this.__naviAlpha.aboutToBeDeleted();
        this.__homeStore.aboutToBeDeleted();
        this.__editedTaskInfo.aboutToBeDeleted();
        this.__editedTaskID.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get broadCast() {
        return this.__broadCast.get();
    }
    set broadCast(newValue) {
        this.__broadCast.set(newValue);
    }
    get naviAlpha() {
        return this.__naviAlpha.get();
    }
    set naviAlpha(newValue) {
        this.__naviAlpha.set(newValue);
    }
    get homeStore() {
        return this.__homeStore.get();
    }
    set homeStore(newValue) {
        this.__homeStore.set(newValue);
    }
    get editedTaskInfo() {
        return this.__editedTaskInfo.get();
    }
    set editedTaskInfo(newValue) {
        this.__editedTaskInfo.set(newValue);
    }
    get editedTaskID() {
        return this.__editedTaskID.get();
    }
    set editedTaskID(newValue) {
        this.__editedTaskID.set(newValue);
    }
    taskChange() {
        this.homeStore.updateTaskInfoList(this.editedTaskInfo);
    }
    taskItemAction(item, isClick) {
        if (!this.homeStore.checkCurrentDay()) {
            return;
        }
        if (isClick) {
            // click to clock
            let callback = { confirmCallback: (taskTemp) => {
                    this.onConfirm(taskTemp);
                }, cancelCallback: () => {
                } };
            this.broadCast.emit(BroadCastType.SHOW_TASK_DETAIL_DIALOG, [item, callback]);
        }
        else {
            // edit task
            let editTaskStr = JSON.stringify(TaskMapById[item.taskID - 1]);
            let editTask = JSON.parse(editTaskStr);
            editTask.targetValue = item === null || item === void 0 ? void 0 : item.targetValue;
            editTask.isAlarm = item.isAlarm;
            editTask.startTime = item.startTime;
            editTask.frequency = item.frequency;
            editTask.isOpen = item.isOpen;
            router.pushUrl({ url: 'pages/TaskEditPage', params: { params: JSON.stringify(editTask) } });
        }
    }
    //confirm clockL
    onConfirm(task) {
        this.homeStore.taskClock(task).then((res) => {
            if (res.showAchievement) {
                let achievementLevel = res.achievementLevel;
                if (achievementLevel) {
                    this.broadCast.emit(BroadCastType.SHOW_ACHIEVEMENT_DIALOG, achievementLevel);
                }
                else {
                    this.broadCast.emit(BroadCastType.SHOW_ACHIEVEMENT_DIALOG);
                }
            }
        });
    }
    // change navigator alpha when scrolling the Scroll component
    onScrollAction() {
        this.yOffset = this.scroller.currentOffset().yOffset;
        if (this.yOffset > Const.DEFAULT_56) {
            this.naviAlpha = 1;
        }
        else {
            this.naviAlpha = this.yOffset / Const.DEFAULT_56;
        }
    }
    editTaskAction() {
        if (this.homeStore.checkCurrentDay()) {
            router.pushUrl({ url: 'pages/TaskListPage' });
        }
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Stack.create();
            Stack.width(Const.THOUSANDTH_1000);
            Stack.height(Const.THOUSANDTH_1000);
            Stack.backgroundColor({ "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                Stack.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create(this.scroller);
            Scroll.scrollBar(BarState.Off);
            Scroll.width(Const.THOUSANDTH_1000);
            Scroll.height(Const.THOUSANDTH_1000);
            Scroll.onScroll(() => {
                this.onScrollAction();
            });
            Scroll.align(Alignment.TopStart);
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new HomeTopComponent(this, { homeStore: this.__homeStore }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777264, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            __Text__titleTextStyle();
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.homeStore.getTaskListOfDay().length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Column.create({ space: Const.DEFAULT_8 });
                        Column.onAppear(() => {
                            this.scroller.scrollTo({ xOffset: 0, yOffset: this.yOffset });
                        });
                        Column.padding({
                            top: Const.THOUSANDTH_15,
                            left: Const.THOUSANDTH_33,
                            right: Const.THOUSANDTH_33
                        });
                        Column.width(Const.THOUSANDTH_1000);
                        if (!isInitialRender) {
                            Column.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                __Common__.create();
                                __Common__.margin({ bottom: Const.DEFAULT_12 });
                                __Common__.height({ "id": 16777330, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                if (!isInitialRender) {
                                    __Common__.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    if (isInitialRender) {
                                        ViewPU.create(new TaskCard(this, {
                                            taskInfoStr: JSON.stringify(item),
                                            clickAction: (isClick) => this.taskItemAction(item, isClick)
                                        }, undefined, elmtId));
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            taskInfoStr: JSON.stringify(item)
                                        });
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                            }
                            __Common__.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.homeStore.getTaskListOfDay(), forEachItemGenFunction, (item) => JSON.stringify(item), false, false);
                        if (!isInitialRender) {
                            ForEach.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    ForEach.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Column.create({ space: Const.DEFAULT_8 });
                        Column.margin({ top: Const.DEFAULT_48 });
                        if (!isInitialRender) {
                            Column.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 16777383, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Image.width({ "id": 16777308, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Image.height({ "id": 16777305, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        __Common__.create();
                        __Common__.opacity(Const.OPACITY_4);
                        if (!isInitialRender) {
                            __Common__.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    {
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            if (isInitialRender) {
                                ViewPU.create(new HealthText(this, { title: '', titleResource: { "id": 16777248, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, fontSize: { "id": 16777309, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } }, undefined, elmtId));
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    title: ''
                                });
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                    }
                    __Common__.pop();
                    Column.pop();
                });
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        Column.pop();
        Scroll.pop();
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new AddBtn(this, {
                        clickAction: () => { this.editTaskAction(); },
                        homeStore: this.__homeStore
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomDialogView(this, {}, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=HomeComponent.js.map