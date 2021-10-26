import React from 'react'
import { Row,Col } from 'antd'
import AddStory from './AddStory'
import DisplayStories from './DisplayStories'
import { getStories } from 'daily-status-core'
import getStoriesDataSource from '../helpers/get_stories_datasource'

function Stories() {
  
  const [storyDataSource, setStoryDataSource] = React.useState([])

  const userId = localStorage.getItem('userId')
  const getAllStories =  React.useCallback(() =>{
    getStories({
      userId,
      receiveStoriesSuccess: receiveStoriesSuccess,
      receiveStoriesError: receiveStoriesError,
    })
  })
  
 
  const receiveStoriesSuccess = (storiesPM) => {
    setStoryDataSource(getStoriesDataSource(storiesPM))
  }

  const receiveStoriesError = (error) => {
    console.log('error', error)
  }

  React.useEffect(() => {
    getAllStories()
  },[])
  return (
    <>
      <Row>
        <Col flex={4}>
          <h1 className="font-weight-600">Stories</h1>
          <h3>Place where you can keep track of your stories.</h3>
        </Col>
        <Col flex={1}>
            <Row className="pb-5 mtxl" align="bottom" justify="end">
              <AddStory 
              getAllStories={getAllStories}/>
            </Row>
        </Col>
      </Row>
      <DisplayStories
      storyDataSource={storyDataSource}
      getAllStories={getAllStories}
      />
    </>
  )
}

export default Stories
