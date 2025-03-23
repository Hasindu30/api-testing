// @desc Get goals 
// @route Get/api/goals
// @access Private 

const getGoals = (req,res) =>{
    res.status(200).json({message:'Get goals'})
} 

// @desc Set goals 
// @route POST/api/goals
// @access Private 

const setGoal = (req,res) =>{
    res.status(200).json({message:'set goals'})
} 

// @desc update goals 
// @route PUT/api/goals/:id
// @access Private 

const updateGoal = (req,res) =>{
    res.status(200).json({message:`update goals ${req.params.id}`})
} 

// @desc Delete goals 
// @route DELETE/api/goals/:id
// @access Private 

const deleteGoal = (req,res) =>{
    res.status(200).json({message:`delete goals ${req.params.id}`})
} 


module.exports ={
    getGoals,
    updateGoal,
    deleteGoal,
    setGoal,
    
}