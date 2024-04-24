import router from '@ohos.router';
import {CommonConstants } from '../common/constants/CommonConstants'
import SettingItemComponent  from '../view/SettingItemComponent';

@Entry
@Component
struct AppSetting {
  @State message: string = 'Hello World'
  @State changeFontSize: number = 16;
  @State settingTag : "font" | "tab" | undefined = undefined;

  build() {
    Row() {
      Column() {
        this.Title()

        Scroll() {
          Column() {
            Row(){
                SettingItemComponent({
                  settingName : "设置字体大小",
                  settingImage : $r("app.media.ic_setting_the_font_size"),
                  itemClick: () => {},
                  changeFontSize : this.changeFontSize
                })
              }
              .blockBackground("1.5%")

            Row(){
                Text("A")
                  .fontColor($r('app.color.text'))
                  .fontSize("16fp")
                  .fontWeight(FontWeight.Medium)
                  .textAlign(TextAlign.End)
                  .width("7.5%")
                  .padding({ right: "9vp" })

                Slider({
                  value: 1,
                  step : 1/3 * 100
                })
                  .width("75%")


                Text("A")
                  .fontColor($r('app.color.text'))
                  .fontSize("24fp")
                  .fontWeight(FontWeight.Medium)
                  .textAlign(TextAlign.End)
                  .width("7.5%")
                  .padding({ right: "9vp" })
              }

            Row(){
              SettingItemComponent({
                settingName : "设置应用菜单栏",
                settingImage : $r("app.media.ic_storage"),
                itemClick: () => {},
                changeFontSize : this.changeFontSize
              })
            }
            .blockBackground("1.5%")

            Row(){

            }

          }
          .height(CommonConstants.FULL_HEIGHT)
          .constraintSize({ minHeight: 100 })
          .alignItems(HorizontalAlign.Start)
          .padding(10)
        }
        .layoutWeight(1)
      }
      .width('100%')
    }
    .height('100%')
    .backgroundColor($r("sys.color.ohos_id_color_sub_background"))
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

      Text("应用设置")
        .fontSize($r('app.float.title_text_size'))
        .fontColor($r('app.color.title'))
        .fontWeight(CommonConstants.TITLE_FONT_WEIGHT)
    }
    .width(CommonConstants.FULL_WIDTH_PERCENT)
    .height($r('app.float.title_height'))
  }
}


@Extend(Row) function blockBackground (marginTop: string) {
  .backgroundColor(Color.White)
  .borderRadius("24vp")
  .margin({ top: marginTop })
  .width("93.3%")
  .padding({ top: "4vp", bottom: "4vp"})
}