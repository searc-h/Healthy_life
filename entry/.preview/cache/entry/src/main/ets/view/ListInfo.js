/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { MineInfoList } from '@bundle:com.example.healthy_life/entry/ets/model/Mine';
export class ListInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create();
            List.debugLine("view/ListInfo.ets(22:5)");
            List.border({
                radius: {
                    topLeft: { "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                    topRight: { "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                }
            });
            List.backgroundColor({ "id": 16777270, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            List.margin({ top: { "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            List.padding({ top: { "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            List.flexGrow(1);
            List.clip(true);
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const isLazyCreate = true;
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, isLazyCreate);
                        ListItem.backgroundColor({ "id": 16777270, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        ListItem.margin({
                            left: { "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                            right: { "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        });
                        ListItem.height({ "id": 16777323, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        ListItem.border({
                            width: { bottom: { "id": 16777300, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
                            color: { "id": 16777249, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        });
                        ListItem.debugLine("view/ListInfo.ets(24:9)");
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedShallowRender = () => {
                        this.observeComponentCreation(itemCreation);
                        ListItem.pop();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
                            Flex.debugLine("view/ListInfo.ets(25:11)");
                            if (!isInitialRender) {
                                Flex.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.title);
                            Text.debugLine("view/ListInfo.ets(26:13)");
                            Text.fontSize({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Text.height({ "id": 16777319, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create({ "id": 16777394, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Image.debugLine("view/ListInfo.ets(28:13)");
                            Image.objectFit(ImageFit.Contain);
                            Image.height({ "id": 16777303, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Image.width({ "id": 16777329, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Flex.pop();
                        ListItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
                            Flex.debugLine("view/ListInfo.ets(25:11)");
                            if (!isInitialRender) {
                                Flex.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.title);
                            Text.debugLine("view/ListInfo.ets(26:13)");
                            Text.fontSize({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Text.height({ "id": 16777319, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create({ "id": 16777394, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Image.debugLine("view/ListInfo.ets(28:13)");
                            Image.objectFit(ImageFit.Contain);
                            Image.height({ "id": 16777303, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Image.width({ "id": 16777329, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Flex.pop();
                        ListItem.pop();
                    };
                    if (isLazyCreate) {
                        observedShallowRender();
                    }
                    else {
                        observedDeepRender();
                    }
                }
            };
            this.forEachUpdateFunction(elmtId, MineInfoList, forEachItemGenFunction, (item) => JSON.stringify(item), false, false);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=ListInfo.js.map