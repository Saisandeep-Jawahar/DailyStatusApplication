import pairDevsOption from '../constants/pairsDev'
const getValueFromKey = (values) => {
    if(!values) return
    if(values&&values.length<=0) return []
           
    return  values.map(entry => pairDevsOption[entry])
}


export default getValueFromKey

