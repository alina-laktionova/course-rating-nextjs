import {ProductProps} from './Product.props';
import styles from './Product.module.css';
import {Card} from "../Card/Card";
import {Rating} from "../Rating/Rating";
import {Tag} from "../Tag/Tag";
import {Button} from "../Button/Button";
import {priceUSD} from "../../helpers/helpers";
import {Divider} from "../Divider/Divider";
import cn from "classnames";
import {ForwardedRef, forwardRef, useRef, useState} from "react";
import {Review} from "../Review/Review";
import {ReviewForm} from "../ReviewForm/ReviewForm";
import {motion} from 'framer-motion';

export const Product = motion(forwardRef(({product, className, ...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const variants = {
        visible: {
            opacity: 1,
            height: 'auto',
        },
        hidden: {
            opacity: 0,
            height: 0,
        }
    };

    const scrollToReviews = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        reviewRef.current?.focus({ preventScroll: true });
    };

    return (
        <div className={className} {...props} ref={ref}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <img
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                        alt={product.title}
                        width={70}
                        height={70}
                    />
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    <span>
                        <span className='visuallyHidden'>price</span>
                        {priceUSD(product.price)}
                    </span>
                    {product.oldPrice && <Tag className={styles.discount} color='green'>
                        <span className='visuallyHidden'>discount</span>
                        {priceUSD(product.price - product.oldPrice)}
                    </Tag>}
                </div>
                <div className={styles.credit}>
                    <span>
                        <span className='visuallyHidden'>credit</span>
                        {priceUSD(product.credit)}/
                        <span className={styles.month}>month</span>
                    </span>
                </div>
                <div className={styles.rating}>
                    <span className='visuallyHidden'>{'rating' + (product.reviewAvg ?? product.initialRating)}</span>
                    <Rating rating={product.reviewAvg ?? product.initialRating}/>
                </div>
                <div className={styles.tags}>
                    {product.categories.map((c) =>
                        <Tag className={styles.category} key={c} color='ghost'>{c}</Tag>)}
                </div>
                <div className={styles.priceTitle} aria-hidden>price</div>
                <div className={styles.creditTitle} aria-hidden>credit</div>
                <div className={styles.ratingTitle}>
                    <a href='#ref' onClick={scrollToReviews}>
                        {product.reviewCount} {product.reviewCount === 1 ? 'review' : 'reviews'}
                    </a>
                </div>

                <Divider className={styles.hr}/>

                <div className={styles.description}>{product.description}</div>
                <div className={styles.features}>
                    {product.characteristics.map(c => (
                        <div key={c.name} className={styles.characteristics}>
                            <span className={styles.charName}>{c.name}</span>
                            <span className={styles.charDots}/>
                            <span className={styles.charValue}>{c.value}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.advDisadv}>
                    {product.advantages && <div className={styles.advantages}>
                        <div className={styles.advTitle}>Advantages</div>
                        <div>{product.advantages}</div>
                    </div>}
                    {product.disadvantages && <div className={styles.disadvantages}>
                        <div className={styles.advTitle}>Disadvantages</div>
                        <div>{product.disadvantages}</div>
                    </div>}
                </div>

                <Divider className={cn(styles.hr, styles.hr2)}/>

                <div className={styles.actions}>
                    <Button appearance='primary'>
                        More details
                    </Button>
                    <Button
                        aria-expanded={isReviewOpened}
                        appearance='ghost'
                        arrow={isReviewOpened ? 'down' : 'right'}
                        className={styles.reviewButton}
                        onClick={() =>
                            setIsReviewOpened(!isReviewOpened)
                        }>
                        Reviews ({product.reviewCount})
                    </Button>
                </div>
            </Card>

            <motion.div variants={variants} initial='hidden' animate={isReviewOpened ? 'visible' : 'hidden'}>
                <Card ref={reviewRef}
                      color='blue'
                      tabIndex={isReviewOpened ? 0 : -1}
                      className={cn(styles.reviews, {
                          [styles.opened]: isReviewOpened,
                          [styles.closed]: !isReviewOpened,
                      })}>
                    {product.reviews.map(r => (
                        <div key={r._id}>
                            <Review review={r}/>
                            <Divider/>
                        </div>
                    ))}
                    <ReviewForm productId={product._id} isOpened={isReviewOpened}/>
                </Card>
            </motion.div>

        </div>
    );
}));