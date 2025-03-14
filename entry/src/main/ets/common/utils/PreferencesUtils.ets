import dataPreferences from '@ohos.data.preferences'
import { GlobalContext } from './GlobalContext'
import Logger from './Logger'
import font from '@ohos.font';


const TAG = '[PreferencesUtil]';
const PREFERENCES_NAME = 'myPreferences';
const KEY_APP_FONT_SIZE = 'appFontSize';

export class PreferencesUtil {
  createFontPreferences(context : Context){

    let fontPreferences : ()=>Promise<dataPreferences.Preferences> = ()=>{
      let preferences : Promise<dataPreferences.Preferences> = dataPreferences.getPreferences(context,
      PREFERENCES_NAME);

      return preferences;
    }

    GlobalContext.getContext().setObject("getFontPreferences" , fontPreferences)
  }

  getFontPreferences(){
    let getFontPreferences : ()=>Promise<dataPreferences.Preferences> = GlobalContext.getContext().getObject("getFontPreferences") as ()=>Promise<dataPreferences.Preferences>;
    return getFontPreferences
  }


  async saveDefaultFontSize(fontSize : number){
    let getFontPreferences  = this.getFontPreferences()
    await getFontPreferences().then((preferences : dataPreferences.Preferences)=>{
      preferences.has(KEY_APP_FONT_SIZE).then(async (isExist:boolean)=>{
        Logger.info(TAG , "preferences has changeFontSize is " + isExist);
        if(!isExist) {
          await preferences.put(KEY_APP_FONT_SIZE , fontSize)
          preferences.flush();
        }
      }).catch((err: Error) => {
        Logger.error(TAG, 'Has the value failed with err: ' + err);
      });
    }).catch((err: Error) => {
      Logger.error(TAG, 'Get the preferences failed, err: ' + err);
    });
  }

  saveChangeFontSize(fontSize : number){
    let getFontPreferences  = this.getFontPreferences()
    getFontPreferences().then(async (preferences: dataPreferences.Preferences) => {
      await preferences.put(KEY_APP_FONT_SIZE, fontSize);
      preferences.flush();
    }).catch((err: Error) => {
      Logger.error(TAG, 'put the preferences failed, err: ' + err);
    });
  }

  async getChangeFontSize() {
    let fontSize: number = 0;
    let getFontPreferences = this.getFontPreferences();
    fontSize = await (await getFontPreferences()).get(KEY_APP_FONT_SIZE, fontSize) as number;
    return fontSize;
  }

  async deleteChangeFontSize() {
    let getFontPreferences: Function = GlobalContext.getContext().getObject('getFontPreferences') as Function;
    const preferences: dataPreferences.Preferences = await getFontPreferences();
    let deleteValue = preferences.delete(KEY_APP_FONT_SIZE);
    deleteValue.then(() => {
      Logger.info(TAG, 'Succeeded in deleting the key appFontSize.');
    }).catch((err: Error) => {
      Logger.error(TAG, 'Failed to delete the key appFontSize. Cause: ' + err);
    });
  }

}

export default new PreferencesUtil();