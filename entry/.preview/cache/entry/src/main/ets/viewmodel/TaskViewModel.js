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
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
import reminder from '@bundle:com.example.healthy_life/entry/ets/service/ReminderAgent';
import TaskInfoApi from '@bundle:com.example.healthy_life/entry/ets/common/database/tables/TaskInfoApi';
import { padTo2Digits } from '@bundle:com.example.healthy_life/entry/ets/common/utils/Utils';
import { oneWeek } from '@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo';
import { TaskMapById, RemindContentMap } from '@bundle:com.example.healthy_life/entry/ets/model/TaskInitList';
import PublishReminderInfo from '@bundle:com.example.healthy_life/entry/ets/viewmodel/PublishReminderInfo';
const publishReminder = reminder.publishReminder;
const cancelReminder = reminder.cancelReminder;
const hasNotificationId = reminder.hasNotificationId;
export const taskOriginData = TaskMapById;
/**
 * @description Get all task status
 * @return object[] Database query results
 */
export const getAllTask = () => {
    return new Promise((resolve) => {
        TaskInfoApi.query(Const.GLOBAL_KEY, true, (res) => {
            if ((res === null || res === void 0 ? void 0 : res.length) === 0) {
                Logger.warn('queryTaskList', 'has no data!!');
                resolve(res !== null && res !== void 0 ? res : []);
            }
            resolve(res);
        });
    });
};
/**
 * @description Call notification capability
 * @param params {
 *  hour: Hour
 *  minute: Minute
 *  daysOfWeek: Frequency of a week
 *  title: Notice Title
 *  content: Contents of notice
 *  notificationId: Notification ID
 */
const useReminder = (params, context) => {
    try {
        let publishReminderInfo = new PublishReminderInfo();
        publishReminderInfo.hour = Number(params === null || params === void 0 ? void 0 : params.startTime.split(':')[0]);
        publishReminderInfo.minute = Number(params === null || params === void 0 ? void 0 : params.startTime.split(':')[1]);
        publishReminderInfo.daysOfWeek = params === null || params === void 0 ? void 0 : params.frequency.split(',').map(item => Number(item));
        publishReminderInfo.title = RemindContentMap[(params === null || params === void 0 ? void 0 : params.taskID) - 1].title;
        publishReminderInfo.content = RemindContentMap[(params === null || params === void 0 ? void 0 : params.taskID) - 1].content;
        publishReminderInfo.notificationId = params === null || params === void 0 ? void 0 : params.taskID;
        publishReminder(publishReminderInfo, context);
    }
    catch (error) {
        Logger.error('publishReminder', JSON.stringify(error));
    }
};
/**
 * @description Call cancel notification capability
 * @param reminderId Notification ID
 */
const useCancelReminder = (reminderId, context) => {
    try {
        cancelReminder(reminderId, context);
    }
    catch (error) {
        Logger.error('cancelReminder', JSON.stringify(error));
    }
};
/**
 * @description Determine whether there is a notification
 * @param notificationId Notification ID
 */
const isHasNotificationId = (notificationId) => {
    return new Promise((resolve) => {
        resolve(hasNotificationId(notificationId));
    });
};
/**
 * @param params:TaskInfo
 */
export const addTask = (params, context) => {
    if (!params) {
        Logger.error('addTask', 'params is null!');
        return new Promise((resolve) => {
            resolve(-1);
        });
    }
    return new Promise(async (resolve, reject) => {
        Logger.info('TaskViewModel', 'addTask');
        if (params === null || params === void 0 ? void 0 : params.isOpen) {
            if (params === null || params === void 0 ? void 0 : params.isAlarm) {
                useReminder(params, context);
            }
            else {
                isHasNotificationId(params === null || params === void 0 ? void 0 : params.taskID).then((flag) => {
                    if (flag) {
                        useCancelReminder(params.taskID, context);
                    }
                });
            }
        }
        else {
            isHasNotificationId(params === null || params === void 0 ? void 0 : params.taskID).then((flag) => {
                if (flag) {
                    useCancelReminder(params.taskID, context);
                }
            });
        }
        TaskInfoApi.updateDataByDate(params, (flag) => {
            if (!flag) {
                Logger.error('insertTaskSetting', 'updateTaskSetting Error!');
                reject(flag);
            }
            resolve(flag);
        });
        let taskInfoStr = JSON.stringify(params);
        let taskInfo = JSON.parse(taskInfoStr);
        taskInfo.date = new Date().toDateString();
        taskInfo.isDone = true;
        TaskInfoApi.updateDataByDate(taskInfo, (flag) => {
            if (!flag) {
                Logger.error('insertTaskSetting', 'updateTaskSetting Error!');
                reject(flag);
            }
            resolve(flag);
        });
    });
};
/**
 * @description Used to initialize task list data from database data
 * @param taskInitList Task list initial data
 * @param taskInfoData Database query data
 */
