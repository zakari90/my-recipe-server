import { body, validationResult } from "express-validator";

// you can use check or body from express-validator
export function userValidationRules() {
  return [
    body("name").notEmpty().withMessage("اسم المستخدم مطلوب"),
    body("email").notEmpty().withMessage("البريد الإلكتروني مطلوب"),
    body("password").notEmpty().withMessage("كلمة المرور مطلوبة"),
    body("password").isLength({ min: 2 }).withMessage("كلمة المرور يجب أن تكون أكثر من 2 محارف"),
  ];
}

// User update validation rules
export function updateUserValidationRules() {
  return [
    body("name").notEmpty().withMessage("اسم المستخدم مطلوب"),
    body("password").notEmpty().withMessage("كلمة المرور مطلوبة"),
    body("password").isLength({ min: 2 }).withMessage("كلمة المرور يجب أن تكون أكثر من 2 محارف"),
  ];
}

// Post creation validation rules
export function postValidationRules() {
  return [
    body("title").notEmpty().withMessage("عنوان المنشور مطلوب"),
    body("contents").notEmpty().withMessage("مكونات المنشور مطلوبة"),
    body("steps").notEmpty().withMessage("خطوات المنشور مطلوبة"),
  ];
}

// General validation middleware
export function validate(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
}
