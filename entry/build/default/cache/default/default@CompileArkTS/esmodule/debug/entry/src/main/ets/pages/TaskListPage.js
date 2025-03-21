import TaskList from '@bundle:com.example.healthy_life/entry/ets/view/task/TaskListComponent';
import { CommonConstants as Const } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import { getAllTask, taskIndexDataInit, taskOriginData } from '@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskViewModel';
class TaskIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__taskList = new ObservedPropertyObjectPU(taskOriginData, this, "taskList");
        this.addProvidedVar("taskList", this.__taskList);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.taskList !== undefined) {
            this.taskList = params.taskList;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__taskList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get taskList() {
        return this.__taskList.get();
    }
    set taskList(newValue) {
        this.__taskList.set(newValue);
    }
    onPageShow() {
        getAllTask().then((res) => {
            let deepCopyDataStr = JSON.stringify(this.taskList);
            let deepCopyData = JSON.parse(deepCopyDataStr);
            this.taskList = taskIndexDataInit(deepCopyData, res);
        });
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.backgroundColor({ "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.height(Const.THOUSANDTH_1000);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Navigation.create();
            Navigation.size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 });
            Navigation.title(Const.ADD_TASK_TITLE);
            Navigation.titleMode(NavigationTitleMode.Mini);
            if (!isInitialRender) {
                Navigation.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width(Const.THOUSANDTH_1000);
            Column.justifyContent(FlexAlign.Center);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new TaskList(this, {}, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        Column.pop();
        Navigation.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new TaskIndex(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=TaskListPage.js.map