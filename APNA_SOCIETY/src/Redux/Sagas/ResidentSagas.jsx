import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"

import {
  CREATE_RESIDENT, CREATE_RESIDENT_RED,
  DELETE_RESIDENT, DELETE_RESIDENT_RED,
  GET_RESIDENT, GET_RESIDENT_RED,
  UPDATE_RESIDENT, UPDATE_RESIDENT_RED
} from "../Constant"

// CREATE
function* createSaga(action) {
  let response = yield createRecord("resident", action.payload)

  yield put({
    type: CREATE_RESIDENT_RED,
    payload: response
  })
}

// GET (SAFE)
function* getSaga() {
  let response = yield getRecord("resident")

  yield put({
    type: GET_RESIDENT_RED,
    payload: Array.isArray(response)
      ? response
      : response?.data || []
  })
}

// UPDATE (FIXED)
function* updateSaga(action) {
  let response = yield updateRecord("resident", action.payload)

  yield put({
    type: UPDATE_RESIDENT_RED,
    payload: response
  })
}

// DELETE (FIXED)
function* deleteSaga(action) {
  yield deleteRecord("resident", action.payload)

  yield put({
    type: DELETE_RESIDENT_RED,
    payload: action.payload   // {_id}
  })
}

export default function* residentSagas() {
  yield takeEvery(CREATE_RESIDENT, createSaga)
  yield takeEvery(GET_RESIDENT, getSaga)
  yield takeEvery(UPDATE_RESIDENT, updateSaga)
  yield takeEvery(DELETE_RESIDENT, deleteSaga)
}