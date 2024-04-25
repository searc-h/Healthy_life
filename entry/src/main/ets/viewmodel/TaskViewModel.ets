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

import { CommonConstants as Const } from '../common/constants/CommonConstants';
import Logger from '../common/utils/Logger';
import reminder from '../service/ReminderAgent';

import { padTo2Digits } from '../common/utils/Utils';
import TaskInfo, { oneWeek } from './TaskInfo';
import { TaskMapById, RemindContentMap, ITaskItem } from '../model/TaskInitList';
import PublishReminderInfo from './PublishReminderInfo';

import { httpRequest } from '../common/utils/httpUtils'
import http from '@ohos.net.http';
import { GlobalContext } from '../common/utils/GlobalContext';
import { UserInfo } from '../model/Mine';
import { AlertDialogService } from '../service/AlertDialogService';
import router from '@ohos.router';

const publishReminder = reminder.publishReminder;
const cancelReminder = reminder.cancelReminder;
const hasNotificationId = reminder.hasNotificationId;
export const taskOriginData: ITaskItem[] = TaskMapById;

/**
 * @description Get all task status
 * @return object[] Database query results
 */
export const getAllTask = () => {

  return new Promise<ITaskItem[]>(res=>{
    httpRequest({
      url : "/tasks/list"
    }).then(list=>{
      res(list.data)
    })
  })
}

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
const useReminder = (params: ITaskItem, context: Context) => {
  try {
    let publishReminderInfo = new PublishReminderInfo();
    publishReminderInfo.hour = Number(params?.startTime.split(':')[0]);
    publishReminderInfo.minute = Number(params?.startTime.split(':')[1]);
    publishReminderInfo.daysOfWeek = params?.frequency.split(',').map(item => Number(item));
    publishReminderInfo.title = RemindContentMap[params?.taskId - 1].title;
    publishReminderInfo.content = RemindContentMap[params?.taskId - 1].content;
    publishReminderInfo.notificationId = params?.taskId;
    publishReminder(publishReminderInfo, context);
  } catch (error) {
    Logger.error('publishReminder', JSON.stringify(error));
  }
}

/**
 * @description Call cancel notification capability
 * @param reminderId Notification ID
 */
const useCancelReminder = (reminderId: number, context: Context) => {
  try {
    cancelReminder(reminderId, context);
  } catch (error) {
    Logger.error('cancelReminder', JSON.stringify(error));
  }
}

/**
 * @description Determine whether there is a notification
 * @param notificationId Notification ID
 */
const isHasNotificationId = (notificationId: number) => {
  return new Promise<boolean>((resolve) => {
    resolve(hasNotificationId(notificationId));
  });
}

/**
 * @param params:TaskInfo
 */
export const addTask = async  (params: ITaskItem, context: Context)  => {
  if (!params) {
    Logger.error('addTask', 'params is null!');
    return Promise.resolve("params is null!")
  }

  if (params?.isOpen) {
    if (params?.isAlarm) {
      useReminder(params, context);
    } else {
      isHasNotificationId(params?.taskId).then((flag: boolean) => {
        if (flag) {
          useCancelReminder(params.taskId, context);
        }
      });
    }
  } else {
    isHasNotificationId(params?.taskId).then((flag: boolean) => {
      if (flag) {
        useCancelReminder(params.taskId, context);
      }
    });
  }
  let userInfo = GlobalContext.getContext().getObject("User_Info") as UserInfo

  if(userInfo){
    // 请求
    let res = await httpRequest({
      url : "/tasks/user",
      method : http.RequestMethod.POST,
      extraData : {
        ...params,
        taskId: params._id,
        userId : userInfo.userId,
      }
    }).then(res=>{
      AlertDialogService({
        message : res.message
      })
    })
    return res
  }else{
    AlertDialogService({
      message: "请先登录",
      action : ()=>{
        router.pushUrl({url : "/pages/LoginPage"})
      }
    })
    return Promise.resolve("no login")
  }

}

/**
 * @description Used to initialize task list data from database data
 * @param taskInitList Task list initial data
 * @param taskInfoData Database query data
 */
export const taskIndexDataInit = (taskInitList: ITaskItem[], taskInfoData: TaskInfo[]) => {
  const afterInitData = taskInitList.map((content) => {
    taskInfoData.forEach((item) => {
      if (item?.taskID === content?.taskId) {
        content.isOpen = item?.isOpen;
        content.targetValue = item?.targetValue;
        content.isAlarm = item?.isAlarm;
        content.startTime = item?.startTime;
        content.endTime = item?.endTime;
        content.frequency = item?.frequency;
      }
    });
    return content;
  });
  return afterInitData;
}

/**
 * @description format data as json string
 * @param params = {}
 */
export const formatParams = (params: ITaskItem) => {
  return JSON.stringify(params);
}

/**
 * @description Initialization frequency string
 * @param frequencyIdCollection
 * @return string Frequency string
 */
export const initFrequencyString = (frequencyIdCollection: string) => {
  if (frequencyIdCollection === '') {
    return Const.EVERYDAY;
  }
  const frequencyIdArray: Array<number> = frequencyIdCollection.split(',').map(item => Number(item) - 1);
  const length = frequencyIdArray.length;
  if (length === 7) {
    return Const.EVERYDAY;
  }
  const frequencyString = frequencyIdArray.reduce((pre, current) => {
    return pre + ' ' + oneWeek[current];
  }, '')
  return frequencyString;
}

/**
 * @description Returns the timestamp of today's selected time
 * @param currentTime
 * @return timestamp
 */
export function returnTimeStamp(currentTime: string) {
  const timeString = `${new Date().toDateString()} ${currentTime}`;
  return new Date(timeString).getTime();
}

/**
 * @description It is used for formatting time and displayed in the form of HH: mm
 * @param value
 */
export const formatTime = (value: TimePickerResult) => {
  let hour = value?.hour ? value?.hour : 8;
  let minute = value?.minute ? value?.minute : 0;
  return `${padTo2Digits(hour)}:${padTo2Digits(minute)}`;
}

/**
 * @description Range of generated drinking water 0.25 - 5 L
 * @return Array<string>
 */
export const createDrinkRange = () => {
  const drinkRangeArr: Array<string> = []
  for (let i = Const.DRINK_STEP; i <= Const.DRINK_MAX_RANGE; i += Const.DRINK_STEP) {
    drinkRangeArr.push(`${i / Const.TIMES_100} L`);
  }
  return drinkRangeArr;
}

/**
 * @description Generate the range of eating apples 1 - 100
 * @return Array<string>
 */
export const createAppleRange = () => {
  const appleRangeArr: Array<string> = [];
  for (let i = 1; i <= Const.EAT_APPLE_RANGE; i++) {
    appleRangeArr.push(`${i} 个`);
  }
  return appleRangeArr;
}