import { HttpHeaders } from "@angular/common/http"

export const endpoint = {
    //Category Module
    LIST_CATEGORIES: 'Category',
    LIST_SELECT_CATEGORIES: 'Category/Select',
    CATEGORY_BY_ID: 'Category/',
    CATEGORY_REGISTER: 'Category/Register/',
    CATEGORY_REMOVE: 'Category/Remove/',
    CATEGORY_EDIT: 'Category/Edit/',

    //AUTH MODULE
    LOGIN: 'Auth/Login',
    LOGIN_GOOGLE: 'Auth/LoginWithGoogle'
}

export const httpOptions = {
    headers : new HttpHeaders({
        "Content-Type": "application/json"
    })
}