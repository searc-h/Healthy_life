export class CommonConstants {
}
CommonConstants.RDB_NAME = { dbName: 'taskInfo.db' }; // db name
/** day info table */
CommonConstants.DAY_INFO = {
    tableName: 'dayInfo',
    columns: ['date', 'targetTaskNum', 'finTaskNum']
};
/** global info table */
CommonConstants.GLOBAL_INFO = {
    tableName: 'globalInfo',
    columns: ['id', 'firstDate', 'lastDate', 'checkInDays', 'achievements']
};
/** task info table */
CommonConstants.TASK_INFO = {
    tableName: 'taskInfo',
    columns: [
        'id',
        'date',
        'taskID',
        'targetValue',
        'isAlarm',
        'startTime',
        'endTime',
        'frequency',
        'isDone',
        'finValue',
        'isOpen'
    ]
};
/** form info table */
CommonConstants.FORM_INFO = {
    tableName: 'formInfo',
    columns: ['id', 'formId', 'formName', 'formDimension']
};
// TaskNum
CommonConstants.TASK_NUM = 6;
// The host address of the server
CommonConstants.SERVER = 'http://10.17.156.107:9588';
/**
 * The http timeout duration.
 */
CommonConstants.HTTP_READ_TIMEOUT = 10000;
// THOUSANDTH
CommonConstants.THOUSANDTH_15 = '1.5%'; // ‘1.5%’
CommonConstants.THOUSANDTH_12 = '2.2%'; // ‘2.2%’
CommonConstants.THOUSANDTH_33 = '3.3%'; // ‘3.3%’
CommonConstants.THOUSANDTH_50 = '5%'; // ‘5%’
CommonConstants.THOUSANDTH_66 = '6.6%'; // ‘6.6%’
CommonConstants.THOUSANDTH_80 = '8%'; // ‘8%’
CommonConstants.THOUSANDTH_100 = '10%'; // ‘10%’
CommonConstants.THOUSANDTH_120 = '12%'; // ‘12%’
CommonConstants.THOUSANDTH_160 = '16%'; // ‘16%’
CommonConstants.THOUSANDTH_320 = '32%'; // ‘16%’
CommonConstants.THOUSANDTH_400 = '40%'; // ‘40%’
CommonConstants.THOUSANDTH_420 = '42%'; // ‘42%’
CommonConstants.THOUSANDTH_500 = '50%'; // ‘50%’
CommonConstants.THOUSANDTH_560 = '56%'; // ‘56%’
CommonConstants.THOUSANDTH_800 = '80%'; // ‘80%’
CommonConstants.THOUSANDTH_830 = '83%'; // ‘83%’
CommonConstants.THOUSANDTH_880 = '88%'; // ‘88%’
CommonConstants.THOUSANDTH_900 = '90%'; // ‘90%’
CommonConstants.THOUSANDTH_940 = '94%'; // ‘90%’
CommonConstants.THOUSANDTH_1000 = '100%'; // ‘100%’
CommonConstants.DEFAULT_2 = 2;
CommonConstants.DEFAULT_6 = 6;
CommonConstants.DEFAULT_8 = 8;
CommonConstants.DEFAULT_12 = 12;
CommonConstants.DEFAULT_10 = 10;
CommonConstants.DEFAULT_16 = 16;
CommonConstants.DEFAULT_18 = 18;
CommonConstants.DEFAULT_20 = 20;
CommonConstants.DEFAULT_24 = 24;
CommonConstants.DEFAULT_28 = 28;
CommonConstants.DEFAULT_32 = 32;
CommonConstants.DEFAULT_48 = 48;
CommonConstants.DEFAULT_56 = 56;
CommonConstants.DEFAULT_60 = 60;
CommonConstants.DEFAULT_100 = 100;
CommonConstants.DEFAULT_180 = 180;
// fontWeight
CommonConstants.FONT_WEIGHT_400 = 400;
CommonConstants.FONT_WEIGHT_500 = 500;
CommonConstants.FONT_WEIGHT_700 = 700;
CommonConstants.FONT_WEIGHT_900 = 900;
// opacity
CommonConstants.OPACITY_4 = 0.4;
CommonConstants.OPACITY_6 = 0.6;
// radius
CommonConstants.BORDER_RADIUS_PERCENT_50 = '50%';
// duration
CommonConstants.AD_DURATION = 5; // 5s
CommonConstants.LAUNCHER_DELAY_TIME = 2000; // 2000ms
CommonConstants.DURATION_1000 = 1000; // 1000ms
CommonConstants.DURATION_800 = 800; // 700ms
CommonConstants.DURATION_100 = 100; // 100ms
// list space
CommonConstants.LIST_ITEM_SPACE = 2;
CommonConstants.SPACE_4 = 4;
// navigation title
CommonConstants.ADD_TASK_TITLE = '添加任务';
CommonConstants.EDIT_TASK_TITLE = '编辑任务';
// prompt message
CommonConstants.SETTING_FINISHED_MESSAGE = '设置完成！！！';
CommonConstants.SETTING_FINISH_FAILED_MESSAGE = '网络连接错误';
CommonConstants.CHOOSE_TIME_OUT_RANGE = '选择时间超出范围';
CommonConstants.NICK_NAME = 'JoIin';
CommonConstants.SIGNATURE = '这是一条简短地个人签';
CommonConstants.HOME_BTN_Z = 2;
// time range
CommonConstants.DEFAULT_TIME = '08:00';
CommonConstants.GET_UP_TIME_RANGE = '(06:00 - 09:00)';
CommonConstants.SLEEP_TIME_RANGE = '(20:00 - 23:00)';
CommonConstants.GET_UP_EARLY_TIME = '06:00';
CommonConstants.GET_UP_LATE_TIME = '09:00';
CommonConstants.SLEEP_EARLY_TIME = '20:00';
CommonConstants.SLEEP_LATE_TIME = '23:00';
// frequency Dialog
CommonConstants.EVERYDAY = '每天';
CommonConstants.NO_LENGTH = 0;
CommonConstants.INIT_WEEK_IDS = '1, 2, 3, 4, 5, 6, 7';
// unit
CommonConstants.PER_DAY = '/ 天';
// global data key
CommonConstants.GLOBAL_KEY = 'global';
// RemindContent
CommonConstants.GET_UP_TASK_NAME = '早起';
CommonConstants.DRINK_TASK_NAME = '喝水';
CommonConstants.EAT_APPLE_TASK_NAME = '吃苹果';
CommonConstants.SMILE_TASK_NAME = '每日微笑';
CommonConstants.BRUSH_TEETH_TASK_NAME = '每日刷牙';
CommonConstants.SLEEP_TASK_NAME = '早睡';
CommonConstants.GET_UP_CONTENT = '该早起啦';
CommonConstants.DRINK_CONTENT = '该喝水啦';
CommonConstants.EAT_APPLE_CONTENT = '该吃苹果啦';
CommonConstants.SMILE_CONTENT = '请保持微笑';
CommonConstants.BRUSH_TEETH_CONTENT = '每日刷牙';
CommonConstants.SLEEP_CONTENT = '早睡';
CommonConstants.H_STORE = 'healthAppStore';
CommonConstants.REMINDER_AGENT_TAG = 'reminderAgent';
CommonConstants.PACKAGE_NAME = 'com.example.healthy_life';
CommonConstants.ENTRY_ABILITY = 'EntryAbility';
// offset
CommonConstants.ZERO = 0;
CommonConstants.MINUS_20 = -20;
CommonConstants.HAS_NO_INDEX = -1;
CommonConstants.OFFSET_24 = -24;
// targetSetting Range
CommonConstants.DRINK_STEP = 25;
CommonConstants.DRINK_MAX_RANGE = 500;
CommonConstants.TIMES_50 = 50;
CommonConstants.TIMES_100 = 100;
CommonConstants.EAT_APPLE_RANGE = 100;
// letter spacing
CommonConstants.LETTER_1 = 0.1;
CommonConstants.LETTER_34 = 3.4;
// achievement
CommonConstants.ACHIEVE_CARD_IMG_HEIGHT = 88;
CommonConstants.ACHIEVE_CARD_TOP = 38;
CommonConstants.ACHIEVE_CARD_BOTTOM = 10;
CommonConstants.ACHIEVE_SPLIT_RATIO = 1 / 3;
CommonConstants.ACHIEVE_TITLE_BAR_LEFT = 20;
CommonConstants.ACHIEVE_TITLE_BAR_TOP = 15;
CommonConstants.FULL_WIDTH = '100%';
CommonConstants.FULL_HEIGHT = '100%';
CommonConstants.WEEK_DAY_NUM = 7; // number days of one week
CommonConstants.WEEK_DAY_TIME = 7 * 24 * 60 * 60 * 1000;
// Card Constants
CommonConstants.TAG = "UpdateFormUtils";
CommonConstants.FORM_PARAM_IDENTITY_KEY = "ohos.extra.param.key.form_identity";
CommonConstants.FORM_PARAM_DIMENSION_KEY = "ohos.extra.param.key.form_dimension";
CommonConstants.FORM_PARAM_NAME_KEY = "ohos.extra.param.key.form_name";
CommonConstants.DEFAULT_DIMENSION_2X2 = 2;
CommonConstants.DEFAULT_DIMENSION_2X4 = 3;
CommonConstants.WIDGET_NAME_AGENCY = "agency";
CommonConstants.WIDGET_NAME_PROGRESS = "progress";
/**
 * The span of privacy statement for SM device.
 */
