import * as yup from 'yup'

export const schema = yup.object({
  userName: yup.string().required('trường này không được để trống'),
  password: yup
    .string()
    .required('trường này không được để trống')
    .min(8, 'mật khẩu đặt ít nhất là 8 ký tự')
    .max(20, 'mật khẩu đặt tối đa là 20 ký tự'),
  email: yup.string().email('trường này nhập phải là email').required('trường này không được để trống'),
  confirm_password: yup
    .string()
    .required('trường này không được để trống')
    .oneOf([yup.ref('password')], 'password nhập lại chưa khớp')
})

export type SchemaType = yup.InferType<typeof schema>
