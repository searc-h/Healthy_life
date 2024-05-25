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

import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import { httpRequest } from '../../common/utils/httpUtils';
import { UserInfo } from '../../model/Mine';
import { AlertDialogService } from '../../service/AlertDialogService';
import http from '@ohos.net.http';

interface ResType{
  role: "user"|"AI",
  content  : string
}

@Component
export struct AIComments {

  @State chooseValue : number  = 0;
  @Consume userInfo : UserInfo
  @State comments : ResType[] = []
  @State isWaiting : boolean = false;
  scroller: Scroller = new Scroller()

  startComment = ()=>{
    if(this.userInfo.userId){
      this.isWaiting = true;
      httpRequest<ResType[]>({
        url: "/chat",
        method : http.RequestMethod.POST,
        extraData : {
          userId : this.userInfo.userId,
          fromDays : this.chooseValue === 0 ? 7 : this.chooseValue * 30
        }
      }).then(res=>{
        if(res.errno == -1){
          this.comments = res.data
        }else{
          AlertDialogService({
            message : res.message
          })
        }
      }).catch((error)=>{
        AlertDialogService({
          message : JSON.stringify(error)
        })
      }).finally(()=>{
        this.isWaiting = false;
      })
    }else{
      AlertDialogService({
        message:"请先登录哦"
      })
    }
  }

  build() {
    Column() {
      Column(){
        Stack({alignContent: Alignment.TopStart }){
          Scroll(this.scroller){
            Column(){
              ForEach(this.comments , (item : ResType)=>{
                if(item.role === "user"){
                  Row(){
                    Column(){
                      Text(item.role + ":")
                        .fontWeight(FontWeight.Bold)
                        .fontSize(17)
                        .lineHeight(20)

                      Text(item.content)
                    }
                    .alignItems(HorizontalAlign.Start)
                  }
                  .margin({
                    top:"10vp",
                    bottom : "10vp"
                  })
                }else{
                  Row(){
                    Column(){
                      Text( ":" + item.role)
                        .fontWeight(FontWeight.Bold)
                        .fontSize(17)
                        .lineHeight(20)

                      Text(item.content)
                    }
                    .alignItems(HorizontalAlign.End)
                  }
                  .margin({
                    top:"10vp",
                    bottom : "10vp"
                  })
                }

              } , (item) =>JSON.stringify(item))

              if(this.comments.length === 0){
                Row(){
                  Column(){
                    Text("请先选择周期再点击输出评价")
                  }
                  .alignItems(HorizontalAlign.End)
                }
              }
            }
            .justifyContent(FlexAlign.Start)
          }
          .scrollBar(BarState.On)
          .scrollBarWidth("1vp")
          .scrollable(ScrollDirection.Vertical)  // 滚动方向纵向
          .width(Const.THOUSANDTH_1000)
          .height(Const.THOUSANDTH_1000)
          .padding({bottom : "20vp"})

          if(this.isWaiting){
            Column({ space: 5 }) {
              LoadingProgress()
                .color(Color.Blue)
            }
            .margin({ top: 0 })
          }
        }
        .width(Const.THOUSANDTH_1000)
        .height(Const.THOUSANDTH_1000)
      }
      .padding(Const.DEFAULT_10)
      .width(Const.FULL_WIDTH)
      .height("90%")
      .border({width:"1vp" , radius:"10vp" , color: "#ffbfbfbf" })
       // 底部按钮
      Row(){
        Select([{ value: '最近7天',},
                { value: '最近30天' },
                { value: '最近90天'},
          ])
          .selected(0)
          .value('选择周期')
          .font({ size: 16, weight: 500 })
          .fontColor('#182431')
          .selectedOptionFont({ size: 16, weight: 500 })
          .optionFont({ size: 16, weight: 400 })
          .onSelect((index: number) => {
            this.chooseValue = index
          })

          Button('输出评价')
            .onClick(this.startComment)
            .enabled(!this.isWaiting)
            .backgroundColor(!this.isWaiting ? $r('app.color.login_btn_enabled') : $r('app.color.login_btn_normal'))
      }
      .height("10%")
      .width(Const.FULL_WIDTH)
      .backgroundColor("#fff6f6f6")
      .justifyContent(FlexAlign.SpaceAround)
      .padding(Const.DEFAULT_10)

    }
    .height(Const.FULL_HEIGHT)
    .width(Const.FULL_WIDTH)
    .backgroundColor($r('app.color.white'))
    .justifyContent(FlexAlign.SpaceBetween)
  }
}
