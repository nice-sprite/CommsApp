class CommissionClass
{
    
    constructor(title, description, cost, for_who, finished, date_added)
    {
        this.title = title;
        this.description = description;
        this.cost = cost;
        this.for_who = for_who;
        this.finished = finished;
        this.date_added = date_added || new Date;
    }

    
}

module.exports = {
    CommissionClass,  
} 