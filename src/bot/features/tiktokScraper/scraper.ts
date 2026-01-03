import TikTokDL from '@tobyg74/tiktok-api-dl';

interface ScraperResult {
    type: 'video' | 'image';
    data: string | string[];
}

const scrape = async (url: string): Promise<ScraperResult | undefined> => {
    try {
        const res = await TikTokDL.Downloader(url, {version: 'v1'});
        if (!res.result) return;

        // Handling video result
        if (res.result.type === 'video'){
            const videoUrl = res.result.video?.playAddr;
            if (!videoUrl) return;
    
            const finalUrl = Array.isArray(videoUrl) ? videoUrl[0] : videoUrl;
    
            return {
                type: 'video',
                data: finalUrl
            };
        }

        // Handling image result
        if (res.result.type === 'image') {
            const images = res.result.images;

            if (!images || images.length === 0) return;

            return {
                type: 'image',
                data: images
            };
        }
        
        return;
    }
    catch (error) {
        console.error('[Scraper] Error scraping TikTok video: ', error);
    }
}

export default scrape;