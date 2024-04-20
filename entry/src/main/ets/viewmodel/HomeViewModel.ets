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
import { isReachNewAchievement, ACHIEVEMENT_LEVEL_KEY } from '../model/AchieveModel';
import { TaskMapById, ITaskItem, ACHIEVEMENT_LEVEL_LIST } from '../model/TaskInitList';
import TaskInfo from './TaskInfo';
import DayInfo from './DayInfo';
import { dateToStr, weekDateFormat } from '../common/utils/Utils';
import { WeekDateModel, initializeOnStartUp, getPreviousWeek, WEEK_DAY_NUM } from '../model/WeekCalendarModel';
import DatabaseApi from '../model/DatabaseModel';
import TaskInfoTableApi from '../common/database/tables/TaskInfoApi';
import DayInfoApi from '../common/database/tables/DayInfoApi';
import GlobalInfoApi from '../common/database/tables/GlobalInfoApi';
import Logger from '../common/utils/Logger';
import GlobalInfo from './GlobalInfo';
import WeekCalendarInfo from './WeekCalendarInfo';
import AchievementInfo from './AchievementInfo';

@Observed
export class HomeStore {
  /**
   * @description 当前日期
   */
  public currentDate: Date;

  /**
   * 选取的日期是星期几 currentDate.getDay()
   */
  public selectedDay: number; // selected day of on week

  /**
   *  选择的日期
   */
  public selectedDate: Date;
  /**
   * @description Week组件的标题显示:xx年xx月xx日星期x
   */
  public dateTitle: string;

  /**
   * 选择日期的信息
   */
  public selectedDayInfo: WeekDateModel = new WeekDateModel('', '', new Date()); // task info on selected day

  constructor(currentDate: Date) {
    this.currentDate = currentDate;
    this.selectedDate = currentDate;
    this.dateTitle = weekDateFormat(currentDate.getTime());
    this.selectedDay = (this.selectedDate.getDay() + WEEK_DAY_NUM - 1) % WEEK_DAY_NUM;
  }

  public initData() {
    // get data form db
  }

  // check selected day is current day
  public checkCurrentDay(): boolean {
    return dateToStr(this.currentDate) === new Date(this.selectedDate).toDateString();
  }