CommonConstants.PRIVACY_SPAN_SM = 2;
/**
 * The span of privacy statement for MD device.
 */
CommonConstants.PRIVACY_SPAN_MD = 4;
/**
 * The span of privacy statement for LG device.
 */
CommonConstants.PRIVACY_SPAN_LG = 4;
/**
 * The span of mine page for SM device.
 */
CommonConstants.MINE_SPAN_SM = 4;
/**
 * The span of mine page for MD device.
 */
CommonConstants.MINE_SPAN_MD = 8;
/**
 * The span of mine for LG device.
 */
CommonConstants.MINE_SPAN_LG = 8;
/**
 * The span of login component button for SM device.
 */
CommonConstants.BUTTON_SPAN_SM = 4;
/**
 * The span of login component button for MD device if break point is smaller than 360vp.
 */
CommonConstants.BUTTON_SPAN_MD_SMALL = 3;
/**
 * The span of login component button for MD device if break point is not smaller than 360vp.
 */
CommonConstants.BUTTON_SPAN_MD_BIG = 6;
/**
 * The span of login component button for LG device.
 */
CommonConstants.BUTTON_SPAN_LG = 8;
/**
 * The offset for SM device.
 */
CommonConstants.OFFSET_SM = 1;
/**
 * The offset for MD device.
 */
