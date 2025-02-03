/**
 * Function to create string date (format DD-MM-YYYY) from object new Date()
 * @param date - A optional string date
 * @return {string}
 */
const createDate = (date: Date): string => {
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export default createDate;
