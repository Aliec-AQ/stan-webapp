import { useVuelidate } from '@vuelidate/core';
import { 
    required, 
    email, 
    helpers, 
    numeric,
    url
} from '@vuelidate/validators';

export const requiredRule = helpers.withMessage(
    'Ce champ est obligatoire',
    required
);

export const emailRule = helpers.withMessage(
  "L'email est obligatoire et doit être au format correct.",
  email,
);

export const passwordRule = helpers.withMessage(
  "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
  helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
);

export const numericRule = helpers.withMessage(
  "Ce champ doit être numérique.",
  numeric,
);

export const urlRule = helpers.withMessage(
  "Ce champ doit être une URL valide.",
  url,
);

export const phoneRule = helpers.withMessage(
    "Le numéro de téléphone doit être au format valide.",
    helpers.regex(/^(?:\+33|0)[1-9](?:\s?\d{2}){4}$/),
);

export const rules = {
    required: requiredRule,
    email: emailRule,
    password: passwordRule,
    numeric: numericRule,
    url: urlRule,
    phone: phoneRule,
};

export const useValidation = (data, rules, options = {}) => {
    const v = useVuelidate(rules, data);

    const validate = async () => {
        await v.value.$validate();
    };

    const isValid = async () => {
        await validate();

        return !v.value.$invalid;
    };

    const getTextErrors = (field) => {
        return v.value[field]?.$errors.map((e) => e.$message).join(', ') || '';
    };
    
    return {
        v,
        validate,
        isValid,
        getTextErrors,
    };
};