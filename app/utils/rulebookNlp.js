import { HF_NLP_TOKEN } from "@/Appwrite";

export const getRule = async (prompt) => {
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${HF_NLP_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            inputs: `help me in this situation according to Indian Law ${prompt}`,
            options: { max_tokens: 300 }
        })
    });
    const data = await response.json();
    return data[0]['generated_text']
}
