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


import router from '@ohos.router';
import prompt from '@system.prompt';
import common from '@ohos.app.ability.common';
import { ITaskItem } from '../../model/TaskInitList';
import Logger from '../../common/utils/Logger';
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import TaskInfo, { taskType } from '../../viewmodel/TaskInfo';
import {
  TaskChooseItem,
  TargetSetItem,
  OpenRemindItem,
  RemindTimeItem,
  FrequencyItem,
  RingDuringItem
} from './TaskEditListItem';
import { BroadCast, BroadCastType } from '../../common/utils/BroadCast';
import { HealthDataSrcMgr } from '../../common/utils/HealthDataSrcMgr';
import { initFrequencyString, addTask, formatParams } from '../../viewmodel/TaskViewModel';
import { TaskDialogView } from '../dialog/TaskDialogView';
import { GlobalContext } from '../../common/utils/GlobalContext';

@Styles function listItemStyle() {
  .backgroundColor($r('app.color.white'))
  .height(Const.DEFAULT_56)
  .borderRadius(Const.DEFAULT_10)
  .padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 })
}

@Component
export default struct TaskDetail {
  @Provide broadCast: BroadCast = HealthDataSrcMgr.getInstance().getBroadCast();
  @Provide @Watch('onParamsChanged') settingParams: ITaskItem = this.parseRouterParams();
  @Provide frequency: string = initFrequencyString(this.settingParams?.frequency);
  @State isChanged: boolean = false;

  // 从路径参数中拿到 可编辑任务
  parseRouterParams() {
    let params = router.getParams() as Record<string, Object>;
    const routerParams: ITaskItem  = params.params as ITaskItem;
    return routerParams;
  }


  onParamsChanged() {
    this.isChanged = true;
  }

  backIndexParams(): string {
    return formatParams(this.settingParams);
  }

  finishTaskEdit() {
    if (this.isChanged) {
      let context: Context = getContext(this) as common.Context;
      let taskInfo: ITaskItem = {
        ...this.settingParams
      }

      addTask(taskInfo, context).then(() => {
        GlobalContext.getContext().setObject('taskListChange', true);
        router.back({
            url: 'pages/MainPage',
            params: {
              editTask: this.backIndexParams(),
            }
          })

      }).catch((error: Error) => {
        prompt.showToast({
          message: error.message
        })
        Logger.error('addTaskFailed', JSON.stringify(error));
      })
    }
  }

  aboutToAppear() {

    this.broadCast.off(BroadCastType.SHOW_TARGET_SETTING_DIALOG, () => {});
    this.broadCast.off(BroadCastType.SHOW_REMIND_TIME_DIALOG, () => {});
    this.broadCast.off(BroadCastType.SHOW_FREQUENCY_DIALOG, () => {});
    this.broadCast.off(BroadCastType.SHOW_RING_DURING_DIALOG , ()=>{});
  }

  build() {
    Row() {
      Column() {
        List({ space: Const.LIST_ITEM_SPACE }) {
          ListItem() {
            TaskChooseItem()
          }
          .listItemStyle()

          ListItem() {
            TargetSetItem()
          }
          .listItemStyle()
          .enabled(
            this.settingParams?.isOpen
          )
          .onClick(() => {
            if(this.settingParams.unit == '次'){
              this.broadCast.emit(BroadCastType.SHOW_COUNT_PICKER_DIALOG)
            }else if(this.settingParams.unit == 'min') {
              this.broadCast.emit(BroadCastType.SHOW_TIMING_PICKER_DIALOG)
            }else{
              this.broadCast.emit(BroadCastType.SHOW_TARGET_SETTING_DIALOG);
            }
          })

          ListItem() {
            OpenRemindItem()
          }
          .listItemStyle()
          .enabled(this.settingParams?.isOpen)

          ListItem() {
            RemindTimeItem()
          }
          .listItemStyle()
          .enabled(this.settingParams?.isOpen && this.settingParams?.isAlarm)
          .onClick(() => {
            this.broadCast.emit(BroadCastType.SHOW_REMIND_TIME_DIALOG);
          })

          // ListItem() {
          //   FrequencyItem()
          // }
          // .listItemStyle()
          // .enabled(this.settingParams?.isOpen && this.settingParams?.isAlarm)
          // .onClick(() => {
          //   this.broadCast.emit(BroadCastType.SHOW_FREQUENCY_DIALOG);
          // })

          ListItem() {
            RingDuringItem()
          }
          .listItemStyle()
          .enabled(this.settingParams?.isOpen && this.settingParams?.isAlarm)
          .onClick(() => {
            this.broadCast.emit(BroadCastType.SHOW_RING_DURING_DIALOG);
          })

        }
        .width(Const.THOUSANDTH_940)

        Button("完成")
          .width(Const.THOUSANDTH_800)
          .height(Const.DEFAULT_48)
          .enabled(this.isChanged)
          .fontColor(this.isChanged? Color.White : $r('app.color.login_font_normal'))
          .backgroundColor(this.isChanged ? $r('app.color.login_btn_enabled') : $r('app.color.login_btn_normal'))
          .onClick(() => {
            this.finishTaskEdit();
          })
          .position({
            x: Const.THOUSANDTH_100,
            y: Const.THOUSANDTH_800
          })

        Row(){
          Text("修改任务后解锁按钮")
            .fontSize("15vp")
            .fontColor("#d7333333")
        }
        .justifyContent(FlexAlign.Center)
        .width("100%")
        .position({
          x: 0,
          y: Const.THOUSANDTH_880
        })

        TaskDialogView()
      }
      .width(Const.THOUSANDTH_1000)
    }
  }
}




