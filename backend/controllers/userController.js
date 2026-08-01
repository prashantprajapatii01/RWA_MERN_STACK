
// const User = require("../models/User")
// const bcrypt = require("bcryptjs")


// // ✅ GET ALL USERS
// exports.getUsers = async (req, res) => {

//     try {

//         // admin only
//         if (
//             !["Admin", "Super Admin"]
//                 .includes(req.user.role)
//         ) {

//             return res.status(403).json({
//                 message: "Unauthorized"
//             })
//         }

//         const users = await User.find()
//             .select("-password")

//         res.json(users)

//     } catch (err) {

//         console.log(err)

//         res.status(500).json({
//             message: "Server error"
//         })
//     }
// }


// // ✅ CREATE USER
// exports.createUser = async (req, res) => {

//     try {

//         // admin only
//         if (
//             !["Admin", "Super Admin"]
//                 .includes(req.user.role)
//         ) {

//             return res.status(403).json({
//                 message: "Unauthorized"
//             })
//         }

//         const {

//             name,
//             username,
//             email,
//             phone,
//             password,
//             flatNo,
//             block,
//             residentType,
//             role,
//             status

//         } = req.body

//         // duplicate check
//         const existingUser = await User.findOne({

//             $or: [
//                 { email },
//                 { username }
//             ]
//         })

//         if (existingUser) {

//             return res.status(400).json({
//                 message:
//                     "User already exists"
//             })
//         }

//         // hash password
//         const hashedPassword =
//             await bcrypt.hash(password, 10)

//         // create user
//         const user = await User.create({

//             name,
//             username,
//             email,
//             phone,

//             password: hashedPassword,

//             flatNo,
//             block,
//             residentType,

//             role,
//             status
//         })

//         // hide password
//         const newUser =
//             await User.findById(user._id)
//                 .select("-password")

//         res.status(201).json(newUser)

//     } catch (err) {

//         console.log(err)

//         res.status(500).json({
//             message: "Server error"
//         })
//     }
// }


// // ✅ UPDATE USER / PROFILE
// exports.updateUser = async (req, res) => {

//     try {

//         // self OR admin
//         if (

//             req.user.id !== req.params.id

//             &&

//             !["Admin", "Super Admin"]
//                 .includes(req.user.role)

//         ) {

//             return res.status(403).json({
//                 message: "Unauthorized"
//             })
//         }

//         // ❌ prevent password update here
//         delete req.body.password

//         const updatedUser =
//             await User.findByIdAndUpdate(

//                 req.params.id,

//                 req.body,

//                 {
//                     new: true
//                 }

//             ).select("-password")

//         res.json(updatedUser)

//     } catch (err) {

//         console.log(err)

//         res.status(500).json({
//             message: "Server error"
//         })
//     }
// }


// // ✅ CHANGE PASSWORD
// exports.changePassword = async (req, res) => {

//     try {

//         // only self
//         if (req.user.id !== req.params.id) {

//             return res.status(403).json({
//                 message: "Unauthorized"
//             })
//         }

//         const {
//             oldPassword,
//             newPassword
//         } = req.body

//         const user =
//             await User.findById(req.params.id)

//         if (!user) {

//             return res.status(404).json({
//                 message: "User not found"
//             })
//         }

//         // compare old password
//         const isMatch =
//             await bcrypt.compare(
//                 oldPassword,
//                 user.password
//             )

//         if (!isMatch) {

//             return res.status(400).json({
//                 message:
//                     "Incorrect current password"
//             })
//         }

//         // hash new password
//         const hashedPassword =
//             await bcrypt.hash(newPassword, 10)

//         user.password = hashedPassword

//         await user.save()

//         res.json({
//             success: true,
//             message:
//                 "Password updated successfully"
//         })

//     } catch (err) {

//         console.log(err)

//         res.status(500).json({
//             message: "Server error"
//         })
//     }
// }


// // ✅ DELETE USER
// exports.deleteUser = async (req, res) => {

//     try {

