import {ReviewFormProps} from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import {Input} from "../Input/Input";
import {Rating} from "../Rating/Rating";
import {Textarea} from "../Textarea/Textarea";
import {Button} from "../Button/Button";
import CloseIcon from './close.svg';
import {useForm, Controller} from "react-hook-form";
import {ReviewFormInterface, ReviewSentResponseInterface} from "./ReviewForm.interface";
import axios from "axios";
import {API} from "../../helpers/api";
import {useState} from "react";

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<ReviewFormInterface>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const onSubmit = async (formData: ReviewFormInterface) => {
        try {
            const {data} = await axios.post<ReviewSentResponseInterface>(API.review.createDemo, {...formData, productId});
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Something went wrong');
            }
        } catch (e) {
            let message;
            e instanceof Error ? message = e.message : message = String(error);
            setError(message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input
                    {...register(
                        'name',
                        {required: {value: true, message: 'This field is required'}}
                    )}
                    placeholder='Name'
                    error={errors.name}
                />
                <Input
                    {...register(
                        'title',
                        {required: {value: true, message: 'This field is required'}}
                    )}
                    placeholder='Review title'
                    className={styles.title}
                    error={errors.title}
                />
                <div className={styles.rating}>
                    <span>Rating:</span>
                    <Controller
                        name='rating'
                        control={control}
                        rules={{required: {value: true, message: 'Rate this course'}}}
                        render={({field}) => (
                            <Rating
                                error={errors.rating}
                                isEditable
                                rating={field.value}
                                ref={field.ref}
                                setRating={field.onChange}/>
                        )}/>
                </div>
                <Textarea
                    {...register(
                        'description',
                        {required: {value: true, message: 'This field is required'}}
                    )}
                    placeholder='Review text'
                    className={styles.description}
                    error={errors.description}
                />
                <div className={styles.submit}>
                    <Button appearance="primary">Send review</Button>
                    <span
                        className={styles.info}>* Before publication, the review will be pre-moderated and checked</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.success, styles.panel)}>
                <div className={styles.successTitle}>Your review has been sent</div>
                <div>
                    Thank you, your review will be published after check
                </div>
                <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
            </div>}
            {error && <div className={cn(styles.error, styles.panel)}>
                Something went wrong, try refreshing the page
                <CloseIcon className={styles.close} onClick={() => setError('')}/>
            </div>}
        </form>
    );
};