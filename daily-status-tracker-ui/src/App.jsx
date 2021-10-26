/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import styles from './App.module.scss'
import 'antd/dist/antd.css'
import { Layout, Menu, Row, Col } from 'antd'
import Stories from './pages/stories/components/Stories'
import SignIn from './pages/sign-in/components/SignIn'
import CreateAccount from './pages/register/components/CreateAccount'
import Status from './pages/daily-status/components/Status'
import MyProfile from './pages/my-profile/components/MyProfile'
import { locale } from './data/locale'

const { Header, Content } = Layout

function App() {
  // If you want to skip login page for dev, set as true
  const pageKey = localStorage.getItem('key')
  const userId = localStorage.getItem('userId')
  const [loggedIn, setLoggedIn] = useState(userId ? true : false)
  const [key, setKey] = useState(pageKey ? pageKey : '1')

  let display = ''
  if (!loggedIn) {
    display = 'd-none'
  }

  // ---------routing related code-----------
  const pages = [
    {
      path: '/createAccount',
      getComponent: () => <CreateAccount signInURL='/' />,
    },
    {
      path: '/stories',
      private: true,
      getComponent: () => <Stories />,
    },
    {
      path: '/status',
      private: true,
      getComponent: () => <Status />,
    },
    {
      path: '/myProfile',
      private: true,
      getComponent: () => <MyProfile />,
    },
    {
      path: '/',
      getComponent: (props) => (
        <SignIn
          homePageURL="/stories"
          createAccountURL="/createAccount"
          setLoggedIn={setLoggedIn}
          {...props}
        />
      ),
    },
  ]

  const getRoute = (key, loggedIn, privateRoute, page) => {
    let redirect = false
    if (privateRoute) {
      if (loggedIn === false) {
        redirect = true
      }
    }
    if (redirect) {
      return (
        <Route key={key} path={page.path}>
          <Redirect to="/"></Redirect>
        </Route>
      )
    } else {
      return (
        <Route
          key={key}
          path={page.path}
          render={(props) => page.getComponent(props)}
        />
      )
    }
  }

  // -----------end of routing code ----------------

  const signOut = ({ key }) => {
    setKey(key)
    localStorage.setItem('key', key)
    if (key === '3') {
      setLoggedIn(false)
      setKey('1')
      localStorage.removeItem('userId')
      localStorage.removeItem('key')
    }
  }

  return (
    <Layout className={styles.layoutElement}>
      <Header className={display}>
        <Row>
          <Col key="1" span={8}>
            <h1 className={styles.title}>{locale.title}</h1>
          </Col>
          <Col key="2" span={16}>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[key]}
              onClick={signOut}
              className='float-right'
            >
              <Menu.Item key="1"  >
               <NavLink to="/stories">{locale.navMenu.story}</NavLink>
              </Menu.Item>
              <Menu.Item key="2"  >
                <NavLink to="/status">{locale.navMenu.status}</NavLink>
                </Menu.Item>
                <Menu.Item key="4" >
                <NavLink to="/myProfile">{locale.navMenu.myProfile}</NavLink>
              </Menu.Item>
              <Menu.Item key="3" >
                <NavLink to="/"> {locale.navMenu.signOut}</NavLink>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Content className={`${styles.contentArea} p-5`}>
        <Switch>
          {pages.map((page, index) =>
            getRoute(index, loggedIn, page.private ? true : false, page)
          )}
        </Switch>
      </Content>
    </Layout>
  )
}

export default App
