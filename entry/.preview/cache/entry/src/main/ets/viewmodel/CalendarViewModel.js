import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
import { CommonConstants as Const } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import WeekCalendarMethodInfo from '@bundle:com.example.healthy_life/entry/ets/viewmodel/WeekCalendarMethodInfo';
const LAZY_DATA_PAGE = 2; // lazy page number
function gotoPreviousWeek(isPageScroll, homeStore, currentPage, scroller) {
    isPageScroll = true;
    let date = new Date(homeStore.showDate);
    Logger.info('HomeIndex', 'gotoPreviousWeek: showDate_' + date.toISOString());
    if ((currentPage + LAZY_DATA_PAGE) * Const.WEEK_DAY_NUM > homeStore.dateArr.length) {
        // get more history data
        homeStore.getPreWeekData(date, () => {
            homeStore.setSelectedShowDate(homeStore.showDate - Const.WEEK_DAY_TIME);
            currentPage += 1;
        });
    }
    else {
        scroller.scrollPage({ next: false });
        Logger.info('HomeIndex', 'gotoPreviousWeek');
        homeStore.setSelectedShowDate(homeStore.showDate - Const.WEEK_DAY_TIME);
        currentPage += 1;
    }
}
function goToNextWeek(currentPage, isPageScroll, homeStore, scroller) {
    if (currentPage <= 0) {
        Logger.info('HomeIndex', 'goToNextWeek: is the current week');
        return;
    }
    isPageScroll = true;
    Logger.info('HomeIndex', 'goToNextWeek: nextPage');
    homeStore.setSelectedShowDate(homeStore.showDate + Const.WEEK_DAY_TIME);
    currentPage -= 1;
    scroller.scrollPage({ next: true });
}
function calenderItemClickAction(item, index, homeStore) {
    Logger.info('HomeIndex', 'click the calendarItem: ' + JSON.stringify(item));
    homeStore.setSelectedShowDate(item.date.getTime());
    homeStore.selectedDay = index % Const.WEEK_DAY_NUM;
}
const WeekCalendarMethods = new WeekCalendarMethodInfo();
WeekCalendarMethods.gotoPreviousWeek = gotoPreviousWeek;
WeekCalendarMethods.goToNextWeek = goToNextWeek;
WeekCalendarMethods.calenderItemClickAction = calenderItemClickAction;
export default WeekCalendarMethods;
//# sourceMappingURL=CalendarViewModel.js.map