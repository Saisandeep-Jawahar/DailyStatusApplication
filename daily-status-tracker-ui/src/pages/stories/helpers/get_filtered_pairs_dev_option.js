
const getFilteredPairDevOptions = ({userId,pairsDevArray}) =>{
return pairsDevArray.filter(item => item.value != userId)
}

export default getFilteredPairDevOptions