const asyncHandler = require('express-async-handler')

const Goal = require ('../module/goalModel')

// @desc Get goals 
// @route Get/api/goals
// @access Private 

const getGoals = asyncHandler(async(req,res) =>{
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

// @desc Set goals 
// @route POST/api/goals
// @access Private 

const setGoal = asyncHandler(async (req,res) =>{
    if(!req.body.text) {
        res.status(400)
        throw new Error ('please add a text filed')
    }
    
    const goal =await Goal.create({
        text:req.body.text,
        user:req.user.id
    })

    res.status(200).json(goal)
})

// @desc update goals 
// @route PUT/api/goals/:id
// @access Private 

const updateGoal = asyncHandler(async (req,res) =>{

    const goal= await Goal.findById(req.params.id)

    if(!goal){
       res.status(400) 
       throw new console.error('goal not found');
       
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.
        body,{
            new:true,
        })
    res.status(200).json(updatedGoal)
})

// @desc Delete goals 
// @route DELETE/api/goals/:id
// @access Private 

const deleteGoal = asyncHandler(async (req,res) =>{
    res.status(200).json({message:`delete goals ${req.params.id}`})
})


module.exports ={
    getGoals,
    updateGoal,
    deleteGoal,
    setGoal,
    
}