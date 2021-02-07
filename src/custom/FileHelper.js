const FileSystem = require("tns-core-modules/file-system");
const { CommissionClass } = require('./CommissionClass.js')

// returns Promise<CommissionClass[]>

function GetCommissionFileEntity()
{
    let documents = FileSystem.knownFolders.documents();
    let commissionsFolder = documents.getFolder('commissions');
    let commissionFile = commissionsFolder.getFile('commissions.json');
    return commissionFile;
}


async function LoadCommissionsFromFile()
{
    let commissionFile = GetCommissionFileEntity();

    let commissionPlain = await commissionFile.readText();
    let commsArray = [];
    try
    {
        commissionPlain = JSON.parse(commissionPlain);
        
        Object.keys(commissionPlain).forEach(key =>
        {
            let { title, description, cost, for_who, finished, date_added, commission_id } = commissionPlain[key];
            commsArray.push(new CommissionClass(title, description, cost, for_who, finished, date_added, commission_id));
        });

    } catch (e)
    {
        console.log(e);
    }


    // console.log(" FOLDERS:", commissionFile);
    return new Promise((resolve, reject) => resolve(commsArray));
}

async function AppendCommissionToFile(commission)
{
    // nativescript does not provide a way to append a file
    // read, append, write method is only immediate option
    const file = GetCommissionFileEntity();
    let currentContents = await file.readText();
    currentContents = JSON.parse(currentContents);
    currentContents.push(commission);
    return file.writeText(JSON.stringify(currentContents));
}

// function DeleteCommissionInFile(commission_uuid)
// {

// }

async function ResetCommissionFile()
{
    return GetCommissionFileEntity().writeText('[]');
}

async function WriteTestData()
{
    let testData = [];
    let randStr = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    for (let i = 0; i < 20; i++)
    {
        testData.push(new CommissionClass(randStr(), randStr(), Math.random()*50, randStr(), Math.random() > .5, new Date, randStr()))    
    }

    let file = GetCommissionFileEntity();
    return file.writeText(JSON.stringify(testData));
}


module.exports = {
    LoadCommissionsFromFile,
    AppendCommissionToFile,
    ResetCommissionFile,
    WriteTestData,
}