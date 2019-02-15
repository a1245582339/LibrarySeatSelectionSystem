import React, { useState, useEffect, useCallback } from 'react'
import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
// import menu from '@/json/menu.json'
// import { getMe } from '@/http/admin';

const { Item, SubMenu } = Menu

const SideMenu = ({openKeys, useOpenKeys, history, match, location}) => {
    const [rootSubmenuKeys, useRootSubmenuKeys] = useState([])
    const [currentKey, useCurrentKey] = useState([])
    const [role, useRole] = useState(1)
    useEffect(async () => {
        // useRootSubmenuKeys(menu.map((_, index) => index + ''))
    }, [])
    useEffect(async () => {
        useCurrentKey([location.pathname.replace(match.path, '')])
    }, [location.pathname])
    useEffect(async () => {
        // const currRole = (await getMe()).role
        // useRole(currRole)
    }, [])
    const handleClick = (e) => {
        useCurrentKey([e.key])
        history.push(match.path + e.item.props.path)
    }

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
        let a;
        if(rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            a = keys;
        } else {
            a = latestOpenKey ? [latestOpenKey] : []
        }
        useOpenKeys(a)
    }

    const menuToJsx = useCallback((menu, parentIndex) => {
        // console.log('change>>>>>>>>>>>>>')
        return menu.map((item, index) => {
            if (item.children && item.children.length) {
                return (
                    <SubMenu key={parentIndex ? `${parentIndex}-${index}` : index}
                        title={<span>{item.icon ? <Icon type={item.icon} /> : ''}<span>{item.name}</span></span>}
                    >
                        {menuToJsx(item.children, index)}
                    </SubMenu>
                )
            } else if (role === 1 && item.path === '/admin') {
                // eslint-disable-next-line
                return 
            } else {
                return (
                    <Item key={item.path ? item.path : (parentIndex ? `${parentIndex}-${index}` : index)}
                        path={item.path}
                    >
                        {item.icon ? <Icon type={item.icon} /> : ''}
                        <span className="nav-text">{item.name}</span>
                    </Item>
                )
            }
        })
    }, [role])

    return(
        <Menu
            mode="inline"
            onClick={handleClick}
            onOpenChange={onOpenChange}
            openKeys={openKeys}
            selectedKeys={currentKey}
            theme="dark"
        >
            {/* {menuToJsx(menu)} */}
        </Menu>
    )
}
export default withRouter(SideMenu)