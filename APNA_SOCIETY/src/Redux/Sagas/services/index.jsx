// services/index.js
const BASE_URL = import.meta.env.VITE_APP_BACKEND_SERVER

export async function createRecord(collection, payload) {
    try {
        let response = await fetch(`${BASE_URL}/api/${collection}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        })
        return await response.json()
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getRecord(collection) {
    try {
        let response = await fetch(`${BASE_URL}/api/${collection}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function updateRecord(collection, payload) {
    try {
        let response = await fetch(`${BASE_URL}/api/${collection}/${payload._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        })
        return await response.json()
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function deleteRecord(collection, payload) {
    try {
        let response = await fetch(`${BASE_URL}/api/${collection}/${payload._id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return await response.json()
    } catch (error) {
        console.log(error)
        return []
    }
}