module.exports = isInList;

function isInList(list,task) {
    // Checks if to-do item was already added to the list
    
    if (list.includes(task)) {
        return true;
    } else return false;
}