import React, { useContext, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { registration } from '../http/UserAPI'
import { Context } from '../index'
import { SHOP_ROUTE } from '../utils/constans'

const CodeConfirmation = ({show,onHide,code,email,password}) => {
    const [value, setValue] = useState()
    const {user} = useContext(Context)
    const navigation = useNavigate()

    const codeChecker = async() => {
        try {
            if(code == value){
                const data = await registration(email,password)
                user.setUser(user)
                user.setAuth(true)  
                user.setRole(data.role) 
                localStorage.setItem('isAuth', true)
                navigation(SHOP_ROUTE)
                close()
            }else{
                alert("Код неверный")
            }
        } catch (e) {
            alert(e.response.data.message)
        }

    }
    const close = () => {
        setValue('')
        onHide('')
    }

  return (
    <Modal show={show} onHide={onHide} class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    
    {/* <div class="modal-content"> */}
    <Modal.Header class="modal-header" closeButton>
        <h5 class="modal-title" id="exampleModalLongTitle">Подтвердите почту</h5>

    </Modal.Header>
    <div class="modal-body">
        <Form>
            <Form.Control 
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder='Введите код'
            />
        </Form>
    </div>
    <Modal.Footer>
        <button type="button" class="btn btn-secondary"  onClick={close} data-dismiss="modal">Закрыть</button>
        <button type="button" class="btn btn-primary" onClick={codeChecker} >Добавить</button>
    </Modal.Footer>
    

</Modal>  
  )
}

export default CodeConfirmation