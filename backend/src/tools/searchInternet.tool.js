import {tool} from "@langchain/core/tools";
import { searchInternet } from "../services/internet.service.js";
import * as z from "zod";


    const searchInternetTool = tool(
        searchInternet, 
        {
            name : "searchInternet",
            description : "Use this tool to search the latest information from the internet !!  ", 
            schema : z.object({
                query : z.string().describe("The search query to look up on the internet")
            })
        }
    )

export default searchInternetTool