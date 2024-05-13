import router from '@ohos.router'
import { CommonConstants ,  CommonConstants as Const} from '../common/constants/CommonConstants';

@Entry
@Component
struct UserGuidePage {
  @State message: string = 'Hello World'
  @State naviAlpha: number = 0;
  private scroller: Scroller = new Scroller();
  private yOffset: number = 0;
  onScrollAction() {
    this.yOffset = this.scroller.currentOffset().yOffset;
    if (this.yOffset > Const.DEFAULT_56) {
      this.naviAlpha = 1;
    } else {
      this.naviAlpha = this.yOffset / Const.DEFAULT_56;
    }
  }

  tips  = [
    {
      tip:"①点击首页右下角蓝色加号按钮添加任务",
      image: $r("app.media.tips_add")
    },
    {
      tip:"②点击首页任务卡片打卡任务",
      image: $r("app.media.tips_click")
    },
    {
      tip:"③长按首页任务卡片修改任务",
      image: $r("app.media.tips_click")
    },
    {
      tip:"④点击首页已完成任务填写日志分享",
      image: $r("app.media.tips_long_touch")
    },
    {
      tip:"⑤点击首页时间选择不同日期查看任务",
      image: $r("app.media.tips_select_time")
    },
    {
      tip:"⑥每解锁一个打卡成就就会获得等级提升",
      image : $r("app.media.tips_level")
    }
  ]

  build() {
      Column() {
        this.Title()

        Scroll(this.scroller){
          Column(){
            ForEach(this.tips , (item)=>{
              Column(){
                Text(item.tip)
                  .fontSize(18)
                  .fontWeight(FontWeight.Bold)
                Row(){
                  Image(item.image)
                    .objectFit(ImageFit.Contain)
                }
                .backgroundColor("#fff")
                .width("100%")
              }
              .height("45%")
              .margin({bottom:"20vp",top:"20vp"})
            } , (item)=>JSON.stringify(item))
          }
        }
        .scrollBar(BarState.Off)
        .align(Alignment.TopStart)
        .width(Const.THOUSANDTH_1000)
        .height(Const.THOUSANDTH_1000)
        .backgroundColor("#dfe3effa")
        .onScroll(() => {
          this.onScrollAction()
        })

      }
      .padding({bottom:"100vp"})
      .width('100%')
      .height('100%')
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

      Text("使用手册")
        .fontSize($r('app.float.title_text_size'))
        .fontColor($r('app.color.title'))
        .fontWeight(CommonConstants.TITLE_FONT_WEIGHT)
    }
    .width(CommonConstants.FULL_WIDTH_PERCENT)
    .height($r('app.float.title_height'))
  }
}