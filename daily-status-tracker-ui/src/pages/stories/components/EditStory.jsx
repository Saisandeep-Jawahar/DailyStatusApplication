import React from 'react'
import {  Modal, message} from 'antd'
import styles from '../styles/stories.module.scss'
import AddStoryInfo from './AddStoryInfo'
import { setStoryDetailObject } from '../helpers/set_story_detail_object'
import {updateStory} from 'daily-status-core'
import { setIsSaveDisable } from '../helpers/set_is_save_disable'
import Lodash from 'lodash'
class EditStory extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showModal:true,
            storiesDetail:{},
            isSaveDisable : true
        }
        this.userId = localStorage.getItem('userId')
        this.editStoriesRef = React.createRef()
    }

    componentDidMount(){
        const storiesDetail = this.props.storyDetail
        this.setState({storiesDetail})
    }

    componentDidUpdate(prevProps,prevState){
      if(!Lodash.isEqual(this.state.storiesDetail,prevState.storiesDetail)){
        this.setSaveDisable()
      }
    }

    setSaveDisable = () => {
      const {storiesDetail} = this.state
      const isSaveDisable = Lodash.isEqual(this.props.storyDetail,storiesDetail) ? true: setIsSaveDisable({storiesDetail})
      this.setState({
        isSaveDisable
      })
      
    }

    handleStoryNoChange = (e) => {
        let newState = {...this.state.storiesDetail}
        newState.storyNo = e.target.value
        this.editStoriesRef.current.validateInput(e.target.value)
        this.setState({storiesDetail:newState})
      }
    
       handleStoryNameChange = (e) => {
        let newState = {...this.state.storiesDetail}
        newState.name = e.target.value
        this.setState({storiesDetail:newState})
      }
    
      handleStatusChange = (value) => {
        let newState = {...this.state.storiesDetail}
        newState.status = value
        this.setState({storiesDetail:newState})
      }
    
      handleStartDateChange = (value) => {
        let newState = {...this.state.storiesDetail}
        newState.startDate = value
        this.setState({storiesDetail:newState})
  }

  handleEndDateChange = (value) => {
    
    let newState = {...this.state.storiesDetail}
    newState.endDate = value
    this.setState({storiesDetail:newState})
  }

  handleStoryPointsChange = (value) => {
    let newState = {...this.state.storiesDetail}
     newState.points = value
    this.setState({storiesDetail:newState})
  }

  handleReleaseVersionChange = (e) => {
    let newState = {...this.state.storiesDetail}
    newState.releaseVersion = e.target.value
    this.editStoriesRef.current.numberValidation(e.target.value)
    this.setState({storiesDetail:newState})
  }

  handlePairsDevChange = (value) => {
    let newState = {...this.state.storiesDetail}
    newState.pairsDev = value
    this.setState({storiesDetail:newState})
  }

  handleOffshoreTesterChange = (checked) => {
    let newState = {...this.state.storiesDetail}
    newState.isOffshoreTester = checked
    this.setState({storiesDetail:newState})
  }

    onCancel = () => {
        this.setState({showModal: false})
        this.props.onEditCancel()
    }

    onSave = () => {
    const {storiesDetail} = this.state
    const storyDetailObj = setStoryDetailObject({storyDetail:storiesDetail})
    updateStory({
        userId: this.userId,
        storyDetail:storyDetailObj,
        observer: this  
    })
    }

    updateStorySuccess = () => {
        message.success('We have updated your entry successfully')
        this.props.onEditCancel()
        this.props.getAllStories()
    }

    updateStoryFailure = (error) =>{
        message.error(error) 
    }

    render(){
        return(
            <Modal
       title="Edit Story"
       visible={this.state.showModal}
       okText='Save'
       onOk={this.onSave}
       okButtonProps={{ disabled: this.state.isSaveDisable }}
       onCancel={this.onCancel}
       className={styles.addStoryModal}
     >
         <AddStoryInfo
         ref={this.editStoriesRef}
         storiesDetail={this.state.storiesDetail}
         handleStoryNoChange={this.handleStoryNoChange}
         handleStoryNameChange={this.handleStoryNameChange}
         handleStatusChange={this.handleStatusChange}
         handleStartDateChange={this.handleStartDateChange}
         handleEndDateChange={this.handleEndDateChange}
         handleStoryPointsChange={this.handleStoryPointsChange}
         handleReleaseVersionChange={this.handleReleaseVersionChange}
         handlePairsDevChange={this.handlePairsDevChange}
         handleOffshoreTesterChange={this.handleOffshoreTesterChange}
         disableStartDate={true}
          />
         </Modal>
        )
    }
}


export default EditStory