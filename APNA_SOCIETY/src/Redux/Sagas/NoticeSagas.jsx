import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"
import {
  CREATE_NOTICE, CREATE_NOTICE_RED,
  DELETE_NOTICE, DELETE_NOTICE_RED,
  GET_NOTICE, GET_NOTICE_RED,
  UPDATE_NOTICE, UPDATE_NOTICE_RED
} from "../Constant"

// ✅ CREATE
function* createSaga(action) {
    let response = yield createRecord("notice", action.payload)
    yield put({ type: CREATE_NOTICE_RED, payload: response })
}

// ✅ GET
function* getSaga() {
    let response = yield getRecord("notice")
    yield put({ type: GET_NOTICE_RED, payload: response })
}

// ✅ UPDATE
function* updateSaga(action) {
    let response = yield updateRecord("notice", action.payload)
    yield put({ type: UPDATE_NOTICE_RED, payload: response })
}

// ✅ DELETE (FIXED)
function* deleteSaga(action) {
    yield deleteRecord("notice", action.payload)

    yield put({
        type: DELETE_NOTICE_RED,
        payload: action.payload   // 🔥 use original data (_id)
    })
}

export default function* NoticeSagas() {
    yield takeEvery(CREATE_NOTICE, createSaga)
    yield takeEvery(GET_NOTICE, getSaga)
    yield takeEvery(UPDATE_NOTICE, updateSaga)
    yield takeEvery(DELETE_NOTICE, deleteSaga)
}