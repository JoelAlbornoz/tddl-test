import ChartComponent from "./chartComponent";
import React from 'react'

function chartContainer(props) {
    return (
        <div>
            <ChartComponent categories={props.categories} data={props.data}></ChartComponent>
        </div>
    )
}

export default chartContainer
