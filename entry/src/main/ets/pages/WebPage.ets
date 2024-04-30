/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import webView from '@ohos.web.webview';
import promptAction from '@ohos.promptAction'
import { httpRequest ,httpGet} from '../common/utils/httpUtils';
import http from '@ohos.net.http';
import router from '@ohos.router';
import {CommonConstants} from '../common/constants/CommonConstants'

@Entry
@Component
struct WebPage {
  controller: webView.WebviewController = new webView.WebviewController();
  @State buttonName: string = "请求";
  @State webVisibility: Visibility = Visibility.Visible;
  @State webSrc: string = "http://www.harmonyos.com";

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

      Text("harmonyOS官网")
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
        Web({ src: this.webSrc, controller: this.controller })
          .zoomAccess(true)
          .height(StyleConstant.FULL_HEIGHT)
          .width(StyleConstant.FULL_WIDTH)
      }
      .visibility(this.webVisibility)
      .height(StyleConstant.WEB_HEIGHT)
      .width(StyleConstant.FULL_WIDTH)
      .align(Alignment.Top)
    }
    .width(StyleConstant.FULL_WIDTH)
    .height(StyleConstant.FULL_HEIGHT)
    .backgroundImage($r('app.media.ic_background_image', ImageRepeat.NoRepeat))
    .backgroundImageSize(ImageSize.Cover)
  }

  async onRequest() {
      this.webVisibility = Visibility.Visible;
      try {
        let result = await httpGet(this.webSrc);
        if (result && result.responseCode === http.ResponseCode.OK) {
          this.controller.clearHistory();
          this.controller.loadUrl(this.webSrc);
        }
      } catch (error) {
        promptAction.showToast({
          message: "请求出错"
        })
      }
  }

  onPageShow(){
    this.onRequest()
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