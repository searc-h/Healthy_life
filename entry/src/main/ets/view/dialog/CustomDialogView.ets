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

import { AchievementDialog } from './AchievementDialog';
import { TaskDetailDialog } from './TaskDetailDialog';
import { BroadCast, BroadCastType } from '../../common/utils/BroadCast';
import { TaskItem,UserTaskType } from '../../model/TaskInitList';
import TaskInfo from '../../viewmodel/TaskInfo';
import Logger from '../../common/utils/Logger';

export class CustomDialogCallback<T = any> {
  confirmCallback: Function = (item:T) => {};
  cancelCallback: Function = () => {};
  shareCallback? : Function = ()=>{};
}

@Component
export struct CustomDialogView {
  @State isShow: boolean = false;
  @Provide level : number = 0;
  @Provide achievements: number = 0;
  @Consume broadCast: BroadCast;
  @Provide currentTask: Partial<UserTaskType> = {};
  @Provide dialogCallBack: CustomDialogCallback = new CustomDialogCallback();
  @Prop date : string

  // achievement dialog
  achievementDialog: CustomDialogController = new CustomDialogController({
    builder: AchievementDialog(),
    autoCancel: true,
    customStyle: true
  });

  // task clock dialog
  taskDialog: CustomDialogController = new CustomDialogController({
    builder: TaskDetailDialog({date: this.date}),
    autoCancel: true,
    customStyle: true
  });

  aboutToAppear() {
    Logger.debug('CustomDialogView', 'aboutToAppear');
    // achievement dialog
    this.broadCast.on(BroadCastType.SHOW_ACHIEVEMENT_DIALOG, (achievements: number , level : number) => {
      Logger.debug('CustomDialogView', 'SHOW_ACHIEVEMENT_DIALOG');
      this.achievements = achievements;
      this.level = level;
      this.achievementDialog.open();
    });

    // task clock dialog
    this.broadCast.on(BroadCastType.SHOW_TASK_DETAIL_DIALOG,
      (currentTask: UserTaskType, dialogCallBack: CustomDialogCallback<UserTaskType>) => {
        Logger.debug('CustomDialogView', 'SHOW_TASK_DETAIL_DIALOG');
        this.currentTask = currentTask || TaskItem;
        this.dialogCallBack = dialogCallBack;
        this.taskDialog.open();
      });

  }

  aboutToDisappear() {
    Logger.debug('CustomDialogView', 'aboutToDisappear');
  }

  build() {
  }
}