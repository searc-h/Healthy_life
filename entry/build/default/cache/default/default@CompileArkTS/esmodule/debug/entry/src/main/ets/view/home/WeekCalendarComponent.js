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
import display from '@ohos:display';
import WeekCalendarMethods from '@bundle:com.example.healthy_life/entry/ets/viewmodel/CalendarViewModel';
import HealthText from '@bundle:com.example.healthy_life/entry/ets/view/HealthTextComponent';
import { sameDate } from '@bundle:com.example.healthy_life/entry/ets/common/utils/Utils';
import { CommonConstants as Const } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
export const WEEK_DAY_WIDTH = 100 / Const.WEEK_DAY_NUM;
const DEFAULT_SCROLL_WIDTH = 336; // default calendar width
const DEFAULT_SCROLL_PERCENT = 0.934; // default calendar width percent
export class WeekCalendar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__homeStore = new SynchedPropertyObjectTwoWayPU(params.homeStore, this, "homeStore");
        this.currentPage = 1;
        this.scroller = new Scroller();
        this.scrollWidth = DEFAULT_SCROLL_WIDTH;
        this.isLoadMore = false;
        this.isPageScroll = false;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.currentPage !== undefined) {
            this.currentPage = params.currentPage;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.scrollWidth !== undefined) {
            this.scrollWidth = params.scrollWidth;
        }
        if (params.isLoadMore !== undefined) {
            this.isLoadMore = params.isLoadMore;
        }
        if (params.isPageScroll !== undefined) {
            this.isPageScroll = params.isPageScroll;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__homeStore.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__homeStore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get homeStore() {
        return this.__homeStore.get();
    }
    set homeStore(newValue) {
        this.__homeStore.set(newValue);
    }
    aboutToAppear() {
        try {
            let displayClass = display.getDefaultDisplaySync();
            this.scrollWidth = displayClass.width / displayClass.densityPixels * DEFAULT_SCROLL_PERCENT;
            Logger.info('HomeIndex', 'get the window scrollWidth: ' + this.scrollWidth);
        }
        catch (err) {
            Logger.error('HomeIndex->onScrollEnd', JSON.stringify(err));
        }
        this.homeStore.setSelectedShowDate(new Date().getTime());
    }
    getProgressImg(item) {
        var _a, _b;
        let finNum = ((_a = item.dayInfo) === null || _a === void 0 ? void 0 : _a.finTaskNum) || 0;
        if (finNum === 0) {
            return { "id": 16777377, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
        }
        if (finNum === (((_b = item.dayInfo) === null || _b === void 0 ? void 0 : _b.targetTaskNum) || 0)) {
            return { "id": 16777374, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
        }
        return { "id": 16777376, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
    }
    ArrowIcon(isRight, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.width({ "id": 16777309, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.height({ "id": 16777309, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.rotate({ z: 1, angle: isRight ? 0 : Const.DEFAULT_180 });
            Row.justifyContent(FlexAlign.Center);
            Row.onClick(() => isRight ?
                WeekCalendarMethods.goToNextWeek(this.currentPage, this.isPageScroll, ObservedObject.GetRawObject(this.homeStore), this.scroller) :
                WeekCalendarMethods.gotoPreviousWeek(this.isPageScroll, ObservedObject.GetRawObject(this.homeStore), this.currentPage, this.scroller));
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777380, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.width({ "id": 16777326, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.height({ "id": 16777303, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.height(Const.THOUSANDTH_420);
            Row.padding(Const.THOUSANDTH_33);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.borderRadius({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundColor({ "id": 16777290, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.width(Const.THOUSANDTH_1000);
            Column.height(Const.THOUSANDTH_1000);
            Column.padding({ top: Const.THOUSANDTH_50, bottom: Const.THOUSANDTH_120 });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.justifyContent(FlexAlign.Center);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.ArrowIcon.bind(this)(false);
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            __Common__.create();
            __Common__.margin({ "id": 16777303, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                __Common__.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new HealthText(this, { title: this.homeStore.dateTitle, fontSize: { "id": 16777306, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: this.homeStore.dateTitle
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        __Common__.pop();
        this.ArrowIcon.bind(this)(true);
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create(this.scroller);
            Scroll.scrollBar(BarState.Off);
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.width(Const.THOUSANDTH_1000);
            Scroll.onScrollStop(() => this.onScrollEndAction());
            Scroll.onScrollEdge((event) => this.onScrollEdgeAction(event));
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
                const item = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.width(`${WEEK_DAY_WIDTH}%`);
                    Column.justifyContent(FlexAlign.SpaceBetween);
                    Column.onClick(() => WeekCalendarMethods.calenderItemClickAction(item, index, ObservedObject.GetRawObject(this.homeStore)));
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(item.weekTitle);
                    Text.fontSize({ "id": 16777303, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.fontWeight(Const.FONT_WEIGHT_500);
                    Text.fontColor(sameDate(item.date, this.homeStore.showDate) ? { "id": 16777268, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777289, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.fontFamily({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Text.opacity(Const.OPACITY_6);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Divider.create();
                    Divider.margin({ top: Const.DEFAULT_2, bottom: { "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
                    Divider.width({ "id": 16777303, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Divider.color(sameDate(item.date, this.homeStore.showDate) ? { "id": 16777268, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777290, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    if (!isInitialRender) {
                        Divider.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Image.create(this.getProgressImg(item));
                    Image.height({ "id": 16777315, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Image.objectFit(ImageFit.Contain);
                    Image.margin({ top: Const.THOUSANDTH_80 });
                    if (!isInitialRender) {
                        Image.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.homeStore.dateArr, forEachItemGenFunction, undefined, true, false);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        Row.pop();
        Scroll.pop();
        Column.pop();
        Row.pop();
    }
    onScrollEndAction() {
        if (this.isPageScroll === false) {
            let page = Math.round(this.scroller.currentOffset().xOffset / this.scrollWidth);
            page = (this.isLoadMore === true) ? page + 1 : page;
            if (this.scroller.currentOffset().xOffset % this.scrollWidth != 0 || this.isLoadMore === true) {
                let xOffset = page * this.scrollWidth;
                this.scroller.scrollTo({ xOffset, yOffset: 0 });
                this.isLoadMore = false;
            }
            this.currentPage = this.homeStore.dateArr.length / Const.WEEK_DAY_NUM - page - 1;
            Logger.info('HomeIndex', 'onScrollEnd: page ' + page + ', listLength ' + this.homeStore.dateArr.length);
            let dayModel = this.homeStore.dateArr[Const.WEEK_DAY_NUM * page + this.homeStore.selectedDay];
            Logger.info('HomeIndex', 'currentItem: ' + JSON.stringify(dayModel) + ', selectedDay  ' + this.homeStore.selectedDay);
            this.homeStore.setSelectedShowDate(dayModel.date.getTime());
        }
        this.isPageScroll = false;
    }
    onScrollEdgeAction(side) {
        if (side === Edge.Top && this.isPageScroll === false) {
            Logger.info('HomeIndex', 'onScrollEdge: currentPage ' + this.currentPage);
            if ((this.currentPage + 2) * Const.WEEK_DAY_NUM >= this.homeStore.dateArr.length) {
                Logger.info('HomeIndex', 'onScrollEdge: load more data');
                let date = new Date(this.homeStore.showDate);
                date.setDate(date.getDate() - Const.WEEK_DAY_NUM);
                this.homeStore.getPreWeekData(date, () => { });
                this.isLoadMore = true;
            }
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=WeekCalendarComponent.js.map