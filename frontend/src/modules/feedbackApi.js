import { post } from '../api/submit';

export const postFeedback = feedback => {
    return post(feedback);
};
