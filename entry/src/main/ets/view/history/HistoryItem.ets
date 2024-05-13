

import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import { AlertDialogService } from '../../service/AlertDialogService';
import { ClockHistoryType, ResultListType } from '../../viewmodel/HistoryViewModel';
import { TaskCard } from '../home/TaskCardComponent';
import router from '@ohos.router';

/**
 * The news list item component.
 */
@Component
export default struct HistoryItem {
  private data: Partial<ClockHistoryType> = {};

  clickAvatar = ()=>{
    router.pushUrl({
      url:"pages/PersonPage",
      params : {
        userInfo : {
          username : this.data.user.username,
          level : this.data.user.level,
          userId : this.data.user._id
        }
      }
    })
  }

  build() {
    Column() {
      Row() {
        Column(){
          Row(){
            Image($r('app.media.daka'))
              .width(Const.NewsTitle_IMAGE_WIDTH)
              .height("22vp")
              .objectFit(ImageFit.Contain)
            Text(this.data.title)
              .fontSize(20)
              .fontColor("#000000")
              .width(Const.NewsTitle_TEXT_WIDTH)
              .maxLines(1)
              .margin({ left: Const.NewsTitle_TEXT_MARGIN_LEFT })
              .textOverflow({ overflow: TextOverflow.Ellipsis })
              .fontWeight(Const.NewsTitle_TEXT_FONT_WEIGHT)
          }
          .margin({left :"5vp"})
        }
        .width("80%")

        Column(){
          Row(){
            Image($r('app.media.ic_user'))
              .objectFit(ImageFit.Contain)
              .onClick(this.clickAvatar)
          }
          .height("30vp")
          .margin({right :"5vp"})
          .padding({left:"5vp",right:"5vp"})
        }
        .width("20%")
      }
      .width("97%")
      .margin({top : '5vp'})
      .height("22vp")

      Text(this.data.content)
        .fontSize(Const.NewsContent_FONT_SIZE)
        .fontColor("#000")
        .height(Const.NewsContent_HEIGHT)
        .lineHeight("22vp")
        .width(Const.NewsContent_WIDTH)
        .maxLines(Const.NewsContent_MAX_LINES)
        .margin({ left: Const.NewsContent_MARGIN_LEFT ,top: Const.NewsContent_MARGIN_TOP  ,bottom:Const.NewsContent_MARGIN_TOP })
        .textOverflow({ overflow: TextOverflow.Ellipsis })

      TaskCard({
        taskInfoStr: JSON.stringify({
          ...this.data.userTaskDetails,
          taskId : this.data.task
        }),
      })
        .margin({ bottom: Const.DEFAULT_12 })
        .height($r('app.float.default_36'))
        .width("95%")


      Row(){
        Row(){
          Text("心情：")
            .fontSize("14vp")
            .margin({left:"5vp"})
          Image(`${Const.SERVER}/images/media/emotion_${this.data.emoLevel}.png`)
            .width(Const.NewsTitle_IMAGE_WIDTH)
            .height("30vp")
            .objectFit(ImageFit.Contain)
        }

        Text(""  + this.data.date.split("T")[0] + "  " + this.data.date.split("T")[1].split(".")[0])
          .fontSize(Const.NewsSource_FONT_SIZE)
          .fontColor("FF989898")
          // .width("80%")
          .maxLines(Const.NewsSource_MAX_LINES)
          .margin({ left: Const.NewsSource_MARGIN_LEFT })
          .textOverflow({ overflow: TextOverflow.None })
      }
      .width("90%")
      .height("30vp")
      .justifyContent(FlexAlign.SpaceBetween)
    }
    .alignItems(HorizontalAlign.Center)
  }
}