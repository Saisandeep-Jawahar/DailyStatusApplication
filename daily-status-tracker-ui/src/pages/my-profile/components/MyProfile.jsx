/* eslint-disable react/prop-types */
import React from 'react'
import styles from './../styles/myprofile.module.scss'
import { locale } from './../../../data/locale'
import { Descriptions, Input, Button } from 'antd'

function MyProfile() {
  let employeeDetails = {
    employeeID:'41013',
    employeeName:'Bt',
    team: 'Grid Strikers',
    emailId: 'bt@pt.com',
    project: 'Ams',
    hasAdminRights: 'No',
    password:'1234'
  }
  const [editDetails, setEditDetails] = React.useState(false)
  const [updatePassword, setUpdatePassword] = React.useState(false)

  const renderEditControlButtons = () => {
    if(!editDetails && !updatePassword) {
      return <EditButtonControls
        primaryButtonText={locale.myProfile.updatePassword}
        secondaryButtonText= {locale.myProfile.edit}
        primaryButtonClick = {() => setUpdatePassword(true)}
        secondaryButtonClick = {() => setEditDetails(true)}
      />
    } else if(editDetails) {
      return <EditButtonControls
        primaryButtonText={locale.myProfile.confirm}
        secondaryButtonText= {locale.myProfile.cancel}
        primaryButtonClick = {() => {
          setEditDetails(false)
        }}
        secondaryButtonClick = {() => {
          setEditDetails(false)
        }}
      />
    }
    else if(updatePassword) {
      return <EditButtonControls
        primaryButtonText={locale.myProfile.confirm}
        secondaryButtonText= {locale.myProfile.cancel}
        primaryButtonClick = {() => {
          setUpdatePassword(false)
        }}
        secondaryButtonClick = {() => {
          setUpdatePassword(false)
        }}
      />
    }
  }
  return (
    <Descriptions
      title={locale.myProfile.title}
      bordered
      className={styles.myProfile}
      column={1}
      size='default'
    >
      { updatePassword ?
        <>
          <Descriptions.Item label={locale.myProfile.currentPassword}>
            <Input type='password'/>
          </Descriptions.Item>
          <Descriptions.Item label={locale.myProfile.newPassword}>
            <Input type='password'/>
          </Descriptions.Item>
          <Descriptions.Item label={locale.myProfile.reEnterNewPassword}>
            <Input type='password'/>
          </Descriptions.Item>
        </>
       :
        <>
          <Descriptions.Item label={locale.createAccountPage.employeeID.label}>
            {editDetails ? <Input value={employeeDetails.employeeID} /> : employeeDetails.employeeID}
          </Descriptions.Item>
          <Descriptions.Item label={locale.createAccountPage.employeeName.label}>
          {editDetails ? <Input value={employeeDetails.employeeName} /> : employeeDetails.employeeName}
          </Descriptions.Item>
          <Descriptions.Item label={locale.createAccountPage.email.label}>
          {editDetails ? <Input value={employeeDetails.emailId} /> : employeeDetails.emailId}
          </Descriptions.Item>
          <Descriptions.Item label={locale.createAccountPage.project.label}>
          {editDetails ? <Input value={employeeDetails.project} /> : employeeDetails.project}
          </Descriptions.Item>
          <Descriptions.Item label={locale.createAccountPage.team.label}>
          {editDetails ? <Input value={employeeDetails.team} /> : employeeDetails.team}
          </Descriptions.Item>
          <Descriptions.Item className={editDetails ? 'not-allowed-cursor' : ''} label={locale.myProfile.adminRights}>
            {employeeDetails.hasAdminRights}
          </Descriptions.Item>
       </>
      }
       <Descriptions.Item>
          {renderEditControlButtons()}
        </Descriptions.Item>
    </Descriptions>
  )
}

function EditButtonControls({
  primaryButtonText,
  secondaryButtonText,
  primaryButtonClick,
  secondaryButtonClick
 }) {
  return (
    <>
      <Button className="ml-5 float-right" type="primary" onClick={primaryButtonClick}>
        {primaryButtonText}
      </Button>
      <Button className="float-right" onClick={secondaryButtonClick}>
        {secondaryButtonText}
      </Button>
    </>
  )
}

export default MyProfile
