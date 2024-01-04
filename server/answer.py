import os
from openai import AzureOpenAI
client = AzureOpenAI(azure_endpoint="https://teamiris.openai.azure.com/",
                     api_version="2023-07-01-preview",
                     api_key=os.getenv("AZURE_OPENAI_API_KEY"))

job_description = """
You are a terse but helpful student advisor who answers questions of students and applicants related to the TUM School of Management.
"""


async def is_on_topic(input):
    messages = [
        {
            "role": "system",
            "content": f"""
            {job_description}
            Your task now is to determine whether the users question is on topic or not.
            A question is on topic if it is related to the TUM School of Management.
            A question is on topic if it is related to any aspect of studying at the TUM School of Management.
            A question is off topic if it is not related to the TUM School of Management.
            """
        },
        {
            "role": "user",
            "content": input
        },
        {
            "role": "system",
            "content": "Is this question on topic? Answer with 'yes' or 'no'. Do not answer with 'I don't know' or anything else."
        }
    ]

    response = await respond(messages)

    return 'yes' in response.lower()


def respond_question(input):
    messages = [
        {
            "role": "system",
            "content": f"""
            {job_description}
            Refuse to answer any questions not related to the TUM School of Management or its related programs.
            Ask if you can help them with anything else.
            """
        },
        {
            "role": "user",
            "content": input
        }
    ]
    return respond(messages)


def get_keywords(inquiry):
    messages = [
            {
                "role": "system",
                "content": f"You extract a list of keywords from a text."
            },
            {
                "role": "user",
                "content": inquiry
            }
        ]
    return respond(messages)


def respond_with_grounding(inquiry, grounding, user_info):
    sources = '\n'.join(
        [
            f'Title: {resource["document_title"]}\nRelevant content: {resource["content"]}\nContact person: {resource["contact_person"]}'
            for resource in grounding])
    messages = [
        {
            "role": "system",
            "content": f"{job_description}."
                       f"The user's info is {user_info}.\nHere are some documents that may be useful."
                       f"Use only that information which helps answer the students question.\n" + sources +
                       f"\nInform the user of the URLs and contact people of the information you use.\n"
                       f"If you cannot help, provide this link as a helpful list of contact people: https://campus.tum.de/tumonline/wborggruppen.gruppen?pOrgNr=47657"
        },
        {
            "role": "user",
            "content": inquiry
        }
    ]
    return respond(messages)


def fact_check(input, grounding, answer):
    grounding_string = '\n'.join(
        [f'Title: {resource["document_title"]}\nRelevant content: {resource["content"]}\nContact person: {resource["contact_person"]}' for resource in grounding])
    messages = [
        {
            "role": "system",
            "content": f"""
            {job_description}
            """
        },
        {
            "role": "user",
            "content": input
        },
        {
            "role": "assistant",
            "content": answer
        },
        {
            "role": "system",
            "content": f"""
            Verify the answer using the provided sources.
            If the answer is correct simply retype it.
            If the answer is incorrect, correct it accordingly.
            Here are the sources:
            {grounding_string}
            """
        }
    ]
    return respond(messages)


def convert_to_email(full_history, name, email_address):
    from message import Message
    messages = [
        {
            "role": "system",
            "content": job_description
        }
    ]
    for message in full_history:
        msg = Message(role=message['role'], english=message['english'],native=message['native'],native_lang_key=message['native'][:2])
        messages.append({
            "role": "user" if message['role'] == 'user' else "assistant",
            "content": msg.english()
        })
    messages.append({
        "role": "system",
        "content": f"Draft an email from the user to {name} at {email_address} "
                   f"using the information from the conversation."
    })
    return respond(messages)


async def respond(messages):
    completion = client.chat.completions.create(model="iris",
                                                messages=messages,
                                                temperature=0.7,
                                                max_tokens=800,
                                                frequency_penalty=0,
                                                presence_penalty=0,
                                                stop=None)

    output = completion.choices[0].message.content
    print(output)
    return output
