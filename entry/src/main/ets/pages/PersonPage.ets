
import { httpRequest ,httpGet} from '../common/utils/httpUtils';
import http from '@ohos.net.http';
import router from '@ohos.router';
import {CommonConstants} from '../common/constants/CommonConstants'

@Entry
@Component
struct PersonPage {


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


  build() {
    Column() {
      this.Title()
      Row() {

      }
      .height(StyleConstant.WEB_HEIGHT)
      .width(StyleConstant.FULL_WIDTH)
      .align(Alignment.Top)
    }
    .width(StyleConstant.FULL_WIDTH)
    .height(StyleConstant.FULL_HEIGHT)
    .backgroundImageSize(ImageSize.Cover)
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