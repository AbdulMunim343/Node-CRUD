const express = require("express");
const userModel = require('../model/user.model')
const mongoose = require("mongoose");


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
  const createNewUser = new userModel({ first_name, last_name, username, password });

  try {
    await createNewUser.save();
    res.status(201).json(createNewUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
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