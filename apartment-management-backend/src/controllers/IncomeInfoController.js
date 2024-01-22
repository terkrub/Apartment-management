const { addIncomeInfo, getIncomeInfo } = require("../services/incomeService")

const addIncomeController = async (req,res) =>{
    if(req.body.title === "roomIncome"){
        const incomeInfo = await getIncomeInfo(req.body.listName,new Date())
        if(incomeInfo.length === 0){
            await addIncomeInfo(req.body.listName, req.body.finalBill, req.body.totalIncome)
        }
        else{
            console.log(incomeInfo)
        }
    }
    
    
}

module.exports = {addIncomeController}