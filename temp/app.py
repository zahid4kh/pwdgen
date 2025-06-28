from PyQt6.QtGui import QColor, QFont, QIntValidator, QAction
from PyQt6.QtWidgets import (QGraphicsDropShadowEffect, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
                             QLabel, QLineEdit, QPushButton, QFrame, QScrollArea,
                             QApplication, QSpacerItem, QSizePolicy, QMenu)
from PyQt6.QtCore import Qt, QPropertyAnimation, QEasingCurve, QPoint, QSettings
import sys

from widgets import OptionSwitch
from theme import THEME_STYLES
from password_generator import generate_password


class PasswordGeneratorApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("PWDGEN")
        self.setMinimumSize(600, 600)
        self.resize(600, 600)

        self.central_widget = None
        self.scroll_area = None
        self.card = None
        self.length_input = None
        self.use_uppercase = None
        self.use_lowercase = None
        self.use_numbers = None
        self.use_special = None
        self.button_layout = None
        self.generate_button = None
        self.password_label = None
        self.password_display = None
        self.message_label = None
        self.settings_button = None
        self.settings_menu = None
        self.copy_button = None
        self.fade_animation = None

        self.init_ui()

    def init_ui(self):
        if self.central_widget is not None:
            self.central_widget.deleteLater()

        self.apply_theme()

        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)

        main_layout = QVBoxLayout(self.central_widget)
        main_layout.setContentsMargins(32, 32, 32, 32)

        self.scroll_area = QScrollArea()
        self.scroll_area.setWidgetResizable(True)
        self.scroll_area.setFrameShape(QFrame.Shape.NoFrame)
        main_layout.addWidget(self.scroll_area)

        scroll_content = QWidget()
        scroll_layout = QVBoxLayout(scroll_content)
        scroll_layout.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.scroll_area.setWidget(scroll_content)

        self.card = QFrame()
        self.card.setObjectName("card")
        self.card.setStyleSheet(self.get_theme_style("card"))
        self.card.setMinimumHeight(450)
        self.card.setMaximumWidth(600)
        self.card.setMinimumWidth(350)

        card_shadow = QGraphicsDropShadowEffect()
        card_shadow.setBlurRadius(8)
        card_shadow.setColor(QColor(0, 0, 0, 50))
        card_shadow.setOffset(0, 2)
        self.card.setGraphicsEffect(card_shadow)

        scroll_layout.addWidget(self.card)

        card_layout = QVBoxLayout(self.card)
        card_layout.setContentsMargins(24, 24, 24, 24)
        card_layout.setSpacing(12)

        title = QLabel("Password Generator")
        title.setStyleSheet(self.get_theme_style("title"))
        title.setAlignment(Qt.AlignmentFlag.AlignCenter)
        card_layout.addWidget(title)

        card_layout.addSpacing(16)

        length_layout = QHBoxLayout()
        length_layout.setContentsMargins(0, 0, 0, 0)
        length_layout.setAlignment(Qt.AlignmentFlag.AlignCenter)

        self.length_input = QLineEdit("22")
        self.length_input.setPlaceholderText("Password Length (1-128)")
        self.length_input.setStyleSheet(self.get_theme_style("textfield"))
        self.length_input.setValidator(QIntValidator(1, 128))
        self.length_input.setMaximumWidth(200)
        self.length_input.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.length_input.textChanged.connect(self.validate_length)

        length_layout.addWidget(self.length_input)
        card_layout.addLayout(length_layout)

        self.use_uppercase = OptionSwitch("Include Uppercase (A-Z)", True)
        self.use_lowercase = OptionSwitch("Include Lowercase (a-z)", True)
        self.use_numbers = OptionSwitch("Include Numbers (0-9)", True)
        self.use_special = OptionSwitch("Include Special (!@#$...)", True)

        card_layout.addWidget(self.use_uppercase)
        card_layout.addWidget(self.use_lowercase)
        card_layout.addWidget(self.use_numbers)
        card_layout.addWidget(self.use_special)

        self.button_layout = QHBoxLayout()
        self.button_layout.setAlignment(Qt.AlignmentFlag.AlignCenter)

        self.generate_button = QPushButton("Generate Password")
        self.generate_button.setStyleSheet(self.get_theme_style("button"))
        self.generate_button.clicked.connect(self.generate_password)
        self.button_layout.addWidget(self.generate_button)

        card_layout.addSpacing(8)
        card_layout.addLayout(self.button_layout)
        card_layout.addSpacing(16)

        self.password_label = QLabel("Generated Password:")
        self.password_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.password_label.setVisible(False)
        card_layout.addWidget(self.password_label)

        self.password_display = QLabel()
        self.password_display.setStyleSheet(
            self.get_theme_style("password_display"))
        self.password_display.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.password_display.setTextInteractionFlags(
            Qt.TextInteractionFlag.TextSelectableByMouse)
        self.password_display.setVisible(False)
        card_layout.addWidget(self.password_display)

        self.message_label = QLabel()
        self.message_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.message_label.setVisible(False)
        card_layout.addWidget(self.message_label)

        divider = QFrame()
        divider.setFrameShape(QFrame.Shape.HLine)
        divider.setFrameShadow(QFrame.Shadow.Sunken)
        divider.setStyleSheet("background-color: " +
                              ("#616161" if "dark" == "dark" else "#E0E0E0") +
                              "; margin: 10px 0;")

        card_layout.addSpacing(10)
        card_layout.addWidget(divider)

        settings_layout = QHBoxLayout()
        settings_layout.setAlignment(Qt.AlignmentFlag.AlignCenter)
        card_layout.addLayout(settings_layout)

        self.statusBar()

    def get_theme_style(self, element):
        return THEME_STYLES.get(element, "")

    def apply_theme(self):
        self.setStyleSheet(self.get_theme_style("window"))

    def validate_length(self, text):
        self.message_label.setVisible(False)

        if not text:
            return

        try:
            length = int(text)
            if length < 8:
                self.message_label.setText(
                    "Warning: Length < 8 is not recommended.")
                self.message_label.setStyleSheet(
                    self.get_theme_style("warning_text"))
                self.message_label.setVisible(True)
            else:
                self.message_label.setVisible(False)
        except ValueError:
            self.message_label.setText(
                "Invalid length: Please enter a number.")
            self.message_label.setStyleSheet(
                self.get_theme_style("error_text"))
            self.message_label.setVisible(True)

    def copy_to_clipboard(self, text):
        clipboard = QApplication.clipboard()
        clipboard.setText(text)
        self.statusBar().showMessage("Password copied to clipboard!", 2000)

    def generate_password(self):
        try:
            self.password_display.clear()
            self.message_label.setVisible(False)

            self._current_password = None

            if hasattr(self, 'copy_button') and self.copy_button:
                self.button_layout.removeWidget(self.copy_button)
                self.copy_button.deleteLater()
                self.copy_button = None

            try:
                length = int(self.length_input.text())
            except ValueError:
                self.message_label.setText(
                    "Invalid length: Please enter a number.")
                self.message_label.setStyleSheet(
                    self.get_theme_style("error_text"))
                self.message_label.setVisible(True)
                return

            if length < 8:
                self.message_label.setText(
                    "Warning: Length < 8 is not recommended.")
                self.message_label.setStyleSheet(
                    self.get_theme_style("warning_text"))
                self.message_label.setVisible(True)

            use_uppercase = self.use_uppercase.isChecked()
            use_lowercase = self.use_lowercase.isChecked()
            use_numbers = self.use_numbers.isChecked()
            use_special = self.use_special.isChecked()

            password = generate_password(
                length=length,
                use_uppercase=use_uppercase,
                use_lowercase=use_lowercase,
                use_numbers=use_numbers,
                use_special=use_special
            )

            self._current_password = password
            self.password_label.setVisible(True)
            self.password_display.setText(password)
            self.password_display.setVisible(True)

            self.copy_button = QPushButton("Copy to Clipboard")
            green_color = "#4CAF50"
            self.copy_button.setStyleSheet(f"""
                QPushButton {{
                    background-color: {green_color};
                    color: white;
                    border-radius: 4px;
                    padding: 6px 12px;
                    font-size: 12px;
                }}
                QPushButton:hover {{
                    background-color: #45a049;
                }}
            """)

            self.copy_button.clicked.connect(
                self.copy_current_password)
            self.button_layout.addWidget(self.copy_button)

            self.fade_in_widget(self.password_display)

        except ValueError as e:
            self.message_label.setText(str(e))
            self.message_label.setStyleSheet(
                self.get_theme_style("error_text"))
            self.message_label.setVisible(True)
        except Exception as e:
            self.message_label.setText(
                f"An unexpected error occurred: {str(e)}")
            self.message_label.setStyleSheet(
                self.get_theme_style("error_text"))
            self.message_label.setVisible(True)
            print(f"Unexpected error: {e}")

    def copy_current_password(self):
        """Copy the current password to clipboard"""
        if hasattr(self, '_current_password') and self._current_password:
            self.copy_to_clipboard(self._current_password)

    def fade_in_widget(self, widget):
        self.fade_animation = QPropertyAnimation(widget, b"windowOpacity")
        self.fade_animation.setDuration(400)
        self.fade_animation.setStartValue(0.0)
        self.fade_animation.setEndValue(1.0)
        self.fade_animation.setEasingCurve(QEasingCurve.Type.OutCubic)
        self.fade_animation.start()
