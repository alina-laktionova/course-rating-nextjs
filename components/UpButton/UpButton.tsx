import styles from './UpButton.module.css';
import {useScrollY} from "../../hooks/useScrollY";
import {motion, useAnimation} from "framer-motion";
import {useEffect} from "react";
import {ButtonIcon} from "../ButtonIcon/ButtonIcon";

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
		<motion.div
			animate={controls}
			initial={{opacity: 0}}
			className={styles.up}
			>
			<ButtonIcon appearance={"primary"} icon='up' onClick={scrollToTop}/>
		</motion.div>
	);
};