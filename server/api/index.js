const apirouter = require("express").Router();

const enrollRouter = require("./routes/enroll")
const handoutRouter = require("./routes/handout")
const packageRouter = require("./routes/package")
const sessionRouter = require("./routes/session")
const tutorRouter = require("./routes/tutor")
const adminRouter = require("./routes/admin")
const studentRouter = require("./routes/student")


apirouter.use('/', enrollRouter)
apirouter.use('/', handoutRouter)
apirouter.use('/', packageRouter)
apirouter.use('/', sessionRouter)
apirouter.use('/', tutorRouter)
apirouter.use('/', adminRouter)
apirouter.use('/', studentRouter)



module.exports = apirouter
