import { put, takeEvery } from "redux-saga/effects"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./services/index"

import {
  CREATE_NEWSLETTER, CREATE_NEWSLETTER_RED,
  DELETE_NEWSLETTER, DELETE_NEWSLETTER_RED,
  GET_NEWSLETTER, GET_NEWSLETTER_RED,
  UPDATE_NEWSLETTER, UPDATE_NEWSLETTER_RED
} from "../Constant"

// CREATE
function* createSaga(action) {
  try {
    let response = yield createRecord("newsletter", action.payload)

    yield put({
      type: CREATE_NEWSLETTER_RED,
      payload: response
    })
  } catch (err) {
    console.log("CREATE ERROR:", err)
  }
}

// GET
function* getSaga() {
  try {
    let response = yield getRecord("newsletter")

    yield put({
      type: GET_NEWSLETTER_RED,
      payload: Array.isArray(response)
        ? response
        : response?.data || []
    })
  } catch (err) {
    console.log("GET ERROR:", err)
  }
}

// UPDATE (FIXED)
function* updateSaga(action) {
  try {
    let response = yield updateRecord("newsletter", action.payload)

    yield put({
      type: UPDATE_NEWSLETTER_RED,
      payload: response   // ✅ important
    })
  } catch (err) {
    console.log("UPDATE ERROR:", err)
  }
}

// DELETE
function* deleteSaga(action) {
  try {
    yield deleteRecord("newsletter", action.payload)

    yield put({
      type: DELETE_NEWSLETTER_RED,
      payload: action.payload
    })
  } catch (err) {
    console.log("DELETE ERROR:", err)
  }
}

export default function* NewsletterSagas() {
  yield takeEvery(CREATE_NEWSLETTER, createSaga)
  yield takeEvery(GET_NEWSLETTER, getSaga)
  yield takeEvery(UPDATE_NEWSLETTER, updateSaga)
  yield takeEvery(DELETE_NEWSLETTER, deleteSaga)
}