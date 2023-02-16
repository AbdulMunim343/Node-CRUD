const express = require("express");
const userModel = require('../model/user.model')
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")


const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addUsers = async (req, res) => {
  const { first_name, last_name, username, password } = req.body;

  if (!first_name || !last_name || !username || !password) {
    res.status(400)
    throw new Error("Add all fields")
  }

  ///if check user exist
  const userExist = await userModel.findOne({ username });
  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const NewUser = await userModel.create({ first_name, last_name, username, password: hashPassword });
  if (NewUser) {
    res.status(201).json({
      _id:NewUser.id,
      first_name:NewUser.first_name, 
      last_name:NewUser.last_name,
      username:NewUser.username, 
    });
  } else {
    res.status(400)
    throw new Error("Invalid User Data")
  }

};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userById = await userModel.findById(id);

    res.status(200).json(userById);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const ModifyUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, username, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`post ${id} not found`);

  const updatedUser = { first_name, last_name, username, password, _id: id };
  await userModel.findByIdAndUpdate(id, updatedUser, { new: true });
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`User ${id} not found`);

  await userModel.findByIdAndRemove(id);

  res.json({ message: "Successfully deleted" });
};

module.exports = { addUsers, getAllUsers, getUserById, deleteUser, ModifyUser };