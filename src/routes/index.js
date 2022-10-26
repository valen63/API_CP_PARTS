const { Router } = require("express");
const router = Router();

const {getAll} = require("../controllers/controllerAuth.js");

router.get("/All", getAll);

module.exports = router;