const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const newspapers =[
    {
        name: 'thetimes',
        website: "https://www.thetimes.co.uk/environment/climate-change"
    },
    {
        name: 'gaurdian',
        website: "https://www.theguardian.com/environment/climate-crisis"
    },
    {
        name: 'telegraph',
        website: "https://www.thetimes.co.uk/environment/climate-change"
    },
]

const articles = [];
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));

//scrape 1st webpage
app.get("/", (req, res) => {
  res.json(`Welcome to my Web API`);
});

//grab the gaurdian url
app.get("/news", (req, res) => {
  axios
    .get("https://www.theguardian.com/environment/climate-crisis")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        articles.push({
          title,
          url,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});
