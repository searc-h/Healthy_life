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



@Component
export struct AIComments {

  @State chooseValue : number  = 0;


  startComment = ()=>{

    console.log(this.chooseValue + "")
  }

  build() {
    Column() {
      Row(){

      }
      .padding(Const.DEFAULT_10)
      .width(Const.FULL_WIDTH)
      .height("85%")
      .border({width:"1vp" , radius:"10vp"})
       // 底部按钮
      Row(){
        Select([{ value: '最近一周',},
                { value: '最近一个月' },
                { value: '最近三个月'},
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
      }
      .height("10%")
      .width(Const.FULL_WIDTH)
      .backgroundColor("#f3eeeeee")
      .justifyContent(FlexAlign.SpaceAround)

    }
    .padding(Const.DEFAULT_10)
    .height(Const.FULL_HEIGHT)
    .width(Const.FULL_WIDTH)
    .backgroundColor($r('app.color.white'))
    .justifyContent(FlexAlign.SpaceBetween)
  }
}
