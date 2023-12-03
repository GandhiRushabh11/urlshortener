const shortid = require('shortid');
const url = require('../model/url')

async function generateShortUrl(req, res) {
    if (!req.body.originalUrl) return (res.status(400).json({ error: 'url is required' }))
    const { originalUrl } = req.body
    const short_id = shortid(8);
    await url.create({ originalUrl: originalUrl, shortid: short_id, visitHistory: [], createdBy: req.user._id })
    res.status(201).render("index", { shortid: short_id })
    //json({ status: "Short Link generated", shortid: short_id })
}

async function redirctingUrl(req, res) {
    const shortid = req.params.id;
    const entry = await url.findOneAndUpdate({ shortid: shortid }, { $push: { visitHistory: { timestamp: Date.now() } } })
    res.redirect(entry.originalUrl)
}

const handleAnalytics = async (req, res) => {
    const shortid = req.params.id;
    const entry = await url.findOne({ shortid: shortid })
    if (!entry) return (res.status(404).json({ error: `No Record` }))
    res.json({ Staus: "Analytics Generated", Shortid: entry.shortid, OriginalUrl: entry.originalUrl, TotalClicks: entry.visitHistory.length })
}
module.exports = { generateShortUrl, redirctingUrl, handleAnalytics }

