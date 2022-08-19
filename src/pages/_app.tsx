import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import "@fontsource/roboto-slab";
import "@fontsource/fira-mono";

import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { ComponentType } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};



export default appWithTranslation(MyApp as ComponentType<AppProps>);
