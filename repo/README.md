# Installation Instructions for Users

### 1. Add the repository GPG key

```bash
wget -qO- https://zahid4kh.github.io/pwdgen/KEY.gpg | sudo gpg --dearmor -o /usr/share/keyrings/pwdgen-archive-keyring.gpg
```
### 2. Add the repository to your sources list
```bash
echo "deb [signed-by=/usr/share/keyrings/pwdgen-archive-keyring.gpg] https://zahid4kh.github.io/pwdgen stable main" | sudo tee /etc/apt/sources.list.d/pwdgen.list
```
### 3. Update the packages and install *PwdGen*
```bash
sudo apt update
sudo apt install pwdgen
```