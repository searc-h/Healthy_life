import { CommonConstants as Const } from '../common/constants/CommonConstants';


export const enum PageState {
  Loading = 0,
  Success = 1,
  Fail = 2
}

export default class NewsModel {
  newsData: Array<any> = [];
  currentPage: number = 1;
  pageSize: number = 4;
  pullDownRefreshText: Resource | string = "drop-down refresh";
  pullDownRefreshImage: Resource | string = "";
  pullDownRefreshHeight: number = 70;
  isVisiblePullDown: boolean = false;
  pullUpLoadText: Resource | string = "Loading in...";
  pullUpLoadImage: Resource | string = "";
  pullUpLoadHeight: number = 70;
  isVisiblePullUpLoad: boolean = false;
  offsetY: number = 0;
  pageState: number = PageState.Loading;
  hasMore: boolean = true;
  startIndex = 0;
  endIndex = 0;
  downY = 0;
  lastMoveY = 0;
  isRefreshing: boolean = false;
  isCanRefresh = false;
  isPullRefreshOperation = false;
  isLoading: boolean = false;
  isCanLoadMore: boolean = false;
}