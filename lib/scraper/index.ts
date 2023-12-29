import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";
export async function scrapeAmazonProduct(url: string)
{
    if(!url) return;
    // bright data proxy configuration

    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_52208f34-zone-unblocker:9sh04dpynntl -k https://lumtest.com/myip.json

    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = Math.floor(Math.random() * 10000);

    const options = {
        auth: 
        {
            username : `${username}-session-${session_id}`,
            password,
        },
        host : "brd.superproxy.io",
        port,
        rejectUnauthorized : false,
    }

    try{
        const response = await axios.get(url, options);
        // console.log(response.data)

        const $ = cheerio.load(response.data);
        const title = $("#productTitle").text().trim();
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('.a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base')
        );
        
        const basePrice = extractPrice(
            $('.basisPrice span.a-price span.a-offscreen')
        )
        
        const isOutOfStock = $("#availability span").text().trim().toLowerCase() === 'currently unavailable';

        const images = 
        $("#landingImage").attr("data-a-dynamic-image") ||
        $("#imgBlkFront").attr("data-a-dynamic-image") || '{}';

        const imageUrls = Object.keys(JSON.parse(images));

        const currency = extractCurrency($('.a-price-symbol'));

        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,"");

        const description = extractDescription($);

        // construct data object 
        const data = {
            url,
            title,
            currentPrice:currentPrice || Number(basePrice),
            originalPrice: basePrice || Number(currentPrice),
            description: description,
            priceHistory : [],
            currency,
            discountRate : Number(discountRate),
            category: "category",
            reviewsCount : 100,
            stars : 4.5,
            isOutOfStock,
            image: imageUrls[0],
            lowestPrice : Math.min(Number(currentPrice)||Number(basePrice)),
            highestPrice : Math.max(Number(basePrice)||Number(currentPrice)),
            averagePrice : Number(currentPrice) || Number(basePrice)
        }


        return data;
        
    }
    catch(err: any)
    {
        throw new Error(`Failed to scrape product: ${err.message}`)
    }

}
