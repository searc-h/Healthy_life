import router from '@ohos.router';
import { CommonConstants } from '../common/constants/CommonConstants';
import { LoginComponent } from '../view/LoginComponent';
import { httpRequest } from '../common/utils/httpUtils'
import { AlertDialogService } from '../service/AlertDialogService'
import http from '@ohos.net.http';
import { GlobalContext } from '../common/utils/GlobalContext';



/**
 * This template implements the Login function.
 * First register personal details. Log in after entering the username and password.
 * Click the button at the bottom to ask for help and check the privacy statement.
 * Developers can save username and password by Preference or Relational Database.
 */
@Entry
@Component
struct RegisterPage {
  @StorageProp('isMinHeight') isMinHeight: boolean = false;
  @State userName: string = '';
  @State password: string = '';
  @State code : string = '';
  @State email : string = '';
  @State submitProgress : "uploading" | "finished" = "finished";
  @State isWaiting : boolean = false;
  @State count : number = 120;

  EmailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/i;

  registerConfirm = ()=>{
    if(this.userName.trim() == '' || this.password.trim() == ''){
      AlertDialogService({  title:"注册提示" , message: '用户名或者密码不能为空'})
      return
    }
    this.submitProgress = "uploading"

    httpRequest({
      url: "/users/register",
      method: http.RequestMethod.POST,
      extraData:{
        username: this.userName,
        password: this.password,
        email: this.email,
        code: this.code
      }
    }).then(res=>{
      if(res.errno === -1){
        AlertDialogService({
          message: res.message,
          action : ()=> router.back()
        })
      }
      else{
        AlertDialogService({
          message: res.message,
        })
      }
    }).finally(()=>{
      this.submitProgress = "finished"
    })
  }

  startCount = ()=>{
    this.count -= 1;
    setTimeout(()=>{
      if(this.count > 0){
        this.startCount()
      }
    }, 1000)
  }

  getCode = ()=>{
    httpRequest({
      url : `/users/code/${this.email}`
    }).then(res=>{
      this.isWaiting = true;
      this.startCount()
    })
  }

  build() {
    Column() {
      this.Title()

      Scroll() {
        Column() {

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
                TextInput({ placeholder: "请输入用户名（唯一）"})
                  .width(CommonConstants.TEXT_INPUT_WIDTH_PERCENT)
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
                    this.userName = value;
                  })

                TextInput({ placeholder: "请输入密码" })
                  .width(CommonConstants.TEXT_INPUT_WIDTH_PERCENT)
                  .height($r('app.float.text_input_height'))
                  .placeholderColor($r('app.color.text_input_place_holder'))
                  .placeholderFont({ size: $r('app.float.text_input_font_size') })
                  .fontSize($r('app.float.text_input_font_size'))
                  .backgroundColor($r('app.color.login_input_text_background'))
                  .type(InputType.Password)
                  .padding({ left: $r('app.float.password_padding_left') })
                  .border({
                    width: { bottom: $r('app.float.input_border_width') },
                    color: $r('app.color.input_border_color'),
                    radius: $r('app.float.input_border_radius')
                  })
                  .onChange((value: string) => {
                    this.password = value;
                  })

                TextInput({ placeholder: "请输入邮箱"})
                  .width(CommonConstants.TEXT_INPUT_WIDTH_PERCENT)
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
                    .width("60%")
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
                    .width("40%")
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
                }.margin({bottom : "28vp"})
              }
            }

            GridCol({
              span: {
                sm: CommonConstants.BUTTON_SPAN_SM,
                md: this.isMinHeight ? CommonConstants.BUTTON_SPAN_MD_SMALL : CommonConstants.BUTTON_SPAN_MD_BIG,
                lg: CommonConstants.BUTTON_SPAN_LG
              },
              offset: {
                sm: CommonConstants.BUTTON_OFFSET_SM,
                md: this.isMinHeight ? CommonConstants.BUTTON_OFFSET_SM : CommonConstants.BUTTON_OFFSET_MD,
                lg: CommonConstants.BUTTON_OFFSET_LG
              }
            }) {
              Button("注册")
                .width(CommonConstants.BUTTON_WIDTH_PERCENT)
                .height($r('app.float.login_btn_height'))
                .fontSize($r('app.float.text_input_font_size'))
                .fontWeight(CommonConstants.BUTTON_FONT_WEIGHT)
                .borderRadius($r('app.float.register_btn_border_radius'))
                .margin({ top: $r('app.float.register_btn_margin_top') })
                .fontColor($r('app.color.register_font_clickable'))
                .backgroundColor($r('app.color.register_btn_clickable'))
                .enabled(isLoginButtonClickable(this.userName, this.password))
                .fontColor(isLoginButtonClickable(this.userName, this.password) ?
                Color.White : $r('app.color.login_font_normal'))
                .backgroundColor(isLoginButtonClickable(this.userName, this.password) ?
                $r('app.color.login_btn_enabled') : $r('app.color.login_btn_normal'))
                .onClick(this.registerConfirm)
            }

            GridCol({
              span: {
                sm: CommonConstants.BUTTON_SPAN_SM,
                md: this.isMinHeight ? CommonConstants.BUTTON_SPAN_MD_SMALL : CommonConstants.BUTTON_SPAN_MD_BIG,
                lg: CommonConstants.BUTTON_SPAN_LG
              },
              offset: {
                sm: CommonConstants.BUTTON_OFFSET_SM,
                md: this.isMinHeight ? CommonConstants.BUTTON_OFFSET_SM : CommonConstants.BUTTON_OFFSET_MD,
                lg: CommonConstants.BUTTON_OFFSET_LG
              }
            }) {
              if(this.submitProgress == "uploading")
              Column({ space: 5 }) {
                LoadingProgress()
                  .color(Color.Blue)
              }.width('50%').margin({ top: 0 })
            }
          }


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

      Text("注册")
        .fontSize($r('app.float.title_text_size'))
        .fontColor($r('app.color.title'))
        .fontWeight(CommonConstants.TITLE_FONT_WEIGHT)
    }
    .width(CommonConstants.FULL_WIDTH_PERCENT)
    .height($r('app.float.title_height'))
  }
}

function isLoginButtonClickable(userName: string, password: string): boolean {
  return userName !== '' && password !== '';
}
