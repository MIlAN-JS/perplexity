import dotenv from "dotenv"
dotenv.config()

import {tavily as Tavily} from "@tavily/core"




const tavily = new Tavily({
    apikey : process.env.TAVILY_API_KEY
})


export async function searchInternet({query}){

    const results = await tavily.search(query , {
        maxResults : 5, 
        searchDepth: "advanced"
    })

    return JSON.stringify(results)
}

