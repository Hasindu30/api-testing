const mongoose = require ('mongoose')


const goalSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:'User'
    },
    text:{
        type:String,
        require: [true,'please add a text value']
    }
},{
    timestamps: true
}
)


module.exports = mongoose.model('Goal',goalSchema)