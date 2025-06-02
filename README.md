# PwdGen - Secure Password Generator

![pwdgen banner](https://img.shields.io/badge/pwdgen-Secure%20Password%20Generator-blue)

## Features

- Generates secure 22-character passwords (customizable length)
- Includes random uppercase letters, lowercase letters, numbers, and special characters
- Colorful, user-friendly terminal interface
- Comprehensive error handling and input validation
- Logging system that records operations
- Automatic clipboard integration (requires xclip, pbcopy, or wl-copy)

![screenshot](pics/image.png)

## 🚀 Installation

### Linux Installation

**Easy installation via APT repository:**

📦 **[Install from Zahid's APT Repository](https://github.com/zahid4kh/my-apt-repo)**

This is the recommended method for Ubuntu/Debian users as it provides automatic updates and dependency management.

### Manual Installation

You can also download the `.deb` file directly from the [Releases](https://github.com/zahid4kh/pwdgen/releases) page and install manually:

```bash
sudo dpkg -i pwdgen-1.0.4.deb

sudo apt install -f
```

After installation, you can launch the app from your applications menu or by running `pwdgen` in your terminal.

### Dependencies

This application requires:

- Python 3.8 or higher
- PyQt6

These dependencies will be automatically installed when using the APT installation method.

### Uninstalling

To uninstall PwdGen:

```bash
sudo apt remove pwdgen
```

For complete removal including repository configuration, please refer to the [APT Repository documentation](https://zahid4kh.github.io/my-apt-repo/).

## License

[LICENSE](LICENSE.txt)

## Author

_Zahid Khalilov_
