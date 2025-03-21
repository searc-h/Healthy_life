import BroadCastCallBackInfo from '@bundle:com.example.healthy_life/entry/ets/viewmodel/BroadCastCallBackInfo';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
const FILE_TAG = 'BroadCast';
const callBackArrayTemp = new BroadCastCallBackInfo();
export class BroadCast {
    constructor() {
        this.callBackArray = callBackArrayTemp;
    }
    on(event, callback) {
        Logger.info(FILE_TAG, 'register broadcast with type ' + event);
        switch (event) {
            case BroadCastType.SHOW_ACHIEVEMENT_DIALOG:
                this.callBackArray.showAchievementDialog = callback;
                break;
            case BroadCastType.SHOW_TASK_DETAIL_DIALOG:
                this.callBackArray.showTaskDetailDialog = callback;
                break;
            case BroadCastType.SHOW_TARGET_SETTING_DIALOG:
                this.callBackArray.showTargetSettingDialog = callback;
                break;
            case BroadCastType.SHOW_REMIND_TIME_DIALOG:
                this.callBackArray.showRemindTimeDialog = callback;
                break;
            case BroadCastType.SHOW_FREQUENCY_DIALOG:
                this.callBackArray.showFrequencyDialog = callback;
                break;
            default:
                break;
        }
    }
    off(event, callback) {
        if (event === null) {
            Logger.info(FILE_TAG, 'cancel all broadcast');
            this.callBackArray = callBackArrayTemp;
        }
        Logger.info(FILE_TAG, 'cancel broadcast with type ' + event);
        const cbs = this.callBackArray;
        if (!cbs) {
            return;
        }
        if (callback === null) {
            switch (event) {
                case BroadCastType.SHOW_ACHIEVEMENT_DIALOG:
                    this.callBackArray.showAchievementDialog = () => { };
                    break;
                case BroadCastType.SHOW_TASK_DETAIL_DIALOG:
                    this.callBackArray.showTaskDetailDialog = () => { };
                    break;
                case BroadCastType.SHOW_TARGET_SETTING_DIALOG:
                    this.callBackArray.showTargetSettingDialog = () => { };
                    break;
                case BroadCastType.SHOW_REMIND_TIME_DIALOG:
                    this.callBackArray.showRemindTimeDialog = () => { };
                    break;
                case BroadCastType.SHOW_FREQUENCY_DIALOG:
                    this.callBackArray.showFrequencyDialog = () => { };
                    break;
                default:
                    break;
            }
        }
    }
    emit(event, args) {
        if (!this.callBackArray) {
            Logger.info(FILE_TAG, 'emit broadcast failed for no callback');
            return;
        }
        Logger.info(FILE_TAG, 'emit broadcast with type ' + event);
        let cbs = [];
        switch (event) {
            case BroadCastType.SHOW_ACHIEVEMENT_DIALOG:
                cbs = [this.callBackArray.showAchievementDialog];
                break;
            case BroadCastType.SHOW_TASK_DETAIL_DIALOG:
                cbs = [this.callBackArray.showTaskDetailDialog];
                break;
            case BroadCastType.SHOW_TARGET_SETTING_DIALOG:
                cbs = [this.callBackArray.showTargetSettingDialog];
                break;
            case BroadCastType.SHOW_REMIND_TIME_DIALOG:
                cbs = [this.callBackArray.showRemindTimeDialog];
                break;
            case BroadCastType.SHOW_FREQUENCY_DIALOG:
                cbs = [this.callBackArray.showFrequencyDialog];
                break;
            default:
                break;
        }
        if (cbs) {
            let len = cbs.length;
            for (let i = 0; i < len; i++) {
                try {
                    if (args instanceof Array) {
                        cbs[i](args[0], args[1]);
                    }
                    else {
                        cbs[i](args);
                    }
                }
                catch (error) {
                    new Error(error);
                }
            }
        }
    }
}
export var BroadCastType;
(function (BroadCastType) {
    BroadCastType["SHOW_ACHIEVEMENT_DIALOG"] = "showAchievementDialog";
    BroadCastType["SHOW_TASK_DETAIL_DIALOG"] = "showTaskDetailDialog";
    BroadCastType["SHOW_TARGET_SETTING_DIALOG"] = "showTargetSettingDialog";
    BroadCastType["SHOW_REMIND_TIME_DIALOG"] = "showRemindTimeDialog";
    BroadCastType["SHOW_FREQUENCY_DIALOG"] = "showFrequencyDialog";
})(BroadCastType || (BroadCastType = {}));
//# sourceMappingURL=BroadCast.js.map