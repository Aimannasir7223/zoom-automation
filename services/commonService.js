const axios = require('axios');
require('dotenv').config();

const getAccessToken = async () => {
    try {
        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'account_credentials',
                account_id: process.env.ZOOM_ACCOUNT_ID
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
};
// Function to generate the signature for Zoom Web SDK
const generateSignature= async (meetingNumber) =>{
    const KJUR = require('jsrsasign');
    const iat = Math.floor(Date.now() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;
    const oHeader = { alg: 'HS256', typ: 'JWT' };
    const oPayload = {
        sdkKey: process.env.ZOOM_CLIENT_ID,
        mn: meetingNumber,
        role: 1,
        iat: iat,
        exp: exp,
        appKey: process.env.ZOOM_CLIENT_ID,
        tokenExp: iat + 60 * 60 * 2
    };
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    
    // Ensure you use the correct secret key (e.g., ZOOM_CLIENT_SECRET) for signing the JWT
    return KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_CLIENT_SECRET);
}

const getParticipantsList= async (meetingId)=>{
    const accessToken = await getAccessToken();
    return await axios.get(`${process.env.ZOOM_API_URL}/metrics/meetings/${meetingId}/participants`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
}
const getWebinarParticipantsList= async (webinarId)=>{
    const accessToken = await getAccessToken();
    return await axios.get(`${process.env.ZOOM_API_URL}/metrics/webinars/${webinarId}/participants`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
}


module.exports={
    generateSignature,
    getAccessToken,
    getParticipantsList,
    getWebinarParticipantsList
}