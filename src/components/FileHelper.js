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
        // console.log("COMMISSIONPLAIN", typeof commissionPlain)


        commsArray = [];
        Object.keys(commissionPlain).forEach(key =>
        {
            let { title, description, cost, for_who, finished, date_added } = commissionPlain[key];
            commsArray.push(new CommissionClass(title, description, cost, for_who, finished, date_added));
        });
        // console.log("COMMS ARRAY", commsArray);


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


module.exports = {
    LoadCommissionsFromFile,
    AppendCommissionToFile
}