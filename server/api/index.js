const apirouter = require("express").Router();

const enrollRouter = require("./routes/enroll")
const handoutRouter = require("./routes/handout")
const packageRouter = require("./routes/package")
const sessionRouter = require("./routes/session")
const tutorRouter = require("./routes/tutor")
const adminRouter = require("./routes/admin")
const studentRouter = require("./routes/student")

apirouter.use('/enroll', enrollRouter)
apirouter.use('/handout', handoutRouter)
apirouter.use('/package', packageRouter)
apirouter.use('/session', sessionRouter)
apirouter.use('/tutor', tutorRouter)
apirouter.use('/admin', adminRouter)
apirouter.use('/student', studentRouter)



module.exports = apirouter
