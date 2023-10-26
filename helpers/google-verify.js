// const { OAuth2Client } = require('google-auth-library');

// const client = new OAuth2Client( process.env.GOOGLE_CLIENTE_ID );
// console.log(client)

// async function googleVerify( token = '' ) {

//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.GOOGLE_CLIENTE_ID
//     });

//     const { given_name, family_name, picture, email } = ticket.getPayload();
        
//     return {
//         name: given_name,
//         lastname: family_name,
//         email,
//         image: picture
//     }
  
// }

// obtener google token - provisional
function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

async function googleVerify( token = '' ) {
    
    const ticket = {
        getPayload: () => parseJwt(token) 
    }
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