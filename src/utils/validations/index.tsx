import * as Yup from 'yup';

export const ChangePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('New Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      {
        message: 'New Password is too weak',
      }
    ),
  comfirmNewPassword: Yup.string().oneOf(
    [Yup.ref('newPassword')],
    'New Password and Confirm Password must match'
  ),
});

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string(),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      {
        message: 'Password is too weak',
      }
    ),
  mobileNumber: Yup.string(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords must match'
  ),
});
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});
