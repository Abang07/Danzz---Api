/**
 *   INSTAGRAM STALKER (API Handler Structure)
 *
 *   [•] AUTHOR    :: DEFAN
 *   [•] WEB       :: soonex.biz.id
 *   [•] DESCRIPTION :: Stalk Instagram profile info using username
 *   [•] BASE      :: Supabase Edge Function
 */

const axios = require('axios');

const BASE_URL = 'https://fukqyugetzepsaanzqcy.supabase.co';
// PERHATIAN: Masukkan ANON_KEY kamu yang utuh di bawah ini
const ANON_KEY = 'YOUR_FULL_ANON_KEY_HERE'; 

const headers = {
    'Authorization': 'Bearer ' + ANON_KEY,
    'apikey': ANON_KEY,
    'Content-Type': 'application/json'
};

// Fungsi helper untuk mengambil data (Setara dengan getDetails di kode sebelumnya)
async function getInstagramProfile(username) {
    try {
        const url = `${BASE_URL}/functions/v1/mediafy-proxy?endpoint=info&username=${username}`;
        const { data } = await axios.get(url, { headers });
        
        const u = data.data;
        if (!u) return null;

        return {
            username: u.username,
            full_name: u.full_name,
            bio: u.biography,
            stats: {
                followers: u.follower_count,
                following: u.following_count,
                posts: u.media_count
            },
            profile_pic: u.hd_profile_pic_url_info ? u.hd_profile_pic_url_info.url : u.profile_pic_url,
            is_private: u.is_private,
            is_verified: u.is_verified,
            external_url: u.external_url
        };
    } catch (error) {
        throw error;
    }
}

// Fungsi utama API Handler
async function handler(req, res) {
    const { username } = req.query;

    // Validasi input parameter
    if (!username) {
        return res.status(400).json({
            status: false,
            message: 'Query ?username= wajib diisi',
            example: '/api/tools/igstalk?username=instagram'
        });
    }

    try {
        const result = await getInstagramProfile(username);

        // Jika user tidak ditemukan
        if (!result) {
            return res.status(404).json({
                status: false,
                message: 'Profile Instagram tidak ditemukan'
            });
        }

        // Response sukses
        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: result
        });

    } catch (err) {
        // Response error
        return res.status(500).json({ 
            status: false, 
            message: err.response?.data?.message || err.message || 'Internal Server Error' 
        });
    }
}

module.exports = { handler };
