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
import AchievementMapInfo from '@bundle:com.example.healthy_life/entry/ets/viewmodel/AchievementMapInfo';
import TaskInfo from '@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo';
import { CommonConstants as Const } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
export const TaskList = [
    new TaskInfo(0, '', 1, '7:00', true, '', ';', '', false, '', true),
    new TaskInfo(1, '', 2, '1.5', true, '', ';', '', false, '', true),
    new TaskInfo(2, '', 3, '3', true, '08: 00', '', '', false, '', true),
    new TaskInfo(3, '', 4, '1', true, '', ';', '', false, '', true),
    new TaskInfo(4, '', 5, '21:30', true, '', ';', '', false, '', true),
    new TaskInfo(5, '', 6, '22:00', true, '', ';', '', false, '', true)
];
let achievementMap = new AchievementMapInfo();
export const AchievementMap = achievementMap;
export const TaskMapById = [
    {
        taskID: 1,
        taskName: { "id": 16777347, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777219, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777237, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '08: 00',
        isOpen: true,
        unit: '',
        step: 0,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    },
    {
        taskID: 2,
        taskName: { "id": 16777350, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777488, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777472, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '0.25',
        isOpen: false,
        unit: 'L',
        step: 0,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    },
    {
        taskID: 3,
        taskName: { "id": 16777343, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777304, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777486, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '1',
        isOpen: false,
        unit: '个',
        step: 1,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    },
    {
        taskID: 4,
        taskName: { "id": 16777349, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777232, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777484, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '1',
        isOpen: false,
        unit: '次',
        step: 0,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    },
    {
        taskID: 5,
        taskName: { "id": 16777344, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777225, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777302, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '1',
        isOpen: false,
        unit: '次',
        step: 0,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    },
    {
        taskID: 6,
        taskName: { "id": 16777348, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777473, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777230, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '20: 00',
        isOpen: false,
        unit: '',
        step: 0,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    },
    {
        taskID: 7,
        taskName: { "id": 16777349, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777223, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777230, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '20: 00',
        isOpen: false,
        unit: '',
        step: 0,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    }
];
export const TaskItem = new TaskInfo(1, '', 0, '7:00', true, 'string', 'string;', '', true, '6:58', false);
export const RemindContentMap = [
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
export const ACHIEVEMENT_LEVEL_LIST = [3, 7, 30, 50, 73, 99];
//# sourceMappingURL=TaskInitList.js.map