import React from 'react'
import { Form, Input, Button, Row, Col, Card, Alert } from 'antd'
import { Link } from 'react-router-dom'
import { locale } from './../../../data/locale'
import styles from '../styles/signin.module.scss'

import { userLogin } from "daily-status-core";

function SignIn({ homePageURL, createAccountURL, setLoggedIn, history }) {

  const [userId, setUserId] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [form] = Form.useForm();
  const [authPM , setAuthPM] = React.useState(null)
  const [isSignInDisabled, setIsSignInDisabled] = React.useState(false)
  const [isError, setIsError] = React.useState(false)

 const authenticationSuccess = (authPM) => {
   setAuthPM(authPM)
   setIsError(false)
   if(authPM.isAuthorizedUser()) {
     setLoggedIn(true);
     localStorage.setItem("userId",authPM.getUserId())
    history.push(homePageURL);
   } else {
    form.resetFields();
    setUserId('')
    setPassword('')
   }
   
 
  }
 const authenticationError = () => {
  setIsError(true)
  setLoggedIn(false)
  }

  const onFinish = (values) => {
    userLogin({
      userId,
      password,
      authenticationSuccess,
      authenticationError
    })
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

 

  return (
    <Row justify="center" className={styles.signInContainer}>
      <Col xs={24} sm={12} md={10} lg={8}>
      
        <Card title={locale.signInPage.title} className="cardTitle">
        {
            isError &&  <Alert
            message="Error"
            description="An error occurred...please try again."
            type="error"
            showIcon
          />
          }
          <Form
            layout="vertical"
            name="basic"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {
            authPM && !authPM.isAuthorizedUser() &&
          <Form.Item>
            <Alert
            message="Error"
            description="Bad Credential..."
            type="error"
            showIcon
          />
          </Form.Item>
            }

            <Form.Item
              label={locale.signInPage.userName.label}
              name="userID"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value)
              }}
              rules={[
                {
                  required: true,
                  message: locale.signInPage.userName.errorMessage,
                },
                ({ getFieldValue }) => ({
                  validator() {
                    const empID = getFieldValue('userID')
                    if (empID === undefined || !isNaN(empID)) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject(
                        'Please Enter a valid ID'
                      )
                    }
                  },
                })
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={locale.signInPage.password.label}
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              rules={[
                {
                  required: true,
                  message: locale.signInPage.password.errorMessage,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>                     

            <Form.Item>
              <div className={styles.createAccount}>
                <Link to={createAccountURL}>
                  <button className="btn-link">
                    {locale.signInPage.createAccount}
                  </button>
                </Link>
                <button type="submit" className="btn-primary" disabled={isSignInDisabled}>
                  {locale.signInPage.title}
                </button>
              </div>
            </Form.Item>
          </Form>       
         
        </Card>
      </Col>
    </Row>
  );
}

export default SignIn
