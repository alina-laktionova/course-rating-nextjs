import {SortEnum, SortProps} from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';
import SortIcon from './sort.svg';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<div className={styles.sortName} id='sort'>Sorting</div>
			<button
				id='rating'
				aria-labelledby='sort rating'
				aria-selected={sort == SortEnum.Rating}
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort == SortEnum.Rating
				})}>
				<SortIcon className={styles.sortIcon}/>
				By rating
			</button>
			<button
				id='price'
				aria-labelledby='sort price'
				aria-selected={sort == SortEnum.Price}
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort == SortEnum.Price
				})}>
				<SortIcon className={styles.sortIcon}/>
				By price
			</button>
		</div>
	);
};