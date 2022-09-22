import * as yup from "yup";

export interface VeriteInterface {
    question: string;
    rating: string;
    translations: {
        fr: string;
        es: string;
    };
}

export const yupVerite = yup
    .object()
    .required()
    .shape({
        question: yup.string().required(),
        rating: yup.string().required(),
        translations: yup.object().required().shape({
            fr: yup.string().required(),
            es: yup.string().required(),
        }),
    });

export const yupQuery = yup
    .object()
    .required()
    .shape({
        rating: yup.string().required().matches(new RegExp("[012]")),
    });

export const isOneSentence = (text: string) => {
    return text.split("").filter((it) => [".", "?", "!"].includes(it)).length;
};
