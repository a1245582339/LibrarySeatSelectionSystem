import React, { useState } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { TabBar } from 'antd-mobile';
import Page from './pages'
import '@s/main.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faUserAlt, faCalendar, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faUserAlt, faCalendar, faCalendarAlt)


const Main = (props) => {
    const [route, setRoute] = useState('home')
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
                        console.log(props.history)
                        setRoute('home')
                        props.history.push('home')
                    }}
                    selected={route === 'home'}
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
                        setRoute('order')
                        props.history.push('order')
                    }}
                    selected={route === 'order'}
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
                        setRoute('user')
                        props.history.push('user')
                    }}
                    selected={route === 'user'}
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