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

import UIAbility from '@ohos.app.ability.UIAbility';
import PreferencesUtil from '../common/utils/PreferencesUtils'
import Logger from '../common/utils/Logger';
import FormUtils from '../common/utils/FormUtils';
import Want from '@ohos.app.ability.Want';
import window from '@ohos.window';
import AbilityConstant from '@ohos.app.ability.AbilityConstant';
import { GlobalContext } from '../common/utils/GlobalContext';

export default class EntryAbility extends UIAbility {
  private static TAG: string = 'EntryAbility';

  async onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
    GlobalContext.getContext().setObject('want', want);
    GlobalContext.getContext().setObject('launchParam', launchParam);

    PreferencesUtil.createFontPreferences(this.context);
    // default font size is 16
    PreferencesUtil.saveDefaultFontSize(16)

  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    // Main window is created, set main page for this ability
    GlobalContext.getContext().setObject('isForeground', true);
    windowStage.loadContent('pages/SplashPage', (err, data) => {
      if (err.code) {
        Logger.error('windowStage', 'Failed to load the content. Cause:' + JSON.stringify(err));
        return;
      }
      Logger.info('windowStage', 'Succeeded in loading the content. Data: ' + JSON.stringify(data));
    });
  }

  onForeground() {
    // Ability has brought to foreground
    GlobalContext.getContext().setObject('isForeground', true);
    GlobalContext.getContext().setObject('taskListChange', false);
  }

  onBackground() {
    // Ability has back to background
    // update FormCards only when the taskList changed
    FormUtils.backgroundUpdateCard(GlobalContext.getContext().getObject('taskListChange') as boolean);
  }

  onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam) {
    // Ability has new want
    GlobalContext.getContext().setObject('abilityWant', want);
    GlobalContext.getContext().setObject('launchParam', launchParam);
  }
};
