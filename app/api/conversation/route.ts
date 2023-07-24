import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from 'next/server'
import { auth } from "@clerk/nextjs";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_APIKEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { messages } = body


        const freeTrial = await checkApiLimit()
        if (!userId) {
            return new NextResponse("Unathourized", { status: 401 })
        }
        if (!configuration.apiKey) {
            return new NextResponse("Open Api key not configured", { status: 500 })
        }
        if (!messages) {
            return new NextResponse("Messages are required", { status: 500 })
        }
        if (!freeTrial) {
            return new NextResponse("Please upgrade to pro plan to use Genius", { status: 403 })
        }
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages
        })

        await increaseApiLimit()
        return NextResponse.json(response.data.choices[0].message)

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}