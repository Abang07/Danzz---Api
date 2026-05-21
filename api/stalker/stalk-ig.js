/**
 *   INSTAGRAM STALKER (API Handler Structure)
 *
 *   [•] AUTHOR    :: DEFAN (Modified for API Handler)
 *   [•] WEB       :: soonex.biz.id
 *   [•] DESCRIPTION :: Stalk Instagram profile info using username
 *   [•] BASE      :: Supabase Edge Function
 */

const axios = require('axios');

const BASE_URL = 'https://fukqyugetzepsaanzqcy.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1a3F5dWdldHplcHNhYW56cWN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMTkxODMsImV4cCI6MjA2NTY5NTE4M30.RmRmd34FN5r3Q77Nt5GrDCqrrxOtAJWAaSQBJKh8fAM';

const headers = {
    'Authorization': 'Bearer ' + ANON_KEY,
    'apikey': ANON_KEY,
    'Content-Type': 'application/json'
};

// Fungsi helper untuk mengambil data dari Supabase Edge Function
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
    // Mendukung query ?username= atau ?text= agar lebih fleksibel
    const username = req.query.username || req.query.text;

    if (!username) {
        return res.status(400).json({
            status: false,
            message: 'Query ?username= wajib diisi',
            example: '/api/tools/igstalk?username=instagram'
        });
    }

    try {
        const result = await getInstagramProfile(username);

        if (!result) {
            return res.status(404).json({
                status: false,
                message: 'Profile Instagram tidak ditemukan'
            });
        }

        return res.status(200).json({
            status: true,
            creator: 'Danzz',
            result: result
        });

    } catch (err) {
        return res.status(500).json({ 
            status: false, 
            message: err.response?.data?.message || err.message || 'Internal Server Error' 
        });
    }
}

module.exports = { handler };
