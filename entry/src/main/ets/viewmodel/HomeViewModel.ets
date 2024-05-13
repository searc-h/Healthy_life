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

  public todayPercent :string = "0";
  public selectDayPercent : string = "0";

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
    this.getTaskListOfDay("AddTask")
  }

  // check selected day is current day
  public checkCurrentDay(): boolean {
    return dateToStr(this.currentDate) === new Date(this.selectedDate).toDateString();
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
  public getDonePercent() :string {
    let havDone = 0
    if(this.userTaskList.length > 0){
      this.userTaskList.forEach(item=>{
        if(item.isDone) havDone+=1;
      })
      return  `${Math.floor(havDone/this.userTaskList.length * 100)}`
    }else{
      return "0"
    }
  }

  // 获取用户的当日任务列表
  public getTaskListOfDay(from:"AddTask" | "ChangeDate" = "AddTask") {
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
          if(from === "AddTask"){
           this.selectDayPercent = this.todayPercent = this.getDonePercent()
          }else{
            this.selectDayPercent = this.getDonePercent()
          }
        }else{
          AlertDialogService({message:res.message})
        }
      })
    }else{

    }

  }

  // 打卡
  public async taskClock(taskInfo: UserTaskType) {
    let taskItem :AchievementInfo = await this.updateTask(taskInfo);
    if (taskItem.level) {
      return {
        achievements: taskItem.achievements,
        level : taskItem.level,
        showAchievement: taskItem.showAchievement,
      } as AchievementInfo;
    }else{
      return {
        showAchievement: false,
      } as AchievementInfo;
    }

  }

  // 更新任务
  updateTask(task: UserTaskType): Promise<AchievementInfo> {
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
      httpRequest<AchievementInfo>({
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
        this.getTaskListOfDay("AddTask")
        // 重新获取用户成就
        getAchievementLevel(userId)
      })

    })
  }
}