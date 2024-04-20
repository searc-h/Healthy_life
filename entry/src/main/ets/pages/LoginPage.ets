import router from '@ohos.router';

import { CommonConstants } from '../common/constants/CommonConstants';

import { LoginComponent } from '../view/LoginComponent';

/**
 * This template implements the Login function.
 * First register personal details. Log in after entering the username and password.
 * Click the button at the bottom to ask for help and check the privacy statement.
 * Developers can save username and password by Preference or Relational Database.
 */
@Entry
@Component
struct LoginPage {
  aboutToAppear() {
    // MediaQueryModel.register();
  }

  aboutToDisappear() {
    // MediaQueryModel.unRegister();
  }

  build() {
    Column() {
      this.Title()

      Scroll() {
        Column() {
          LoginComponent()

          Blank()
        }
        .height(CommonConstants.FULL_HEIGHT)
        .constraintSize({ minHeight: 100 })
        .alignItems(HorizontalAlign.Start)
        .padding(10)
      }
      .layoutWeight(1)
    }
    .width('100%')
    .backgroundColor($r('app.color.login_page_background'))
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

      Text("登陆")
        .fontSize($r('app.float.title_text_size'))
        .fontColor($r('app.color.title'))
        .fontWeight(CommonConstants.TITLE_FONT_WEIGHT)
    }
    .width(CommonConstants.FULL_WIDTH_PERCENT)
    .height($r('app.float.title_height'))
  }
}