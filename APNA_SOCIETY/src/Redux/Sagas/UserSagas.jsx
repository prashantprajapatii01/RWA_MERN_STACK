import {
    put,
    takeEvery,
    call
} from "redux-saga/effects"

import {

    createRecord,
    deleteRecord,
    getRecord,
    updateRecord

} from "./services/index"

import {

    CREATE_USER,
    CREATE_USER_RED,

    DELETE_USER,
    DELETE_USER_RED,

    GET_USER,
    GET_USER_RED,

    UPDATE_USER,
    UPDATE_USER_RED

} from "../Constant"


// ✅ CREATE USER
function* createSaga(action) {

    try {

        const response = yield call(
            createRecord,
            "user",
            action.payload
        )

        if (response?._id) {

            yield put({
                type: CREATE_USER_RED,
                payload: response
            })
        }

    } catch (error) {

        console.log(error)
    }
}


// ✅ GET USERS
function* getSaga() {

    try {

        const response = yield call(
            getRecord,
            "user"
        )

        yield put({

            type: GET_USER_RED,

            payload:
                Array.isArray(response)

                    ? response

                    : response?.data || []
        })

    } catch (error) {

        console.log(error)
    }
}


// ✅ UPDATE USER
function* updateSaga(action) {

    try {

        const response = yield call(

            updateRecord,

            "user",

            action.payload
        )

        if (response?._id) {

            yield put({

                type: UPDATE_USER_RED,

                payload: response
            })
        }

    } catch (error) {

        console.log(error)
    }
}


// ✅ DELETE USER
function* deleteSaga(action) {

    try {

        const response = yield call(

            deleteRecord,

            "user",

            action.payload
        )

        if (response?.success || response?.message) {

            yield put({

                type: DELETE_USER_RED,

                payload: {
                    _id: action.payload._id
                }
            })
        }

    } catch (error) {

        console.log(error)
    }
}


// ✅ ROOT WATCHER
export default function* UserSagas() {

    yield takeEvery(
        CREATE_USER,
        createSaga
    )

    yield takeEvery(
        GET_USER,
        getSaga
    )

    yield takeEvery(
        UPDATE_USER,
        updateSaga
    )

    yield takeEvery(
        DELETE_USER,
        deleteSaga
    )
}