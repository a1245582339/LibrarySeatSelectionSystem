import React from 'react'
import { connect } from 'react-redux'
import LibList from '@c/libList';
import LibDetail from '@c/libDetail';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';


const Home = (props) => {
    return(
        <Switch>
            <Redirect exact
                from="/main/home"
                to="/main/home/list"
            />
            <Route component={LibList}
                path="/main/home/list"
            />
            <Route component={LibDetail}
                path="/main/home/detail"
            />
        </Switch>
    )
}

const mapStateToProps = (state) => {
    return {
        student: state.student
    }
}

export default withRouter(connect(mapStateToProps)(Home))