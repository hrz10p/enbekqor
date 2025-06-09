import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import RU from "./lang/ru.json"
import KZ from "./lang/kz.json"

const resources = {
    ru: RU,
    kz: KZ,
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'ru', // Default language
    });

// const t = (key: string) => i18n.t(key)

export default i18n;