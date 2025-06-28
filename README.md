# pwdgen

A desktop application built with Kotlin and Compose for Desktop.

[![Kotlin](https://img.shields.io/badge/Kotlin-2.1.20-blue.svg?logo=kotlin)](https://kotlinlang.org) [![Compose](https://img.shields.io/badge/Compose-1.8.0-blue.svg?logo=jetpack-compose)](https://www.jetbrains.com/lp/compose-multiplatform/)

## Features

- Modern UI with Material 3 design
- Dark mode support
- Cross-platform (Windows, macOS, Linux)
- Hot reload support for faster development

## Development Setup

### Prerequisites

- JDK 17 or later
- Kotlin 2.1.20 or later
- IntelliJ IDEA (recommended) or Android Studio

### Make Gradle Wrapper Executable (Linux/macOS only)

After cloning the repository, you need to make the Gradle wrapper executable:

```bash
chmod +x gradlew```

**Note:** This step is not required on Windows as it uses `gradlew.bat`.

### Running the Application

#### Standard Run
```bash
./gradlew run```

#### Hot Reload (Recommended for Development)
```bash
./gradlew :runHot --mainClass pwdgen --auto```

This enables automatic recompilation and hot swapping when you modify your code, making development much faster.

### Building a Native Distribution

To build a native distribution for your platform:

```bash
./gradlew packageDistributionForCurrentOS```

This will create a platform-specific installer in the `build/compose/binaries/main-release/{extension}/` directory.

### Available Gradle Tasks

- `./gradlew run` - Run the application
- `./gradlew :runHot --mainClass pwdgen --auto` - Run with hot reload
- `./gradlew packageDistributionForCurrentOS` - Build native distribution for current OS
- `./gradlew packageDmg` - Build macOS DMG (macOS only)
- `./gradlew packageMsi` - Build Windows MSI (Windows only)
- `./gradlew packageExe` - Build Windows EXE (Windows only)
- `./gradlew packageDeb` - Build Linux DEB (Linux only)


## Generated with Compose for Desktop Wizard

This project was generated using the [Compose for Desktop Wizard](https://github.com/zahid4kh/compose-for-desktop).