const fetchNews= async (req,res)=>{
        const {topic} = req.params
        try {
            const url = 'https://newsapi.org/v2/everything?' +
                `q=${topic}&` +
                'pageSize = 1' +
                'from=2023-06-03&' +
                'sortBy=popularity&' +
                'apiKey=';

            const reqst = new Request(url);

            fetch(reqst)
                .then(async function(response) {
                const fetchresult = await response.json();
                const result = [];
                for (let data of fetchresult.articles) {
                const reslt = {
                    author: data.author,
                    title: data.title,
                    desc: data.description,
                    imageUrl: data.urlToImage,
                    date: new Date(data.publishedAt).toLocaleString(), // Assuming `publishedAt` is a property of `data`
                };

                result.push(reslt);
                }

                return res.status(200).send(result.slice(0,20))

            })


        }
        catch(error){
            res.status(401).json({
                error: error.message
            })
        }
    }

module.exports = fetchNews