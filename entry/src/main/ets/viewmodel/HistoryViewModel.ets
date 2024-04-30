
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { httpRequest } from '../common/utils/httpUtils';
import { ITaskItem, UserTaskType } from '../model/TaskInitList';
import { AlertDialogService } from '../service/AlertDialogService';

export interface  ResultType {
  date : ResultListType[]
}

export interface ResultListType {
  _id : string,
  count : number,
  histories : ClockHistoryType[]
}

export interface ClockHistoryType{
  userId: string,
  title: string,
  content: string,
  date: string,
  userTaskId: string,
  userTaskDetails : Partial<UserTaskType>,
  task: Partial<ITaskItem>
}

class HistoryViewModel {
  /**
   * Get news type list from server.
   *
   * @return NewsTypeBean[] newsTypeList
   */
   getHistoryList(userId: string): Promise<ResultListType[]> {
    if(!userId) {
      AlertDialogService({ message : "没有用户唯一标识"})
    }

     return new Promise(res=>{
       httpRequest<ResultType>({
         url : `/clock/${userId}`
       }).then(result=>{
         if(result.errno === -1){
           res(result.data.date as ResultListType[])
         }else{
           res({} as ResultListType[])
         }
       })
     })
  }

}

let historyViewModel = new HistoryViewModel();

export default historyViewModel as HistoryViewModel;


/**
 * Custom refresh load layout data.
 */
@Observed
export class CustomRefreshLoadLayoutClass {
  /**
   * Custom refresh load layout isVisible.
   */
  isVisible: boolean;

  /**
   * Custom refresh load layout imageSrc.
   */
  imageSrc: Resource | string;

  /**
   * Custom refresh load layout textValue.
   */
  textValue: Resource | string;

  /**
   * Custom refresh load layout heightValue.
   */
  heightValue: number;

  constructor(isVisible: boolean, imageSrc: Resource | string, textValue: Resource | string, heightValue: number) {
    this.isVisible = isVisible;
    this.imageSrc = imageSrc;
    this.textValue = textValue;
    this.heightValue = heightValue;
  }
}

