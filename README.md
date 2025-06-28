# PwdGen - Super Simple Password Generator

A secure, customizable desktop password generator built with Kotlin and Compose Desktop, featuring a beautiful Material 3 interface.

[![Kotlin](https://img.shields.io/badge/Kotlin-2.1.20-blue.svg?logo=kotlin)](https://kotlinlang.org) [![Compose](https://img.shields.io/badge/Compose-1.8.0-blue.svg?logo=jetpack-compose)](https://www.jetbrains.com/lp/compose-multiplatform/) [![Version](https://img.shields.io/badge/Version-2.0.0-green.svg)](https://github.com/zahid4kh/pwdgen/releases)

## ✨ Features

- **Modern Material 3 UI** with dark/light theme support
- **Customizable passwords** with length 7-75 characters
- **Character set toggles** for uppercase, lowercase, numbers, and special characters
- **Instant clipboard copy** with visual feedback
- **Responsive interface** with resizable window modes
- **Smooth animations** and interactive tooltips
- **Complete offline operation** - no internet required

## 🚀 Installation

### Linux (Ubuntu/Debian)

```bash
# Add repository
wget -qO- https://zahid4kh.github.io/my-apt-repo/KEY.gpg | sudo gpg --dearmor -o /usr/share/keyrings/zahid-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/zahid-archive-keyring.gpg] https://zahid4kh.github.io/my-apt-repo stable main" | sudo tee /etc/apt/sources.list.d/zahid-apps.list

# Install
sudo apt update && sudo apt install pwdgen
```

### Windows

Windows installers (.msi and .exe) coming soon!

### Try Online

Experience PwdGen in your browser: [https://pwdgene.vercel.app/generator](https://pwdgene.vercel.app/generator)

## 🛠️ Development Setup

### Prerequisites

- JDK 17 or later
- IntelliJ IDEA (recommended)

### Running the Application

```bash
# Make gradlew executable (Linux/macOS)
chmod +x gradlew

# Standard run
./gradlew run

# Hot reload for development
./gradlew :runHot --mainClass PwdGen --auto
```

### Building Native Packages

```bash
# Build for current OS
./gradlew packageDistributionForCurrentOS

# Platform-specific builds
./gradlew packageDeb    # Linux
./gradlew packageDmg    # macOS
./gradlew packageMsi    # Windows
./gradlew packageExe    # Windows
```

## 📱 Screenshots

![screenshot1](/screenshot1.png)

![screenshot1](/screenshot2.png)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## 🔗 Links

- **Documentation**: [https://pwdgene.vercel.app/docs](https://pwdgene.vercel.app/docs)
- **APT Repository**: [https://zahid4kh.github.io/my-apt-repo](https://zahid4kh.github.io/my-apt-repo)
- **Issues**: [GitHub Issues](https://github.com/zahid4kh/pwdgen/issues)
