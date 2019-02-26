import React, { useState, useEffect } from 'react'
import { List } from 'antd-mobile';
import { connect } from 'react-redux'
import { getUniversity } from '@h/university'
import '@s/home.scss'

const Item = List.Item;
const Brief = Item.Brief;


const LibList = (props) => {
    const [list, setList] = useState([])
    useEffect(() => {
        if (props.student.university_id) {
            getUniversity({id: props.student.university_id}).then(res => {
                setList(res.data.data)
            })
        }
    }, [props.student.university_id])

    return(
        <div className="home">
            <h1>{props.student.university_name}</h1>
            <List className="my-list"
                renderHeader={() => '自习室列表'}
            >
                {list.map((item, index) => {
                    return (
                        <Item arrow="horizontal"
                            key={index}
                            multipleLine
                            onClick={() => {
                                props.history.push({pathname: 'detail', query: {library_id: item.id, name: item.name}})
                            }}
                        >
                            {item.name}
                            <Brief>
                                座位数：{item.total_seat_count + ' '}
                                可选数：{item.available_seat_count}
                            </Brief>
                        </Item>
                    )
                })}

            </List>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        student: state.student
    }
}

export default connect(mapStateToProps)(LibList)