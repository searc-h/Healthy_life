var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { isReachNewAchievement, ACHIEVEMENT_LEVEL_KEY } from '@bundle:com.example.healthy_life/entry/ets/model/AchieveModel';
import { TaskMapById, ACHIEVEMENT_LEVEL_LIST } from '@bundle:com.example.healthy_life/entry/ets/model/TaskInitList';
import TaskInfo from '@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo';
import { dateToStr, weekDateFormat } from '@bundle:com.example.healthy_life/entry/ets/common/utils/Utils';
import { WeekDateModel, WEEK_DAY_NUM } from '@bundle:com.example.healthy_life/entry/ets/model/WeekCalendarModel';
import TaskInfoTableApi from '@bundle:com.example.healthy_life/entry/ets/common/database/tables/TaskInfoApi';
import DayInfoApi from '@bundle:com.example.healthy_life/entry/ets/common/database/tables/DayInfoApi';
import GlobalInfoApi from '@bundle:com.example.healthy_life/entry/ets/common/database/tables/GlobalInfoApi';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
let HomeStore = class HomeStore {
    constructor(currentDate) {
        /**
         * 选择日期的信息
         */
        this.selectedDayInfo = new WeekDateModel('', '', new Date()); // task info on selected day
        this.currentDate = currentDate;
        this.selectedDate = currentDate;
        this.dateTitle = weekDateFormat(currentDate.getTime());
        this.selectedDay = (this.selectedDate.getDay() + WEEK_DAY_NUM - 1) % WEEK_DAY_NUM;
    }
    initData() {
        // get data form db
    }
    // check selected day is current day
    checkCurrentDay() {
        return dateToStr(this.currentDate) === new Date(this.selectedDate).toDateString();
    }
    updateSelectedDayInfo(selectedDayInfo) {
        // Logger.debug('updateSelectedDayInfo', JSON.stringify(selectedDayInfo));
        // if (selectedDayInfo.taskList?.length === 0) {
        //   // get data form db
        //   TaskInfoTableApi.query(selectedDayInfo.dateStr, true, (res: TaskInfo[]) => {
        //     Logger.info('Selected TaskInfoList: ', JSON.stringify(res));
        //     selectedDayInfo.taskList = res;
        //     this.dateArr = this.dateArr.map((item: WeekDateModel) => {
        //       if(item.dateStr === selectedDayInfo.dateStr) {
        //         let taskListStr = JSON.stringify(res);
        //         item.taskList = JSON.parse(taskListStr);
        //         return item;
        //       } else {
        //         return item;
        //       }
        //     })
        //     this.selectedDayInfo = selectedDayInfo;
        //   });
        // } else {
        //   this.selectedDayInfo = selectedDayInfo;
        // }
        // Logger.info("selectedDayTaskInfo: ", JSON.stringify(selectedDayInfo.taskList));
    }
    updateTaskInfoList(editedTaskInfo) {
        if (editedTaskInfo === null || editedTaskInfo === void 0 ? void 0 : editedTaskInfo.taskID) {
            // edited task
            let taskID = editedTaskInfo.taskID;
            let targetValue = editedTaskInfo.targetValue;
            let isAlarm = editedTaskInfo.isAlarm;
            let frequency = editedTaskInfo.frequency;
            let startTime = editedTaskInfo.startTime;
            let endTime = editedTaskInfo.endTime;
            let isOpen = editedTaskInfo.isOpen;
            let task = new TaskInfo(0, dateToStr(new Date()), taskID, targetValue, isAlarm, startTime, endTime, frequency, true, targetValue, isOpen);
        }
    }
    setSelectedShowDate(showDateTime) {
        if (showDateTime > new Date().getTime()) {
            return;
        }
        this.selectedDate = new Date(showDateTime);
        this.dateTitle = weekDateFormat(this.selectedDate.getTime());
        // let selectedInfo = this.dateArr.find((item: WeekDateModel) => item.dateStr === dateToStr(new Date(showDateTime)));
        // if (selectedInfo) {
        //   this.updateSelectedDayInfo(selectedInfo);
        // }
        Logger.info('dateTitle', this.dateTitle);
    }
    getDonePercent() {
        var _a;
        let dayInfo = (_a = this.selectedDayInfo) === null || _a === void 0 ? void 0 : _a.dayInfo;
        Logger.debug("dayInfo", JSON.stringify(dayInfo));
        if (dayInfo && ((dayInfo === null || dayInfo === void 0 ? void 0 : dayInfo.finTaskNum) || 0) > 0) {
            if (dayInfo.finTaskNum > dayInfo.targetTaskNum) {
                return `${Const.DEFAULT_100}`;
            }
            return `${Math.ceil(dayInfo.finTaskNum / dayInfo.targetTaskNum * Const.DEFAULT_100)}`;
        }
        return '0';
    }
    getTaskListOfDay() {
        Logger.info('getTaskListOfDay', JSON.stringify(this.selectedDayInfo));
        if (this.selectedDayInfo && this.selectedDayInfo.taskList.length > 0) {
            return this.selectedDayInfo.taskList;
        }
        return [];
    }
    async taskClock(taskInfo) {
        var _a;
        let taskItem = await this.updateTask(taskInfo);
        let dateStr = (_a = this.selectedDayInfo) === null || _a === void 0 ? void 0 : _a.dateStr;
        if (!taskItem) {
            return {
                achievementLevel: 0,
                showAchievement: false
            };
        }
        this.selectedDayInfo.taskList = this.selectedDayInfo.taskList.map((item) => {
            return item.taskID === (taskItem === null || taskItem === void 0 ? void 0 : taskItem.taskID) ? taskItem : item;
        });
        let achievementLevel = 0;
        if (taskItem.isDone) {
            let dayInfo = await this.updateDayInfo();
            if (dayInfo && (dayInfo === null || dayInfo === void 0 ? void 0 : dayInfo.finTaskNum) === (dayInfo === null || dayInfo === void 0 ? void 0 : dayInfo.targetTaskNum)) {
                achievementLevel = await this.updateAchievement(this.selectedDayInfo.dayInfo);
            }
        }
        // this.dateArr = this.dateArr.map((item: WeekDateModel) => dateStr === item.dateStr ? this.selectedDayInfo : item);
        return {
            achievementLevel: achievementLevel,
            showAchievement: ACHIEVEMENT_LEVEL_LIST.includes(achievementLevel)
        };
    }
    updateTask(task) {
        return new Promise((resolve, reject) => {
            let taskID = task.taskID;
            let targetValue = task.targetValue;
            let finValue = task.finValue;
            let updateTask = new TaskInfo(task.id, task.date, taskID, targetValue, task.isAlarm, task.startTime, task.endTime, task.frequency, task.isDone, finValue, task.isOpen);
            let step = TaskMapById[taskID - 1].step;
            let hasExceed = updateTask.isDone;
            if (step === 0) {
                updateTask.isDone = true;
                updateTask.finValue = targetValue;
            }
            else {
                let value = Number(finValue) + step;
                updateTask.isDone = updateTask.isDone || value >= Number(targetValue);
                updateTask.finValue = updateTask.isDone ? targetValue : `${value}`;
            }
            TaskInfoTableApi.updateDataByDate(updateTask, (res) => {
                if (!res || hasExceed) {
                    Logger.error('taskClock-updateTask', JSON.stringify(res));
                    reject(res);
                }
                resolve(updateTask);
            });
        });
    }
    updateDayInfo() {
        let dayInfo = this.selectedDayInfo.dayInfo;
        dayInfo.finTaskNum += 1;
        dayInfo.targetTaskNum = this.selectedDayInfo.taskList.length;
        return new Promise((resolve, reject) => {
            DayInfoApi.updateData(dayInfo, (res) => {
                if (!res) {
                    Logger.error('taskClock-updateDayInfo', JSON.stringify(res));
                    reject(res);
                }
                Logger.info('taskClock-updateDayInfo', JSON.stringify(dayInfo));
                // 同步界面数据
                let dayInfoStr = JSON.stringify(dayInfo);
                this.selectedDayInfo.dayInfo = JSON.parse(dayInfoStr);
                resolve(dayInfo);
            });
        });
    }
    updateAchievement(dayInfo) {
        Logger.debug('taskClock-updateAchievement', JSON.stringify(dayInfo));
        return new Promise((resolve, reject) => {
            let preDay = new Date();
            preDay.setDate(preDay.getDate() - 1);
            preDay = new Date(preDay);
            let preDayStr = dateToStr(preDay);
            Logger.info('taskClock-updateAchievement-1', `${preDayStr}`);
            DayInfoApi.query(preDayStr, (res) => {
                Logger.info('taskClock-updateAchievement-2', JSON.stringify(res));
                let isReset = (res === null || res === void 0 ? void 0 : res.date) === '' || (res === null || res === void 0 ? void 0 : res.targetTaskNum) > (res === null || res === void 0 ? void 0 : res.finTaskNum);
                GlobalInfoApi.query((res) => {
                    Logger.info('taskClock-globalInfoApi', JSON.stringify(res));
                    let achievementInfo = res;
                    isReset ? (achievementInfo.checkInDays = 1) : (achievementInfo.checkInDays += 1);
                    let isNewAchieve = isReachNewAchievement(achievementInfo);
                    if (isNewAchieve) {
                        AppStorage.SetOrCreate(ACHIEVEMENT_LEVEL_KEY, achievementInfo.checkInDays);
                        achievementInfo.achievements = achievementInfo.achievements + ',' + achievementInfo.checkInDays;
                    }
                    GlobalInfoApi.updateData(achievementInfo, (res) => {
                        if (!res) {
                            Logger.error('taskClock-updateAchievement', JSON.stringify(res));
                            reject(res);
                        }
                        Logger.debug('taskClock-updateAchievement', JSON.stringify(achievementInfo));
                        isNewAchieve ? resolve(achievementInfo.checkInDays) : resolve(0);
                    });
                });
            });
        });
    }
};
HomeStore = __decorate([
    Observed
], HomeStore);
export { HomeStore };
//# sourceMappingURL=HomeViewModel.js.map