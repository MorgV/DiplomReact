import React, { useContext } from "react";
import {observer} from 'mobx-react-lite'
import {Context} from '../index'

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <ul className="list-group">
            {device._types.map(type => <li 
                style={{cursor:'pointer'}}
                onClick={() => device.setSelectedType(type)}
                key={type.id} 
                className={type.id === device._selectedType.id ? 'list-group-item active' : 'list-group-item '}
            >{type.name}</li>)}
        </ul>
    );
})

export default TypeBar