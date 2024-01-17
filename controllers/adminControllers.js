const COURT = require('../Modals/courtSchema')
const COURT_SCHEDULES=require('../Modals/courtSchedules')

const addCourtData = async (req, res) => {
  //console.log("addCourt")
  try {

    await COURT({
      courtName: req.query.courtName,
      location: req.query.location,
      address: req.query.address,
      type: req.query.type,
      courtPicture: req.file.filename
    }).save()
    res.status(200).json('court registration successfull')
  } catch (error) {
    res.status(500).json('court registration failed')
    //console.log(error)
  }
}
const addTimeSlotData = (req, res) => {
  //console.log(req.body, "")
  const { startDate, endDate, cost, selectedTimings, courtId } = req.body
  //console.log(startDate, endDate, cost, selectedTimings, courtId);
  let currentDate = new Date(startDate)
  const lastDate = new Date(endDate)
  const slotObjects= []

  while (currentDate <= lastDate) {
    for (let data of selectedTimings) {
      //console.log(currentDate);
      slotObjects.push({
        date: JSON.parse(JSON.stringify(currentDate)),
        slot: {
          name: data.name,
          id: data.id
        },
        cost,
        courtId
      })
    }
    currentDate.setDate(currentDate.getDate()+1)//for tommorrow date 
  }
  COURT_SCHEDULES.insertMany(slotObjects).then((resp)=>{
    res.status(200).json({message:"court time slots created successfully"})
  })
  console.log(slotObjects,'slots')
}
const updateEditedCD=(req,res)=>{
  console.log(req.body);
  COURT.updateOne({_id:req.body._id},{$set:{courtName:req.body.courtName,location:req.body.location,address:req.body.address,type:req.body.type}}).then((response)=>{
    res.status(200).json({response})
  })

}
module.exports = { addCourtData, addTimeSlotData ,updateEditedCD}
