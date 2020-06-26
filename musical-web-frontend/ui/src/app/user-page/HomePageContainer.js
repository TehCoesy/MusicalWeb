import React from 'react'
import { Button, DatePicker } from 'antd';
import {renderRoutes} from 'react-router-config';



const HomePageContainer = (props) => {

    return (
        <>
            Home

            {renderRoutes(props.route.routes)}
        </>
    )
}

export default HomePageContainer
