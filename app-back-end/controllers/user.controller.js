const express = require("express");
const userModel = require('../model/user.model')

const createUsers = (req, res) => {
    let user = userModel(req.body);
    let result = user.save();
    res.send(result)
}

module.exports = { createUsers };