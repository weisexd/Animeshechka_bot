import TikTokDL from '@tobyg74/tiktok-api-dl';

const scrape = async (url: string): Promise<string | undefined> => {
    try {
        const res = await TikTokDL.Downloader(url, {version: 'v1'});
        if (!res.result?.video?.playAddr) return;

        const videoUrl = res.result.video.playAddr;

        const finalUrl = Array.isArray(videoUrl) ? videoUrl[0] : videoUrl;

        return finalUrl;
    }
    catch (error) {
        console.error('[Scraper] Error scraping TikTok video: ', error);
    }
}

export default scrape;