const express = require("express");
const {protect} = require("../middleware/authMiddleware"); // Ensure this path is correct
const { accessChat } = require("../controllers/chatControllers"); // Ensure this path is correct
const { fetchChat } = require("../controllers/chatControllers"); // Ensure this path is correct
const { createGroupChat, renameGroup, removeFromGroup, addToGroup } = require("../controllers/chatControllers"); 
const router = express.Router();

router.route('/').post(protect,accessChat);
router.route('/').get(protect, fetchChat);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
router.route('/groupadd').put(protect, addToGroup);
router.route('/groupremove').put(protect, removeFromGroup);


module.exports = router;
