const todoModel = require("../module/todoSchema");

const todoController = {
  getTodo: (req, res) => {
    todoModel.find({}, (err, data) => {
      if (err) {
        res.json({
          message: `Server error: ${err}`,
          status: false,
        });
      } else {
        res.json({
          message: `Successfully recive data`,
          data: data,
          status: true,
        });
      }
    });
  },
  createTodo: (req, res) => {
    const { todo } = req.body;

    if (!todo) {
      res.json({
        message: "All field are required",
        status: false,
      });

      return;
    }

    const objToSend = {
      todo: todo,
    };

    todoModel.create(objToSend, (err, data) => {
      if (err) {
        res.json({
          message: `Server error: ${err}`,
          status: false,
        });
      } else {
        res.json({
          message: "Successfully created data",
          status: true,
        });
      }
    });
  },
  updateTodo: (req, res) => {
    const data = req.body;
    if (!data) {
      res.json({
        message: "All feild are required",
        status: false,
      });
      return;
    }

    const objToSend = {
      todo: data.todo,
    };

    todoModel.findByIdAndUpdate(data.id, objToSend, (err, data) => {
      if (err) {
        res.json({
          message: `Internal Server Error: ${err}`,
          status: false,
        });
      } else {
        res.json({
          message: "Successfully update data",
          status: true,
        });
      }
    });
  },
  deleteTodo: (req, res) => {
    let { id } = req.params;
    if (!id) {
      res.json({
        message: "Id is not recive",
        status: false,
      });
    } else {
      todoModel.findByIdAndDelete(id, (err, data) => {
        if (err) {
          res.json({
            message: `Internal Server error: ${err}`,
            status: false,
          });
        } else {
          res.json({
            message: "Successfully delete",
            status: true,
          });
        }
      });
    }
  },
};

module.exports = todoController;
