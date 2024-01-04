import os
from openai import AzureOpenAI
client = AzureOpenAI(azure_endpoint="https://teamiris.openai.azure.com/",
                     api_version="2023-07-01-preview",
                     api_key=os.getenv("OPENAI_API_KEY"))


async def summarize(chat_history):
    messages = []
    messages.append({
        "role": "system",
        "content": "You rewrite what the user says in a friendly way with just the important details."
    })
    for message in chat_history:
        if message.role == 'user':
            messages.append({
                "role": "user",
                "content": await message.english()
            })
    messages.append({
        "role": "system",
        "content": "Rewrite."
    })

    completion = client.chat.completions.create(model="iris",
                                                messages=messages,
                                                temperature=0.7,
                                                max_tokens=800,
                                                frequency_penalty=0,
                                                presence_penalty=0,
                                                stop=None)

    output = completion.choices[0].message.content
    print("SUMMARY: " + output)
    return output
