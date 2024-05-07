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
import { ListInfo } from '../view/ListInfo';
import { UserBaseInfo } from '../view/UserBaseInfo';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { UserInfo } from '../model/Mine'

@Component
export struct MineIndex {
  @State signature: string = Const.SIGNATURE;
  @Consume userInfo : UserInfo;


  build() {
    Column() {
      UserBaseInfo({
        level: `LV.${JSON.stringify(this.userInfo?.level??0)}`,
        userName: "",
        signature: this.userInfo.isLogin?"已经登陆":"未登陆"
      });

      ListInfo({isLogin:this.userInfo.isLogin as boolean , userId : this.userInfo.userId as string});

    }
    .height(Const.FULL_HEIGHT)
    .backgroundColor($r('app.color.mineBgColor'))
  }
}