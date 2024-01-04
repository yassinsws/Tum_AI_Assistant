
class User:
    def __init__(self, username, first_name, last_name):
        self.username = username
        self.first_name = first_name
        self.last_name = last_name


mock_courses = [

]


mock_users = [
    User("ge49juk", "Timor", "Morrien"),
    User("ge35yad", "Michael", "Dyer"),
    User("", "Xinyao", "Liu"),
    User("", "Sabrina", "Glatz"),
    User("", "Yassine", "Soussi"),
]


def login(username, password):
    for user in mock_users:
        if user.username == username:
            return user

    raise Exception('Invalid username or password')
