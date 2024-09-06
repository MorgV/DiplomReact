import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'

import { createDevice, fetchBrand, fetchTypes } from '../../http/deviceAPI'
import { Context } from '../../index'

const CreateDevice = observer(({show, onHide}) => {
  const {device} = useContext(Context)
  const [name, setName] = useState('') //название
  const [price, setPrice] = useState(0) //цена
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])
  const [deviceTableId, setDeviceTableId] = useState([])
  // const [serialnumber, setSerialnumber] = useState(null)
  // const [count, setCount] = useState(null)
  // const [rating, setRating] = useState(null)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrand().then(data => device.setBrands(data))
    setName(device._selectedTableDevices[1])
    setPrice(device._selectedTableDevices[4])
    setDeviceTableId(device._selectedTableDevices[0])
    // setSerialnumber(device._selectedTableDevices[2])
    // setCount(device._selectedTableDevices[3])
    // setRating(device._selectedTableDevices[5])
}, [show])// данные из таблицы


  const addInfo = () =>{
      setInfo([...info, {title:'',description: '', number:Date.now()}])
  }
  const removeInfo = (number) =>{
    setInfo(info.filter(i => i.number !== number))
}

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const selectFail = e => {
    setFile(e.target.files[0])
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name',name)
    formData.append('price',`${price}`)
    formData.append('img',file)
    formData.append('brandId',device._selectedBrand.id)
    formData.append('typeId',device._selectedType.id)
    formData.append('info',JSON.stringify(info)) 
    formData.append('deviceTableId',deviceTableId)  
    createDevice(formData).then(data => onHide())
  }

  return (
    <Modal 
    show={show} 
    onHide={onHide} 
    class=" modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <Modal.Header class="modal-header" closeButton>
        <h5 class="modal-title" id="exampleModalLongTitle">Добавить товар</h5>
      </Modal.Header>
    <div class="modal-body">
        <Form>
            <Dropdown >        
              <Dropdown.Toggle>{device._selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
              <Dropdown.Menu>
                {device._types.map(type => 
                  <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className='mt-3'>        
              <Dropdown.Toggle>{device._selectedBrand.name || 'Выберите брэнд'}</Dropdown.Toggle>
              <Dropdown.Menu>
                {device._brands.map(brand => 
                  <Dropdown.Item onClick={() => device.setSelectedBrand(brand)} key={brand.id}>{brand.name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              className='mt-3'
              placeholder='Введите название запчасти'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Form.Control
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className='mt-3'
              placeholder='Введите стоимость запчасти'
              type='number'
            />
            <Form.Control
              className='mt-3'
              type='file'
              onChange={selectFail}
            />
            <hr/>
            <Button
              variant='outline-dark'
              onClick={addInfo}
              >Добавить новое свойство
            </Button>
            { info.map(i => 
              <Row className='mt-4' key={i.number}>
                <Col md={4}>
                  <Form.Control 
                    value={i.title}
                    onChange={(e) => changeInfo('title',e.target.value, i.number)}
                    placeholder='Введите название характеристики'
                  />
                </Col>
                <Col md={4}>
                  <Form.Control 
                    value={i.description}
                    onChange={(e) => changeInfo('description',e.target.value, i.number)}
                    placeholder='Введите описание характеристики'
                  />
                </Col>
                <Col md={4}>
                    <Button 
                      variant='danger' 
                      onClick={() => removeInfo(i.number)}
                      >Удалить
                    </Button>
                </Col>
              </Row>
              )}
        </Form>
    </div>
    <Modal.Footer>
        <button type="button" class="btn btn-secondary"  onClick={onHide} data-dismiss="modal">Закрыть</button>
        <button type="button" class="btn btn-primary" onClick={addDevice} >Добавить</button>
    </Modal.Footer>
    

</Modal>  
  )
})

export default CreateDevice