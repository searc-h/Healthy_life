@CustomDialog
export struct CustomConfirmDialog {
  controller: CustomDialogController
  @Prop content : string;
  cancel: () => void = ()=>{}
  confirm: () => void = ()=>{}

  build() {
    Column() {
      Text(this.content || '内容').fontSize(20).margin({ top: 10, bottom: 10 })
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