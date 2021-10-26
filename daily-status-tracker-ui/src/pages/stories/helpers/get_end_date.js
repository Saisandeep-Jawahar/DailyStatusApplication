import Moment from 'moment'

const getEndDate = (date) => {
    if(date === '--') return ''
    return Moment(date, 'DD-MM-YYYY ')
}

export default getEndDate