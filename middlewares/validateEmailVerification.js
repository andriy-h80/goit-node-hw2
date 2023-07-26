const {HttpError} = require("../helpers");

const validateEmailVerification = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if(error){
            const fieldName = error.details[0].context.label;
            next(HttpError(400, `missing required field ${fieldName}`));
        }
        next();
    };

    return func;
};

module.exports = validateEmailVerification;
