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

import { CustomDialogCallback } from './CustomDialogView';
import TaskInfo from '../../viewmodel/TaskInfo';
import { UserTaskType } from '../../model/TaskInitList';
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import { GlobalContext } from '../../common/utils/GlobalContext';

@CustomDialog
export struct TaskDetailDialog {
  controller: CustomDialogController = new CustomDialogController({ builder: '' });
  @Consume currentTask: UserTaskType;
  @Consume dialogCallBack: CustomDialogCallback;

  build() {
    Column(){
      Row(){
        TaskBaseInfo({
          taskName: `${this.currentTask?.taskId.taskName}`,
          targetValue : `${this.currentTask.targetValue}`
        });
      }
      .borderRadius({topLeft:"24vp",topRight:"24vp"})
      .padding({left:"10vp",right:"10vp"})
      .height("40vp")
      .backgroundColor("#fff")

      Row(){
        Column() {

        }
        .height("400vp")
        .width($r('app.float.default_316'))
        .backgroundImage(Const.SERVER + "/" + this.currentTask?.taskId.dialogBg, ImageRepeat.NoRepeat)
        .backgroundImageSize({
          width: '100%',
          height: '100%'
        })
        .justifyContent(FlexAlign.End)
        .padding({
          left: $r('app.float.default_20')
        })
      }

      TaskClock({
        confirm: () => {
          this.dialogCallBack.confirmCallback(this.currentTask);
          this.controller.close();
        },
        cancel: () => {
          this.controller.close();
        },
        share : ()=>{

        },
        showButton: this.currentTask.isDone as boolean
      }).borderRadius({bottomLeft:"24vp",bottomRight:"24vp"})
        .height("59vp")
      .backgroundColor("#fff")
    }
    .height("499vp")
    .width($r('app.float.default_316'))
    .backgroundColor("#d2ffffff")
    .borderRadius("24vp")
  }
}

@Component
struct TaskBaseInfo {
  taskName: string | Resource = '';
  targetValue : string;

  build() {
    Column({ space: Const.DEFAULT_8 }) {
      Row(){
        Text(this.taskName)
          .fontSize($r('app.float.default_22'))
          .fontWeight(FontWeight.Bold)
          .fontFamily($r('app.string.HarmonyHeiTi_Bold'))
          .fontColor("000")
          .margin({left: $r('app.float.default_12')})

        Text(`目标值：${this.targetValue}`)
          .fontSize($r('app.float.default_22'))
          .fontFamily($r('app.string.HarmonyHeiTi_Bold'))
          .fontColor("000")
          .margin({left: $r('app.float.default_12')})
      }
      .width("100%")
      .justifyContent(FlexAlign.SpaceBetween)
    }
  }
}

@Component
struct TaskClock {
  confirm: Function = () => {};
  cancel: Function = () => {};
  share: Function = ()=>{};
  showButton: boolean = true;

  build() {
    Row() {
      Button($r('app.string.clock_in'))
        .width($r('app.float.default_100'))
        .borderRadius($r('app.float.default_24'))
        .backgroundColor('#dde96666')
        .onClick(() => {
          GlobalContext.getContext().setObject('taskListChange', true);
          this.confirm();
        })
        .visibility(!this.showButton ? Visibility.Visible:Visibility.None )

      Button("分享")
        .width($r('app.float.default_100'))
        .fontSize($r('app.float.default_14'))
        .fontWeight(FontWeight.Regular)
        .fontFamily($r('app.string.HarmonyHeiTi'))
        .onClick(() => {
          this.share();
        })
        .visibility(this.showButton ? Visibility.Visible:Visibility.None)

      Button("取消")
        .width($r('app.float.default_72'))
        .fontSize($r('app.float.default_14'))
        .fontWeight(FontWeight.Regular)
        .backgroundColor('#ffa4a4a4')
        .fontFamily($r('app.string.HarmonyHeiTi'))
        .onClick(() => {
          this.cancel();
        })
    }
    .width("100%")
    .padding({top:"12vp"})
    .justifyContent(FlexAlign.SpaceAround)
  }
}



