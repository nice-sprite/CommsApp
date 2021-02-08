let uuidv4  = require('./uuidv4').default;
class CommissionClass
{

    constructor(title, description, cost, for_who, finished, date_added, commission_id)
    {
        this.title = title;
        this.description = description;

        try
        {
            this.cost = Number(cost)
            this.cost.toFixed(2);
        } catch (e)
        {
            console.log(e, "CommissionClass: cost is not convertable to number");
        }
        this.cost = cost;
        this.for_who = for_who;
        this.finished = finished;
        
        // loading from file (most likely), so attempt to parse the date string
        if (typeof date_added == "string")
        {
            this.date_added = new Date(Date.parse(date_added));
            
        }
        else
        {
            // take it as it is, and warn if its not a date object
            this.date_added = date_added;     
            if(typeof date_added != 'object')
                console.log("warning: CommissionClass date_added param in constructor is not an object")
        }

        if (commission_id)
        {
            this.commission_id = commission_id;
        } else
        {
            this.commission_id = uuidv4();
        }
    }


}

module.exports = {
    CommissionClass,
} 