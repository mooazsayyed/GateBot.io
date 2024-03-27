const express = require('express');
const router = express.Router();
const SerpApi = require('google-search-results-nodejs');
const fs = require('fs');

router.get('/services/electrician', (req, res) => {
    const search = new SerpApi.GoogleSearch("4d612654e4e0674267452aba3c1d2877960c21cbf4ee0b061696118f52c9c50d");

    const query_params = {
        api_key: "4d612654e4e0674267452aba3c1d2877960c21cbf4ee0b061696118f52c9c50d",
        q: "Electrician Pune", // Get the search query from the query parameters
        google_domain: "google.com",
        location: "Pune", // Get the location from the query parameters
        tbm: "lcl",
        device: "desktop",
        // Add any additional parameters as required
    };

    search.json(query_params, (data) => {
        if (data.error) {
            console.error(data.error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(data); // Return the search results as JSON
    });
});
