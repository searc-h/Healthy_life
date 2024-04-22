import router from '@ohos.router';
import { CommonConstants } from '../common/constants/CommonConstants';
import { httpRequest } from '../common/utils/httpUtils'
import { AlertDialogService } from '../service/AlertDialogService'
import http from '@ohos.net.http';
import { GlobalContext } from '../common/utils/GlobalContext';

interface LoginResDataType{
    token : string,
    userInfo: {
      _id : string,
      username: string,
    }
}
/**
 * Login page component.
 */
@Component
export struct LoginComponent {
  @StorageProp('isMinHeight') isMinHeight: boolean = false;
  @State userName: string = '';
  @State password: string = '';
  @State submitProgress : "uploading" | "finished" = "finished";

  loginConfirm = ()=>{
    if(this.userName.trim() == '' || this.password.trim() == ''){
      AlertDialogService({ title:"登陆提示", message: '用户名或者密码不能为空' })
      return
    }
    this.submitProgress = "uploading"


    httpRequest<LoginResDataType>({
      url: "/users/login",
      method: http.RequestMethod.POST,
      extraData:{
        username: this.userName,
        password: this.password
      }
    }).then(res=>{
      if(res.errno === 0){
        AlertDialogService({
          message: res.message
        })
      }else if(res.errno === -1){
        GlobalContext.getContext().setObject("User_Info" , {
          token: res.data.token,
          usename: res.data.userInfo.username,
          userId : res.data.userInfo._id,
          isLogin: true
        })
        AlertDialogService({
          message: res.message,
          action:()=>router.back()
        })
      }
    }).finally(()=>{
      this.submitProgress = "finished"
    })
  }

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
        password: this.password
      }
    }).then(res=>{
      if(res.errno === -1 || res.errno === 0){
        AlertDialogService({
          message: res.message
        })
      }
    }).finally(()=>{
      this.submitProgress = "finished"
    })
  }


  build() {
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
            .margin({ bottom: $r('app.float.input_margin_bottom') })
            .onChange((value: string) => {
              this.password = value;
            })
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
          md: CommonConstants.BUTTON_OFFSET_MD,
          lg: CommonConstants.BUTTON_OFFSET_LG
        }
      }) {
        Button("登陆")
          .width(CommonConstants.BUTTON_WIDTH_PERCENT)
          .height($r('app.float.login_btn_height'))
          .borderRadius($r('app.float.login_btn_border_radius'))
          .fontSize($r('app.float.text_input_font_size'))
          .margin({ top: $r('app.float.register_btn_margin_top') })
          .fontWeight(CommonConstants.LOGIN_TEXT_FONT_WEIGHT)
          .enabled(isLoginButtonClickable(this.userName, this.password))
          .fontColor(isLoginButtonClickable(this.userName, this.password) ?
          Color.White : $r('app.color.login_font_normal'))
          .backgroundColor(isLoginButtonClickable(this.userName, this.password) ?
          $r('app.color.login_btn_enabled') : $r('app.color.login_btn_normal'))
          .onClick(this.loginConfirm)
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
  }
}

/**
 * Calculate login button clickable by the input of username and password.
 *
 * @return {boolean} isLoginButtonClickable.
 */
function isLoginButtonClickable(userName: string, password: string): boolean {
  return userName !== '' && password !== '';
}

