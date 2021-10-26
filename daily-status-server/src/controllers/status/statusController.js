import Status from "../../models/statusModel"


export const addStatus = async (req,res) => {
    try{
        const status = new Status({
            employeeID: req.body.employeeID,
            date:req.body.date,
            isPto:req.body.isPto,
            taskDescription:req.body.taskDescription,
            workedHours:req.body.workedHours,
            extraHours:req.body.extraHours,
            blockersOrComments:req.body.blockersOrComments,
            pairProgrammers: req.body.pairProgrammers
        })
        const createStatus = await status.save()
    if (!createStatus) return res.status(500).send('Internal Server Error')
    return res.send({
      message: 'Status has been added successfully!'
    })
    }
    catch (error) {
        return res.status(500).send('Internal Server Error.')
      }
}

export const displayStatus = async(req,res) => {
    try {
        const status = await Status.find({
         
          employeeID: req.params.empId
          
        }).sort({
          date: -1
        })
        if (status.length <= 0) { 
          return res.json([])
       }
        return res.send(status)
      } catch (error) {
    
        res.status(500).send('Internal Server Error.')
      }
}