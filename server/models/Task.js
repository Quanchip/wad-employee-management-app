import mongoose from "mongoose";
const { Schema } = mongoose;
const taskSchema = new mongoose.Schema({
    task_name: { type: String, required: true },
    employeeId: {type: Schema.Types.ObjectId, ref:"Employee", default: null},
    description: { type: String },
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    returnAt: {type:Date, default: null}
});



const Task = mongoose.model("Task", taskSchema);

export default Task;
