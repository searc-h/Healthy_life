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
import AchievementMapInfo from '../viewmodel/AchievementMapInfo';

import TaskInfo from '../viewmodel/TaskInfo';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { httpRequest } from '../common/utils/httpUtils'
import { UserInfo } from './Mine';

/**
 * @description 任务的相关信息
 */
export interface ITaskItem {
  // Task_Id
  _id ?:number,
  // 前端的任务ID
  taskId: number;
  // 任务名称
  taskName: Resource | string;
  // 是否开启
  isOpen: boolean;
  // 单位
  unit: string;
  // 图标资源
  icon: Resource;
  // 弹窗背景
  dialogBg: Resource;
  // 目标值
  targetValue: string;

  // 当前值
  currentValue : string;
  // 是否开启提示
  isAlarm: boolean;
  // 提醒开始时间
  startTime: string;
  // 提醒结束时间
  endTime: string;
  // 提醒频率
  frequency: string;
  // 是否初始化
  isInit: boolean;
  // 打卡递增值
  step: number;

  [k:string]: any;
}


export interface UserTaskType {
  _id: string,
  userId: UserInfo,
  taskId: ITaskItem,
  date: string,
  timeStamp: number,
  isAlarm: boolean,
  startTime: string,
  endTime: string,
  frequency: string,
  currentValue: string,
  targetValue : string,
  isDone: boolean,
  isOpen: boolean,
}



export interface RemindContentItem {
  title: string;
  content: string;
}

export interface FrequencyContentType {
  id: number,
  label: string,
  isChecked: boolean
}

export const TaskList: TaskInfo[] = [
  new TaskInfo(0, '', 1, '7:00', true, '', ';', '', false, '', true),
  new TaskInfo(1, '', 2, '1.5', true, '', ';', '', false, '', true),
  new TaskInfo(2, '', 3, '3', true, '08: 00', '', '', false, '', true),
  new TaskInfo(3, '', 4, '1', true, '', ';', '', false, '', true),
  new TaskInfo(4, '', 5, '21:30', true, '', ';', '', false, '', true),
  new TaskInfo(5, '', 6, '22:00', true, '', ';', '', false, '', true)
]

let achievementMap = new AchievementMapInfo();
export const AchievementMap = achievementMap;



export const TaskItem = new TaskInfo(1, '', 0, '7:00', true, 'string', 'string;', '', true, '6:58', false);

export const RemindContentMap: Array<RemindContentItem> = [
  {
    title: Const.GET_UP_TASK_NAME,
    content: Const.GET_UP_CONTENT
  },
  {
    title: Const.DRINK_TASK_NAME,
    content: Const.DRINK_CONTENT
  },
  {
    title: Const.EAT_APPLE_TASK_NAME,
    content: Const.EAT_APPLE_CONTENT
  },
  {
    title: Const.SMILE_TASK_NAME,
    content: Const.SMILE_CONTENT
  },
  {
    title: Const.BRUSH_TEETH_TASK_NAME,
    content: Const.BRUSH_TEETH_CONTENT
  },
  {
    title: Const.SLEEP_TASK_NAME,
    content: Const.SLEEP_CONTENT
  }
];

export const ACHIEVEMENT_LEVEL_LIST = [3, 7, 14, 30, 50, 73, 99, 120, 180];