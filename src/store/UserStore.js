import {makeAutoObservable} from 'mobx'

export default class UserStore{
    constructor(){
        this._isAuth = false
        this._user = {}
        this._role = ''
        this._id = 0
        this._ButtonExit = false
        makeAutoObservable(this)
    }

    setAuth(bool){
        this._isAuth = bool
    }
    setButtonExit (bool){
        this._ButtonExit = bool
    }

    setRole(role){
        this._role = role
    }
    setUser(user){
        this._user = user
    }
    setId(id){
        this._id = id
    }

    get isAuth(){
        return this._isAuth
    }

    get User(){
        return this._user
    }
    
    get Role(){
        return this._role
    }

}