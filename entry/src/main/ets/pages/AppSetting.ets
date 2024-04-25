import router from '@ohos.router';
import {CommonConstants } from '../common/constants/CommonConstants'
import SettingItemComponent  from '../view/SettingItemComponent';
import PreferencesUtil from '../common/utils/PreferencesUtils'
import promptAction from '@ohos.promptAction';
import SliderSettingComponent from '../view/SliderSettingComponent'


@Entry
@Component
struct AppSetting {
  @State message: string = 'Hello World'
  @State changeFontSize: number = 16;
  @State settingTag : "font" | "tab" | undefined = undefined;

  settingTab  = [
    {
      id : 1,
      name : "首页",
      value : true
    },
    {
      id : 2,
      name : "成就",
      value : true
    },
    {
      id : 3,
      name : "历史",
      value : true
    },
    {
      id : 4,
      name : "我的",
      value : true
    },
    {
      id : 5,
      name : "AI",
      value : true
    }
  ]

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

            SliderSettingComponent({
              changeFontSize : $changeFontSize
            })
            .margin({top : 10})

            Row(){
              SettingItemComponent({
                settingName : "设置应用菜单栏",
                settingImage : $r("app.media.ic_storage"),
                itemClick: () => {},
                changeFontSize : this.changeFontSize
              })
            }
            .blockBackground("1.5%")
            .margin({top : 50})

            ForEach(this.settingTab , (item)=>{
              Row() {
                Text(item.name)
                  .height(40)
                  .padding({left: 10})
                  .fontSize(this.changeFontSize)
                  .textAlign(TextAlign.Start)
                  .margin({left: 40})
                  .width("50%")
                Toggle({ type: ToggleType.Switch ,isOn:item.value })
                  .margin({left: 10, right: 10})
                  .onChange((isOn: boolean) => {
                    if(isOn) {
                      promptAction.showToast({ message:  `${item.name} is on.` })
                    } else {
                      promptAction.showToast({ message: `${item.name} is off.` })
                    }
                  })
              }
              .width('70%')
              .justifyContent(FlexAlign.SpaceBetween)
            } , item=>item.id)

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