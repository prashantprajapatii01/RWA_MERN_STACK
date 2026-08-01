// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const { updateUser, changePassword } = require("../controllers/userController");

// router.put("/:id", auth, updateUser);
// router.put("/change-password/:id", auth, changePassword);
// module.exports = router;

const express = require("express")

const router = express.Router()

const auth = require("../middleware/auth")

const {

    getUsers,
    createUser,
    updateUser,
    deleteUser,
    changePassword

} = require("../controllers/userController")


// ✅ GET USERS
router.get("/", auth, getUsers)


// ✅ CREATE USER
router.post("/", auth, createUser)


// ✅ UPDATE USER
router.put("/:id", auth, updateUser)


// ✅ DELETE USER
router.delete("/:id", auth, deleteUser)


// ✅ CHANGE PASSWORD
router.put(
    "/change-password/:id",
    auth,
    changePassword
)

module.exports = router