const isAlphaNumeric = (input) => {
    if(!input) return true
    return (/[a-zA-Z]+/.test(input) && (/[0-9]+/.test(input)))
}

export default isAlphaNumeric