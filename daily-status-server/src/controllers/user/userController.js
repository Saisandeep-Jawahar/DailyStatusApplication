import User from '../../models/userModel'

/*******************************************************
*****  Function Name: Create User
*****  Desc: To create an user based on their employeeId
********************************************************/
export const createUser = async (req, res) => {
  try {
    const user = new User({
      employeeID: req.body.employeeID,
      employeeName: req.body.employeeName,
      team: req.body.team,
      password: req.body.password,
      emailId: req.body.emailId,
      project: req.body.project,
      hasAdminRights: req.body.hasAdminRights,
    })

    //Check if user already exists
    const isUserAlreadyExists = await User.find({
      employeeID: req.body.employeeID
    })
    console.log('isUserAlreadyExists',  isUserAlreadyExists)
    if (isUserAlreadyExists && isUserAlreadyExists.length > 0) return res.json({
      message: 'User already Exists!'
    })

    // Create a new user
    await user.save()
    res.json({
      message: 'User has been created successfully'
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).send('Internal Server Error.')
  }
}

/*******************************************************
*****  Function Name: Login User
*****  Desc: To login an user based on their employeeId
********************************************************/
export const loginUser = async (req, res) => {
  try {
    const response = await User.find({
      employeeID: req.body.employeeID
    })
    if (response.length) {
      if (response[0].password === req.body.password) {
        res.json({
          employeeID: response[0].employeeID,
          message: 'Logged in successfully'
        })
      } else {
        res.json({
          message: 'Incorrect Password'
        })
      }
    } else {
      res.json({
        message: 'Not a Valid User'
      })
    }
  } catch (error) {
    res.status(500).send('Internal Server Error.')
  }
}