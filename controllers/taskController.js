const taskSchema = require("../models/taskSchema")

const createTask = async (req, res) => {
    const {title, description, deadline, status, image, assignedPerson} = req.body
    try {
        
        const loggedinUserId = req.user.id

        if(title.length > 30){
            res.status(401).json({
                success: false,
                message: "Task title max length is 30"
            })
        }

        const task = await taskSchema.create({
            title,
            description,
            deadline,
            status,
            image, 
            assignedPerson,
            creator: loggedinUserId
        })

        res.status(200).json({
            success: true,
            messaeg: "Task created Successfully",
            data: task
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            messaeg: "Task created faild"
        })
    }
}
const getTask = async (req, res) => {
    const task = await taskSchema.find({})
    
    res.status(200).json({
        success: true,
        message: "task Get successfully",
        data: task,
        length: task.length
    })
}

module.exports = {
    createTask,
    getTask
}