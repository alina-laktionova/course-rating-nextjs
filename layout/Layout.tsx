import {LayoutProps} from './Layout.props';
import styles from './Layout.module.css';
import {Header} from './Header/Header';
import React, {FunctionComponent, KeyboardEvent, useRef, useState} from 'react';
import {Sidebar} from './Sidebar/Sidebar';
import {Footer} from './Footer/Footer';
import {AppContextProvider, IAppContext} from '../context/app.context';
import {UpButton} from "../components";
import cn from "classnames";

const Layout = ({children}: LayoutProps): JSX.Element => {
    const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
    const bodyRef = useRef<HTMLDivElement>(null);

    const skipContentAction = (event: KeyboardEvent<HTMLAnchorElement>) => {
        if (event.code == 'Space' || event.code == 'Enter') {
            event.preventDefault();
            bodyRef.current?.focus();
        }
        setIsSkipLinkDisplayed(false);
    };

    return (
        <div className={styles.wrapper}>
            <a tabIndex={0}
               onFocus={() => setIsSkipLinkDisplayed(true)}
               onKeyDown={skipContentAction}
               className={cn(styles.skipLink, {
                   [styles.displayed]: isSkipLinkDisplayed
               })}>
                 Skip to content
            </a>
            <Header className={styles.header}/>
            <Sidebar className={styles.sidebar}/>
            <main className={styles.body} ref={bodyRef} tabIndex={0} role='main'>
                {children}
            </main>
            <Footer className={styles.footer}/>
            <UpButton/>
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        );
    };
};