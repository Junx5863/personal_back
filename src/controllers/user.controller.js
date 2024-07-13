

const { httpError, httpSend } = require("#H/httpResponses");


const userSchema = require("#M/user.model");

exports.createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new userSchema({ name, email, age });
    await user.save();
    res.send({
      message: "User created",
    });
  } catch (error) {
    res.status(400).send({
      error: "Error creating user",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userSchema.find();
    res.send(users);
  } catch (error) {
    res.status(400).send({
      error: "Error getting users",
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findById(id);
    if (!user) {
      res.status(404).send({
        error: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    res.status(400).send({
      error: "Error getting user",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const userExist = await userSchema.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    if (!userExist) {
      res.status(404).send({
        error: "User not found",
      });
    }
    res.send({
      message: "User updated",
    });
    res.json(userExist);
  } catch (error) {
    res.status(400).send({
      error: "Error updating user",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send({
        error: "User not found",
      });
    }
    res.send({
      message: "User deleted",
    });
  } catch (error) {
    res.status(400).send({
      error: "Error deleting user",
    });
  }
};
