import style from './View.module.scss';

import React from 'react';
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const View: React.FC<{
    pageTitle?: string
}> = ({children, pageTitle = 'Starter Pack'}) => {
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className={style.main}>
                {children}
            </main>
            <Footer/>
        </>
    )
}

export default View