CommonConstants.OFFSET_MD = 1;
/**
 * The offset for LG device.
 */
CommonConstants.OFFSET_LG = 2;
/**
 * The offset of privacy statement component for SM device.
 */
CommonConstants.PRIVACY_OFFSET_SM = 1;
/**
 * The offset of privacy statement component for MD device.
 */
CommonConstants.PRIVACY_OFFSET_MD = 2;
/**
 * The offset of privacy statement component for LG device.
 */
CommonConstants.PRIVACY_OFFSET_LG = 4;
/**
 * The offset of login component button for SM device.
 */
CommonConstants.BUTTON_OFFSET_SM = 0;
/**
 * The offset of login component button for MD device.
 */
CommonConstants.BUTTON_OFFSET_MD = 2;
/**
 * The offset of login component button for LG device.
 */
CommonConstants.BUTTON_OFFSET_LG = 4;
/**
 * The break point for page.
 */
CommonConstants.BREAK_POINT = ['320vp', '600vp', '820vp'];
/**
 * Login scroll layout weight.
 */
CommonConstants.LOGIN_SCROLL_LAYOUT_WEIGHT = 1;
/**
 * Registration success page scroll layout weight.
 */
CommonConstants.SCROLL_LAYOUT_WEIGHT = 1;
/**
 * Mine page column layout weight.
 */
CommonConstants.COLUMN_LAYOUT_WEIGHT = 1;
/**
 * Mine page list size.
 */
CommonConstants.LIST_SIZE = 2;
/**
 * Title font weight.
 */
CommonConstants.TITLE_FONT_WEIGHT = 500;
/**
 * Login text font weight.
 */
CommonConstants.LOGIN_TEXT_FONT_WEIGHT = 500;
/**
 * Button font weight of registration page.
 */
CommonConstants.BUTTON_FONT_WEIGHT = 500;
/**
 * Text font weight of registration page.
 */