export const taskIndexDataInit = (taskInitList, taskInfoData) => {
    const afterInitData = taskInitList.map((content) => {
        taskInfoData.forEach((item) => {
            if ((item === null || item === void 0 ? void 0 : item.taskID) === (content === null || content === void 0 ? void 0 : content.taskID)) {
                content.isOpen = item === null || item === void 0 ? void 0 : item.isOpen;
                content.targetValue = item === null || item === void 0 ? void 0 : item.targetValue;
                content.isAlarm = item === null || item === void 0 ? void 0 : item.isAlarm;
                content.startTime = item === null || item === void 0 ? void 0 : item.startTime;
                content.endTime = item === null || item === void 0 ? void 0 : item.endTime;
                content.frequency = item === null || item === void 0 ? void 0 : item.frequency;
            }
        });
        return content;
    });
    return afterInitData;
};
/**
 * @description format data as json string
 * @param params = {}
 */
export const formatParams = (params) => {
    return JSON.stringify(params);
};
/**
 * @description Initialization frequency string
 * @param frequencyIdCollection
 * @return string Frequency string
 */
export const initFrequencyString = (frequencyIdCollection) => {
    if (frequencyIdCollection === '') {
        return Const.EVERYDAY;
    }
    const frequencyIdArray = frequencyIdCollection.split(',').map(item => Number(item) - 1);
    const length = frequencyIdArray.length;
    if (length === 7) {
        return Const.EVERYDAY;
    }
    const frequencyString = frequencyIdArray.reduce((pre, current) => {
        return pre + ' ' + oneWeek[current];
    }, '');
    return frequencyString;
};
/**
 * @description Returns the timestamp of today's selected time
 * @param currentTime
 * @return timestamp
 */
export function returnTimeStamp(currentTime) {
    const timeString = `${new Date().toDateString()} ${currentTime}`;
    return new Date(timeString).getTime();
}
/**
 * @description It is used for formatting time and displayed in the form of HH: mm
 * @param value
 */
export const formatTime = (value) => {
    let hour = (value === null || value === void 0 ? void 0 : value.hour) ? value === null || value === void 0 ? void 0 : value.hour : 8;
    let minute = (value === null || value === void 0 ? void 0 : value.minute) ? value === null || value === void 0 ? void 0 : value.minute : 0;
    return `${padTo2Digits(hour)}:${padTo2Digits(minute)}`;
};
/**
 * @description Range of generated drinking water 0.25 - 5 L
 * @return Array<string>
 */
export const createDrinkRange = () => {
    const drinkRangeArr = [];
    for (let i = Const.DRINK_STEP; i <= Const.DRINK_MAX_RANGE; i += Const.DRINK_STEP) {
        drinkRangeArr.push(`${i / Const.TIMES_100} L`);
    }
    return drinkRangeArr;
};
/**
 * @description Generate the range of eating apples 1 - 100
 * @return Array<string>
 */
export const createAppleRange = () => {
    const appleRangeArr = [];
    for (let i = 1; i <= Const.EAT_APPLE_RANGE; i++) {
        appleRangeArr.push(`${i} 个`);
    }
    return appleRangeArr;
};
//# sourceMappingURL=TaskViewModel.js.map