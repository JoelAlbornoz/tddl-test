import React from 'react'
import { Card, CardContent } from '@mui/material';


function leftCardComponent(props) {
    return (
        <Card className='card__container__card'>
          <CardContent>
            <h2>{props.currentMessage}</h2>
            {(props.countdown > 0 && !props.gameRunning) && <h2>Game starting in: {props.countdown}</h2>}
            <hr/>
            <h4>{props.userData.name}</h4>
            <h4>Balance : ${props.userData.balance}</h4>

            <h4>Bet : ${props.userData.bet}</h4>

            <h4>Bet history: </h4>
            {props.userData.historial.map((item, index) => {
              return <div key={'hstRslt' + index}><b style={{color: item.won ? 'green' : 'red'}}>x{item.multiplicator} ___ ${item.earnings}</b>
              <br/></div>
            })}
            <h4>Best bet:  ${props.userData.bestBet}</h4>
          </CardContent>
        </Card>
    )
}

export default leftCardComponent
