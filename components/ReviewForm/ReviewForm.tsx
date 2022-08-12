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

export const ReviewForm = ({productId, isOpened, className, ...props}: ReviewFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}, reset, clearErrors} = useForm<ReviewFormInterface>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const onSubmit = async (formData: ReviewFormInterface) => {
        try {
            const {data} = await axios.post<ReviewSentResponseInterface>(API.review.createDemo, {
                ...formData,
                productId
            });
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
        <form
            onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input
                    {...register(
                        'name',
                        {required: {value: true, message: 'Field "Name" is required'}}
                    )}
                    placeholder='Name'
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.name}
                />
                <Input
                    {...register(
                        'title',
                        {required: {value: true, message: 'Field "Review title" is required'}}
                    )}
                    placeholder='Review title'
                    className={styles.title}
                    error={errors.title}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.title}
                />
                <div className={styles.rating}>
                    <span>Rating:</span>
                    <Controller
                        name='rating'
                        control={control}
                        rules={{required: {value: true, message: 'Rating is required'}}}
                        render={({field}) => (
                            <Rating
                                tabIndex={isOpened ? 0 : -1}
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
                        {required: {value: true, message: 'Field "Review text" is required'}}
                    )}
                    placeholder='Review text'
                    className={styles.description}
                    error={errors.description}
                    tabIndex={isOpened ? 0 : -1}
                    aria-label={'Review text'}
                    aria-invalid={!!errors.description}
                />
                <div className={styles.submit}>
                    <Button
                        onClick={() => clearErrors()}
                        appearance="primary"
                        tabIndex={isOpened ? 0 : -1}>
                        Send review
                    </Button>
                    <span
                        className={styles.info}>* Before publication, the review will be pre-moderated and checked</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.success, styles.panel)} role='alert'>
                <div className={styles.successTitle}>Your review has been sent</div>
                <div>
                    Thank you, your review will be published after check
                </div>
                <button
                    aria-label='Close notification'
                    className={styles.close}
                    onClick={() => setIsSuccess(false)}>
                    <CloseIcon/>
                </button>
            </div>}
            {error && <div className={cn(styles.error, styles.panel)}>
                Something went wrong, try refreshing the page
                <button
                    aria-label='Close notification'
                    className={styles.close}
                    onClick={() => setError('')}>
                    <CloseIcon/>
                </button>
            </div>}
        </form>
    );
};