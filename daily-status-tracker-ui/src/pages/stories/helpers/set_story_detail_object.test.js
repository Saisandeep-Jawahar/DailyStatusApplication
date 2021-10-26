
import { setStoryDetailObject } from './set_story_detail_object'

describe('Helpers: setStoryDetailObject',() => {
    let actual,expected
    describe('When storyDetails exists',() => {
        beforeEach(() => {
          
            let storyDetail = {
                'storyNo':'1293-monks',
                'name':'title1',
                'isOffshoreTester':'false',
                'points': '0.45',
                'status': 'status',
                'releaseVersion': ' ',
                'startDate':'startDate',
                'pairsDev' : ['Gayathri','Joe']
            }
            expected = {
                'taskID':'1293-monks',
                'title':'title1',
                'isOffshoreTester':'false',
                'storyPoint': '0.45',
                'status': 'status',
                'releaseVersion': ' ',
                'startDate':'Invalid date',
                endDate: '',
                'pairProgrammers' : ['1','2']
            }
            actual = setStoryDetailObject({storyDetail})
        })

        it('returns storyDetailObj',() => {
           expect(actual).toEqual(expected)
        })
    })
})