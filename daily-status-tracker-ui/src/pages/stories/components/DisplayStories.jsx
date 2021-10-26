import React from 'react'
import Moment from 'moment'
import {
  DeleteTwoTone,
  EditTwoTone,
  QuestionCircleOutlined
} from '@ant-design/icons'
import locale from '../locale/stories.locale.en-US'
import { Table, Popconfirm, message } from 'antd'
import { columns } from '../constants/columns'
import EditStory from './EditStory'
import {deleteStory} from 'daily-status-core';
import getValueFromKey from '../helpers/get_value_from_key'
import getEndDate from '../helpers/get_end_date'
const { Column } = Table;


const DisplayStories = ({
  storyDataSource,
  getAllStories
}) => {
  const userId = localStorage.getItem('userId')
  const [isEditModalVisible, setIsEditModalVisible] = React.useState(false)
  const [storyDetail, setStoryDetail] = React.useState()
  const[isDeleting, setIsDeleting] = React.useState(false)

const handleDelete = (record) => {
  setIsDeleting(true)
  const pairIndex = record.no - 1
  deleteStory({
  userId,
  taskID: record.storyNo,
  pairProgrammers: storyDataSource[pairIndex].pairProgrammers,
  deleteStorySuccess: deleteStorySuccess,
  deleteStoryFailure: deleteStoryFailure
})
}

const handleEditIconClick = (record) => {
 const storiesDetail = {
    storyNo:record.storyNo,
    name:record.storyName,
    status:record.status,
    startDate:Moment(record.startDate, 'DD-MM-YYYY '),
    endDate: getEndDate(record.endDate),
    points:record.storyPoints,
    releaseVersion:record.releaseVersion,
    pairsDev:getValueFromKey (storyDataSource[record.no - 1].pairProgrammers) ,
    isOffshoreTester: storyDataSource[record.no - 1].isOffshoreTester
  }
  setStoryDetail(storiesDetail)
  setIsEditModalVisible(true)
}

const deleteStorySuccess = () => {
  setIsDeleting(false)
  message.success('We have deleted your entry successfully')
  getAllStories()
}


const deleteStoryFailure = (error) => {
  setIsDeleting(false)
  message.error(error)
}

const onEditCancel = () => {
  setIsEditModalVisible(false)
}
  return (
    <div>
    <Table dataSource={storyDataSource}>
      <Column title={columns[0].title} dataIndex={columns[0].dataIndex} key={columns[0].key} />
      <Column title={columns[1].title} dataIndex={columns[1].dataIndex} key={columns[1].key} />
      <Column title={columns[2].title} dataIndex={columns[2].dataIndex} key={columns[2].key} />
      <Column title={columns[3].title} dataIndex={columns[3].dataIndex} key={columns[3].key} />
      <Column title={columns[4].title} dataIndex={columns[4].dataIndex} key={columns[4].key} />
      <Column title={columns[5].title} dataIndex={columns[5].dataIndex} key={columns[5].key} />
      <Column title={columns[6].title} dataIndex={columns[6].dataIndex} key={columns[6].key} />
      <Column title={columns[7].title} dataIndex={columns[7].dataIndex} key={columns[7].key} />
      <Column title={columns[8].title} dataIndex={columns[8].dataIndex} key={columns[8].key}
      render={(text,record) => (
        <>
        <Popconfirm 
        title={`${locale.DELETE_CONFIRMATION} ${record.storyNo} ?`}
         icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
         onConfirm= {() => {handleDelete(record)}}
         >
        <button data-test-id="delete-icon"
        ><DeleteTwoTone /></button></Popconfirm>
        <button
        disabled={record.status === 'onHold'}
        onClick = {() => {
          handleEditIconClick(record)
        }}><EditTwoTone /></button>
        </>
        
      )}
       />
       </Table>
      
      {
        isEditModalVisible && <EditStory
        onEditCancel={onEditCancel}
        storyDetail={storyDetail}
        getAllStories={getAllStories}
         />
      } 
       
     </div>
  )
}

export default DisplayStories

