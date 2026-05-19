const axios = require('axios');
const FormData = require('form-data');

async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: 'Query ?url= wajib diisi',
      example: '/api/tools/enhance-video?url=https://example.com/video.mp4'
    });
  }

  try {
    // 1. Download video dari URL
    const videoRes = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(videoRes.data);
    const mime = videoRes.headers['content-type'] || 'video/mp4';
    const ext = mime.split('/')[1] || 'mp4';
    const filename = `danzz_${Date.now()}.${ext}`;

    const h = n => Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const rndGnum = `${h(14)}-${h(14)}-${h(8)}-${h(6)}-${h(14)}`;

    const baseParams = {
      client_id: '1189857605',
      version: '5.0.9',
      country_code: 'ID',
      gnum: rndGnum,
      client_language: 'en_US',
      client_timezone: 'Asia/Jakarta'
    };

    const jantung = {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 13; 23021RAA2Y Build/TKQ1.221114.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.7727.137 Mobile Safari/537.36',
      'ab_info': '{"ab_codes":[],"version":"1.4.4"}',
      'Accept': 'application/json, text/plain, */*'
    };

    const toUrlEncoded = obj => Object.entries(obj).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');

    // 2. Get signature
    const { data: signData } = await axios.get('https://wink.ai/api/file/get_maat_sign.json', {
      params: { ...baseParams, suffix: `.${ext}`, type: 'temp', count: 1 },
      headers: jantung
    });
    if (signData.code !== 0) throw new Error('Gagal get signature');
    const { sig, sig_time, sig_version, host: strategyHost } = signData.data;

    // 3. Get upload policy
    const { data: policyRes } = await axios.get(`${strategyHost || 'https://strategy.app.meitudata.com'}/upload/policy`, {
      params: { app: 'wink', count: 1, sig, sigTime: sig_time, sigVersion: sig_version, suffix: `.${ext}`, type: 'temp' },
      headers: jantung
    });
    const policy = Array.isArray(policyRes) ? policyRes[0] : (policyRes.data ? policyRes.data[0] : policyRes);
    const uploadUrl = policy?.url || policy?.backup_url || 'https://up-qagw.meitudata.com';
    const qiniuParams = policy?.qiniu;
    const fileKey = qiniuParams?.key || policy?.key;
    if (!uploadUrl || !qiniuParams) throw new Error('Upload URL / Qiniu config tidak ditemukan');

    // 4. Upload video
    const form = new FormData();
    form.append('token', qiniuParams.token);
    form.append('key', fileKey);
    form.append('file', buffer, { filename, contentType: mime });
    const { data: uploadResult } = await axios.post(uploadUrl, form, { headers: form.getHeaders() });
    const sourceUrl = uploadResult?.url;
    if (!sourceUrl) throw new Error('Gagal mendapatkan source_url');

    // 5. Video cover info
    await axios.post('https://wink.ai/api/file/video_cover_and_display_info_ext.json', toUrlEncoded({
      ...baseParams, file_key: fileKey
    }), { headers: { ...jantung, 'Content-Type': 'application/x-www-form-urlencoded' } });

    // 6. Start transcode
    const { data: transStart } = await axios.post('https://wink.ai/api/file/video_trans_start.json', toUrlEncoded({
      ...baseParams, file_key: fileKey
    }), { headers: { ...jantung, 'Content-Type': 'application/x-www-form-urlencoded' } });
    const transId = transStart.data?.id;
    if (!transId) throw new Error('Gagal memulai transcode');

    // 7. Wait transcode
    let transcodedUrl = null;
    let transcodedKey = null;
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 3000));
      const { data: transQuery } = await axios.get('https://wink.ai/api/file/video_trans_query.json', {
        params: { ...baseParams, id: transId }, headers: jantung
      });
      if (transQuery.data?.status === 2) {
        transcodedUrl = transQuery.data.video;
        transcodedKey = transQuery.data.video_file_key;
        break;
      }
    }
    if (!transcodedUrl) throw new Error('Waktu tunggu transcode habis');

    // 8. Deliver to AI enhancer
    const ext_params = JSON.stringify({ task_name: 'AI Enhancer-Ultra HD', records: '11', video_transcoded: transcodedUrl });
    const type_params = JSON.stringify({ is_mirror: 0, orientation_tag: 1, j_420_trans: '1', return_ext: '2' });
    const right_detail = JSON.stringify({ source: '4', touch_type: '4', function_id: '630', material_id: '63011' });

    await axios.post('https://wink.ai/api/meitu_ai/delivery.json', toUrlEncoded({
      ...baseParams, type: 11, source_url: sourceUrl, content_type: 2, ext_params, type_params, right_detail, with_prepare: 1
    }), { headers: { ...jantung, 'Content-Type': 'application/x-www-form-urlencoded' } });

    // 9. Wait result
    let finalVidUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 5000));
      const { data: feedData } = await axios.get('https://wink.ai/api/meitu_ai/task_feed_list.json', {
        params: { ...baseParams, cursor: '', start_date: new Date().toISOString().split('T')[0], count: 16, sort_type: 1, sort: 2, task_types: '1,2,4,14,8,34,100,101,5,6,3,7' },
        headers: jantung
      });
      const taskList = Array.isArray(feedData?.data?.item_list) ? feedData.data.item_list : [];
      const task = taskList.find(t => t.task_data?.type === 11);
      if (task && task.process_status === 2 && task.task_data?.result?.media_info_list?.length > 0) {
        finalVidUrl = task.task_data.result.media_info_list[0].media_data;
        break;
      }
    }

    if (!finalVidUrl) throw new Error('Timeout menunggu hasil enhance');

    return res.status(200).json({
      status: true,
      creator: 'Danzz',
      result: {
        url: finalVidUrl
      }
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message
    });
  }
}

module.exports = { handler };
