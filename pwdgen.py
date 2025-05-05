import random
import secrets
import string
from typing import List


def generate_password(
    length: int = 22,
    use_special: bool = True,
    use_numbers: bool = True,
    use_lowercase: bool = True,
    use_uppercase: bool = True
) -> str:
    """
    Generate a secure password with configurable parameters.

    Args:
        length: The length of the password to generate (default: 22)
        use_special: Include special characters (default: True)
        use_numbers: Include numbers (default: True)
        use_lowercase: Include lowercase letters (default: True)
        use_uppercase: Include uppercase letters (default: True)

    Returns:
        A randomly generated password string

    Raises:
        ValueError: If password length is invalid or all character sets are disabled
    """
    if length < 1:
        raise ValueError("Password length must be a positive number")
    if length > 128:
        raise ValueError("Password length too large (max: 128)")
    if length < 8:
        print("WARNING: Password length less than 8 is not recommended for security")

    special_chars = "!@#$%^&*()-_=+[]{}\\;:,.<>?/~"
    number_chars = string.digits
    lowercase_chars = string.ascii_lowercase
    uppercase_chars = string.ascii_uppercase

    if not any([use_special, use_numbers, use_lowercase, use_uppercase]):
        raise ValueError("Cannot generate password: all character sets are disabled")

    chars = ""
    if use_special:
        chars += special_chars
    if use_numbers:
        chars += number_chars
    if use_lowercase:
        chars += lowercase_chars
    if use_uppercase:
        chars += uppercase_chars

    password_chars: List[str] = []

    if use_special:
        password_chars.append(secrets.choice(special_chars))

    if use_numbers:
        password_chars.append(secrets.choice(number_chars))

    if use_lowercase:
        password_chars.append(secrets.choice(lowercase_chars))

    if use_uppercase:
        password_chars.append(secrets.choice(uppercase_chars))

    remaining_length = length - len(password_chars)
    if remaining_length > 0:
        password_chars.extend(secrets.choice(chars) for _ in range(remaining_length))

    secrets.SystemRandom().shuffle(password_chars)
    
    password = ''.join(password_chars[:length])

    return password


if __name__ == "__main__":
    default_password = generate_password()
    print(f"Default password: {default_password}")