const CHANNEL_ID = 'UCw3Iw_R6ZYVeohYHQ4vq5hQ';
const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

fetch(RSS_URL)
    .then(response => response.json())
    .then(data => {
        const latestVideo = data.items[0];
        const videoId = latestVideo.link.split('v=')[1];
        const container = document.getElementById('youtube-feed');
        
        container.innerHTML = `
            <p style="font-size: 12px; margin-bottom: 5px;">${latestVideo.title}</p>
            <a href="${latestVideo.link}" target="_blank">
                <img src="${latestVideo.thumbnail}" width="160" height="120" style="border: 3px double #ffffff;"><br>
                <img src="https://web.archive.org/web/20091027005436im_/http://geocities.com/Athens/Acropolis/3151/new.gif" alt="NEW!">
            </a>
            <p style="font-size: 10px;">Click above to watch on YouTube!</p>
        `;
    })
    .catch(err => {
        document.getElementById('youtube-feed').innerHTML = "Failed to load feed. Check back in 1999!";
    });