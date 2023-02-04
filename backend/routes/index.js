const express = require("express");
const router = express.Router();
const todoController = require("../controller/todo");
// Todo Api
// ========
// get api method

router.get("/api/todo", todoController.getTodo);
// post api method
router.post("/api/todo", todoController.createTodo);
// put api method
router.put("/api/todo", todoController.updateTodo);
// delete api method
router.delete("/api/todo/:id", todoController.deleteTodo);

module.exports = router;
