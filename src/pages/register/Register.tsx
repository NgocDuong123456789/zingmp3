import { Skeleton } from '~/components/Skeleton/Skeleton'
import imageLogin from '../../assets/imgs/img-login.webp'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { path } from '../../contains/path'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'
import { useAppDispatch, RootState } from '../../redux/store'
import { fetchRegister } from '../../redux/SliceAuth'
import { schema, SchemaType } from '../../components/Validation/Validation'
import { Input } from '~/components/Input/Input'
import { Button } from '~/components/Button/Button'
const Schema = schema.pick(['userName', 'password', 'email'])

const Register = () => {
  const navigate = useNavigate()
  const dispath = useAppDispatch()
  const RegisterData = useSelector((state: RootState) => state.auth)
  console.log(RegisterData?.isLoading)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Pick<SchemaType, 'email' | 'password' | 'userName'>>({
    resolver: yupResolver(Schema)
  })
  const onSubmit = handleSubmit((data) => {
    // console.log(data)
    dispath(fetchRegister({ userName: data.userName, email: data.email, password: data.password }))
      .unwrap()
      .then((res) => {
        navigate(path.login)
        return res
      })
      .catch((err) => {
        Object.keys(err).forEach((error) => {
          setError('email' as keyof Pick<SchemaType, 'email' | 'password' | 'userName'>, {
            type: 'server',
            message: err[error]
          })
        })
      })
  })

  return (
    <div className='w-full relative rounded-lg h-'>
      <div className='h-[100vh] w-full'>
        <img src={imageLogin} alt='ảnh bìa đăng ký' className='w-full  object-cover h-full' />
      </div>
      <form
        onSubmit={onSubmit}
        action=''
        className='w-[500px] bg-[#5A6970] absolute top-[50%] translate-y-[-50%] left-[50px] p-4 rounded-lg '
      >
        <h1 className='flex items-center w-full justify-center py-4 text-[white] text-[30px]'>ĐĂNG KÝ</h1>

        <Input
          placeholder='Enter user name'
          id='user name'
          register={register('userName')}
          errorMessage={errors.userName?.message}
        />

        <Input placeholder='Enter email' id='email' register={register('email')} errorMessage={errors.email?.message} />

        <Input
          placeholder='Enter password'
          id='password'
          register={register('password')}
          errorMessage={errors.password?.message}
        />

        <Button
          isLoading={RegisterData.isLoading}
          className={classNames(
            'flex items-center bg-[#F9A252] w-full h-[50px] rounded-lg text-[white] m-auto justify-center gap-2 mt-5 mb-4',
            {
              'cursor-not-allowed': RegisterData.isLoading === true,
              'cursor-pointer': !RegisterData.isLoading
            }
          )}
        >
          ĐĂNG KÝ
        </Button>
        <div className='flex items-center text-[white] w-full justify-end gap-2'>
          <span>Bạn có tài khoản chưa ?</span>
          <Link to={path.login} className='text-[#FF0A0A]'>
            Đăng Nhập
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
export default Register
