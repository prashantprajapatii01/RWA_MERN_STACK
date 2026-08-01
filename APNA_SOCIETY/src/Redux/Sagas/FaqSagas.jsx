import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"

import {
  CREATE_FAQ, CREATE_FAQ_RED,
  DELETE_FAQ, DELETE_FAQ_RED,
  GET_FAQ, GET_FAQ_RED,
  UPDATE_FAQ, UPDATE_FAQ_RED
} from "../Constant"

// CREATE
function* createSaga(action) {
  let response = yield createRecord("faq", action.payload)

  yield put({
    type: CREATE_FAQ_RED,
    payload: response
  })
}

// GET (🔥 SAFE FIX)
function* getSaga() {
  let response = yield getRecord("faq")

  yield put({
    type: GET_FAQ_RED,
    payload: Array.isArray(response)
      ? response
      : response?.data || []
  })
}

// UPDATE
function* updateSaga(action) {
  let response = yield updateRecord("faq", action.payload)

  yield put({
    type: UPDATE_FAQ_RED,
    payload: response
  })
}

// DELETE
function* deleteSaga(action) {
  yield deleteRecord("faq", action.payload)

  yield put({
    type: DELETE_FAQ_RED,
    payload: action.payload   // 🔥 use _id
  })
}

export default function* FaqSagas() {
  yield takeEvery(CREATE_FAQ, createSaga)
  yield takeEvery(GET_FAQ, getSaga)
  yield takeEvery(UPDATE_FAQ, updateSaga)
  yield takeEvery(DELETE_FAQ, deleteSaga)
}