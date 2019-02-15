import React, {  } from 'react';
import { withRouter } from 'react-router-dom';

import { TabBar } from 'antd-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import '@s/main.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo)


const Main = () => {
    return (
        <>
            <TabBar
                barTintColor="white"
                tintColor="#33A3F4"
                unselectedTintColor="#949494"
            >
                <TabBar.Item
                    data-seed="logId"
                    icon={<FontAwesomeIcon icon="igloo" />}
                    key="Life"
                    onPress={() => {
                        console.log(111)
                    }}
                    selected
                    selectedIcon={<FontAwesomeIcon icon="igloo" />}
                    title="Life"
                >
                    {<div>123</div>}
                </TabBar.Item>
            </TabBar>
        </>

    )
}

export default withRouter(Main)