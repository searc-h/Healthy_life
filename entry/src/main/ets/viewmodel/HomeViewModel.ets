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
import { isReachNewAchievement, ACHIEVEMENT_LEVEL_KEY, getAchievementLevel } from '../model/AchieveModel';
import { ITaskItem, ACHIEVEMENT_LEVEL_LIST } from '../model/TaskInitList';
import TaskInfo from './TaskInfo';
import DayInfo from './DayInfo';
import { UserTaskType } from '../model/TaskInitList'
import { dateToStr, weekDateFormat } from '../common/utils/Utils';
import { WeekDateModel , WEEK_DAY_NUM } from '../model/WeekCalendarModel';

import TaskInfoTableApi from '../common/database/tables/TaskInfoApi';
import DayInfoApi from '../common/database/tables/DayInfoApi';
import GlobalInfoApi from '../common/database/tables/GlobalInfoApi';
import Logger from '../common/utils/Logger';
import GlobalInfo from './GlobalInfo';

import AchievementInfo from './AchievementInfo';

import {httpRequest} from '../common/utils/httpUtils'
import {GlobalContext} from '../common/utils/GlobalContext'
import { UserInfo } from '../model/Mine';
import { AlertDialogService } from '../service/AlertDialogService';
import http from '@ohos.net.http';

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

  public selectedLocalString : string;
  /**
   * @description Week组件的标题显示:xx年xx月xx日星期x
   */
  public dateTitle: string;


  public userTaskList: UserTaskType[] = [];

  /**
   * 选择日期的信息
   */
  public selectedDayInfo: WeekDateModel = new WeekDateModel('', '', new Date()); // task info on selected day

  constructor(currentDate: Date) {
    this.currentDate = currentDate;
    this.selectedDate = currentDate;
    this.selectedLocalString =  `${this.selectedDate.getFullYear()}/${this.selectedDate.getMonth()+1}/${this.selectedDate.getDate()}`
    this.dateTitle = weekDateFormat(currentDate.getTime());
    this.selectedDay = (this.selectedDate.getDay() + WEEK_DAY_NUM - 1) % WEEK_DAY_NUM;
  }

  public initData() {
    this.getTaskListOfDay()
  }

  // check selected day is current day
  public checkCurrentDay(): boolean {
    return dateToStr(this.currentDate) === new Date(this.selectedDate).toDateString();
  }


  public updateTaskInfoList(editedTaskInfo: ITaskItem) {
    if (editedTaskInfo?.taskId) {
      // edited task
      let taskID = editedTaskInfo.taskId;
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

  // 设置选择的日期
  public setSelectedShowDate(showDateTime: number) {
    if (showDateTime > new Date().getTime()) {
      return;
    }
    this.selectedDate = new Date(showDateTime);

    this.dateTitle = weekDateFormat(this.selectedDate.getTime());

    this.selectedLocalString = `${this.selectedDate.getFullYear()}/${this.selectedDate.getMonth()+1}/${this.selectedDate.getDate()}`

    Logger.info('dateTitle', this.dateTitle);
  }

  // 获取当前完成百分比
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

  // 获取用户的当日任务列表
  public getTaskListOfDay() {
    let userInfo = GlobalContext.getContext().getObject("User_Info") as UserInfo
    if(userInfo?.userId){
      httpRequest<any[]>({
        url:`/tasks/user/${userInfo.userId}`,
        query: {
          date : this.selectedLocalString
        }
      }).then(res=>{
        if(res.errno === -1){
          this.userTaskList = res.data
        }else{
          AlertDialogService({message:res.message})
        }
      })
    }else{

    }

  }

  // 打卡
  public async taskClock(taskInfo: UserTaskType) {
    let taskItem = await this.updateTask(taskInfo);

    if (!taskItem) {
      return {
        achievements: 0,
        level : 0,
        showAchievement: false
      } as AchievementInfo;
    }

    // let achievementLevel: number = 0;
    // if (taskItem.isDone) {
    //   let dayInfo = await this.updateDayInfo();
    //   if (dayInfo && dayInfo?.finTaskNum === dayInfo?.targetTaskNum) {
    //     achievementLevel = await this.updateAchievement(this.selectedDayInfo.dayInfo);
    //   }
    // }
    // this.dateArr = this.dateArr.map((item: WeekDateModel) => dateStr === item.dateStr ? this.selectedDayInfo : item);
    return {
      achievements: 3,
      level : 1,
      showAchievement: true,
    } as AchievementInfo;
  }

  // 更新任务
  updateTask(task: UserTaskType): Promise<UserTaskType> {
    return new Promise((resolve, reject) => {
      let userId = task.userId._id;
      let taskId = task.taskId._id;
      let isDone = task.isDone;
      let currentValue = task.currentValue;
      let step = task.taskId.step;

      if (step === 0) {
        isDone = true;
        currentValue = task.targetValue;
      } else {
        let value = Number(currentValue) + step;
        isDone = isDone || value >= Number(task.targetValue);
        currentValue = task.isDone ? task.targetValue : `${value}`;
      }
      // 更新任务
      httpRequest<UserTaskType>({
        url : "/tasks/user",
        method : http.RequestMethod.POST,
        extraData : {
          ...task,
          isDone,
          currentValue,
          taskId: taskId,
          userId : userId,
        }
      }).then((res)=>{
        if(res.errno === 0){
          AlertDialogService({message:res.message})
        }else{
          resolve(res.data)
        }
      }).catch(err=>{
        Logger.error('taskClock-updateTask', JSON.stringify(err));
        reject(err);
      }).finally(()=>{
        // 更新任务列表
        this.getTaskListOfDay()
        // 重新获取用户成就
        getAchievementLevel(userId)
      })

    })
  }

  updateDayInfo(): Promise<DayInfo> {
    let dayInfo: DayInfo = this.selectedDayInfo.dayInfo;
    dayInfo.finTaskNum += 1;
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