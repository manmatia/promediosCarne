const { Router } = require('express');
const promedioRouter = require("./promedioRoute")
const categoryRouter = require("./categoryRoute")
const usersRouter = require('./userRoute');
const router = Router();

router.use("/", promedioRouter);
router.use("/category", categoryRouter);
router.use("/users", usersRouter);

module.exports = router;