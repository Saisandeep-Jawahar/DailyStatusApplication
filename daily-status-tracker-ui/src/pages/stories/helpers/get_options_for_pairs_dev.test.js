const { default: getOptionsForPairsDev } = require('./get_options_for_pairs_dev')

describe('HELPERS: getOptionsForPairsDev',() => {
    let actual , expected
    beforeEach(() => {
        const options = {
            1: 'Gayathri',
            2: 'Joe'
        }

        expected = [{
            label: 'Gayathri',
            value: '1'
        },
    {
        label: 'Joe',
        value: '2'
    }]

        actual = getOptionsForPairsDev({options})
    })

    it( ' check for pairDevOption array',() => {
        expect(actual).toEqual(expected)
    })
})