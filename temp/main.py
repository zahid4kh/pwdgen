import sys
from PyQt6.QtWidgets import QApplication
from app import PasswordGeneratorApp

if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setApplicationName("pwdgen")
    window = PasswordGeneratorApp()
    window.show()
    sys.exit(app.exec())
