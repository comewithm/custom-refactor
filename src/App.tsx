import {
  HashRouter
} from "react-router-dom";

import Router from './routers/index'
import { ConfigProvider } from "antd";
import { useAppDispatch, useAppSelector } from "./redux/store";

import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import { useEffect, useState } from "react";
import { getBrowserLanguage } from "./utils/util";
import { setLanguage } from "./redux/modules/global";
import { useTheme } from "./hooks/useTheme";

import './i18n'
import { AuthRouter } from "./routers/utils/AuthRouter";

function App() {
  const dispatch = useAppDispatch()
  const {language, assemblySize} = useAppSelector(state => state.global)

  const [i18nLocale, setI18nLocale] = useState(zhCN)

  useTheme()

  const setAntdLanguage = () => {
    if(language && language === 'zh') return setI18nLocale(zhCN)
    if(language && language === 'en') return setI18nLocale(enUS)
    if(getBrowserLanguage() === 'zh') return setI18nLocale(zhCN)
    if(getBrowserLanguage() === 'en') return setI18nLocale(enUS)
  }

  useEffect(() => {
    // use global language
    dispatch(setLanguage(language || getBrowserLanguage()))
    // set antd language
    setAntdLanguage()
  }, [language])

  return (
    <HashRouter>
      <ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
          <Router /> 
        {/* <AuthRouter>
        </AuthRouter> */}
      </ConfigProvider>
    </HashRouter>
  );
}

export default App;
