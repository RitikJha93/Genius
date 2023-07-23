import { Configuration, OpenAIApi } from "openai";
import {NextResponse} from 'next/server'
import { auth } from "@clerk/nextjs";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_APIKEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
    req : Request
){
    try {
        const {userId} = auth()
        const body = await req.json()
        const {prompt,amount = 1 , resolution = '512x512'} = body

        if(!userId){
            return new NextResponse("Unathourized",{status : 401})
        }
        if(!configuration.apiKey){
            return new NextResponse("Open Api key not configured",{status : 500})
        }
        if(!prompt){
            return new NextResponse("Prompt are required",{status : 500})
        }
        if(!amount){
            return new NextResponse("Amount are required",{status : 500})
        }
        if(!resolution){
            return new NextResponse("Resolution are required",{status : 500})
        }

        const response = await openai.createImage({
            prompt,
            n : parseInt(amount, 10),
            size : resolution
        })
        
        return NextResponse.json(response.data.data)

    } catch (error) {
        console.log("[IMAGE_ERROR]",error)
        return new NextResponse("Internal error",{status : 500})
    }
}