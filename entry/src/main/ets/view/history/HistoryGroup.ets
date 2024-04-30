

import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import { ClockHistoryType, ResultListType } from '../../viewmodel/HistoryViewModel';
import HistoryItem from './HistoryItem';

/**
 * The news list item component.
 */
@Component
export default struct HistoryGroup {
  private data: Partial<ResultListType> = {};

  build() {
    Column() {

      Text(this.data._id)
      .margin({top :'10vp' , left : '20vp'})
      .alignSelf(ItemAlign.Start)
      .fontWeight(FontWeight.Bold)
      .fontSize(23)
      .fontColor($r("app.color.statusTipColor"))

      List(){
        ForEach(this.data.histories , (item:ClockHistoryType)=>{
          ListItem(){
            HistoryItem({ data: item })
              .height("180vp")
              .backgroundColor($r('app.color.white'))
              .margin({ top: "12vp" })
              .borderRadius(Const.NewsListConstant_ITEM_BORDER_RADIUS)
          }
        } , (item:ClockHistoryType)=>JSON.stringify(item))
      }
      .margin({left : '3.3%'})
    }
    .width(Const.FULL_WIDTH)

  }
}