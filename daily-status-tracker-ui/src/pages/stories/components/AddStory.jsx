import React from 'react'
import styles from '../styles/stories.module.scss'
import { Modal, Button, message } from 'antd'
import {locale} from '../../../data/locale'
import {addStories} from 'daily-status-core'
import Lodash from 'lodash'
import AddStoryInfo from './AddStoryInfo'
import {setIsSaveDisable} from '../helpers/set_is_save_disable'
import { setStoryDetailObject } from '../helpers/set_story_detail_object'


class AddStory extends React.Component {

  constructor(props){
   super(props)
   this.initialState = {
    storyNo: '',
    name:null ,
    status:null,
    startDate:null,
    endDate:'',
    points:null,
    releaseVersion:'',
    pairsDev: [],
    isOffshoreTester: false
   }
   this.state = {
     isShowModal : false,
     storiesDetail: {
       storyNo:'',
       name:'',
       status:null,
       startDate:'',
       endDate:'',
       points: null,
       releaseVersion:'',
       pairsDev: [],
       isOffshoreTester: false
     },
     isSaveDisable : true
     
   }
   this.storiesRef = React.createRef()
   this.userId = localStorage.getItem('userId')
  }
  
  setSaveDisable = () => {
    const {storiesDetail} = this.state
    const isSaveDisable = setIsSaveDisable({storiesDetail})
    this.setState({
      isSaveDisable
    })
  }

  componentDidUpdate(prevProps,prevState){
  if(!Lodash.isEqual(this.state.storiesDetail,prevState.storiesDetail)){
    this.setSaveDisable()
  }
}

   showModal = () => {
    this.setState({isShowModal:true})
  }

  resetFields = () => {
  this.setState({
    storiesDetail: this.initialState,
    isTouchedStoryNo: false,
    isTouchedName: false,
    isTouchedStatus: false,
    isTouchedStartDate: false,
    isTouchedPoints: false,
    isTouchedReleaseVersion: false
  })
  }

   onCancel = () => {
    this.resetFields()
    this.storiesRef.current.clearTouchedField()
    this.setState({isShowModal: false})
    
  }

   handleStoryNoChange = (e) => {
    let newState = {...this.state.storiesDetail}
    newState.storyNo = e.target.value
    this.storiesRef.current.validateInput(e.target.value)
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
    this.storiesRef.current.numberValidation(e.target.value)
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

  onSave = () => {
    const {storiesDetail} = this.state
    const storyDetailObj = setStoryDetailObject({storyDetail:storiesDetail})
    addStories({
      userId: this.userId,
      storyDetail:storyDetailObj,
      observer: this
    })
    console.log(this.state.storiesDetail)
  }

  addStoryFailure = (error) =>{
    message.error(error)
  }

  addStorySuccess = () => {
    this.resetFields()
    this.storiesRef.current.clearTouchedField()
    this.setState({
      isShowModal: false
    })
    message.success('We have added your entry successfully')
    this.props.getAllStories()
  }

 

  render(){
    return( 
      <React.Fragment>
      <button className="btn-primary" onClick={this.showModal}>
          {locale.addStory}
      </button>
      <Modal
        title="Add Story"
        visible={this.state.isShowModal}
        okText='Save'
        onOk={this.onSave}
        okButtonProps={{ disabled: this.state.isSaveDisable }}
        onCancel={this.onCancel}
        className={styles.addStoryModal}
      >
        <AddStoryInfo
         ref={this.storiesRef}
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
        />

      </Modal>
      </React.Fragment>
      )
  }

  
}

export default AddStory