  public updateSelectedDayInfo(selectedDayInfo: WeekDateModel) {
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

  public updateTaskInfoList(editedTaskInfo: ITaskItem) {
    if (editedTaskInfo?.taskID) {
      // edited task
      let taskID = editedTaskInfo.taskID;
      let targetValue = editedTaskInfo.targetValue;
      let isAlarm = editedTaskInfo.isAlarm;
      let frequency = editedTaskInfo.frequency;
      let startTime = editedTaskInfo.startTime;
      let endTime = editedTaskInfo.endTime;
      let isOpen = editedTaskInfo.isOpen;
      let task = new TaskInfo(0, dateToStr(new Date()), taskID, targetValue, isAlarm,
        startTime, endTime, frequency, true, targetValue, isOpen);
    }
  }

  public setSelectedShowDate(showDateTime: number) {
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

  public getDonePercent(): string {
    let dayInfo = this.selectedDayInfo?.dayInfo;
    Logger.debug("dayInfo", JSON.stringify(dayInfo));
    if (dayInfo && (dayInfo?.finTaskNum || 0) > 0) {
      if (dayInfo.finTaskNum > dayInfo.targetTaskNum) {
        return `${Const.DEFAULT_100}`;
      }
      return `${Math.ceil(dayInfo.finTaskNum / dayInfo.targetTaskNum * Const.DEFAULT_100)}`;
    }
    return '0';
  }

  public getTaskListOfDay(): TaskInfo[] {
    Logger.info('getTaskListOfDay', JSON.stringify(this.selectedDayInfo));
    if (this.selectedDayInfo && this.selectedDayInfo.taskList.length > 0) {
      return this.selectedDayInfo.taskList;
    }
    return [];
  }

  public async taskClock(taskInfo: TaskInfo) {
    let taskItem = await this.updateTask(taskInfo);
    let dateStr = this.selectedDayInfo?.dateStr;
    if (!taskItem) {
      return {
        achievementLevel: 0,
        showAchievement: false
      } as AchievementInfo;
    }

    this.selectedDayInfo.taskList = this.selectedDayInfo.taskList.map((item) => {
      return item.taskID === taskItem?.taskID ? taskItem : item;
    });
    let achievementLevel: number = 0;
    if (taskItem.isDone) {
      let dayInfo = await this.updateDayInfo();
      if (dayInfo && dayInfo?.finTaskNum === dayInfo?.targetTaskNum) {
        achievementLevel = await this.updateAchievement(this.selectedDayInfo.dayInfo);
      }
    }
    // this.dateArr = this.dateArr.map((item: WeekDateModel) => dateStr === item.dateStr ? this.selectedDayInfo : item);
    return {
      achievementLevel: achievementLevel,
      showAchievement: ACHIEVEMENT_LEVEL_LIST.includes(achievementLevel)
    } as AchievementInfo;
  }

  updateTask(task: TaskInfo): Promise<TaskInfo> {
    return new Promise((resolve, reject) => {
      let taskID = task.taskID;
      let targetValue = task.targetValue;
      let finValue = task.finValue;
      let updateTask = new TaskInfo(task.id, task.date, taskID, targetValue, task.isAlarm, task.startTime,
        task.endTime, task.frequency, task.isDone, finValue, task.isOpen);
      let step = TaskMapById[taskID - 1].step;
      let hasExceed = updateTask.isDone;
      if (step === 0) {
        updateTask.isDone = true;
        updateTask.finValue = targetValue;
      } else {
        let value = Number(finValue) + step;
        updateTask.isDone = updateTask.isDone || value >= Number(targetValue);
        updateTask.finValue = updateTask.isDone ? targetValue : `${value}`;
      }
      TaskInfoTableApi.updateDataByDate(updateTask, (res: number) => {
        if (!res || hasExceed) {
          Logger.error('taskClock-updateTask', JSON.stringify(res));
          reject(res);
        }
        resolve(updateTask);
      })
    })
  }

  updateDayInfo(): Promise<DayInfo> {
    let dayInfo: DayInfo = this.selectedDayInfo.dayInfo;
    dayInfo.finTaskNum += 1;
    dayInfo.targetTaskNum = this.selectedDayInfo.taskList.length;
    return new Promise((resolve, reject) => {
      DayInfoApi.updateData(dayInfo, (res: number) => {
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

  updateAchievement(dayInfo: DayInfo): Promise<number> {
    Logger.debug('taskClock-updateAchievement', JSON.stringify(dayInfo));
    return new Promise((resolve, reject) => {
      let preDay = new Date();
      preDay.setDate(preDay.getDate() - 1);
      preDay = new Date(preDay);
      let preDayStr = dateToStr(preDay);
      Logger.info('taskClock-updateAchievement-1', `${preDayStr}`);
      DayInfoApi.query(preDayStr, (res: DayInfo) => {
        Logger.info('taskClock-updateAchievement-2', JSON.stringify(res));
        let isReset = res?.date === '' || res?.targetTaskNum > res?.finTaskNum;
        GlobalInfoApi.query((res: GlobalInfo) => {
          Logger.info('taskClock-globalInfoApi', JSON.stringify(res));
          let achievementInfo = res;
            isReset ? (achievementInfo.checkInDays = 1) : (achievementInfo.checkInDays += 1);
          let isNewAchieve = isReachNewAchievement(achievementInfo);
          if (isNewAchieve) {
            AppStorage.SetOrCreate(ACHIEVEMENT_LEVEL_KEY, achievementInfo.checkInDays);
            achievementInfo.achievements = achievementInfo.achievements + ',' + achievementInfo.checkInDays;
          }
          GlobalInfoApi.updateData(achievementInfo, (res: number) => {
            if (!res) {
              Logger.error('taskClock-updateAchievement', JSON.stringify(res));
              reject(res);
            }
            Logger.debug('taskClock-updateAchievement', JSON.stringify(achievementInfo));
              isNewAchieve ? resolve(achievementInfo.checkInDays) : resolve(0);
          });
        });
      })
    });
  }
}