import React, { useState } from 'react'
import { Button, Card, Form, Input, Row, Col, Select, message } from 'antd'
import styles from './../styles/register.module.scss'
import { locale } from './../../../data/locale'
import { Link, useHistory } from 'react-router-dom'
import { createAccount } from 'daily-status-core'

function CreateAccount({ signInURL }) {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 10,
      },
      lg: {
        span: 10,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 30,
      },
      lg: {
        span: 24,
      },
    },
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 10,
      },
    },
  }

  const [form] = Form.useForm()
  const [empId, setEmpId] = React.useState("");
  const [empName, setEmpName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [project, setProject] = React.useState("TDA")
  const [team, setTeam] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const history = useHistory();

  const onFinish = (values) => {
    createAccount({
      employeeID: empId,
      employeeName: empName,
      team,
      password,
      emailId: email,
      project,
      receiveSuccessRegistration,
      receiveFailureRegistration
    })
  }

  const receiveSuccessRegistration = ({
    msg
  }) => {
    // message.success(msg)
    if(msg === 'User has been created successfully'){
      message.success('User has been created successfully,  Redirecting you to login page now..!')
      setTimeout(() => {
        history.push('/')
      }, 2000);
    }else{
      message.success(msg)
    }
  }

  const receiveFailureRegistration = () => {
    message.error('Registration is not successful')
  }

  const handleClick = () => {
    console.log("Clicked")

  }

  return (
    <Row className={styles.createAccountContainer} justify="center">
      <Col lg={7} className={styles.createAccountColumn}>
        <Card
          title={locale.createAccountPage.createAccount}
          className="cardTitle"
        >
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ['zhejiang', 'hangzhou', 'xihu'],
              prefix: '86',
            }}
            scrollToFirstError
          >
            <Form.Item
              name="employeeID"
              label={locale.createAccountPage.employeeID.label}
              rules={[
                {
                  required: true,
                  message:
                    locale.createAccountPage.employeeID.requiredErrorMessage,
                },
                ({ getFieldValue }) => ({
                  validator() {
                    const empID = getFieldValue('employeeID')
                    if (empID === undefined || !isNaN(empID)) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject(
                        locale.createAccountPage.employeeID
                          .validValueErrorMessage
                      )
                    }
                  },
                }),
              ]}
            >
              <Input
                value={empId}
                onChange={e => setEmpId(e.target.value)}

              />
            </Form.Item>
            <Form.Item
              name="employeeName"
              label={locale.createAccountPage.employeeName.label}
              rules={[
                {
                  required: true,
                  message: locale.createAccountPage.employeeName.requiredErrorMessage,
                },
              ]}
            >
              <Input value={empName}
                onChange={e => setEmpName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label={locale.createAccountPage.email.label}
              rules={[
                {
                  type: 'email',
                  message: locale.createAccountPage.email.requiredErrorMessage,
                },
                {
                  required: true,
                  message: locale.createAccountPage.email.validValueErrorMessage,
                },
              ]}
            >
              <Input value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="project"
              label={locale.createAccountPage.project.label}
              rules={[
                {
                  //required: true,
                  message: locale.createAccountPage.project.requiredErrorMessage,
                },
              ]}
            >
              <Select defaultValue="TDA" value={project}
                onChange={value => setProject(value)}
              >
                <Select.Option value="TDA">TDA</Select.Option>
              </Select>

            </Form.Item>
            <Form.Item
              name="team"
              label={locale.createAccountPage.team.label}
              rules={[
                {
                  required: true,
                  message: locale.createAccountPage.team.requiredErrorMessage,
                },
              ]}
            >
              <Select value={team}
                onChange={value => setTeam(value)}>
                <Select.Option value="Grid">Grid</Select.Option>
                <Select.Option value="Paperfree">Paperfree</Select.Option>
                <Select.Option value="Monks">Monks</Select.Option>
                <Select.Option value="GridStrikers">GridStrikers</Select.Option>
                <Select.Option value="TwoFriends">TwoFriends</Select.Option>
                <Select.Option value="Diggs">Diggs</Select.Option>
                <Select.Option value="Greenbacks">Greenbacks</Select.Option>
                <Select.Option value="CTG">CTG</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="password"
              label={locale.createAccountPage.password.label}
              rules={[
                {
                  required: true,
                  message: locale.createAccountPage.password.requiredErrorMessage,
                },
              ]}
              hasFeedback
            >
              <Input.Password value={password}
                onChange={e => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="confirm"
              label={locale.createAccountPage.confirmPassword.label}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: locale.createAccountPage.confirmPassword.requiredErrorMessage,
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }

                    return Promise.reject(
                      locale.createAccountPage.confirmPassword.validValueErrorMessage
                    )
                  },
                }),
              ]}
            >
              <Input.Password value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)} />
            </Form.Item>

            <Form.Item className={styles.formButtons}>
              <div className={styles.registerAccount}>
                <Link to={signInURL}>
                  <button className="btn-link">
                      {locale.createAccountPage.cancel}
                  </button>
                </Link>
                <button type="submit" className="btn-primary" onClick={handleClick}>
                    {locale.createAccountPage.register}
                </button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default CreateAccount