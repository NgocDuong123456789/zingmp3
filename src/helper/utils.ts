export const convertToDate = (number: number) => {
  const date = new Date(number)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${day}/${month}/${year}`
}

export const covertTime = (time: number) => {
  const mu = Math.floor(time / 60)
  const s = time % 60 < 10 ? `0${time % 60}` : time % 60

  return `0${mu}:${s}`
}

export const convertLike = (number: number) => {
  if (number < 1000) {
    return number
  } else if (number >= 1000 && number < 10000) {
    return `${Math.floor(number / 1000)}.${Math.floor((number % 1000) / 100)}K`
  } else {
    return `${Math.floor(number / 10000)}M`
  }
}


export const  convertNumberToTime=(number:number)=> {
  
  if(number >= 3600){
    const hours = Math.floor(number / 3600); // Số giờ
    const minutes = number % 60; // Số phút
    return hours + " giờ " + minutes + " phút";
  }else {
    const hours = Math.floor(number / 60); // Số giờ
    const minutes = number % 60; // Số phút
    return hours + "phút " + minutes + "giây";
  }


  
}