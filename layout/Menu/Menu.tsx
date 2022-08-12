import styles from './Menu.module.css';
import cn from 'classnames';
import {useContext, useState} from 'react';
import {AppContext} from '../../context/app.context';
import {FirstLevelMenuItem, PageItem} from '../../interfaces/menu.interface';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {firstLevelMenu} from '../../helpers/helpers';
import {motion, useReducedMotion} from 'framer-motion';

export const Menu = (): JSX.Element => {
    const {menu, setMenu, firstCategory} = useContext(AppContext);
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
    const router = useRouter();

    const variants = {
        visible: {
            marginBottom: 10,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: {
            marginBottom: 0
        }
    };

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 'auto',
        },
        hidden: {
            opacity: 0,
            height: 0,
        }
    };

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory == secondCategory) {
                setAnnounce(m.isOpened ? 'closed' : 'opened');
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const buildFirstLevel = () => {
        return (
            <ul className={styles.firstLevelList}>
                {firstLevelMenu.map(m => (
                    <li key={m.route}
                        aria-expanded={m.id == firstCategory}>
                        <Link href={`/${m.route}`}>
                            <a>
                                <div className={cn(styles.firstLevel, {
                                    [styles.firstLevelActive]: m.id == firstCategory
                                })}>
                                    {m.icon}
                                    <span>{m.name}</span>
                                </div>
                            </a>
                        </Link>
                        {m.id == firstCategory && buildSecondLevel(m)}
                    </li>
                ))}
            </ul>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <ul className={styles.secondBlock}>
                {menu.map(m => {
                    if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = true;
                    }
                    return (
                        <li key={m._id.secondCategory}>
                            <button
                                aria-expanded={m.isOpened}
                                className={styles.secondLevel}
                                onClick={() => openSecondLevel(m._id.secondCategory)}>
                                {m._id.secondCategory}
                            </button>
                            <motion.ul
                                layout
                                variants={variants}
                                initial={m.isOpened ? 'visible' : 'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                className={styles.secondLevelBlock}>
                                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                            </motion.ul>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
        return (
            <motion.div variants={variantsChildren}>
                {pages.map(p => (
                    <li key={p._id}>
                        <Link href={`/${route}/${p.alias}`}>
                            <a
                                aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}
                                tabIndex={isOpened ? 0 : -1}
                                className={cn(styles.thirdLevel, {
                                    [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                                })}
                            >
                                {p.category}
                            </a>
                        </Link>
                    </li>
                ))}
            </motion.div>

        );
    };

    return (
        <nav className={styles.menu} role='navigation'>
            {announce &&
                <span role='log' className='visuallyHidden'>{announce == 'opened' ? 'expanded' : 'collapsed'}</span>}
            {buildFirstLevel()}
        </nav>
    );
};