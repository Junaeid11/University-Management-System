import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { authController } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();
router.post('/login', validateRequest(AuthValidation.loginValidationSchema),(authController.loginUser))
router.post('/refresh-token', validateRequest(AuthValidation.refreshTokenValidationSchema),(authController.refreshToken))
router.post('/change-password', auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), validateRequest(AuthValidation.changePasswordValidationSchema),(authController.changePassword))

export const AuthRoute = router;