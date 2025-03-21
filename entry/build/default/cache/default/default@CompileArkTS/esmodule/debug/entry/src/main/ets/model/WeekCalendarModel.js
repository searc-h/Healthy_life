import DayInfo from '@bundle:com.example.healthy_life/entry/ets/viewmodel/DayInfo';
import { WEEK_TITLES, dateToStr } from '@bundle:com.example.healthy_life/entry/ets/common/utils/Utils';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
import WeekCalendarInfo from '@bundle:com.example.healthy_life/entry/ets/viewmodel/WeekCalendarInfo';
// day number of on week
export const WEEK_DAY_NUM = 7;
export class WeekDateModel {
    constructor(weekTitle, dateStr, date) {
        this.dayInfo = new DayInfo('', 0, 0);
        this.taskList = [];
        this.weekTitle = weekTitle;
        this.dateStr = dateStr;
        this.date = date;
    }
}
/**
 * init calendar data
 *
 * @param date  today str
 */
export function initializeOnStartUp(date) {
    let weekCalendarInfo = new WeekCalendarInfo();
    let arr = [];
    let strArr = [];
    let currentDay = date.getDay() - 1;
    if (date.getDay() === 0) {
        currentDay = 6;
    }
    Logger.debug('WeekCalendarModel', date.toISOString());
    // monday is first day of week
    date.setDate(date.getDate() - currentDay);
    for (let index = 0; index < WEEK_DAY_NUM; index++) {
        let tempDate = new Date(date);
        tempDate.setDate(date.getDate() + index);
        let dateStr = dateToStr(tempDate);
        strArr.push(dateStr);
        arr.push(new WeekDateModel(WEEK_TITLES[tempDate.getDay()], dateStr, tempDate));
    }
    Logger.debug('WeekCalendarModel', 'initialWeekDate' + JSON.stringify(arr));
    weekCalendarInfo.arr = arr;
    weekCalendarInfo.strArr = strArr;
    return weekCalendarInfo;
}
/**
 * get previous week data
 *
 * @param showDate  base data
 */
export function getPreviousWeek(showDate) {
    Logger.debug('WeekCalendarModel', 'get week date by date: ' + showDate.toDateString());
    let weekCalendarInfo = new WeekCalendarInfo();
    let arr = [];
    let strArr = [];
    let currentDay = showDate.getDay() - 1;
    // monday is first day of week
    showDate.setDate(showDate.getDate() - currentDay);
    for (let index = WEEK_DAY_NUM; index > 0; index--) {
        let tempDate = new Date(showDate);
        tempDate.setDate(showDate.getDate() - index);
        let dateStr = dateToStr(tempDate);
        strArr.push(dateStr);
        arr.push(new WeekDateModel(WEEK_TITLES[tempDate.getDay()], dateStr, tempDate));
    }
    Logger.debug('WeekCalendarModel', JSON.stringify(arr));
    weekCalendarInfo.arr = arr;
    weekCalendarInfo.strArr = strArr;
    return weekCalendarInfo;
}
//# sourceMappingURL=WeekCalendarModel.js.map