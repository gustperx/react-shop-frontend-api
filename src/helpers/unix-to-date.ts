const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export const getJsDateFromUnix = (unix: number) => {
  const ts = Math.floor(unix * 1000);
  const date = new Date(ts);
  return date;
};

export const createUnixFromJsTime = (timestamp: number) => {
  return Math.floor(timestamp / 1000);
};

export const getDayMonthYearHoursMinutes = (unix: number) => {
  const date = getJsDateFromUnix(unix);
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
};

export const getYearMonthDay = (unix: number) => {
  const date = getJsDateFromUnix(unix);

  let month = `${date.getMonth() + 1}`;
  if (Number(month) < 10) {
    month = `0${month}`;
  }

  return `${date.getFullYear()}-${month}-${date.getDate()}`;
};

export const createDateFormString = (date: string) => {
  const dateSplit = date.split("-");
  return new Date(
    Number(dateSplit[0]),
    Number(dateSplit[1]) - 1,
    Number(dateSplit[2])
  );
};

export const getDateUnix = (timestamp: string) => {
  const date = createDateFormString(timestamp);
  const unix = createUnixFromJsTime(date.getTime());
  return unix;
};
