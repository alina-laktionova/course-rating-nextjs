import {ProductProps} from './Product.props';
import styles from './Product.module.css';
import {Card} from "../Card/Card";
import {Rating} from "../Rating/Rating";
import {Tag} from "../Tag/Tag";
import {Button} from "../Button/Button";
import {priceUSD} from "../../helpers/helpers";
import {Divider} from "../Divider/Divider";
import Image from "next/image";
import cn from "classnames";
import {useRef, useState} from "react";
import {Review} from "../Review/Review";
import {ReviewForm} from "../ReviewForm/ReviewForm";

export const Product = ({product, className, ...props}: ProductProps): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const scrollToReviews = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <div className={className} {...props}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                        alt={product.title}
                        width={70}
                        height={70}
                    />
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    {priceUSD(product.price)}
                    {product.oldPrice && <Tag className={styles.discount} color='green'>
                        {priceUSD(product.price - product.oldPrice)}
                    </Tag>}
                </div>
                <div className={styles.credit}>
                    {priceUSD(product.credit)}/
                    <span className={styles.month}>month</span>
                </div>
                <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating}/></div>
                <div className={styles.tags}>
                    {product.categories.map((c) =>
                        <Tag className={styles.category} key={c} color='ghost'>{c}</Tag>)}
                </div>
                <div className={styles.priceTitle}>price</div>
                <div className={styles.creditTitle}>credit</div>
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

            <Card ref={reviewRef}
                  color='blue'
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
                <ReviewForm productId={product._id}/>
            </Card>
        </div>
    );
};