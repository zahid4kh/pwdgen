# pwdgen - Secure Password Generator

A robust Bash script for generating secure, random passwords with customizable options.

![pwdgen banner](https://img.shields.io/badge/pwdgen-Secure%20Password%20Generator-blue)

## Features

- Generates secure 22-character passwords (customizable length)
- Includes random uppercase letters, lowercase letters, numbers, and special characters
- Colorful, user-friendly terminal interface
- Comprehensive error handling and input validation
- Logging system that records operations
- Automatic clipboard integration (requires xclip, pbcopy, or wl-copy)

## Installation

```bash
# Clone the repository
git clone https://github.com/zahid4kh/pwdgen.git

# Navigate to the directory
cd pwdgen

# Make the script executable
chmod +x pwdgen

# Optional: Move to a directory in your PATH
sudo cp pwdgen /usr/local/bin/
```

For clipboard functionality, install one of these utilities:

```bash
# For Linux X11
sudo apt install xclip

# For Linux Wayland
sudo apt install wl-clipboard
```

## Usage

Basic usage:

```bash
pwdgen
```

With options:

```bash
# Generate a 16-character password
pwdgen -l 16

# Generate a password without special characters
pwdgen --no-special

# Enable verbose output
pwdgen -v

# Display help information
pwdgen --help
```

## Options

- `-l, --length NUM` - Set password length (default: 22)
- `-h, --help` - Display help message
- `-v, --verbose` - Enable verbose mode
- `--no-special` - Exclude special characters
- `--no-numbers` - Exclude numbers
- `--no-lowercase` - Exclude lowercase letters
- `--no-uppercase` - Exclude uppercase letters

## Example Output

```
Secure Password Generator v1.0

Generated Password: QWr]oHs/%D;%PO~o2Trb6j

Password copied to clipboard!
```

## License

[LICENSE](LICENSE.txt)

## Author

*Zahid Khalilov*