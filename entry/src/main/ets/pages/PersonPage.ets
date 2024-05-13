
import { httpRequest ,httpGet} from '../common/utils/httpUtils';
import http from '@ohos.net.http';
import router from '@ohos.router';
import {CommonConstants} from '../common/constants/CommonConstants'
import { UserBaseInfo } from '../view/UserBaseInfo';
import { AlertDialogService } from '../service/AlertDialogService';

interface UserInfoType{
  username : string,
  level : number,
  achievements : number,
  email : string,
}

@Entry
@Component
struct PersonPage {

  @State userInfo : UserInfoType = {
    username : "",
    level : 0,
    achievements : 0,
    email : "",
  }

  aboutToAppear(){
    const params = router.getParams() as Record<string , Record<string,string>>
    let userId = params.userInfo.userId
    if(userId){
      this.getUserInfo(userId)
    }
  }

  getUserInfo = (userId : string)=>{
    httpRequest({
      url:`/users/${userId}`
    }).then(res=>{
      if(res.errno === 0){
        AlertDialogService({message:res.message})
      }else if(res.errno === -1){
        console.log(JSON.stringify(res.data))
        this.userInfo = res.data
      }
    })
  }

  build() {
    Column() {
      this.Title()
      Row() {
        UserBaseInfo({
          level: `LV.${JSON.stringify(this.userInfo?.level??0)}`,
          userName: this.userInfo?.username,
          signature: "",
          myself : false
        });
      }
      .justifyContent(FlexAlign.Center)
      .height("30%")
      .width(StyleConstant.FULL_WIDTH)
      .backgroundColor($r('app.color.mineBgColor'))

      Column(){
        List({ space: 12 }) {
          ListItem() {
            Row(){
              Text('邮箱：')
                .width(80).height(19)
                .fontSize(17).fontColor('#182431').fontWeight(FontWeight.Bold)
                .margin({ left: 12 })
              Text(this.userInfo.email)
            }
          }
          .width('100%')
          .height(56)
          .backgroundColor('#FFFFFF')
          .borderRadius(24)
          .align(Alignment.Start)

          ListItem() {
            Row(){
              Text('成就：')
                .width(80).height(19)
                .fontSize(17).fontColor('#182431').fontWeight(FontWeight.Bold)
                .margin({ left: 12 })
              Text(this.userInfo.achievements + "次打卡")
            }
          }
          .width('100%')
          .height(56)
          .backgroundColor('#FFFFFF')
          .borderRadius(24)
          .align(Alignment.Start)

          ListItem() {
            Row(){
              Text('等级：')
                .width(80).height(19)
                .fontSize(17).fontColor('#182431').fontWeight(FontWeight.Bold)
                .margin({ left: 12 })
              Text("LV " + this.userInfo.level)
            }
          }
          .width('100%')
          .height(56)
          .backgroundColor('#FFFFFF')
          .borderRadius(24)
          .align(Alignment.Start)
        }
        .width(336)
        .margin({top:10})
      }
      .height("60%")
      .width(StyleConstant.FULL_WIDTH)

    }
    .width(StyleConstant.FULL_WIDTH)
    .height(StyleConstant.FULL_HEIGHT)
    .backgroundColor($r("app.color.primaryBgColor"))

  }



  @Builder Title() {
    Row() {
      Image($r('app.media.ic_back'))
        .width($r('app.float.image_size'))
        .height($r('app.float.image_size'))
        .margin({
          left: $r('app.float.image_margin_left'),
          right: $r('app.float.image_margin_right')
        })
        .onClick(() => {
          router.back();
        })

      Text("用户信息")
        .fontSize($r('app.float.title_text_size'))
        .fontColor($r('app.color.title'))
        .fontWeight(CommonConstants.TITLE_FONT_WEIGHT)
    }
    .width(CommonConstants.FULL_WIDTH_PERCENT)
    .height($r('app.float.title_height'))
  }

}


class StyleConstant {
  /**
   * Full the width.
   */
  static readonly FULL_WIDTH: string = '100%';

  /**
   * Full the height.
   */
  static readonly FULL_HEIGHT: string = '100%';

  /**
   * Web height.
   */
  static readonly WEB_HEIGHT: string = '92%';

  /**
   * Button width.
   */
  static readonly BUTTON_WIDTH: string = '90%';
}