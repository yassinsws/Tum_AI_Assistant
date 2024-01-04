import os

import requests, uuid

# Add your key and endpoint
key = os.getenv("TRANSLATOR_TEXT_SUBSCRIPTION_KEY")
endpoint = "https://api.cognitive.microsofttranslator.com/"

# location, also known as region.
# required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
location = "germanywestcentral"

path = '/translate'
constructed_url = endpoint + path


async def translate(input, to):
    params = {
        'api-version': '3.0',
        'to': to
    }

    headers = {
        'Ocp-Apim-Subscription-Key': key,
        # location required if you're using a multi-service or regional (not global) resource.
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': str(uuid.uuid4()),
    }

    # You can pass more than one object in body.
    body = [{
        'text': input
    }]

    request = requests.post(constructed_url, params=params, headers=headers, json=body, verify=False)
    print(str(request))
    response = request.json()

    output = {
        'text': response[0]['translations'][0]['text'],
        'detectedLanguage': response[0]['detectedLanguage']['language']
    }
    print("TRANSLATION: " + output['text'] + " DETECTED LANGUAGE: " + output['detectedLanguage'] + " INPUT: " + input)
    return output
