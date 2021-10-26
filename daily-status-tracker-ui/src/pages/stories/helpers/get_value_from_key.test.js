
const { default: getValueFromKey } = require('./get_value_from_key')

describe('Helpers: getValue',() => {
    let actual, expected
    describe('When there is no value',() => {
        beforeEach(() => {
            actual = getValueFromKey()
        })

        it('returns ',() => {
            expect(actual).toEqual()
        })
    })

    describe('When value is empty array',() => {
        beforeEach(() => {
            actual = getValueFromKey([])
            expected=[]
        })

        it('returns empty array',() => {
            expect(actual).toEqual(expected)
        })
    })

    describe('When value exists',() => {
        beforeEach(() => {
            actual = getValueFromKey(['1','2'])
            expected=['Gayathri', 'Joe']
        })

        it('returns value',() => {
            expect(actual).toEqual(expected)
        })
    })
})