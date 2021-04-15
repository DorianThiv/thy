// app/translate/translation.ts

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_FR_NAME, LANG_FR_TRANS } from './lang-fr';
import { LANG_DE_NAME, LANG_DE_TRANS } from './lang-de';
import { LANG_SW_NAME, LANG_SW_TRANS } from './lang-sw';
import { LANG_NO_NAME, LANG_NO_TRANS } from './lang-no';
import { LANG_NE_NAME, LANG_NE_TRANS } from './lang-nl';

// all translations
export const dictionary = {
    [LANG_EN_NAME]: LANG_EN_TRANS,
    [LANG_FR_NAME]: LANG_FR_TRANS,
    [LANG_DE_NAME]: LANG_DE_TRANS,
    [LANG_SW_NAME]: LANG_SW_TRANS,
    [LANG_NO_NAME]: LANG_NO_TRANS,
    [LANG_NE_NAME]: LANG_NE_TRANS,
};
