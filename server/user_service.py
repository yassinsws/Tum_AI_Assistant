def get_courses_for_user(user):
    return [
        {
            "title": "Introduction to Programming",
            "credits": 6,
        }
    ]


def get_user_info(user):
    if not user:
        return None
    return {
        "first_name": user['first_name'],
        "last_name": user['last_name'],
        "username": user['username'],
        "major": "Informatics",
        "semester": 1,
        "courses": get_courses_for_user(user)
    }
