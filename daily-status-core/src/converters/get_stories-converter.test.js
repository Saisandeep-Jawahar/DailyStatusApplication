import Stories from "../models/stories";
import getStoriesConverters from "./get_stories-converter";
import getStoriesResponse from "../responses/get_stories"

describe('CONVERTERS: getStoriesConverter', () => {

  let actual
  beforeEach(() => {
    actual = getStoriesConverters(getStoriesResponse)
  })

  it('returns Stories PM', () => {
    expect(actual[0].toObject()).toEqual({ "endDate": "--", "releaseVersion": "20.10", "startDate": "09-08-2020", "status": "in-progress", "storyPoint": 2, "taskID": "1", "title": "Title 1" })
  })

})

