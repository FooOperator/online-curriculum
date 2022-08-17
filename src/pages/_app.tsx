import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import "@fontsource/roboto-slab";
import "@fontsource/fira-mono";

import { appWithTranslation } from "next-i18next";

const MyApp: AppType = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

// @ts-ignore
export default appWithTranslation(MyApp);
