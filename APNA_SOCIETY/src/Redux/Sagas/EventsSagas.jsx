import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"

import {
  CREATE_EVENTS, CREATE_EVENTS_RED,
  DELETE_EVENTS, DELETE_EVENTS_RED,
  GET_EVENTS, GET_EVENTS_RED,
  UPDATE_EVENTS, UPDATE_EVENTS_RED
} from "../Constant"

// CREATE
function* createSaga(action) {
  try {
    let response = yield createRecord("events", action.payload)

    yield put({
      type: CREATE_EVENTS_RED,
      payload: response
    })

  } catch (err) {
    console.log("CREATE ERROR:", err)
  }
}

// GET
function* getSaga() {
  try {
    let response = yield getRecord("events")

    yield put({
      type: GET_EVENTS_RED,
      payload: Array.isArray(response)
        ? response
        : response?.data || []
    })

  } catch (err) {
    console.log("GET ERROR:", err)
  }
}

// UPDATE
function* updateSaga(action) {
  try {
    let response = yield updateRecord("events", action.payload)

    yield put({
      type: UPDATE_EVENTS_RED,
      payload: response
    })

  } catch (err) {
    console.log("UPDATE ERROR:", err)
  }
}

// DELETE
function* deleteSaga(action) {
  try {
    yield deleteRecord("events", action.payload)

    yield put({
      type: DELETE_EVENTS_RED,
      payload: action.payload   // {_id}
    })

  } catch (err) {
    console.log("DELETE ERROR:", err)
  }
}

export default function* EventsSagas() {
  yield takeEvery(CREATE_EVENTS, createSaga)
  yield takeEvery(GET_EVENTS, getSaga)
  yield takeEvery(UPDATE_EVENTS, updateSaga)
  yield takeEvery(DELETE_EVENTS, deleteSaga)
}