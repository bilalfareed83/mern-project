const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

//@desc Get goal
//@route Get /api/goals
//@access Private
const getGoals = async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
};

//@desc Create goal
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add some text in text field");
  }
  const goal = await Goal.create({
    user: req.user.id,
    text: req.body.text,
  });
  res.status(200).json(goal);
});

//@desc Update goal
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not find");
  }

  // Check for user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Check user can authenticate for goal update
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authenticate");
  }

  const updatedGoal = await Goal.findOneAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not find");
  }

  // Check for user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Check user can authenticate for goal update
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authenticate");
  }

  await goal.remove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
