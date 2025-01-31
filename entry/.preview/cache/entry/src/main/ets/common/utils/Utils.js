const CHINESE_OF_WEEK = ['一', '二', '三', '四', '五', '六', '日'];
const YEAR = '年';
const MONTH = '月';
const DAY = '日';
const WEEK = '星期';
const DAYS_OF_WEEK = 7;
const SUNDAY_FIRST_SHIFT = 6;
export const weekTitleFunc = () => {
    const weekTitleArr = [];
    for (let index = 0; index < CHINESE_OF_WEEK.length; index++) {
        weekTitleArr.push(CHINESE_OF_WEEK[(index + SUNDAY_FIRST_SHIFT) % DAYS_OF_WEEK]); // Sunday is the first day
    }
    return weekTitleArr;
};
export const WEEK_TITLES = weekTitleFunc();
// one digit or two number convert into two digit time format
export function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
export function dateFormat(date) {
    return date.getFullYear() + YEAR + padTo2Digits(date.getMonth() + 1) + MONTH + padTo2Digits(date.getDate()) + DAY;
}
// date convert into format of 'Fri Aug 26 2022'
export function dateToStr(date) {
    return date.toDateString();
}
export function weekDateFormat(timestamp) {
    let tempDate = new Date(timestamp);
    return dateFormat(tempDate) + WEEK + WEEK_TITLES[tempDate.getDay()];
}
export function sameDate(firstDate, timestamp) {
    let secondDate = new Date(timestamp);
    if (firstDate.getFullYear() != secondDate.getFullYear()) {
        return false;
    }
    if (firstDate.getMonth() != secondDate.getMonth()) {
        return false;
    }
    if (firstDate.getDate() != secondDate.getDate()) {
        return false;
    }
    return true;
}
export function ratio2percent(ratio) {
    return `${ratio * 100}%`;
}
export const frequencyRange = () => {
    const frequencyRangeArr = [];
    CHINESE_OF_WEEK.forEach((item, index) => {
        frequencyRangeArr.push({
            id: (index + 1),
            label: `${WEEK}${item}`,
            isChecked: false
        });
    });
    return frequencyRangeArr;
};
export const oneWeekDictFunc = () => {
    const oneWeekDict = [];
    for (let index = 0; index < CHINESE_OF_WEEK.length; index++) {
        oneWeekDict[index] = `${WEEK}${CHINESE_OF_WEEK[index]}`;
    }
    return oneWeekDict;
};
/**
 * 将params参数转化到url参数
 */
export const paramsObjToFullUrl = (url, params) => {
    return Object.keys(params).reduce((preUrl, key, index, array) => {
        index === array.length - 1 ? preUrl += `${key}=${params[key]}` : preUrl += `${key}=${params[key]}` + "&";
        return preUrl;
    }, url + "?");
};
//# sourceMappingURL=Utils.js.map