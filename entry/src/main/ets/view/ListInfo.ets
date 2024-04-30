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

import { InfoItem, UserInfo } from '../model/Mine';
import { GlobalContext } from '../common/utils/GlobalContext';
import router from '@ohos.router';
import { AlertDialogService } from '../service/AlertDialogService'
import { CustomConfirmDialog } from '../view/dialog/ConfirmDialog'
@Component
export struct ListInfo {
  @Prop userId : string;
  @Prop isLogin : boolean;

  // 退出登陆的Dialog
  dialogController: CustomDialogController = new CustomDialogController({
    builder: CustomConfirmDialog({
      content:"确认退出登陆吗",
      cancel: this.onCancel,
      confirm: this.onAccept,
    }),
    alignment: DialogAlignment.Center,
  })

  onCancel() {

  }
  onAccept() {
    GlobalContext.getContext().setObject("User_Info" , {})
    router.pushUrl({url:"pages/LoginPage"})
  }

  // 去登陆
  goLogin = ()=>{
    router.pushUrl({url:"pages/LoginPage"})
  }

  // 退出登陆
  loginOut = ()=>{
    this.dialogController.open()
  }

  checkUserInfo = ()=>{
    if(this.isLogin){
      AlertDialogService({
        title:"个人信息",
        message:"TBD"
      })
    }else{
      AlertDialogService({
        title:"提示",
        message:"还没有登陆哦",
        confirmValue:"去登陆",
        action: ()=>{
          router.pushUrl({url:"pages/LoginPage"})
        }
      })
    }
  }

  aboutApp = ()=>{
    router.pushUrl({
      url:"pages/AppSetting"
    })
  }
  goWebPage = ()=>{
    router.pushUrl(({
      url : "pages/WebPage"
    }))
  }

  @Builder ListItem_Child(item : InfoItem ){
    Flex({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center }) {
      Text(item.title).fontSize($r('app.float.default_16')).height($r('app.float.default_40'))

      Image($r('app.media.ic_right_grey'))
        .objectFit(ImageFit.Contain)
        .height($r('app.float.default_12'))
        .width($r('app.float.default_7'))
    }
  }


  build() {
    List() {
      ListItem() {
        this.ListItem_Child({id:"1" , title:"个人信息"})
      }
      .onClick(this.checkUserInfo)
      .ListItem_Child_Styles()

      ListItem() {
        this.ListItem_Child({id:"2" , title:"应用设置"})
      }
      .onClick(this.aboutApp)
      .ListItem_Child_Styles()

      ListItem() {
        this.ListItem_Child({id:"3" , title:"harmonyOS官网"})
      }
      .onClick(this.goWebPage)
      .ListItem_Child_Styles()

      // display different layout with userInfo
      if(this.isLogin){
        ListItem() {
          this.ListItem_Child({id:"4" , title:"退出登陆"})
        }
        .onClick(this.loginOut)
        .ListItem_Child_Styles()
      }else {
        ListItem() {
          this.ListItem_Child({id:"4" , title:"去登陆"})
        }
        .onClick(this.goLogin)
        .ListItem_Child_Styles()
      }

    }
    .border({
      radius: {
        topLeft: $r('app.float.default_24'),
        topRight: $r('app.float.default_24')
      }
    })
    .backgroundColor($r('app.color.white'))
    .margin({ top: $r('app.float.default_24') })
    .padding({ top: $r('app.float.default_16') })
    .flexGrow(1)
    .clip(true)
  }
}


@Styles function ListItem_Child_Styles(){
  .backgroundColor($r('app.color.white'))
  .margin({
    left: $r('app.float.default_24'),
    right: $r('app.float.default_24')
  })
  .height($r('app.float.default_48'))
  .border({
    width: { bottom: $r('app.float.default_1') },
    color: $r('app.color.borderColor')
  })
}