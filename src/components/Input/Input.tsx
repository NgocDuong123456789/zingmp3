import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProp {
  placeholder?: string
  register?: UseFormRegisterReturn<any>
  errorMessage?: string
  id?: string
  classNames?: string
}

export const Input = ({ placeholder, register, errorMessage, classNames, id, ...rest }: InputProp) => {
  return (
    <div className='flex flex-col h-[100px]'>
      <label htmlFor='email' className='text-[white] text-[20px]'>
        {id}
      </label>
      <input
        type='text'
        id={id}
        {...register}
        className={ register  ? 'h-[45px] outline-none rounded-lg pl-[8px] my-[4px]' : classNames}
        placeholder={placeholder}
        {...rest}
      />
      {errorMessage && <small>{errorMessage}</small>}
    </div>
  )
}
