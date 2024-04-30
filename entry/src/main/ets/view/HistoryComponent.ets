import { GlobalContext } from '../common/utils/GlobalContext'
import {CommonConstants as Const} from '../common/constants/CommonConstants'
import { HistoryList } from '../view/history/HistoryList'

@Component
export struct HistoryComponent{
  @State currentIndex : number = 0;
  @Prop currentTab : number;


  build(){
    HistoryList({
      currentIndex : $currentIndex,
      currentTab : this.currentTab
    })
      .height(Const.FULL_HEIGHT)
      .width(Const.FULL_WIDTH)
  }
}