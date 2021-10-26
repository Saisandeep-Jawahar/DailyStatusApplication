import isAlphaNumeric from "../../../shared/is_alpha_numeric"
import isValidNumber from "../../../shared/is_valid_number"
import validateEndDate from "./validate_end_date"

export const setIsSaveDisable = ({storiesDetail}) => {
    if(!storiesDetail) return true
 if(!isValidEntry(storiesDetail.storyNo) || !isValidEntry(storiesDetail.name) || 
 !isValidEntry(storiesDetail.status) || !isValidEntry(storiesDetail.startDate) ||
  !isValidEntry(storiesDetail.points) || !isValidEntry(storiesDetail.releaseVersion) || validateEndDate({endDate:storiesDetail.endDate,startDate:storiesDetail.startDate}) || !isAlphaNumeric(storiesDetail.storyNo) || !isValidNumber(storiesDetail.releaseVersion) )
 return true

 return false
}

const isValidEntry = (entry) => {
    if(!entry) return false
    return true
}
