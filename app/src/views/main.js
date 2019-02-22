import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { TabBar, Toast } from 'antd-mobile';
import Page from './pages'
import '@s/main.scss'
import { getToken } from '@u/cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faUserAlt, faCalendar, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faUserAlt, faCalendar, faCalendarAlt)


const Main = (props) => {
    useEffect(() => {
        if (!getToken() || getToken() === 'undefined') {
            Toast.offline('登录信息失效，请重新登录！', 1, () => {
                props.history.replace('/login')
            });
        }
    }, [props.history.location.pathname])
    const [route, setRoute] = useState(props.history.location.pathname)
    const RouterView = () => {
        return (
            <>
                <Switch>
                    <Redirect exact
                        from="/main"
                        to="/main/home"
                    />
                    <Route
                        component={Page.Home}
                        path="/main/home"
                    />
                    <Route
                        component={Page.Order}
                        path="/main/order"
                    />
                    <Route
                        component={Page.User}
                        path="/main/user"
                    />
                </Switch>
            </>
        )
    }
    return (
        <>
            <TabBar
                barTintColor="white"
                tintColor="#33A3F4"
                unselectedTintColor="#949494"
            >
                <TabBar.Item
                    data-seed="logId"
                    icon={<FontAwesomeIcon icon="home" />}
                    key="home"
                    onPress={() => {
                        setRoute('/main/home')
                        props.history.push('home')
                    }}
                    selected={route === '/main/home' || route === '/main'}
                    selectedIcon={<FontAwesomeIcon icon="home" />}
                    title="主页"
                >
                    {<RouterView />}
                </TabBar.Item>
                <TabBar.Item
                    data-seed="logId"
                    icon={<FontAwesomeIcon icon="calendar" />}
                    key="order"
                    onPress={() => {
                        setRoute('/main/order')
                        props.history.push('order')
                    }}
                    selected={route === '/main/order'}
                    selectedIcon={<FontAwesomeIcon icon="calendar-alt" />}
                    title="我的预约"
                >
                    {<RouterView />}
                </TabBar.Item>
                <TabBar.Item
                    data-seed="logId"
                    icon={<FontAwesomeIcon icon="user-alt" />}
                    key="user"
                    onPress={() => {
                        setRoute('/main/user')
                        props.history.push('user')
                    }}
                    selected={route === '/main/user'}
                    selectedIcon={<FontAwesomeIcon icon="user-alt" />}
                    title="个人信息"
                >
                    {<RouterView />}
                </TabBar.Item>
            </TabBar>
        </>

    )
}

export default withRouter(Main)