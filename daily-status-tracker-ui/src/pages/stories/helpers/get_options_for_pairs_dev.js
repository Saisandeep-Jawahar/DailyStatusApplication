

const getOptionsForPairsDev = ({options}) => {
    const pairDevOption= []
    for(let [key,value] of Object.entries(options)){
        pairDevOption.push({
            label:value,
            value:key
        })
    }

    return pairDevOption
}

export default getOptionsForPairsDev