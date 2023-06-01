import { Skeleton } from '~/components/Skeleton/Skeleton'
import imageLogin from '../../assets/imgs/img-login.webp'
import { Link, useNavigate } from 'react-router-dom'
import { path } from '../../contains/path'
import { RootState, useAppDispatch } from '~/redux/store'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { SchemaType, schema } from '../../components/Validation/Validation'
const Schema = schema.pick(['password', 'email', 'confirm_password'])
import { fetchLogin } from '~/redux/SliceAuth'

export const Login = () => {
  const navigate = useNavigate()
  const dispath = useAppDispatch()
  const RegisterData = useSelector((state: RootState) => state.auth)
  console.log(RegisterData)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Pick<SchemaType, 'email' | 'password' | 'confirm_password'>>({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    },
    resolver: yupResolver(Schema)
  })
  const onSubmit = handleSubmit((data) => {
    // console.log(data)
    dispath(fetchLogin({ email: data.email, password: data.password }))
      .unwrap()
      .then((res) => {
        navigate(path.home)
        return res
      })
      .catch((err) => {
        Object.keys(err).forEach((error) => {
          setError('email' as keyof Pick<SchemaType, 'email' | 'password'>, {
            type: 'server',
            message: err[error]
          })
        })
      })
  })
  return (
    <div className='w-full relative rounded-lg'>
      <div className='h-[100vh] w-full'>
        <img src={imageLogin} alt='ảnh bìa đăng ký' className='w-full  object-contain ' />
      </div>

      <form
        onSubmit={onSubmit}
        action=''
        className='w-[500px] bg-[#5A6970] absolute top-[50%] translate-y-[-50%] left-[50px] p-4 rounded-lg '
      >
        <h1 className='flex items-center w-full justify-center py-4 text-[white] text-[30px]'>ĐĂNG NHẬP</h1>
        <div className='flex flex-col h-[100px]'>
          <label htmlFor='email' className='text-[white] text-[20px]'>
            email
          </label>
          <input
            type='text'
            id='email'
            {...register('email')}
            className='h-[45px] outline-none rounded-lg pl-[8px] my-[4px]'
            placeholder='Enter email'
          />
          {errors && <small>{errors.email?.message}</small>}
        </div>
        <div className='flex flex-col h-[100px]'>
          <label htmlFor='password' className='text-[white] text-[20px]'>
            password
          </label>
          <input
            type='text'
            id='password'
            {...register('password')}
            className='h-[45px] outline-none rounded-lg pl-[8px] my-[4px]'
            placeholder='Enter password'
          />
          {errors && <small>{errors.password?.message}</small>}
        </div>
        <div className='flex flex-col h-[100px]'>
          <label htmlFor='name' className='text-[white] text-[20px]'>
            confirm password
          </label>
          <input
            type='text'
            id='confirm_password'
            {...register('confirm_password')}
            className='h-[45px] outline-none rounded-lg pl-[8px] my-[4px]'
            placeholder='Enter confirm password'
          />
          {errors && <small>{errors.confirm_password?.message}</small>}
        </div>
        <button className='flex items-center bg-[#F9A252] w-full h-[50px] rounded-lg text-[white] m-auto justify-center gap-2 mt-5 mb-4'>
          {RegisterData.isLoading && <Skeleton />}
          <span>ĐĂNG NHẬP</span>
        </button>
        <div className='flex items-center text-[white] w-full justify-end gap-2'>
          <span>Bạn có tài khoản chưa ?</span>
          <Link to={path.register} className='text-[#FF0A0A]'>
            Đăng Ký
          </Link>
        </div>

        <Link
          to={path.home}
          className='text-[white] flex items-center bg-[#F9A252] w-[200px] h-[50px] rounded-lg text-[white] m-auto justify-center gap-2 mt-5 mb-4'
        >
          BACK
        </Link>
      </form>
    </div>
  )
}

export default Login
