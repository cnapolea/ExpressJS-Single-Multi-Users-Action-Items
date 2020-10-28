
module.exports = {day:getDate};

function getDate(){
    // Creates and formats date object
    let date = new Date(),
    
    dateOpts = {
        weekday: 'long',  
        day: 'numeric',
        month: 'long', 
    },

    formatDate = date.toLocaleDateString('en-US', dateOpts);

    return formatDate;
}
