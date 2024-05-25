/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import promptAction from '@ohos.promptAction';
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import { PageState } from '../../viewmodel/HistoryModel'
import HistoryItem from './HistoryItem';
import HistoryGroup from './HistoryGroup'
import LoadMoreLayout from './LoadMoreLayout';
import RefreshLayout from './RefreshLayout';
import CustomRefreshLoadLayout from './CustomRefreshLoadLayout';
import { listTouchEvent } from '../../common/utils/PullDownRefresh';
import HistoryViewModel, { CustomRefreshLoadLayoutClass , ClockHistoryType,ResultListType } from '../../viewmodel/HistoryViewModel';
import NoMoreLayout from './NoMoreLayout';
import NewsModel from '../../viewmodel/HistoryModel';
import { UserInfo } from '../../model/Mine';
import { AlertDialogService } from '../../service/AlertDialogService';
import router from '@ohos.router';

/**
 * The news list component.
 */
@Component
export struct HistoryList {
  @Prop currentTab : number;
  @State newsModel: NewsModel = new NewsModel();
  @Watch('changeCategory') @Link currentIndex: number;
  @Consume userInfo : UserInfo;
  @State @Watch("changeValue") chooseValue : number = 0;

  // 当切换到历史Tab的时候发请求获取list

  changeCategory(userId? : string) {
    this.newsModel.currentPage = 1;

    HistoryViewModel.getHistoryList(userId)
      .then((data: ResultListType[]) => {
        this.newsModel.pageState = PageState.Success;

        this.newsModel.hasMore = false;

        this.newsModel.newsData = data;
      })
      .catch((err: string | Resource) => {
        promptAction.showToast({
          message: err,
          duration: 2000
        });
        this.newsModel.pageState = PageState.Fail;
      });
  }

  changeValue(){
    // 选择查看我的
    if(this.chooseValue === 1){
      // 必须要登陆
      if(this.userInfo.userId && this.userInfo.isLogin){
        this.changeCategory(this.userInfo.userId)
      }else{
        AlertDialogService({
          message: "请先登录"
        })
      }
    }else{
      this.changeCategory()
    }
  }


  aboutToAppear() {
    // Request news data.
    this.changeCategory(this.userInfo.userId);
  }

  build() {
    Column() {
      if (this.newsModel.pageState === PageState.Loading) {
        this.LoadingLayout()
      } else {
        this.ListLayout()
      }
    }
    .width(Const.FULL_WIDTH)
    .height(Const.FULL_HEIGHT)
    .justifyContent(FlexAlign.Center)
    .onTouch((event: TouchEvent | undefined) => {
      if (event) {
        if (this.newsModel.pageState === PageState.Success) {
          listTouchEvent(this.newsModel, event , this.userInfo._id);
        }
      }
    })
  }

  @Builder LoadingLayout() {
    CustomRefreshLoadLayout({ customRefreshLoadClass: new CustomRefreshLoadLayoutClass(true,
      $r('app.media.ic_pull_up_load'), "Loading in ...", this.newsModel.pullDownRefreshHeight) })
  }

  @Builder ListLayout() {
    Column(){
      Row(){
        Select([{ value: '全部'},
          { value: '我的' },
        ])
          .selected(0)
          .value('切换查看')
          .font({ size: 16, weight: 500 })
          .fontColor('#182431')
          .selectedOptionFont({ size: 16, weight: 500 })
          .optionFont({ size: 16, weight: 400 })
          .onSelect((index: number) => {
              this.chooseValue = index
          })

        Button("刷新")
          .type(ButtonType.Normal)
          .backgroundColor("#fff")
          .fontColor("#000")

      }
      .width("100%")
      .backgroundColor("#fff")
      .padding({left: 10 , right : 10})
      .justifyContent(FlexAlign.SpaceBetween)
      .zIndex(99)


      List() {
        ListItem() {
          RefreshLayout({
            refreshLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown, this.newsModel.pullDownRefreshImage,
              this.newsModel.pullDownRefreshText, this.newsModel.pullDownRefreshHeight)
          })
        }
        //
        if(this.newsModel.newsData.length > 0){
          ForEach(this.newsModel.newsData, (item?: ResultListType) => {
            ListItem() {
              HistoryGroup({ data: item })
            }
          }, (item: ResultListType, index?: number) => JSON.stringify(item) + index)
        }

        ListItem() {
          if (this.newsModel.hasMore) {
            LoadMoreLayout({
              loadMoreLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad, this.newsModel.pullUpLoadImage,
                this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight)
            })
          } else {
            NoMoreLayout()
          }
        }
      }
      .width(Const.FULL_WIDTH)
      .height(Const.FULL_HEIGHT)
      .margin({ left: Const.NewsListConstant_LIST_MARGIN_LEFT, right: Const.NewsListConstant_LIST_MARGIN_RIGHT })
      .backgroundColor("#F1F3F5")
      .divider({
        color: "#E2E2E2",
        strokeWidth: Const.NewsListConstant_LIST_DIVIDER_STROKE_WIDTH,
        endMargin: Const.NewsListConstant_LIST_MARGIN_RIGHT
      })
      // Remove the rebound effect.
      .edgeEffect(EdgeEffect.None)
      .offset({ x: 0, y: `${this.newsModel.offsetY}${'px'}` })
      .onScrollIndex((start: number, end: number) => {
        // Listen to the first index of the current list.
        this.newsModel.startIndex = start;
        this.newsModel.endIndex = end;
      })
    }
  }
}