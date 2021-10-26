const isValidNumber = (input) => {
    if(!input) return true
    return /[0-9]+$/.test(input)
}

export default isValidNumber