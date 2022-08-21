export const convertDate = (date) => {
  let convertDate = date?.toDate();
  let newDate = `${convertDate?.getDate()} / ${
    convertDate?.getUTCMonth() + 1
  } / ${convertDate?.getUTCFullYear()}`;
  return newDate;
};