CommonConstants.TEXT_FONT_WEIGHT = 500;
/**
 * User nickname text font weight.
 */
CommonConstants.NICKNAME_FONT_WEIGHT = 500;
/**
 * Mine page url.
 */
CommonConstants.MINE_PAGE_URL = 'pages/MinePage';
/**
 * Registration success page url.
 */
CommonConstants.REGISTRATION_SUCCESS_PAGE_URL = 'pages/RegistrationSuccessPage';
/**
 * Privacy page url.
 */
CommonConstants.PRIVACY_PAGE_URL = 'pages/PrivacyPage';
/**
 * Customer service page url.
 */
CommonConstants.CUSTOMER_SERVICE_PAGE_URL = 'pages/CustomerServicePage';
/**
 * Percent of the text input.
 */
CommonConstants.TEXT_INPUT_WIDTH_PERCENT = '100%';
/**
 * Percent of divider width.
 */
CommonConstants.DIVIDER_WIDTH_PERCENT = '100%';
/**
 * Percent of the button width.
 */
CommonConstants.BUTTON_WIDTH_PERCENT = '100%';
/**
 * Percent of the flex width.
 */
CommonConstants.FLEX_WIDTH_PERCENT = '100%';
/**
 * Percent of the login page width.
 */
CommonConstants.LOGIN_PAGE_WIDTH_PERCENT = '100%';
/**
 * Full percent of the width.
 */
CommonConstants.FULL_WIDTH_PERCENT = '100%';
/**
 * Percent of the registration success page width.
 */
CommonConstants.REGISTRATION_PAGE_WIDTH_PERCENT = '100%';
/**
 * Percent of the registration success page height.
 */
CommonConstants.REGISTRATION_PAGE_HEIGHT_PERCENT = '100%';
/**
 * Percent of text width in mine page.
 */
CommonConstants.MINE_PAGE_TEXT_WIDTH_PERCENT = '100%';
/**
 * Percent of the mine page width.
 */
CommonConstants.MINE_PAGE_WIDTH_PERCENT = '100%';
/**
 * Percent of column width in customer service page.
 */
CommonConstants.CUSTOMER_COLUMN_WIDTH_PERCENT = '100%';
/**
 * Percent of column height in customer service page.
 */
CommonConstants.CUSTOMER_COLUMN_HEIGHT_PERCENT = '100%';
/**
 * Percent of column height in mine page.
 */
CommonConstants.MINE_PAGE_HEIGHT_PERCENT = '100%';
/**
 * Percent of the row width.
 */
CommonConstants.ROW_WIDTH_PERCENT = '100%';
/**
 * Scroll height percentage setting.
 */
CommonConstants.SCROLL_HEIGHT_PERCENT = '100%';
/**
 * Percent of the column width in detail page.
 */
CommonConstants.DETAIL_COLUMN_WIDTH_PERCENT = '93%';
/**
 * The number of columns for SM device.
 */
CommonConstants.GRID_ROW_SM = 4;
/**
 * The number of columns for MD device.
 */
CommonConstants.GRID_ROW_MD = 8;
/**
 * The number of columns for LG device.
 */
CommonConstants.GRID_ROW_LG = 12;
/**
 * The gutter of x direction device.
 */
CommonConstants.GUTTER_X = vp2px(12);
/**
 * The span of page for SM device.
 */
CommonConstants.SPAN_SM = 4;
/**
 * The span of page for MD device.
 */
CommonConstants.SPAN_MD = 6;
/**
 * The span of page for MD device.
 */
CommonConstants.SPAN_LG = 8;
export var TaskType;
(function (TaskType) {
    TaskType["Getup"] = "getup";
    TaskType["Drink"] = "drink";
    TaskType["Apple"] = "apple";
    TaskType["Smile"] = "smile";
    TaskType["Clean"] = "clean";
    TaskType["Sleep"] = "sleep";
})(TaskType || (TaskType = {}));
export var Unit;
(function (Unit) {
    Unit["Liter"] = "L";
    Unit["Pcs"] = "\u4E2A";
    Unit["Times"] = "\u6B21";
    Unit["Empty"] = "";
})(Unit || (Unit = {}));
//# sourceMappingURL=CommonConstants.js.map