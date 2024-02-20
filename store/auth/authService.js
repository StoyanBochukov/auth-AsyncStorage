import axios from "axios";
const API_KEY = 'AIzaSyBB7KbXiJD1zmhDb1pLkVztPZhLEVUdRsA';

const authenticate = async(mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    const { data } = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
    });
    console.log(data);
    return data;
}


export const createUser = async(email, password) => {
    await authenticate('signUp', email, password)
}

export const loginUser = async(email, password) => {
    await authenticate('signInWithPassword', email, password)
}