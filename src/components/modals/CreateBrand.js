import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { createBrand, createType } from '../../http/deviceAPI'

const CreateBrand = ({show, onHide}) => {
    const [value, setValue] = useState()
    const addBrand = () => {
        createBrand({name: value}).then(data => {
            setValue('')
            onHide('')
        })
    }

  return (
    <Modal show={show} onHide={onHide} class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    
    {/* <div class="modal-content"> */}
    <Modal.Header class="modal-header" closeButton>
        <h5 class="modal-title" id="exampleModalLongTitle">Добавить бренд</h5>

    </Modal.Header>
    <div class="modal-body">
        <Form>
            <Form.Control 
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder='Введите название бренда'
            />
        </Form>
    </div>
    <Modal.Footer>
        <button type="button" class="btn btn-secondary"  onClick={onHide} data-dismiss="modal">Закрыть</button>
        <button type="button" class="btn btn-primary" onClick={addBrand} >Добавить</button>
    </Modal.Footer>
    

</Modal>  
  )
}

export default CreateBrand
