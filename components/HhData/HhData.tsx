import { HhDataProps } from './HhData.props';
import styles from './HhData.module.css';
import {Card} from "../Card/Card";
import Star from './starCircle.svg'
import {priceUSD} from "../../helpers/helpers";

export const HhData = ({count, juniorSalary, middleSalary, seniorSalary}: HhDataProps): JSX.Element => {
	return (
		<div className={styles.hh}>
			<Card className={styles.count}>
				<div className={styles.title}>Amount</div>
				<div className={styles.countValue}>{count}</div>
			</Card>
			<Card className={styles.salary}>
				<div>
					<div className={styles.title}>Junior</div>
					<div className={styles.salaryValue}>{priceUSD(juniorSalary)}</div>
					<div className={styles.rate}>
						<Star className={styles.filled}/>
						<Star/>
						<Star/>
					</div>
				</div>
				<div>
					<div className={styles.title}>Middle</div>
					<div className={styles.salaryValue}>{priceUSD(middleSalary)}</div>
					<div className={styles.rate}>
						<Star className={styles.filled}/>
						<Star className={styles.filled}/>
						<Star/>
					</div>
				</div>
				<div>
					<div className={styles.title}>Senior</div>
					<div className={styles.salaryValue}>{priceUSD(seniorSalary )}</div>
					<div className={styles.rate}>
						<Star className={styles.filled}/>
						<Star className={styles.filled}/>
						<Star className={styles.filled}/>
					</div>
				</div>
			</Card>
		</div>
	);
};