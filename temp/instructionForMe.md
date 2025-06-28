# Package Maintenance


# PwdGen Package Maintenance Guide

This document explains how to maintain and update the PwdGen Debian package.

## Overview

The package build system consists of two main scripts:

1. `build-package.sh` - Builds the Debian package
2. `repo-update.sh` - Updates the APT repository metadata

## Updating the Package

### Step 1: Update the Application Code

First, make any necessary changes to the application code:

- `main.py`
- `app.py`
- `widgets.py`
- `theme.py`
- `password_generator.py`

### Step 2: Update the Version Number

Edit the following files to update the version number:

1. In `build-package.sh`:
   ```bash
   PACKAGE_VERSION="1.0.4"  # Change this to the new version
   ```

2. In `repo-update.sh`:
   ```bash
   VERSION="1.0.4"  # Change this to the new version
   ```

### Step 3: Build the New Package

Run the build script:

```bash
./build-package.sh
```

This will:
- Create the package directory structure
- Copy all application files
- Set proper permissions
- Build the Debian package
- Copy the package to the repository pool

### Step 4: Update the Repository Metadata

Run the repository update script:

```bash
./repo-update.sh
```

This will:
- Generate package indexes
- Create and update the Release file
- Calculate checksums
- Sign the repository with your GPG key

### Step 5: Push to GitHub

Push the changes to GitHub:

```bash
cd repo
git add .
git commit -m "Update to version X.Y.Z"
git push
```

## Fields to Edit for Updates

When creating a new version, you need to update:

1. **Version Numbers**:
   - In `build-package.sh`: `PACKAGE_VERSION`
   - In `repo-update.sh`: `VERSION`

2. **Changelog** (optional):
   - You can add a changelog file to the package by adding it to `$PACKAGE_DIR/usr/share/doc/pwdgen/changelog.Debian`

3. **Dependencies** (if needed):
   - In `build-package.sh`, update the Depends line in the control file if new dependencies are added

## Testing the Package

After building, you can test the package locally:

```bash
sudo dpkg -i pwdgen-X.Y.Z.deb
sudo apt-get install -f  # To install dependencies
```

Then verify:
1. The application can be launched with `pwdgen` command
2. The icon appears correctly in the application launcher
3. All functionality works as expected