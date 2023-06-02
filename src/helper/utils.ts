export const convertToDate = (number: number) => {
  const date = new Date(number)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${day}/${month}/${year}`
}

export const covertTime=(time:number)=>{
    const mu= Math.floor(time/60);
     const s= time % 60 < 10 ? `0${time%60}` : time%60;
   
    return `0${mu}:${s}`
}
