

import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import {
  CREATE_COMPLAINT, CREATE_COMPLAINT_RED,
  DELETE_COMPLAINT, DELETE_COMPLAINT_RED,
  GET_COMPLAINT, GET_COMPLAINT_RED,
  UPDATE_COMPLAINT, UPDATE_COMPLAINT_RED
} from "../Constant"

// ✅ CREATE
function* createSaga(action) {
    let response = yield createRecord("complaint", action.payload)

    yield put({
        type: CREATE_COMPLAINT_RED,
        payload: response
    })
}

// ✅ GET (🔥 ROLE BASED)
function* getSaga(action) {

    let url = "complaint"

    // 👤 if userId exists → fetch only user data
    if (action.payload?.userId) {
        url += `?userId=${action.payload.userId}`
    }

    let response = yield getRecord(url)

    yield put({
        type: GET_COMPLAINT_RED,
        payload: response
    })
}

// ✅ UPDATE (🔥 SECURE)
function* updateSaga(action) {

    let response = yield updateRecord("complaint", action.payload)

    yield put({
        type: UPDATE_COMPLAINT_RED,
        payload: response
    })
}
// ✅ DELETE
function* deleteSaga(action) {
    yield deleteRecord("complaint", action.payload)  // ✅ correct

    yield put({
        type: DELETE_COMPLAINT_RED,
        payload: action.payload
    })
}

export default function* ComplaintSagas() {
    yield takeEvery(CREATE_COMPLAINT, createSaga)
    yield takeEvery(GET_COMPLAINT, getSaga)
    yield takeEvery(UPDATE_COMPLAINT, updateSaga)
    yield takeEvery(DELETE_COMPLAINT, deleteSaga)
}