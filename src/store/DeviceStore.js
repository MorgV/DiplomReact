import {makeAutoObservable} from 'mobx'

export default class DeviceStore{
    constructor(){
        this._types = [

        ]

        this._brands = [

        ]   
        
        this._devices = [

        ]
        this._tableDevices = [

        ]    

        this._basketDevices = [

        ]
        this._selectedTableDevices = {}

        this._selectedType = {}

        this._selectedBrand = {}

        this._selectedDevices = {}

        this._basketPrice=[]
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setSelectedType(type){
        this._selectedType = type
    }
    setBasketPrice(sum){
        this._basketPrice = sum
    }
    setBasketDevices(device){
        this._basketDevices = device
    }

    setTableDevices(device){
        this._tableDevices = device
    }
    
    setSelectedBrand(brand){
        this._selectedBrand = brand
    }
        
    setSelectedTableDevice(device){
        this._selectedTableDevices = device
    }

    setTypes(type){
        this._page = 1
        this._types = type
    }

    setBrands(brand){
        this._page = 1
        this._brands = brand
    }
    
    setDevices(device){
        this._devices = device
    }
    setSelectedDevices(device){
        this._selectedDevices = device
    }
    setPage(page){
        this._page = page
    }

    setTotalCount(count){
        this._totalCount = count
    }
    
    setLimit(limit){
        this._limit = limit
    }
    get Types(){
        return this._types
    }

    get Brands(){
        return this._brands
    }

    get Devices(){
        return this._devices
    }

    get TableDevices(){
        return this._tableDevices
    }

    get SelectedType(){
        return this._selectedType
    }

    get SelectedBrand(){
        return this._selectedBrand
    }
    get SelectedTableDevice(){
        return this._selectedTableDevices
    }
    get page(){
        return this._page
    }

    get TotalCount(){
        return this._totalCount
    }

    get Limit(){
        return this._limit
    }

}