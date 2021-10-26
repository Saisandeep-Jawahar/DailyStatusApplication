import Story from './../../models/storyModel'

/*********************************************************************** 
 ******  Function Name: Create Story
 ******  Desc: To create a stor(y)(ies) based on employeeId and TaskID
 **********************************************************************/
export const createStory = async (req, res) => {
  try {
   
    // Create a story Object
    const story = new Story({
      employeeID: req.body.employeeID,
      taskID: req.body.taskID,
      title: req.body.title,
      startDate: new Date(req.body.startDate),
      endDate: req.body.endDate ? new Date(req.body.endDate) : '',
      storyPoint: req.body.storyPoint,
      pairProgrammers: req.body.pairProgrammers,
      isOffshoreTester: req.body.isOffshoreTester,
      status: req.body.status,
      releaseVersion: req.body.releaseVersion,
    })
    
    // Check If Story already exits
    const isStoryAlreadyExists = await Story.find({
      employeeID: req.body.employeeID,
      taskID: req.body.taskID
    }).exec()
    if (isStoryAlreadyExists && isStoryAlreadyExists.length > 0) {
      return res.json({
        error: `${req.body.taskID} already exists!`
      })
    }

    //warn user if there are two or more duplicate stories
    const isStoryDuplicated = await Story.find({
      isOffshoreTester: req.body.isOffshoreTester,
      taskID: req.body.taskID
    }).exec()
    if (isStoryDuplicated && isStoryDuplicated.length > 0) {
      return res.json({
        error: `${req.body.taskID} has already been created by ${isStoryDuplicated[0].employeeID}!`
      })
    }

    // Insert story for multiple users based on pair programmers
    if (req.body.pairProgrammers && req.body.pairProgrammers.length > 0) {
      const programmers = [req.body.employeeID, ...req.body.pairProgrammers]
      await Promise.all(programmers.map(async employeeID => {
        const story = new Story({
          employeeID,
          taskID: req.body.taskID,
          title: req.body.title,
          startDate: new Date(req.body.startDate),
          endDate: req.body.endDate && new Date(req.body.endDate),
          storyPoint: req.body.storyPoint,
          pairProgrammers: programmers.filter(empId => empId !== employeeID),
          isOffshoreTester: req.body.isOffshoreTester,
          status: req.body.status,
          releaseVersion: req.body.releaseVersion,
        })
        await story.save()
      }))
      return res.json({
        message: 'Stories has been created successfully!'
      })
    }

    // Insert story for a single user
    const createStory = await story.save()
    if (!createStory) return res.status(500).send('Internal Server Error')
    return res.send({
      message: 'Story has been created successfully!'
    })

  } catch (error) {
    return res.status(500).send('Internal Server Error.')
  }
}

/******************************************************************************
 ******  Function Name: Get Story
 ******  Desc: To get a stor(y)(ies) based on employeeId, startDate and endDate
 *******************************************************************************/
export const getStory = async (req, res) => {

  try {
    const story = await Story.find({
     
      employeeID: req.params.empId
      
    }).sort({
      startDate: -1
    })
    if (story.length <= 0) { 
      return res.json([])
   }
    return res.send(story)
  } catch (error) {

    res.status(500).send('Internal Server Error.')
  }
}

/*******************************************************************************
  Function Name: Update Story
  Desc: To update a stor(y)(ies) based on employeeId and TaskID
 *******************************************************************************/
export const updateStory = async (req, res) => {
  try {

    // Create a story Object
    const story ={
      employeeID: req.body.employeeID,
      taskID: req.body.taskID,
      title: req.body.title,
      startDate: new Date(req.body.startDate),
      endDate: req.body.endDate && new Date(req.body.endDate),
      storyPoint: req.body.storyPoint,
      pairProgrammers: req.body.pairProgrammers,
      isOffshoreTester: req.body.isOffshoreTester,
      status: req.body.status,
      releaseVersion: req.body.releaseVersion,
    }

    // Update story for multiple users based on pair programmers
    if (req.body.pairProgrammers && req.body.pairProgrammers.length > 0) {
      const programmers = [req.body.employeeID, ...req.body.pairProgrammers]
      await Promise.all(programmers.map(async employeeID => {
        const story = {
          employeeID,
          taskID: req.body.taskID,
          title: req.body.title,
          startDate: new Date(req.body.startDate),
          endDate:req.body.endDate && new Date(req.body.endDate),
          storyPoint: req.body.storyPoint,
          pairProgrammers: programmers.filter(empId => empId !== employeeID),
          isOffshoreTester: req.body.isOffshoreTester,
          status: req.body.status,
          releaseVersion: req.body.releaseVersion,
        }

        // Check If Story already exits
        const isStoryAlreadyExists = await Story.findOneAndUpdate({
          employeeID: employeeID,
          taskID: req.body.taskID
        }, story).exec()
        if (!isStoryAlreadyExists) {
          const story = new Story({
            employeeID,
            taskID: req.body.taskID,
            title: req.body.title,
            startDate:new Date(req.body.startDate),
            endDate: req.body.endDate && new Date(req.body.endDate),
            storyPoint: req.body.storyPoint,
            pairProgrammers: programmers.filter(empId => empId !== employeeID),
            isOffshoreTester: req.body.isOffshoreTester,
            status: req.body.status,
            releaseVersion: req.body.releaseVersion,
          })
          await story.save()
          return res.json({
            message: 'Stor(y)(ies) has been updated successfully!'
          })
        }
      }))
      return res.json({
        message: 'Stories has been updated successfully!'
      })
    }

    // Check If Story already exits and update for an User
    const isStoryAlreadyExists = await Story.findOneAndUpdate({
      employeeID: req.body.employeeID,
      taskID: req.body.taskID
    }, story).exec()

    if (!isStoryAlreadyExists) {
      return res.json({
        error: 'No stor(y)(ies) found for the given user'
      })
    }
    return res.json({
      message: 'Story has been updated successfully!'
    })

  } catch (error) {
    return res.status(500).send('Internal Server Error.')
  }
}

/*******************************************************
*****  Function Name: Delete Story
*****  Desc: To delete a stor(y)(ies) based on employeeId
********************************************************/
export const deleteStory = async (req, res) => {
  try {

    // delete story for multiple users based on pair programmers
    if (req.body.pairProgrammers && req.body.pairProgrammers.length > 0) {
      const programmers = [req.body.employeeID, ...req.body.pairProgrammers]
      await Promise.all(programmers.map(async employeeID => {

        // Check If Story already exits
        const isStoryAlreadyExists = await Story.findOneAndDelete({
          employeeID: employeeID,
          taskID: req.body.taskID
        }).exec()
        if (!isStoryAlreadyExists) {
          return res.json({
            error: 'No stor(y)(ies) found for the given user'
          })
        }
      }))
      return res.json({
        message: 'Stories has been deleted successfully!'
      })
    }

    // Check If Story already exits and delete story for an user
    const isStoryAlreadyExists = await Story.findOneAndDelete({
      employeeID: req.body.employeeID,
      taskID: req.body.taskID
    }).exec()
    if (!isStoryAlreadyExists) {
      return res.json({
        error: 'No stor(y)(ies) found for the given user'
      })
    }
    return res.json({
      message: 'Story has been deleted successfully!'
    })

  } catch (error) {
    return res.status(500).send('Internal Server Error.')
  }

}