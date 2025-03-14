/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import http from '@ohos.net.http';
import { UserInfo } from '../../model/Mine';
import { AlertDialogService } from '../../service/AlertDialogService';
import { CommonConstants as Const , ContentType } from '../constants/CommonConstants';
import { paramsObjToFullUrl } from '../utils/Utils'
import { GlobalContext } from './GlobalContext'

export interface ResponseResult<T> {
  /**
   *   0 : error happened .
   *  -1 : normal request
   */
  errno: 0 | -1;

  /**
   * Message returned by the network request.
   */
  message: string | Resource;

  /**
   * Data returned by the network request.
   */
  data: T;
}

export interface RequestType {

  server? : string;
  /**
   * The origin path without any params
   */
  url: string;

  /**
   * Request method.
   */
  method?: http.RequestMethod; // default is GET

  query?: Record<string , string | number>;

  /**
   * Additional data of the request.
   * extraData can be a string or an Object (API 6) or an ArrayBuffer(API 8).
   */
  extraData?: string | Object | ArrayBuffer;

  header?: Object; // default is 'content-type': 'application/json'

}
/**
 * Initiates an HTTP request to a given URL.
 *
 * @param url URL for initiating an HTTP request.
 * @param params Params for initiating an HTTP request.
 */
export function httpRequest<T = any>(requestObj : RequestType): Promise<ResponseResult<T>> {
  const { server = Const.SERVER, url , method = http.RequestMethod.GET , query , extraData , header} = requestObj;
  const userInfo = GlobalContext.getContext().getObject("User_Info") as UserInfo

  const httpRequest = http.createHttp()
  const responseResult = httpRequest.request(paramsObjToFullUrl(server + url , query||{}), {
    method: method,
    readTimeout: Const.HTTP_READ_TIMEOUT,
    header: {
      'Content-Type': ContentType.JSON,
      ...header,
      "Authorization" : `Bearer ${userInfo?.token}`
    },
    connectTimeout: Const.HTTP_READ_TIMEOUT,
    extraData: extraData
  });
  let serverData: ResponseResult<T> = {} as ResponseResult<T>
  // Processes the data and returns.
  return responseResult.then((value: http.HttpResponse) => {
    if (value.responseCode === 200) {
      // Obtains the returned data.
      let result = `${value.result}`;
      let resultJson: ResponseResult<T> = JSON.parse(result);
      if (resultJson.errno === -1) {
        serverData.data = resultJson.data;
      }
      serverData.errno = resultJson.errno;
      serverData.message = resultJson.message;
    } else {
      serverData.message = `${$r('app.string.http_error_message')}&${value.responseCode}`;
    }
    return serverData as ResponseResult<T> ;
  }).catch((err) => {
    serverData.message = $r('app.string.http_error_message');
    AlertDialogService({
      title:"提示",
      message:JSON.stringify(err.message)
    })
    return serverData;
  })
}


export async function httpGet(url: string) {
  if (!url) {
    return undefined;
  }
  let request = http.createHttp();
  let options = {
    method: http.RequestMethod.GET,
    header: { 'Content-Type': 'application/json' },
    readTimeout: Const.HTTP_READ_TIMEOUT,
    connectTimeout: Const.HTTP_READ_TIMEOUT
  } as http.HttpRequestOptions;
  let result = await request.request(url, options);
  return result;
}