import kotlin.random.Random

/**
 * Generates a secure password with configurable parameters.
 *
 * @param length The length of the password to generate (default: 22)
 * @param useSpecial Include special characters (default: true)
 * @param useNumbers Include numbers (default: true)
 * @param useLowercase Include lowercase letters (default: true)
 * @param useUppercase Include uppercase letters (default: true)
 * @return A randomly generated password string
 * @throws IllegalArgumentException if password length is invalid or all character sets are disabled
 */
fun generatePassword(
    length: Int = 22,
    useSpecial: Boolean = true,
    useNumbers: Boolean = true,
    useLowercase: Boolean = true,
    useUppercase: Boolean = true
): String {
    when {
        length < 1 -> throw IllegalArgumentException("Password length must be a positive number")
        length > 128 -> throw IllegalArgumentException("Password length too large (max: 128)")
        length < 8 -> println("WARNING: Password length less than 8 is not recommended for security")
    }

    val specialChars = "!@#\$%^&*()-_=+[]{}\\;:,.<>?/~"
    val numberChars = "0123456789"
    val lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
    val uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (!useSpecial && !useNumbers && !useLowercase && !useUppercase) {
        throw IllegalArgumentException("Cannot generate password: all character sets are disabled")
    }

    val chars = StringBuilder()
    if (useSpecial) chars.append(specialChars)
    if (useNumbers) chars.append(numberChars)
    if (useLowercase) chars.append(lowercaseChars)
    if (useUppercase) chars.append(uppercaseChars)

    val random = Random
    val password = StringBuilder()

    if (useSpecial) {
        password.append(specialChars[random.nextInt(specialChars.length)])
    }

    if (useNumbers) {
        password.append(numberChars[random.nextInt(numberChars.length)])
    }

    if (useLowercase) {
        password.append(lowercaseChars[random.nextInt(lowercaseChars.length)])
    }

    if (useUppercase) {
        password.append(uppercaseChars[random.nextInt(uppercaseChars.length)])
    }

    while (password.length < length) {
        password.append(chars[random.nextInt(chars.length)])
    }

    val shuffledPassword = password.toString().toCharArray()
    shuffledPassword.shuffle(random)

    return String(shuffledPassword).substring(0, length)
}