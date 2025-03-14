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
import common from '@ohos.app.ability.common';
import notificationManager from '@ohos.notificationManager';
import Logger from '../common/utils/Logger';
import { ITaskItem } from '../model/TaskInitList';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { NavList, TabId } from '../model/NavItemModel';
import { HomeIndex } from '../view/HomeComponent';
import { AchievementIndex } from '../view/AchievementComponent';
import { MineIndex } from './MinePage';
import { AIComments } from '../view/comments/AIComments'
import { HomeStore } from '../viewmodel/HomeViewModel';
import GlobalInfoApi from '../common/database/tables/GlobalInfoApi';
import GlobalInfo from '../viewmodel/GlobalInfo';
import { GlobalContext } from '../common/utils/GlobalContext';
import { UserInfo } from '../model/Mine';
import {HistoryComponent} from '../view/HistoryComponent'
import PreferencesUtil from '../common/utils/PreferencesUtils'

@Styles function allSize() {
  .width(Const.THOUSANDTH_1000)
  .height(Const.THOUSANDTH_1000)
}

@Entry
@Component
struct Index {
  /**
   * @description 当前Tab页面下标：number
   */
  @State currentTab: number = 0;
  /**
   *
   * @description 当前编辑的任务
   */
  /**
   * Home页面的整体状态机
   */
  @State homeStore: HomeStore = new HomeStore(new Date());

  @State changeFontSize : number = 16;

  // 有bug,
  @State settingTab : Record<string, boolean> = undefined

  @Provide userInfo : UserInfo = new UserInfo({
    level:0,
    achievements : 0,
    isLogin : false,
  });

  private tabController: TabsController = new TabsController();

  // 检测通知权限
  aboutToAppear() {
    
    notificationManager.requestEnableNotification().then(() => {
      Logger.info('onPageShow', `requestEnableNotification success`);
    }).catch((err: Error) => {
      Logger.error('onPageShow', `requestEnableNotification failed, message is ${err.message}`);
    });
  }

  onPageShow() {
    this.userInfo = GlobalContext.getContext().getObject("User_Info") as UserInfo || {}
    console.log("userInfo : " + JSON.stringify(this.userInfo))
    this.settingTab = GlobalContext.getContext().getObject("settingTab") as Record<string , boolean>
    console.log("setting Tab" , JSON.stringify(this.settingTab))

    this.homeStore.getTaskListOfDay()

    let params = (router.getParams() ? router.getParams() : {}) as Record<string, Object>;
    console.log("MainPage Show , params is : ",JSON.stringify(params))

    if ((GlobalContext.getContext().getObject('isForeground') as boolean)) {
      GlobalContext.getContext().setObject('isForeground', false);
      if (this.homeStore.currentDate.getDate() !== (new Date()).getDate()) {
        GlobalContext.getContext().setObject('taskListChange', true);
        this.homeStore = new HomeStore(new Date());
      }
      this.checkCurrentTime();
    }
  }

  checkCurrentTime() {
    this.homeStore.initData();
  }

  @Builder TabBuilder(index: number) {
    Column() {
        Image(index === this.currentTab ? NavList[index].icon_selected : NavList[index].icon)
          .width($r('app.float.default_28'))
          .height($r('app.float.default_28'))
          .objectFit(ImageFit.Contain);

        Text(NavList[index].text)
          .fontSize(this.changeFontSize || $r('app.float.default_10'))
          .fontWeight(Const.FONT_WEIGHT_500)
          .fontColor(this.currentTab === index ? $r('app.color.blueColor') : $r('app.color.tabTitleColor'))
          .margin({ top: $r('app.float.default_1') })

    }.justifyContent(FlexAlign.Center).allSize()
  }


  build() {
    Tabs({ barPosition: BarPosition.End, controller: this.tabController }) {

        TabContent() {
          HomeIndex({ homeStore: $homeStore })
            .borderWidth({ bottom: 1 })
            .borderColor($r('app.color.primaryBgColor'))
        }
        .tabBar(this.TabBuilder(TabId.HOME))
        .align(Alignment.Start)

        TabContent() {
          AchievementIndex()
        }
        .tabBar(this.TabBuilder(TabId.ACHIEVEMENT))

        TabContent() {
          MineIndex()
            .borderWidth({ bottom: 1 })
            .borderColor($r('app.color.primaryBgColor'))
        }
        .tabBar(this.TabBuilder(TabId.MINE))

        if( !this.settingTab || this.settingTab["History"]){
          TabContent(){
            HistoryComponent({currentTab : this.currentTab})
          }
          .tabBar(this.TabBuilder(3))
        }

      if( !this.settingTab || this.settingTab["AI"]){
        TabContent(){
          AIComments()
        }
        .tabBar(this.TabBuilder(4))
      }

    }
    .scrollable(true)
    .allSize()
    .barWidth(Const.THOUSANDTH_940)
    .barMode(BarMode.Fixed)
    .vertical(false)
    .onChange((index) => {
      this.currentTab = index;
    })
  }
}