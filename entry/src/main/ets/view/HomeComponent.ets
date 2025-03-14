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
import HealthText from './HealthTextComponent';
import AddBtn from '../view/home/AddBtnComponent';
import { TaskCard } from '../view/home//TaskCardComponent';
import HomeTopComponent from '../view/home/HomeTopComponent';
import { CustomDialogView, CustomDialogCallback } from '../view/dialog/CustomDialogView';

import { HomeStore } from '../viewmodel/HomeViewModel';
import { ITaskItem, UserTaskType } from '../model/TaskInitList';
import { HealthDataSrcMgr } from '../common/utils/HealthDataSrcMgr';
import { BroadCast, BroadCastType } from '../common/utils/BroadCast';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import AchievementInfo from '../viewmodel/AchievementInfo';
import { httpRequest } from '../common/utils/httpUtils';
import http from '@ohos.net.http';
import { UserInfo } from '../model/Mine';
import { AlertDialogService } from '../service/AlertDialogService';


const WHITE_COLOR_0X = 255;

@Styles
function allSize() {
  .width(Const.THOUSANDTH_1000)
  .height(Const.THOUSANDTH_1000)
}

@Extend(Text)
function titleTextStyle() {
  .fontSize($r('app.float.default_16'))
  .fontWeight(Const.FONT_WEIGHT_500)
  .width(Const.THOUSANDTH_1000)
  .fontFamily($r('app.string.HarmonyHeiTi_Medium'))
  .fontColor($r(`app.element.color.titleColor`))
  .padding({
    top: Const.THOUSANDTH_15,
    bottom: Const.THOUSANDTH_15,
    left: Const.THOUSANDTH_33
  })
}

@Component
export struct HomeIndex {
  @Provide broadCast: BroadCast = HealthDataSrcMgr.getInstance().getBroadCast();
  @State naviAlpha: number = 0;
  @Link homeStore: HomeStore;
  @Consume userInfo : UserInfo
  private scroller: Scroller = new Scroller();
  private yOffset: number = 0;

  taskItemAction(item: UserTaskType, isClick: boolean): void {
    // 不当当天日期或者该任务已经完成了，do nothing
    if (!this.homeStore.checkCurrentDay()) {
      return;
    }

    if (isClick) {
      // click to clock
      let callback: CustomDialogCallback<UserTaskType> = {
        confirmCallback: (taskTemp: UserTaskType) => {
          this.onConfirm(taskTemp)
        },
        cancelCallback: () => { }
      };
      // 展示打卡Dialog
      this.broadCast.emit(BroadCastType.SHOW_TASK_DETAIL_DIALOG, [item, callback]);

    } else {
      // 进入修改页面
      router.pushUrl({ url: 'pages/TaskEditPage',
        params: {
          params: {
            ...item,
            taskName:item.taskId.taskName ,
            userId:item.userId._id ,
            taskId:item.taskId.taskId ,
            unit : item.taskId.unit,
            _id : item.taskId._id,
          }
        }
      });
    }
  }

  //confirm clockL
  onConfirm(task: UserTaskType) {
    this.homeStore.taskClock(task).then((res: AchievementInfo) => {
      if (res.showAchievement) {
        this.userInfo.level = res.level
        this.userInfo.achievements = res.achievements
        let achievements = res.achievements;
        let level = res.level;
        if (achievements) {
          this.broadCast.emit(BroadCastType.SHOW_ACHIEVEMENT_DIALOG, [achievements ,level]);
        } else {
          this.broadCast.emit(BroadCastType.SHOW_ACHIEVEMENT_DIALOG);
        }
      }else{
        AlertDialogService({
          message: "打卡成功，继续加油",
          confirmValue: "好滴"
        })
      }
    })
  }

  // change navigator alpha when scrolling the Scroll component
  onScrollAction() {
    this.yOffset = this.scroller.currentOffset().yOffset;
    if (this.yOffset > Const.DEFAULT_56) {
      this.naviAlpha = 1;
    } else {
      this.naviAlpha = this.yOffset / Const.DEFAULT_56;
    }
  }


  editTaskAction() {
    if (this.homeStore.checkCurrentDay()) {
      router.pushUrl({ url: 'pages/TaskListPage' });
    }
  }

  build() {
    Stack() {
      Scroll(this.scroller) {
        Column() {
          HomeTopComponent({ homeStore: $homeStore })
          Text($r('app.string.task_list')).titleTextStyle()
          if (this.homeStore.userTaskList.length > 0) {
            Column({ space: Const.DEFAULT_8 }) {
              ForEach(this.homeStore.userTaskList, (item: UserTaskType) => {
                TaskCard({
                  taskInfoStr: JSON.stringify(item),
                  clickAction: (isClick: boolean) => {
                    this.taskItemAction(item, isClick)
                  }
                })
                  .margin({ bottom: Const.DEFAULT_2 })
                  .height($r('app.float.default_64'))
              }, (item: UserTaskType) => JSON.stringify(item))
            }
            .onAppear(() => {
              this.scroller.scrollTo({ xOffset: 0, yOffset: this.yOffset });
            })
            .padding({
              top: Const.THOUSANDTH_15,
              left: Const.THOUSANDTH_33,
              right: Const.THOUSANDTH_33
            })
            .width(Const.THOUSANDTH_1000)
          } else {
            Column({ space: Const.DEFAULT_8 }) {
              Image($r('app.media.ic_no_data'))
                .width($r('app.float.default_132'))
                .height($r('app.float.default_100'));
              HealthText({ title: '', titleResource: $r('app.string.no_task'), fontSize: $r('app.float.default_14') })
                .opacity(Const.OPACITY_4)
            }
            .margin({ top: Const.DEFAULT_48 })
          }
        }
      }
      .scrollBar(BarState.Off)
      .allSize()
      .onScroll(() => {
        this.onScrollAction()
      })
      .align(Alignment.TopStart)

      if(this.homeStore.checkCurrentDay()){
        Button({ type: ButtonType.Circle, stateEffect: false }) {
          Image($r('app.media.user_guide'))
            .allSize()
            .borderRadius(Const.BORDER_RADIUS_PERCENT_50)
        }
        .onClick(()=>{router.pushUrl({
          url:"pages/UserGuidePage"
        })})
        .zIndex(Const.HOME_BTN_Z)
        .position({ x: Const.THOUSANDTH_830, y: Const.THOUSANDTH_800 })
        .width($r('app.float.default_48'))
        .height($r('app.float.default_48'))
        .backgroundColor("#fff")

        AddBtn({
          clickAction: () => { this.editTaskAction() } ,
        })

      }

      CustomDialogView({
        date : this.homeStore.selectedLocalString,
      })
    }
    .allSize()
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}

