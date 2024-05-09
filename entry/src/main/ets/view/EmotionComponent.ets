import {CommonConstants as Const} from '../common/constants/CommonConstants'
import { httpRequest } from "../common/utils/httpUtils"

@Component
export struct EmotionComponent {
  @State emotionList : Array<string> = []
  @Link chooseIndex : string;

  aboutToAppear(){
    httpRequest({
      url : "/global/emotions"
    }).then(res=>{
      if(res.errno === -1) this.emotionList = res.data.emo_list
    })
  }

  clickCard = (index: string)=>{
    this.chooseIndex = index;
  }

  build() {
      Column(){
        Row(){
          ForEach(this.emotionList ,(src:string,index:number)=>{
            EmotionCard({imgSrc : src as string , index: `level_${index+1}` , selected : this.chooseIndex == `level_${index+1}`})
              .onClick(()=>{this.clickCard(`level_${index+1}`)})
          } , (item:string)=>item)
        }
        .width("100%")
        .justifyContent(FlexAlign.SpaceAround)
      }
  }
}

@Component
export struct EmotionCard {
  @Prop imgSrc : string;
  @Prop index : string;
  @Prop selected : boolean;

  build(){
    if(this.selected){
      Column(){
        Image(Const.SERVER + "/" + this.imgSrc)
          .width("40vp")
      }
      .padding("2vp")
      .border({width:"1vp",color:"#6b797070"})
    }else{
      Column(){
        Image(Const.SERVER + "/" + this.imgSrc)
          .width("40vp")
      } .padding("3vp")
    }
  }
}