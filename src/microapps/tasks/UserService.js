const API_URL = "http://localhost:3232/auth/users";

//console.log("JWT token in UserService",localStorage.getItem('jwt'));
const fetchOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
  };

  export const getLoggedInUserDetails = async (username) => {
    const response = await fetch(`${API_URL}/${username}`, {...fetchOptions, method: "GET"});
    //console.log("UserService.js", response);
    if(!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    return response.json();
  };

  export const fetchAllUsers = async () => {
    try {
        const response = await fetch(`${API_URL}`,{...fetchOptions, method: "GET"});
        //console.log("UserService.js::fetchAllUsers Response Object:- ", response);
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        const usersData = await response.json(); // Parse the response as JSON
        //console.log("UserService.js::fetchAllUsers Data:- ", usersData);
        return usersData; // Return the parsed user data
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};