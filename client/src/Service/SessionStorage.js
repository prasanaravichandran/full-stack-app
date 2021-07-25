/**
 * Service file to store and retrive data in session storage.
 */

// Get the data from session storage
function GetSessionData (key) {
    return sessionStorage.getItem(key);
}

// Remove the data from session storage
function RemoveSessionData (key) {
    return sessionStorage.removeItem(key);
}

// Set the data from session storage
function SetSessionData (key, value) {
    sessionStorage.setItem(key, value);
    return 'Data Stored';
}

export { GetSessionData ,RemoveSessionData, SetSessionData };