struct preview{build(){Row() {
      Image($r('app.media.ic_right_grey'))
        .width($r('app.float.default_6'))
        .height($r('app.float.default_12'))
    }
    .width($r('app.float.default_20'))
    .height($r('app.float.default_20'))
    .rotate({ z: 1, angle: isRight ? 0 : Const.DEFAULT_180 })
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
       // 回到今日
        this.selectedDate = new Date();
    })}}