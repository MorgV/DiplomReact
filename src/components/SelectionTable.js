import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Table, ToastBody } from 'react-bootstrap';
import { fetchDevice, fetchTable } from '../http/deviceAPI';
import { Context } from '../index';
import CreateDevice from './modals/CreateDevice';
import "./SelectionTable.css"

const SelectionTable = observer(({deviceTableVisible, setDeviceVisible,setDeviceTableVisible}) => {
  const {device} = useContext(Context)
  const elements = device._tableDevices
      


  const rootRef = React.useRef();
  const [start, setStart] = useState(0);


  const rowHeight = 50
  const visibleRows = 5 

  function getTopHeight() {
    return rowHeight * start;
  }
  function getBottomHeight() {
    return rowHeight * (elements.length - (start + visibleRows + 1)) ;
  }
    
  useEffect(() => {
    function onScroll(e) {
      setStart(Math.min(  
        elements.length - visibleRows - 1,
        Math.floor(e.target.scrollTop / rowHeight)
      ));
    } 
    rootRef.current.addEventListener('scroll', onScroll);
    console.log(rootRef.current)
    // return () => {
    //   rootRef.current.removeEventListener('scroll', onScroll);
    // }
  }, [elements.length, visibleRows, rowHeight]);

    const ChangeWidth = (indexColumn) =>{
      let str =''
      if(indexColumn==0){
        str ='35px'
      }
      if(indexColumn==1){
        str = '552px'
      }
      if(indexColumn==2){
        str = '240px'
      }
      if(indexColumn==3){
        str = '163px'
      }
      return {width:str}
    }
    
    
    const TableClick = (event) => {
      const element = elements[event.currentTarget.id-1]
      device.setSelectedTableDevice(element)
      setDeviceVisible(true)
      deviceTableVisible= false
    }

  return (
<div style={deviceTableVisible ? {display:'none'} : null} className='TableContainer mt-3'>
<table>
      <thead style={{height: '50px',}}>
        <th style={{width:'35px'}} class="align-middle">ID</th>
        <th style={{width:'552px'}} class="w-50 align-middle " >Название</th>
        <th style={{width:'240px'}} class=" align-middle">Серийный номер</th>
        <th style={{width:'163px'}} class="align-middle">Количество</th>
        <th class="align-middle">Цена</th> 
        </thead> 
</table>
<div style={{ height: rowHeight * visibleRows + 1, overflow: 'auto' }} ref={rootRef}>
    <div style={{ height: getTopHeight() }} />
      <div>
            <table 
              
              class='table table-striped table-hover'>
            <tbody>
                {elements.slice(start, start + visibleRows + 1).map((row, rowIndex) => {
                  return(
                  <tr
                    style={{ height: rowHeight }}
                    key={start + rowIndex}
                    id={row[0]}
                    onClick={(e) => TableClick(e)}
                  >{row.map((text, colIndex) => (
                    <td style={ChangeWidth(colIndex)} key={start + '' + rowIndex + colIndex}>{text}</td>
                  ))}</tr>
                )}
                )}
              </tbody>
            </table>
      </div>
    <div style={{ height: getBottomHeight() }} />  
    </div>
    </div>
  )
})

export default SelectionTable