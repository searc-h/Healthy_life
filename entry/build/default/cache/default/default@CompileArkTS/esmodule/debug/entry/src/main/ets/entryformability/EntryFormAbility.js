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
import FormExtensionAbility from '@ohos:app.form.FormExtensionAbility';
import formBindingData from '@ohos:app.form.formBindingData';
import FormUtils from '@bundle:com.example.healthy_life/entry/ets/common/utils/FormUtils';
import { CommonConstants as Const } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
export default class EntryFormAbility extends FormExtensionAbility {
    onAddForm(want) {
        let parameters = want.parameters;
        if (parameters) {
            let formId = parameters[Const.FORM_PARAM_IDENTITY_KEY];
            let formName = parameters[Const.FORM_PARAM_NAME_KEY];
            let formDimension = parameters[Const.FORM_PARAM_DIMENSION_KEY];
            let formInfo = {
                formId: formId,
                formName: formName,
                formDimension: formDimension
            };
            FormUtils.insertFormData(this.context, formInfo);
        }
        // Called to return a FormBindingData object.
        let formData = formBindingData.createFormBindingData('');
        return formData;
    }
    onUpdateForm() {
        FormUtils.updateCards(this.context);
    }
    onRemoveForm(formId) {
        FormUtils.deleteFormData(this.context, formId);
    }
}
//# sourceMappingURL=EntryFormAbility.js.map