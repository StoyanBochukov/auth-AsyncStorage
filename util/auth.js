import axios from "axios"

const API_KEY = 'AIzaSyBB7KbXiJD1zmhDb1pLkVztPZhLEVUdRsA';

export const authenticate = async(mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    const { data } = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
    });
    // console.log(data);
    const token = data.idToken;
    return token
}

export const createUser = async(email, password) => {
   const token = await authenticate('signUp', email, password);
    return token
}

export const loginUser = async(email, password) => {
   const token = await authenticate('signInWithPassword', email, password)
   return token
}