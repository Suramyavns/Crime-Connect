import { GEMINI_API_TOKEN } from "@/Appwrite";

export const getRule = async (prompt) => {
    const input = `briefly within 200 words help me in this situation according to Indian Law ${prompt}`
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_TOKEN}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{
                parts:[{text: input}]
            }]
        })
    });
    const data = await response.json();
    output = data['candidates'][0].content.parts[0].text
    return output;
}
