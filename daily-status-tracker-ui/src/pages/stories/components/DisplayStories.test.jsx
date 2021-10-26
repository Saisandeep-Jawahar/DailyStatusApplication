import React from 'react'
import { shallow } from 'enzyme'
import DisplayStories from './DisplayStories'
jest.mock('daily-status-core', () => ({
  __esModule: true,
  default: 'mockedDefaultExport',
  deleteStories: jest.fn(),
}))

describe('<DisplayStories />', () => {
  let wrapper,props
  beforeEach(() => {
    props={
      storyDataSource: ['storyDataSource'],
      getAllStories: jest.fn()
    }
    wrapper = shallow(<DisplayStories {...props} />)
  })
  describe('Initial Render', () => {
   

    it('renders Table', () => {
      expect(wrapper.find('Table').exists()).toBe(true)
    })
  })
})
