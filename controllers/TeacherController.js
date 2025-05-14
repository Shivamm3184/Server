const TeacherModel = require("../models/teacher")
const bcrypt = require('bcrypt')

class TeacherController {

  static teacherInsert = async (req, res) => {
    try {
      // console.log(req.body);
      const { name, email, phone, domain, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);

      const result = await TeacherModel.create({
        name,
        email,
        phone,
        domain,
        password: hashPassword,
      });
      return res.status(201).json({
        message: "Data Inserted Successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static teacherDisplay = async (req, res) => {
    try {
      const teacher = await TeacherModel.find();
      return res.status(200).json({
        success: true,
        message: "Data Displayed Successfully",
        teacher,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static teacherView = async (req, res) => {
    try {
      const id = req.params.id;
      const teacher = await TeacherModel.findById(id);
      return res.status(200).json({
        success: true,
        message: "Data Displayed Successfully",
        teacher,
      });
    } catch (error) {
      console.log(error);
    }
  };
  


}

module.exports = TeacherController