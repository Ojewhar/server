const Person = require("../models/PersonSchema");

const addPersonInfo = async (req, res) => {
  try {
    let person = await Person.findOne({ email: req.body.email });

    if (!person) {
      person = new Person(req.body);
      await person.save();
      res.status(200).json({ message: "Person created successfully" });
    } else {
      person.formInfo.push({
        id: req.body.formInfo.id,
        formName: req.body.formInfo.formName,
      });
      await person.save();
      res.status(200).json({ message: "Form data added successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all user data
const getAllPersonsInfo = async (req, res) => {
  try {
    const allPersons = await Person.find();
    res.status(200).json(allPersons);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addPersonInfo, getAllPersonsInfo };
