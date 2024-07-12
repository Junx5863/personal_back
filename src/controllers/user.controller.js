import { Router } from "express";

import userSchema from "../models/user.model.js";

class UserController {

  
    createUser = async (req, res) => {
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
      
      getUsers = async (req, res) => {
        try {
          const users = await userSchema.find();
          res.send(users);
        } catch (error) {
          res.status(400).send({
            error: "Error getting users",
          });
        }
      };
      
      getById = async (req, res) => {
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
      
      updateUser = async (req, res) => {
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
      
      deleteUser = async (req, res) => {
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
}
 
export default new UserController(); 
