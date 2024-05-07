import router from '@ohos.router';
import { httpRequest } from '../common/utils/httpUtils'
import { CommonConstants } from '../common/constants/CommonConstants';
import { AlertDialogService } from '../service/AlertDialogService'
import { LoginComponent } from '../view/LoginComponent';
import { GlobalContext } from '../common/utils/GlobalContext'
import http from '@ohos.net.http';
import { UserInfo } from '../model/Mine';

/**
 * This template implements the Login function.
 * First register personal details. Log in after entering the username and password.
 * Click the button at the bottom to ask for help and check the privacy statement.
 * Developers can save username and password by Preference or Relational Database.
 */
@Entry
@Component
struct LoginPage {
  aboutToAppear() {
    // MediaQueryModel.register();
  }

  aboutToDisappear() {
    // MediaQueryModel.unRegister();
  }

  build() {
    Column() {
      this.Title()

      Scroll() {
        Column() {
          LoginComponent()

          Blank()
        }
        .height(CommonConstants.FULL_HEIGHT)
        .constraintSize({ minHeight: 100 })
        .alignItems(HorizontalAlign.Start)
        .padding(10)
      }
      .layoutWeight(1)
    }
    .width('100%')
    .backgroundColor($r('app.color.login_page_background'))
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

      Text("登陆")
        .fontSize($r('app.float.title_text_size'))
        .fontColor($r('app.color.title'))
        .fontWeight(CommonConstants.TITLE_FONT_WEIGHT)
    }
    .width(CommonConstants.FULL_WIDTH_PERCENT)
    .height($r('app.float.title_height'))
  }
}


@CustomDialog
export struct CustomDialogExample {
  controller: CustomDialogController;
  @State email : string = "";
  @State count : number = 120;
  @State code : string = "";
  @State isWaiting : boolean = false;
  EmailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/i;

  startCount = ()=>{
    setTimeout(()=>{
      if(this.count > 0){
        this.count -= 1;
        this.startCount()
      }
    }, 1000)
  }

  getCode = ()=>{
    httpRequest({
      url : `/users/code/${this.email}`,
    }).then(res=>{
      this.isWaiting = true;
      this.startCount()
    })
  }


  confirm = ()=>{
    httpRequest({
      url : "/users/login/email",
      method: http.RequestMethod.POST,
      extraData : {
        email : this.email,
        code : this.code,
      }
    }).then(res=>{
      if(res.errno === 0){
        AlertDialogService({
          message: res.message
        })
      }else if(res.errno === -1){
        GlobalContext.getContext().setObject<UserInfo>("User_Info" , {
          token: res.data.token,
          userName: res.data.userInfo.username,
          userId : res.data.userInfo._id,
          level : res.data.userInfo.level,
          isLogin: true
        })
        AlertDialogService({
          message: res.message,
          action:()=>router.back()
        })
      }
    })
  }



  build() {

      Column(){
        GridRow({
          columns: {
            sm: CommonConstants.GRID_ROW_SM,
            md: CommonConstants.GRID_ROW_MD,
            lg: CommonConstants.GRID_ROW_LG
          },
          gutter: { x: CommonConstants.GUTTER_X },
          breakpoints: { value: CommonConstants.BREAK_POINT }
        }) {
          GridCol({
            span: {
              sm: CommonConstants.SPAN_SM,
              md: CommonConstants.SPAN_MD,
              lg: CommonConstants.SPAN_LG
            },
            offset: {
              sm: CommonConstants.OFFSET_SM,
              md: CommonConstants.OFFSET_MD,
              lg: CommonConstants.OFFSET_LG
            }
          }) {
            Column() {
              TextInput({ placeholder: "请输入邮箱"})
                .width("90%")
                .height($r('app.float.text_input_height'))
                .placeholderColor($r('app.color.text_input_place_holder'))
                .placeholderFont({ size: $r('app.float.text_input_font_size') })
                .backgroundColor($r('app.color.login_input_text_background'))
                .fontSize($r('app.float.text_input_font_size'))
                .padding({ left: $r('app.float.username_padding_left') })
                .border({
                  width: { bottom: $r('app.float.input_border_width') },
                  color: $r('app.color.input_border_color'),
                  radius: $r('app.float.input_border_radius')
                })
                .onChange((value: string) => {
                  this.email = value;
                })

              Row(){
                TextInput({ placeholder: "请输入验证码" })
                  .width("55%")
                  .height($r('app.float.text_input_height'))
                  .placeholderColor($r('app.color.text_input_place_holder'))
                  .placeholderFont({ size: $r('app.float.text_input_font_size') })
                  .backgroundColor($r('app.color.login_input_text_background'))
                  .fontSize($r('app.float.text_input_font_size'))
                  .padding({ left: $r('app.float.username_padding_left') })

                  .border({
                    width: { bottom: $r('app.float.input_border_width') },
                    color: $r('app.color.input_border_color'),
                    radius: $r('app.float.input_border_radius')
                  })
                  .onChange((value: string) => {
                    this.code = value;
                  })

                Button(this.isWaiting ? `${this.count}秒`: "获取验证码")
                  .width("30%")
                  .height($r('app.float.login_btn_height'))
                  .fontSize($r('app.float.text_input_font_size'))
                  .fontWeight(CommonConstants.BUTTON_FONT_WEIGHT)
                  .enabled(!this.isWaiting)
                  .fontColor(!this.isWaiting ? Color.White : $r('app.color.login_font_normal'))
                  .backgroundColor(!this.isWaiting ? $r('app.color.login_btn_enabled') : $r('app.color.login_btn_normal'))
                  .borderRadius($r('app.float.register_btn_border_radius'))
                  .margin({ top: $r('app.float.register_btn_margin_top') })
                  .fontColor($r('app.color.register_font_clickable'))
                  .backgroundColor($r('app.color.register_btn_clickable'))
                  .onClick(()=>{
                    this.EmailReg.test(this.email) ?
                    this.getCode() :
                    AlertDialogService({
                      message : "邮箱格式不正确"
                    })
                  })
              }
            }
          }
        }

        Flex({ justifyContent: FlexAlign.SpaceAround }) {
          Button('取消')
            .onClick(() => {
              this.controller.close()
            }).backgroundColor(0xffffff).fontColor(Color.Black)
          Button('确认')
            .onClick(() => {
              this.controller.close()
              this.confirm()
            }).backgroundColor(0xffffff).fontColor(Color.Red)
        }.margin({top:10, bottom: 10 })
      }
    }
}