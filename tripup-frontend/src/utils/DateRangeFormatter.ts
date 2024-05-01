

const formatDateRange = (startDate: string | number | Date, endDate: string | number | Date) => {
const startDateObj = new Date(startDate);
const endDateObj = new Date(endDate);

const startDay = startDateObj.getDate();
const startMonth = startDateObj.toLocaleString('default', { month: 'long' });
const startYear = startDateObj.getFullYear();

const endDay = endDateObj.getDate();

const duration = Math.floor((+endDateObj - +startDateObj) / (1000 * 60 * 60 * 24));

let formattedString = `${startDay} - ${endDay} ${startMonth} ${startYear} (${duration + 1} days)`;

  return formattedString;
};

// const DateRangeFormatter = ({ startDate, endDate }: { startDate: string | number | Date, endDate: string | number | Date }) => {
//     const formattedDateRange = formatDateRange(startDate, endDate);

//     return (
//         <div>
//             <p>{formattedDateRange}</p>
//         </div>
//     );
// };

 export default formatDateRange;
