import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import Logo from '../logo.svg';
import {ButtonIcon} from "../../components/ButtonIcon/ButtonIcon";
import { motion } from 'framer-motion';
import {Sidebar} from "../Sidebar/Sidebar";
import {useEffect, useState} from "react";
import {useRouter} from 'next/router';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const router = useRouter();

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20
			}
		},
		closed: {
			opacity: 0,
			x: '100%'
		}
	};

	useEffect(() => {
		setIsOpened(false);
	}, [router]);

	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo/>
			<ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpened(true)}/>
			<motion.div
				variants={variants}
				initial='closed'
				animate={isOpened ? 'opened' : 'closed'}
				className={styles.mobileMenu}>
				<Sidebar/>
				<ButtonIcon appearance='white' icon='close' className={styles.menuClose}
							onClick={() => setIsOpened(false)}/>
			</motion.div>
		</header>
	);
};