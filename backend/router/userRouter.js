const express = require("express");
const authMiddleWare = require("../middlewares/authMiddleware");
const zod = require("zod");
const {User, Account} = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const router = express.Router();

// Schema for signup validation
const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

// Signup route
router.post("/signup", async (req, res) => {
    console.log("Inside signup")
    const body = req.body;
    const validation = signupSchema.safeParse(body);
    
    if (!validation.success) {
        return res.json({
            message: "Incorrect Input"
        });
    }

    const existingUser = await User.findOne({ username: body.username });

    if (existingUser) {
        return res.json({
            message: "Email Already Exists."
        });
    }

    const dbUser = await User.create(body);

    // Correcting the reference to dbUser._id
    await Account.create({
        userId: dbUser._id,
        balance: 1 + Math.random() * 1000
    });

    const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);

    res.json({
        message: "User created",
        token: token
    });
});

// Schema for signin validation
const signinSchema = zod.object({
    email: zod.string(),
    password: zod.string()
});

// Signin route
router.post("/signin", async (req, res) => {
    // console.log("signin")
    const body = req.body;
    const validation = signinSchema.safeParse(body);

    // console.log(validation);

    if (!validation.success) {
        return res.json({
            message: "Incorrect Input"
        });
    }

    const user = await User.findOne({
        username: body.email,
        password: body.password
    });

    // console.log(user);

    if (!user) {
        return res.json({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    // console.log(token)

    res.json({
        message: "Signin successful",
        token: token
    });
});

// Bulk route for fetching users with regex filter
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } },
            { lastName: { "$regex": filter, "$options": "i" } }
        ]
    });

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

// Schema for updating user info
const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

// Update route with authentication middleware
router.put("/update", authMiddleWare, async (req, res) => {
    const validation = updateBody.safeParse(req.body);

    if (!validation.success) {
        return res.status(411).json({
            message: "Incorrect Input"
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated successfully"
    });
});

router.post("/me", authMiddleWare, (req, res) => {
    return res.status(200).json({
        valid : true
    });
})

module.exports = router;
