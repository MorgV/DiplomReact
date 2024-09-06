import { observer } from 'mobx-react-lite'
import React, {  useContext } from 'react'
import { Card} from 'react-bootstrap'

import { Context } from '../index'


const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
      <div className='row row-cols-1 row-cols-md-6'>
        {device._brands.map((brand) => 
            <Card  
                style={{cursor:'pointer', alignItems:'center'}}
                onClick={() => device.setSelectedBrand(brand)}
                key={brand.id}
                className={brand.id === device._selectedBrand.id ? ' p-3  border-danger' : ' p-3 border-Secondary '}
            >
                {brand.name}
            </Card> 
        )}
      </div>
    )
})

export default BrandBar