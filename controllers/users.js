const user = require('../model/users')

const handleCreateuser = async (req, res) => {
    const { firstName, lastName, email, password, gender } = req.body;

    if (!firstName || !lastName || !email || !password || !gender) return res.redirect('/signup')
    const users = await user.create({
        firstName, lastName, email, password, gender
    })

    SendTokenToReponse(users, res, 201, "/yoururl")
}

const handleLoginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.redirect('/login')
    }
    const users = await user.findOne({ email: email })
    if (!users) res.status(400).json("User Not Found");
    if (!users.matchPassword(password)) return res.status(400).json("PassWord Not Matched");
    SendTokenToReponse(users, res, 201, "/yoururl")
}
const SendTokenToReponse = async (users, res, statuscode, arearedirect) => {
    const jwttoken = users.getSignedJwtToken();

    res.status(statuscode)
        .cookie('token', jwttoken)
        .redirect(arearedirect)

}

module.exports = { handleCreateuser, SendTokenToReponse, handleLoginUser }