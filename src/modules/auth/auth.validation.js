import joi from "joi";

export const signUpSchema = {
  body: joi
    .object()
    .required()
    .keys({
      userName: joi.string().min(4).max(10).required(),
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: joi
        .string()
        .pattern(new RegExp("^[A-Z][a-z0-9]{3,30}$"))
        .required(),
      cPassword: joi.ref("password"),
      phone: joi.string().min(11).max(11).required(),
    }),
};

export const signInSchema = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: joi
        .string()
        .required(),
    }),
};
