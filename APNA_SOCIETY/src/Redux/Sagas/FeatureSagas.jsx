// import { put, takeEvery } from "redux-saga/effects"

// import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
// import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_FEATURE, GET_FEATURE_RED, UPDATE_FEATURE, UPDATE_FEATURE_RED } from "../Constant"
// // import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./services/index"


// function* createSaga(action) {                                                      //worker saga
//     let response = yield createRecord("feature", action.payload)               //used this line in case when no file field is used
//     // let response = yield createMultipartRecord("feature", action.payload)   //used this line in case when file field is used
//     yield put({ type: CREATE_FEATURE_RED, payload: response })
// }

// function* getSaga() {                                                               //worker saga
//     let response = yield getRecord("feature")
//     yield put({ type: GET_FEATURE_RED, payload: response })
// }
// function* updateSaga(action) {
//     let response = yield updateRecord("feature", action.payload)
//     yield put({ type: UPDATE_FEATURE_RED, payload: response })
// }

//     // let response = yield updateMultipartRecord("feature", action.payload)   //used this line in case when file field is used
//     // yield put({ type: UPDATE_FEATURE_RED, payload: response })


// function* deleteSaga(action) {
//     yield deleteRecord("feature", action.payload)

//     yield put({
//         type: DELETE_FEATURE_RED,
//         payload: action.payload   // {_id}
//     })
// }

// export default function* FeatureSagas() {
//     yield takeEvery(CREATE_FEATURE, createSaga)                                //Watcher Saga
//     yield takeEvery(GET_FEATURE, getSaga)                                      //Watcher Saga
//     yield takeEvery(UPDATE_FEATURE, updateSaga)                                //Watcher Saga
//     yield takeEvery(DELETE_FEATURE, deleteSaga)                                //Watcher Saga
// }

import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"

import {
  CREATE_FEATURE, CREATE_FEATURE_RED,
  DELETE_FEATURE, DELETE_FEATURE_RED,
  GET_FEATURE, GET_FEATURE_RED,
  UPDATE_FEATURE, UPDATE_FEATURE_RED
} from "../Constant"

// CREATE
function* createSaga(action) {
  try {
    let response = yield createRecord("feature", action.payload)

    yield put({
      type: CREATE_FEATURE_RED,
      payload: response
    })
  } catch (err) {
    console.log("CREATE FEATURE ERROR:", err)
  }
}

// GET
function* getSaga() {
  try {
    let response = yield getRecord("feature")

    yield put({
      type: GET_FEATURE_RED,
      payload: Array.isArray(response)
        ? response
        : response?.data || []
    })
  } catch (err) {
    console.log("GET FEATURE ERROR:", err)
  }
}

// UPDATE
function* updateSaga(action) {
  try {
    let response = yield updateRecord("feature", action.payload)

    yield put({
      type: UPDATE_FEATURE_RED,
      payload: response
    })
  } catch (err) {
    console.log("UPDATE FEATURE ERROR:", err)
  }
}

// DELETE
function* deleteSaga(action) {
  try {
    yield deleteRecord("feature", action.payload)

    yield put({
      type: DELETE_FEATURE_RED,
      payload: action.payload
    })
  } catch (err) {
    console.log("DELETE FEATURE ERROR:", err)
  }
}

export default function* FeatureSagas() {
  yield takeEvery(CREATE_FEATURE, createSaga)
  yield takeEvery(GET_FEATURE, getSaga)
  yield takeEvery(UPDATE_FEATURE, updateSaga)
  yield takeEvery(DELETE_FEATURE, deleteSaga)
}