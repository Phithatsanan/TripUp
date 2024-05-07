const formatDateRange = (startDate: string | number | Date, endDate: string | number | Date) => {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
 
  const startDay = startDateObj.getDate();
  const startMonth = startDateObj.toLocaleString('default', { month: 'long' });
  const startYear = startDateObj.getFullYear();
 
  const endDay = endDateObj.getDate();
 
  const duration = Math.floor((+endDateObj - +startDateObj) / (1000 * 60 * 60 * 24)) + 1;
 
  const formattedString = `${startDay} - ${endDay} ${startMonth} ${startYear} (${duration} days)`;
 
  return formattedString;
  
};
 
const calculateDuration = (startDate: string | number | Date, endDate: string | number | Date) => {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const duration = Math.floor((+endDateObj - +startDateObj) / (1000 * 60 * 60 * 24)) + 1;
  return duration; // Return just the number, not an object
};
 
 
// Export the functions separately
export { formatDateRange, calculateDuration };