from PyQt6.QtGui import QColor

ALMOST_BLACK = QColor(33, 33, 33)
DARK_GRAY = QColor(66, 66, 66)
MEDIUM_GRAY = QColor(97, 97, 97)
MEDIUM_GRAY2 = QColor(117, 117, 117)
LIGHT_GRAY = QColor(189, 189, 189)
VERY_LIGHT_GRAY = QColor(224, 224, 224)
ALMOST_WHITE = QColor(250, 250, 250)
WHITE = QColor(255, 255, 255)
BLACK = QColor(0, 0, 0)

THEME_STYLES = {
    "window": """
        QWidget {
            background-color: #212121;
            color: #FAFAFA;
        }
    """,
    "card": """
        QFrame {
            background-color: #424242;
            border-radius: 8px;
            border: 1px solid #616161;
        }
    """,
    "title": """
        QLabel {
            font-size: 24px;
            font-weight: bold;
            color: #FAFAFA;
        }
    """,
    "button": """
        QPushButton {
            background-color: #BDBDBD;
            color: #212121;
            border-radius: 4px;
            padding: 8px 16px;
            font-weight: bold;
        }
        QPushButton:hover {
            background-color: #E0E0E0;
        }
        QPushButton:pressed {
            background-color: #FAFAFA;
        }
    """,
    "textfield": """
        QLineEdit {
            border: 1px solid #616161;
            border-radius: 4px;
            padding: 8px;
            background-color: #616161;
            color: #FAFAFA;
        }
        QLineEdit:focus {
            border: 2px solid #BDBDBD;
        }
    """,
    "error_text": """
        QLabel {
            color: #CF6679;
            font-size: 12px;
        }
    """,
    "warning_text": """
        QLabel {
            color: #FFC107;
            font-size: 12px;
        }
    """,
    "password_display": """
        QLabel {
            font-family: monospace;
            font-size: 16px;
            padding: 8px;
            background-color: #616161;
            color: #FAFAFA;
            border-radius: 4px;
            selection-background-color: #757575;
        }
    """,
    "switch_label": """
        QLabel {
            font-size: 14px;
            color: #FAFAFA;
        }
    """
}
