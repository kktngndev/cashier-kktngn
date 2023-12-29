import moment from "moment";

export function Greetings(){
  const localTimezoneOffset = -new Date().getTimezoneOffset() / 60;
  let localTime = moment().utcOffset(localTimezoneOffset);
  let hours = parseInt(localTime.format('HH'));

  if(hours >= 0 && hours <= 11){
    return "Selamat Pagi";
  }else if(hours >= 12 && hours <= 14){
    return "Selamat Siang";
  }else if(hours >= 15 && hours <= 18){
    return "Selamat Sore";
  }else{
    return "Selamat Malam";
  }
}