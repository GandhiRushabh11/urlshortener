const express = require("express");
const router = express.Router();
const url = require('../model/url')
const { protect } = require('../middleware/auth')
const { handleCreateuser, handleLoginUser } = require('../controllers/users')
router.get("/", (req, res) => {
    res.render("index")
})
router.get("/login", (req, res) => {
    res.render("login")
})
router.get("/singup", (req, res) => {
    res.render("singup")
}).post("/singup", handleCreateuser)

router.get("/yoururl", protect, async (req, res) => {
    const allurls = await url.find({ createdBy: req.user })
    res.render("index", { urls: allurls })
})
router.post('/login', handleLoginUser)


module.exports = router