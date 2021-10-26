
import  { setIsSaveDisable } from './set_is_save_disable'

describe('Helpers: setIsSaveDisable',() => {
    let actual,storyDetail

    describe('When there is no storyDetail',() => {
        beforeEach(() => {
            
        actual = setIsSaveDisable({})
        })

        it('returns true',() => {
            expect(actual).toBeTruthy()
        })
    })

    describe('When there is no storyNo',() => {
        beforeEach(() => {
            storyDetail = {
                storyNo: ''
            }
        actual = setIsSaveDisable({
            storiesDetail:storyDetail
        })
        })

        it('returns true',() => {
            expect(actual).toBeTruthy()
        })
    })

    describe('When there is no name',() => {
        beforeEach(() => {
            storyDetail = {
                storyNo: '123',
                name: ''
            }
        actual = setIsSaveDisable({
            storiesDetail:storyDetail
        })
        })

        it('returns true',() => {
            expect(actual).toBeTruthy()
        })
    })

    describe('When there is no status',() => {
        beforeEach(() => {
            storyDetail = {
                storyNo: '123',
                name: 'name',
                status: ''
            }
        actual = setIsSaveDisable({
            storiesDetail:storyDetail
        })
        })

        it('returns true',() => {
            expect(actual).toBeTruthy()
        })
    })

    describe('When there is no startDate',() => {
        beforeEach(() => {
            storyDetail = {
                storyNo: '123',
                name: 'name',
                status: 'status',
                startDate:''
            }
        actual = setIsSaveDisable({
            storiesDetail:storyDetail
        })
        })

        it('returns true',() => {
            expect(actual).toBeTruthy()
        })
    })

    describe('When there is no story points',() => {
        beforeEach(() => {
            storyDetail = {
                storyNo: '123',
                name: 'name',
                status: 'status',
                startDate:'startDate',
                points:''
            }
        actual = setIsSaveDisable({
            storiesDetail:storyDetail
        })
        })

        it('returns true',() => {
            expect(actual).toBeTruthy()
        })
    })

    describe('When there is no releaseVersion',() => {
        beforeEach(() => {
            storyDetail = {
                storyNo: '123',
                name: 'name',
                status: 'status',
                startDate:'startDate',
                points:'points',
                releaseVersion: ''
            }
        actual = setIsSaveDisable({
            storiesDetail:storyDetail
        })
        })

        it('returns true',() => {
            expect(actual).toBeTruthy()
        })
    })

    describe('When all values exists',() => {
        beforeEach(() => {
            storyDetail = {
                storyNo: '123',
                name: 'name',
                status: 'status',
                startDate:'startDate',
                points:'points',
                releaseVersion: 'releaseVersion'
            }
        actual = setIsSaveDisable({
            storiesDetail:storyDetail
        })
        })

        it('returns false',() => {
            expect(actual).toBe(false)
        })
    })
})