from answer import respond_with_grounding, is_on_topic, respond_question, fact_check, get_keywords
from translate import translate
from summarize import summarize
from db import VectorDB
from user_service import get_user_info
from dotenv import load_dotenv

load_dotenv()
db = VectorDB()


class Message:
    def __init__(self, role, english=None, native=None, native_lang_key=None):
        self.role = role
        self._english = english
        self._native = native
        self.native_lang_key = native_lang_key

    async def english(self):
        if not self._english:
            translation = await translate(self._native, "en")
            self._english = translation['text']
            self.native_lang_key = translation['detectedLanguage']
        return self._english

    async def native(self):
        if self.native_lang_key == "en":
            self._native = self._english
        elif not self._native:
            translation = await translate(self._english, self.native_lang_key)
            self._native = translation['text']
        return self._native

    def serialize(self):
        return {
            "role": self.role,
            "english": self._english,
            "native": self._native,
            "nativeLanguageKey": self.native_lang_key
        }


class AssistantMessage(Message):
    def __init__(self, english, native_lang_key):
        super().__init__("assistant", english=english, native_lang_key=native_lang_key)


class UserMessage(Message):
    def __init__(self, native):
        super().__init__("user", native=native)


def parse(message):
    native = message['native']
    role = message['role'].lower()
    english = None if 'english' not in message.keys() else message['english']
    native_language_key = None if 'nativeLanguageKey' not in message.keys() else message['nativeLanguageKey']
    return Message(role=role, native=native, english=english, native_lang_key=native_language_key)


async def add_response(chat_history, chat_input, user=None, translate_response=True):
    chat_history = [parse(msg) for msg in chat_history]
    message = UserMessage(chat_input)

    english_chat_input = await message.english()
    if await is_on_topic(english_chat_input):
        summary = await summarize(chat_history)
        keywords = await get_keywords(summary)
        grounding = await db.query(summary, keywords)
        response = await respond_with_grounding(english_chat_input, grounding, get_user_info(user))
        response = await fact_check(english_chat_input, grounding, response)
    else:
        response = await respond_question(english_chat_input)

    response = AssistantMessage(response, message.native_lang_key)
    if translate_response:
        await response.native()
    chat_history.append(response)

    return chat_history
