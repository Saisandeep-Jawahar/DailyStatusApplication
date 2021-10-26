import React from 'react'
import {shallow} from 'enzyme'
import AddStoryInfo from './AddStoryInfo'

describe('<AddStoryInfo />',() => {
    let wrapper,props
    beforeEach(() => {
        props = {
         storiesDetail: {
            storyNo:'123',
            name:'name',
            status:'completed',
            startDate:'startDate',
            endDate:'endDate',
            points:'2',
            releaseVersion:'2',
            pairsDev: [],
            isOffshoreTester: false
         },
         handleStoryNoChange: jest.fn(),
         handleStoryNameChange: jest.fn(),
         handleStatusChange: jest.fn(),
         handleStartDateChange: jest.fn(),
         handleEndDateChange: jest.fn(),
         handleStoryPointsChange: jest.fn(),
         handleReleaseVersionChange: jest.fn(),
         handlePairsDevChange: jest.fn(),
         handleOffshoreTesterChange: jest.fn(),
        }
        wrapper = shallow(<AddStoryInfo {...props} />)
    })
describe('Initial render',() => {
    it('renders the component',() => {
        expect(wrapper.find('form').exists()).toBeTruthy()
        expect(wrapper.find('label').at(0).text()).toBe('Story Number')
        expect(wrapper.find('#storyNo').exists()).toBeTruthy()
        expect(wrapper.find('label').at(1).text()).toBe('Story Name and description')
        expect(wrapper.find('TextArea').exists()).toBeTruthy()
        expect(wrapper.find('label').at(2).text()).toBe('Story Point')
        expect(wrapper.find('#story-points').exists()).toBeTruthy()
        expect(wrapper.find('label').at(3).text()).toBe('Start Date')
        expect(wrapper.find('label').at(4).text()).toBe('End Date')
        expect(wrapper.find('Picker').exists()).toBeTruthy()
        expect(wrapper.find('label').at(5).text()).toBe('Status')
        expect(wrapper.find('Select').exists()).toBeTruthy()
        expect(wrapper.find('label').at(6).text()).toBe('Release Version')
        expect(wrapper.find('label').at(7).text()).toBe('Pair Developers')
        expect(wrapper.find('label').at(8).text()).toBe('Is off-shore tester :')
        expect(wrapper.find('Switch').exists()).toBeTruthy()
    })
})

describe('onChange',() => {
    describe('When story number changes',() => {
        beforeEach(() => {
            wrapper.find('#storyNo').prop('onChange')()
        })

        it('calls handlesStoryNoChange',() => {
            expect(props.handleStoryNoChange).toHaveBeenCalled()
        })
    })

    describe('When story name changes',() => {
        beforeEach(() => {
            wrapper.find('TextArea').prop('onChange')()
        })

        it('calls handlesStoryNoChange',() => {
            expect(props.handleStoryNameChange).toHaveBeenCalled()
        })
    })

    describe('When isOffshoreTester changes',() => {
        beforeEach(() => {
            wrapper.find('Switch').prop('onChange')()
        })

        it('calls handlesStoryNoChange',() => {
            expect(props.handleOffshoreTesterChange).toHaveBeenCalled()
        })
    })
})

describe('onBlur',() => {
    beforeEach(() => {
        props = {
            storiesDetail: {
                storyNo:'',
                name:'',
                status:'',
                startDate:'',
                endDate:'',
                points:'2',
                releaseVersion:'',
                pairsDev: [],
                isOffshoreTester: false
             }, 
        handleStoryNoChange: jest.fn(),
         handleStoryNameChange: jest.fn(),
         handleStatusChange: jest.fn(),
         handleStartDateChange: jest.fn(),
         handleEndDateChange: jest.fn(),
         handleStoryPointsChange: jest.fn(),
         handleReleaseVersionChange: jest.fn(),
         handlePairsDevChange: jest.fn(),
         handleOffshoreTesterChange: jest.fn(),
        }
        wrapper = shallow(<AddStoryInfo {...props} />)
        
    })

    describe('Story number',() => {
        beforeEach(() => {
            wrapper.find('#storyNo').prop('onBlur')()
        })

        it('displays error message',() => {
            expect(wrapper.find('span').at(0).text()).toEqual('Please enter a story number')
        })
    })

    describe('Story number',() => {
        beforeEach(() => {
            wrapper.find('Picker').at(0).prop('onBlur')()
        })

        it('displays error message',() => {
            expect(wrapper.find('span').at(0).text()).toEqual('Please enter a start date')
        })
    })
})
    
})