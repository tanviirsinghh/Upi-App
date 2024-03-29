const express = require("express");
const zod = require("zod");
const { Account, User } = require("../db");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");
const jwt = require("jsonwebtoken");
const router = express.Router();

const signupSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
router.post("/signup", async function (req, res) {
  // here safe parse is returning us an object that we are storing in the {success}
  // there is a another alternative to this also
  // we can write like this also
  // const obj = signupSchema.safeParse(body);
  // if(obj.success){
  // then do the computation you want
  // }
  const { success } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;

  //Account created

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    messsage: "User created successfully",
    token: token,
  });
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async function (req, res) {
  // safeParse return you an object that why we are covering success
  // variable in the curly braces
  // if you don't want to do this then you can do this also
  // const obj = signinSchema.safeParse(req.body)
  // if(obj.success){
  // then do something

  const { success } = signinSchema.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Error while logging in",
    });
  }
  const user = User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
  }

  return;
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastNamea: zod.string().optional(),
});

router.put("/", authMiddleware, async function (req, res) {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Error while updating",
    });
  }

  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async function (req, res) {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          "$regex": filter
        }
      },
      {
        lastName: {
          "$regex": filter
        },
      },
    ],
});

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
