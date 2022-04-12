const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const newspapers = [
  {
    name: "thetimes",
    website: "https://www.thetimes.co.uk/environment/climate-change",
    base: ''
  },
  {
    name: "gaurdian",
    website: "https://www.theguardian.com/environment/climate-crisis",
    base: ''
  },
  {
    name: "telegraph",
    website: "https://www.telegraph.co.uk/climate-change",
    base: 'https://www.telegraph.co.uk'
  },
];
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));

const articles = [];

newspapers.forEach((newspaper) => {
  axios.get(newspaper.website).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('a:contains("climate")', html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");

      articles.push({
        title,
        url: newspaper.base + url,
        source: newspaper.name,
      });
    });
  });
});

//scrape 1st webpage
app.get("/", (req, res) => {
  res.json(`Welcome to my Web API`);
});

//grab the gaurdian url
app.get("/news", (req, res) => {
  res.json(articles);
});
