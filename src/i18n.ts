import i18next from "i18next";
import { initReactI18next } from 'react-i18next';
import enNs1 from "@/locales/en/ns1.json";
import enNs2 from "@/locales/en/ns2.json";
import zhNs1 from "@/locales/zh/ns1.json";
import zhNs2 from "@/locales/zh/ns2.json";

export const defaultNS = "ns1";

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: "zh",
    defaultNS,
    resources: {
        en: {
            ns1: enNs1,
            ns2: enNs2,
        },
        zh: {
            ns1: zhNs1,
            ns2: zhNs2,
        },
    },
});

export default i18next;