//         // admin only
//         if (
//             !["Admin", "Super Admin"]
//                 .includes(req.user.role)
//         ) {

//             return res.status(403).json({
//                 message: "Unauthorized"
//             })
//         }

//         await User.findByIdAndDelete(
//             req.params.id
//         )

//         res.json({
//             success: true,
//             message: "User deleted"
//         })

//     } catch (err) {

//         console.log(err)

//         res.status(500).json({
//             message: "Server error"
//         })
//     }
// }

const User = require("../models/User")
const bcrypt = require("bcryptjs")


// ======================================================
// ✅ GET ALL USERS
// ======================================================

exports.getUsers = async (req, res) => {

    try {

        // ✅ admin only
        if (
            !["Admin", "Super Admin"]
                .includes(req.user?.role)
        ) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const users = await User.find()
            .select("-password")

        res.status(200).json(users)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}



// ======================================================
// ✅ CREATE USER
// ======================================================

exports.createUser = async (req, res) => {

    try {

        // ✅ admin only
        if (
            !["Admin", "Super Admin"]
                .includes(req.user?.role)
        ) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const {

            name,
            username,
            email,
            phone,
            password,
            flatNo,
            block,
            residentType,
            role,
            status

        } = req.body


        // ✅ validation
        if (
            !name ||
            !username ||
            !email ||
            !phone ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message: "All required fields are mandatory"
            })
        }


        // ✅ duplicate check
        const existingUser = await User.findOne({

            $or: [
                { email },
                { username }
            ]
        })

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }


        // ✅ hash password
        const hashedPassword =
            await bcrypt.hash(password, 10)


        // ✅ create user
        const user = await User.create({

            name,
            username,
            email,
            phone,

            password: hashedPassword,

            flatNo,
            block,
            residentType,

            role: role || "user",

            status:
                status !== undefined
                    ? status
                    : true
        })


        // ✅ remove password
        const newUser =
            await User.findById(user._id)
                .select("-password")


        res.status(201).json(newUser)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}



// ======================================================
// ✅ UPDATE USER / PROFILE
// ======================================================

exports.updateUser = async (req, res) => {

    try {

        // ✅ self OR admin
        if (

            req.user?.id !== req.params.id

            &&

            !["Admin", "Super Admin"]
                .includes(req.user?.role)

        ) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            })
        }


        // ✅ check user exists
        const existingUser =
            await User.findById(req.params.id)

        if (!existingUser) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }


        // ❌ prevent password update
        delete req.body.password


        // ❌ prevent role change by normal user
        if (
            req.user?.role !== "Admin" &&
            req.user?.role !== "Super Admin"
        ) {

            delete req.body.role
        }


        const updatedUser =
            await User.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true
                }

            ).select("-password")


        res.status(200).json(updatedUser)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}



// ======================================================
// ✅ CHANGE PASSWORD
// ======================================================

exports.changePassword = async (req, res) => {

    try {

        // ✅ only self
        if (req.user?.id !== req.params.id) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            })
        }


        const {
            oldPassword,
            newPassword
        } = req.body


        if (!oldPassword || !newPassword) {

            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }


        const user =
            await User.findById(req.params.id)

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }


        // ✅ compare old password
        const isMatch =
            await bcrypt.compare(
                oldPassword,
                user.password
            )

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Incorrect current password"
            })
        }


        // ✅ hash new password
        const hashedPassword =
            await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword

        await user.save()


        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}



// ======================================================
// ✅ DELETE USER
// ======================================================

exports.deleteUser = async (req, res) => {

    try {

        // ✅ admin only
        if (
            !["Admin", "Super Admin"]
                .includes(req.user?.role)
        ) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            })
        }


        const user =
            await User.findById(req.params.id)

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }


        // ❌ prevent Super Admin delete
        if (user.role === "Super Admin") {

            return res.status(403).json({
                success: false,
                message: "Super Admin cannot be deleted"
            })
        }


        await User.findByIdAndDelete(
            req.params.id
        )


        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}