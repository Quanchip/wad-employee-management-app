import Department from "../models/Department.js";
//GET to READ
const getDepartments = async(req,res) => {
   try {
      const departments = await Department.find()
      return res.status(200).json({success:true, departments})
   } catch (error) {
      return res.status(500).json({success:false, error:"Error"})
   }
}





//POST to CREATE
const addDepartment = async (req,res) => {
 try {
    const {dep_name, description} = req.body;
    const newDepartment = new Department({
        dep_name,
        description
    })
    await newDepartment.save()
    return  res.status(200).json({success:true, department:newDepartment})
 } catch (error) {
    return res.status(500).json({success: false, error :" add department server error"})
 }
}

//GET to READ
const getDepartment = async(req,res) => {
   try {
      const {id} = req.params
      const department = await Department.findById({_id:id})
      return res.status(200).json({success:true, department})
   } catch (error) {
      return res.status(500).json({success:false, error:"Error"})
   }
}



const updateDepartment = async(req,res) => {
   try {
      const {id} = req.params
      const {dep_name, description} = req.body
      
      const updateDep = await Department.findByIdAndUpdate({_id:id}, {
         dep_name,
         description  
      })
      return res.status(200).json({success:true, updateDep})
   } catch (error) {
      return res.status(500).json({success:false, error:"Error edit"})
   }
}

const deleteDepartment =async (req,res) => {
   try {
      const {id} = req.params
      const deletedep = await Department.findByIdAndDelete({_id:id})
      return res.status(200).json({success:true, deletedep})
   } catch (error) {
      return res.status(500).json({success:false, error:"Error edit"})
   }
}


export {addDepartment, getDepartments,getDepartment,updateDepartment, deleteDepartment}