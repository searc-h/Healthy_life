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
import picker from '@ohos.file.picker';
import { AlertDialogService } from '../service/AlertDialogService';
import fs from '@ohos.file.fs';


@Component
export struct UserBaseInfo {
  @Prop userName: string;
  @Prop signature: string;
  @Prop level : string;
  @Provide imgUrl : string | undefined = undefined;
  urls = null;

  private dialogController : CustomDialogController = new CustomDialogController({
    builder : CustomConfirmDialog({
      cancel : ()=>{},
    }),
    autoCancel : false
  })

  openGallery = async () : Promise<Array<string>> => {
    const photoSelectOptions = new picker.PhotoSelectOptions();
    photoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE; // 过滤选择媒体文件类型为IMAGE
    photoSelectOptions.maxSelectNumber = 1; // 选择媒体文件的最大数目
    let uris = null;
    const photoViewPicker = new picker.PhotoViewPicker();
    let mediaUris: Array<string> = []
    mediaUris = await new Promise((resolve) => {
      photoViewPicker.select(photoSelectOptions).then((photoSelectResult) => {
        uris = photoSelectResult.photoUris;
        console.info('photoViewPicker.select to file succeed and uris are:' + uris);
        resolve(uris);
      }).catch((err) => {
        console.error(`Invoke photoViewPicker.select failed, code is ${err.code}, message is ${err.message}`);
      })
    })
    this.urls = mediaUris.slice()
    console.info("uris is : " , this.urls)
    return mediaUris
}

  selectFile = ()=>{
    try {
      this.openGallery().then(res=>{
        console.log("res is :" , res[0])
        let file = fs.openSync(res[0] ,  fs.OpenMode.READ_ONLY);
        console.info('file fd: ' + file.fd);
        let buffer = new ArrayBuffer(5 * 1024 * 1024);
        let readLen = fs.readSync(file.fd, buffer);
        console.info('readSync data to file succeed and buffer size is:' + readLen);
        console.info("buffer is  :" , buffer.slice(0,1000))
        fs.closeSync(file);

        this.dialogController.open()
      })
    } catch (err) {
      console.error('PhotoViewPicker failed with err: ' + err);
    }
  }

  build() {
    Column() {
      // userIcon
      Image(this.imgUrl || $r('app.media.ic_user'))
        .objectFit(ImageFit.Contain)
        .height($r('app.float.default_66'))
        .width($r('app.float.default_66'))
        .margin({ top: $r('app.float.default_71') })
        .onClick(this.selectFile)

      Column() {
        Text(this.level)
          .fontSize($r('app.float.default_12'))
          .fontWeight(FontWeight.Bolder)
          .fontColor($r('app.color.leveColor'))
      }
      .width($r('app.float.default_44'))
      .height($r('app.float.default_16'))
      .margin({ top: $r('app.float.default_n8') })
      .border({ radius: $r('app.float.default_5') })
      .backgroundColor($r('app.color.leveBgColor'))
      .justifyContent(FlexAlign.Center)

      // nickname
      Text(this.userName)
        .fontSize($r('app.float.default_20'))
        .fontFamily($r('app.string.Helvetica'))
        .margin({ bottom: $r('app.float.default_6') })
        .fontWeight(FontWeight.Normal)
        .fontColor($r('app.color.black'))

      // signature
      Text(this.signature).fontSize($r('app.float.default_16')).fontWeight(FontWeight.Normal)
        .fontFamily($r('app.string.PingFangSC_Regular'))
        .fontColor($r('app.color.signatureColor'))
    }
  }
}

@CustomDialog
export struct CustomConfirmDialog {
  controller: CustomDialogController
  @Consume imgUrl : string;
  cancel: () => void = ()=>{}
  confirm: () => void = ()=>{}


  showImage = ()=>{
  }


  build() {
    Column() {
      Image(this.imgUrl || $r('app.media.ic_user'))
        .objectFit(ImageFit.Contain)
        .height($r('app.float.default_66'))
        .width($r('app.float.default_66'))
        .margin({ top: $r('app.float.default_71') })
        .onClick(this.showImage)
      Flex({ justifyContent: FlexAlign.SpaceAround }) {
        Button('确定')
          .onClick(() => {
            this.controller.close()
            this.confirm()
          }).backgroundColor(0xffffff).fontColor(Color.Black)
        Button('取消')
          .onClick(() => {
            this.controller.close()
            this.cancel()
          }).backgroundColor(0xffffff).fontColor(Color.Red)
      }.margin({ bottom: 10 })
    }
  }
}