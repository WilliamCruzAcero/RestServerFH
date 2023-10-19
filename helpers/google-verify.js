const { OAuth2Client } = require('google-auth-library');

// const client = new OAuth2Client(process.env.GOOGLE_CLIENTE_ID);

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

async function googleVerify( token = '' ) {

    const ticket = {
        getPayload: () => parseJwt(token) 
    }
    
    // const ticket = await client.verifyIdToken({
    //     idToken: token,
    //     audience: process.env.GOOGLE_CLIENTE_ID,
    //     // Specify the CLIENT_ID of the app that accesses the backend
    //     // Or, if multiple clients access the backend:
    //     //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    // });
    
    const { given_name, family_name, picture, email } = ticket.getPayload();
        
    return {
        name: given_name,
        lastname: family_name,
        email,
        image: picture
    }

}

module.exports = {
    googleVerify
}