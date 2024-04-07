/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import dataRdb from '@ohos:data.relationalStore';
import GlobalInfo from '@bundle:com.example.healthy_life/entry/ets/viewmodel/GlobalInfo';
import { CommonConstants as Const } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import RdbUtils from '@bundle:com.example.healthy_life/entry/ets/common/database/rdb/RdbUtils';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
class GlobalInfoApi {
    /**
     * Insert globalInfo.
     *
     * @param globalInfo
     * @param callback
     */
    insertData(globalInfo, callback) {
        const valueBucket = generateBucket(globalInfo);
        RdbUtils.insert('GlobalInfo', valueBucket).then(result => {
            callback(result);
        });
        Logger.info('GlobalInfoTable', 'Insert globalInfo finished.');
    }
    /**
     * Update globalInfo.
     *
     * @param globalInfo
     * @param callback
     */
    updateData(globalInfo, callback) {
        const valueBucket = generateBucket(globalInfo);
        let predicates = new dataRdb.RdbPredicates(Const.GLOBAL_INFO.tableName ? Const.GLOBAL_INFO.tableName : '');
        predicates.equalTo('id', 0);
        RdbUtils.update(valueBucket, predicates).then((result) => {
            callback(result);
        });
        Logger.info('GlobalInfoTable', 'Update globalInfo finished.');
    }
    /**
     * Query globalInfo.
     *
     * @param callback
     */
    query(callback) {
        let predicates = new dataRdb.RdbPredicates(Const.GLOBAL_INFO.tableName ? Const.GLOBAL_INFO.tableName : '');
        predicates.equalTo('id', 0);
        RdbUtils.query(predicates).then(resultSet => {
            let count = resultSet.rowCount;
            if (count === 0) {
                Logger.info('GlobalInfoTable', 'query no results!');
                let result = new GlobalInfo('', '', 0, '');
                callback(result);
            }
            else {
                let result = new GlobalInfo('', '', 0, '');
                resultSet.goToFirstRow();
                result.firstDate = resultSet.getString(resultSet.getColumnIndex('firstDate'));
                result.lastDate = resultSet.getString(resultSet.getColumnIndex('lastDate'));
                result.checkInDays = resultSet.getDouble(resultSet.getColumnIndex('checkInDays'));
                result.achievements = resultSet.getString(resultSet.getColumnIndex('achievements'));
                callback(result);
            }
        });
    }
}
function generateBucket(globalInfo) {
    var _a;
    let valueBucket = {};
    (_a = Const.GLOBAL_INFO.columns) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
        if (item === 'id') {
            valueBucket[item] = 0;
        }
        else {
            switch (item) {
                case 'firstDate':
                    valueBucket[item] = globalInfo.firstDate;
                    break;
                case 'lastDate':
                    valueBucket[item] = globalInfo.lastDate;
                    break;
                case 'checkInDays':
                    valueBucket[item] = globalInfo.checkInDays;
                    break;
                case 'achievements':
                    valueBucket[item] = globalInfo.achievements;
                    break;
                default:
                    break;
            }
        }
    });
    return valueBucket;
}
let globalInfoApi = new GlobalInfoApi();
export default globalInfoApi;
//# sourceMappingURL=GlobalInfoApi.js.map