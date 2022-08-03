import styles from './UpButton.module.css';
import UpIcon from './arrowUp.svg';
import {useScrollY} from "../../hooks/useScrollY";
import {motion, useAnimation} from "framer-motion";
import {useEffect} from "react";

export const UpButton = (): JSX.Element => {

	const controls = useAnimation();
	const y = useScrollY();

	const scrollToTop = () => {
		window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
	};

	useEffect(() => {
		controls.start({opacity: y / document.body.scrollHeight});
	}, [y, controls]);

	return (
		<motion.button
			animate={controls}
			initial={{opacity: 0}}
			className={styles.up}
			onClick={scrollToTop}>
			<UpIcon/>
		</motion.button>
	);
};