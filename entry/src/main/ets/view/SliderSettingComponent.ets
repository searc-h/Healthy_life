import PreferencesUtil from  '../common/utils/PreferencesUtils'
import { AlertDialogService } from '../service/AlertDialogService';

@Component
export default struct SliderSettingComponent  {
  @Link changeFontSize : number;


  build(){
    Row(){
      Text("A")
        .fontColor($r('app.color.text'))
        .fontSize("14fp")
        .fontWeight(FontWeight.Medium)
        .textAlign(TextAlign.End)
        .width("7.5%")
        .padding({ right: "9vp" })

      Slider({
        value: this.changeFontSize,
        step : 4,
        min : 12,
        max : 24,
        style: SliderStyle.InSet
      })
        .showSteps(true)
        .width("75%")
        .onChange(async (value : number)=>{
          if (this.changeFontSize === 0) {
            this.changeFontSize = await PreferencesUtil.getChangeFontSize();
            return;
          }
          this.changeFontSize = value;
          PreferencesUtil.saveChangeFontSize(this.changeFontSize)
        })


      Text("A")
        .fontColor($r('app.color.text'))
        .fontSize("26fp")
        .fontWeight(FontWeight.Medium)
        .textAlign(TextAlign.End)
        .width("7.5%")
        .padding({ right: "9vp" })
        .margin({left :10})
    }
  }
}