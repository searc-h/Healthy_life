import router from '@ohos.router';
import { CommonConstants } from '../common/constants/CommonConstants';
import { httpRequest } from '../common/utils/httpUtils'
import { AlertDialogService } from '../service/AlertDialogService'
import http from '@ohos.net.http';
import { GlobalContext } from '../common/utils/GlobalContext';
import { EmotionComponent } from '../view/EmotionComponent'
import { TaskCard } from '../view/home/TaskCardComponent';
import {CommonConstants as Const} from '../common/constants/CommonConstants'
import {UserTaskType} from '../model/TaskInitList'
/**
 * This template implements the Login function.
 * First register personal details. Log in after entering the username and password.
 * Click the button at the bottom to ask for help and check the privacy statement.
 * Developers can save username and password by Preference or Relational Database.
 */
@Entry
@Component
struct SharePage {
  @StorageProp('isMinHeight') isMinHeight: boolean = false;
  @State title: string = '';
  @State content: string = '';
  @State submitProgress : "uploading" | "finished" = "finished";
  @State isWaiting : boolean = false;
  @State chooseIndex :string = "level_4";
  @State userTask : Partial<UserTaskType> = {};
  @State date : string = "";
  @State userId : string = "";

  aboutToAppear(){
    console.log("about to app")
    let params = router.getParams() as Record<string, Object>;
    const routerParams: UserTaskType  = params.params as UserTaskType;
    this.userTask = routerParams
    this.userId = this.userTask.userId._id;
    this.date = params.date as string
  }


  shareConfirm = ()=>{
    if(this.userId && this.date && this.chooseIndex){
      httpRequest({
        url:"/clock",
        method : http.RequestMethod.POST,
        extraData : {
          userId : this.userId,
          title: this.title,
          content : this.content,
          date : this.date,
          userTaskId : this.userTask._id,
          emoLevel : this.chooseIndex
        }
      }).then(res=>{
        if(res.errno === -1){
          AlertDialogService({
            message : res.message,
            action:()=>router.back()
          })
        }
      })
    }

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
                Row(){
                  Text("标题：")
                    .fontWeight(FontWeight.Bold)
                  TextInput({ placeholder: "请输入用户名（唯一）"})
                    .width(CommonConstants.TEXT_INPUT_WIDTH_PERCENT)
                    .height($r('app.float.text_input_height'))
                    .placeholderColor($r('app.color.text_input_place_holder'))
                    .placeholderFont({ size: $r('app.float.text_input_font_size') })
                    .backgroundColor($r('app.color.login_input_text_background'))
                    .fontSize($r('app.float.text_input_font_size'))
                    .padding({ left: "10vp" })
                    .border({
                      width: { bottom: $r('app.float.input_border_width') },
                      color: $r('app.color.input_border_color'),
                      radius: $r('app.float.input_border_radius')
                    })
                    .onChange((value: string) => {
                      this.title = value;
                    })
                }

                Row(){
                  Text("内容：")
                    .fontWeight(FontWeight.Bold)
                }
                .width("100%")
                .justifyContent(FlexAlign.Start)
                .margin({top:"20vp"})

                Row(){
                  TextArea({ placeholder: "请输入日志内容" })
                    .width(CommonConstants.TEXT_INPUT_WIDTH_PERCENT)
                    .height("60vp")
                    .placeholderColor($r('app.color.text_input_place_holder'))
                    .placeholderFont({ size: $r('app.float.text_input_font_size') })
                    .fontSize($r('app.float.text_input_font_size'))
                    .backgroundColor($r('app.color.login_input_text_background'))
                    .padding({ left: $r('app.float.password_padding_left') })
                    .border({
                      width: { bottom: $r('app.float.input_border_width') },
                      color: $r('app.color.input_border_color'),
                      radius: $r('app.float.input_border_radius')
                    })
                    .onChange((value: string) => {
                      this.content = value;
                    })
                }
                .margin({top:"20vp"})

                Row(){
                  Column(){
                    Text("心情：")
                      .fontWeight(FontWeight.Bold)
                  }
                  Column(){
                    EmotionComponent({chooseIndex:$chooseIndex})
                      .width("80%")

                  }
                }
                .width("100%")
                .justifyContent(FlexAlign.SpaceBetween)
                .margin({top:"20vp" })

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
              Row(){
                TaskCard({
                  taskInfoStr: JSON.stringify({
                    ...this.userTask
                  }),
                })
                  .margin({ bottom: Const.DEFAULT_12 })
                  .height($r('app.float.default_48'))
                  .width(Const.NewsSource_WIDTH)
              }
              .margin({top:"20vp" , bottom : "20vp" })
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
              Button("分享")
                .width(CommonConstants.BUTTON_WIDTH_PERCENT)
                .height($r('app.float.login_btn_height'))
                .fontSize($r('app.float.text_input_font_size'))
                .fontWeight(CommonConstants.BUTTON_FONT_WEIGHT)
                .borderRadius($r('app.float.register_btn_border_radius'))
                .margin({ top: $r('app.float.register_btn_margin_top') })
                .fontColor($r('app.color.register_font_clickable'))
                .backgroundColor($r('app.color.register_btn_clickable'))
                .enabled(isLoginButtonClickable(this.title, this.content))
                .fontColor(isLoginButtonClickable(this.title, this.content) ?
                Color.White : $r('app.color.login_font_normal'))
                .backgroundColor(isLoginButtonClickable(this.title, this.content) ?
                $r('app.color.login_btn_enabled') : $r('app.color.login_btn_normal'))
                .onClick(this.shareConfirm)
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

      Text("日志分享")
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
