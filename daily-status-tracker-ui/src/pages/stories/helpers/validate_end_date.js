const validateEndDate = ({endDate,startDate}) => {
if(!startDate || !endDate)  return false
return startDate.isAfter(endDate)
}


export default validateEndDate