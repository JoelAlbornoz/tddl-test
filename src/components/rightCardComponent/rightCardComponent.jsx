import React, {useState,useEffect} from 'react'
import { Card, CardContent } from '@mui/material';


function RightCardComponent(props) {
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        const data = fetch('https://jsonplaceholder.typicode.com/users')
        const json = data.then(res => res.json())
        json.then(res => setUsersList(res))
    })

    const firstThree = (index) =>{
        switch(index){
            case 0:
                return 'yellow'
            case 1:
                return 'gray'
            case 2:
                return 'brown'
            default:
                return 'black'
    }
}

    return (
        <Card className='card__container__card'>
          <CardContent>
            <h2>Top players</h2>
            {usersList.map((user, index) => 
                <div key={'usr-' + user.username} style={{
                    color: firstThree(index)
                    }
                }>{user.username}</div>
            )}
          </CardContent>
        </Card>
    )
}

export default RightCardComponent
