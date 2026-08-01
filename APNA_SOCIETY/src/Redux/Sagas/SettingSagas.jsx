// import { put, takeEvery } from "redux-saga/effects"

// import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
// import { CREATE_SETTING, CREATE_SETTING_RED, DELETE_SETTING, DELETE_SETTING_RED, GET_SETTING, GET_SETTING_RED, UPDATE_SETTING, UPDATE_SETTING_RED } from "../Constant"
// // import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./services/index"


// function* createSaga(action) {                                                      //worker saga
//     let response = yield createRecord("setting", action.payload)               //used this line in case when no file field is used
//     // let response = yield createMultipartRecord("setting", action.payload)   //used this line in case when file field is used
//     yield put({ type: CREATE_SETTING_RED, payload: response })
// }

// function* getSaga() {                                                               //worker saga
//     let response = yield getRecord("setting")
//     yield put({ type: GET_SETTING_RED, payload: response })
// }

// function* updateSaga(action) {                                                      //worker saga
//     yield updateRecord("setting", action.payload)                           //used this line in case when no file field is used
//     yield put({ type: UPDATE_SETTING_RED, payload: action.payload })

//     // let response = yield updateMultipartRecord("setting", action.payload)   //used this line in case when file field is used
//     // yield put({ type: UPDATE_SETTING_RED, payload: response })
// }

// function* deleteSaga(action) {                                                      //worker saga
//     yield deleteRecord("setting", action.payload)
//     yield put({ type: DELETE_SETTING_RED, payload: action.payload })
// }

// export default function* SettingSagas() {
//     yield takeEvery(CREATE_SETTING, createSaga)                                //Watcher Saga
//     yield takeEvery(GET_SETTING, getSaga)                                      //Watcher Saga
//     yield takeEvery(UPDATE_SETTING, updateSaga)                                //Watcher Saga
//     yield takeEvery(DELETE_SETTING, deleteSaga)                                //Watcher Saga
// }

import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import {
  CREATE_SETTING, CREATE_SETTING_RED,
  DELETE_SETTING, DELETE_SETTING_RED,
  GET_SETTING, GET_SETTING_RED,
  UPDATE_SETTING, UPDATE_SETTING_RED
} from "../Constant"

// CREATE
function* createSaga(action) {
    let response = yield createRecord("setting", action.payload)

    yield put({
        type: CREATE_SETTING_RED,
        payload: response
    })
}

// GET
function* getSaga() {
    let response = yield getRecord("setting")

    yield put({
        type: GET_SETTING_RED,
        payload: response
    })
}

// 🔥 UPDATE (IMPORTANT FIX)
function* updateSaga(action) {

    let response = yield updateRecord("setting", action.payload)

    yield put({
        type: UPDATE_SETTING_RED,
        payload: response
    })
}

// DELETE
function* deleteSaga(action) {

    yield deleteRecord("setting", action.payload)

    yield put({
        type: DELETE_SETTING_RED,
        payload: action.payload
    })
}

export default function* SettingSagas() {
    yield takeEvery(CREATE_SETTING, createSaga)
    yield takeEvery(GET_SETTING, getSaga)
    yield takeEvery(UPDATE_SETTING, updateSaga)
    yield takeEvery(DELETE_SETTING, deleteSaga)
}