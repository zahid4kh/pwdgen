from PyQt6.QtWidgets import QWidget, QHBoxLayout, QLabel
from PyQt6.QtCore import pyqtSignal, Qt, QPropertyAnimation, pyqtProperty
from PyQt6.QtGui import QPainter, QColor, QBrush
from theme import THEME_STYLES


class OptionSwitch(QWidget):
    toggled = pyqtSignal(bool)

    def __init__(self, label, checked=True, parent=None):
        super().__init__(parent)
        self.layout = QHBoxLayout(self)
        self.layout.setContentsMargins(0, 0, 0, 0)

        self.label = QLabel(label)
        self.label.setStyleSheet("color: #FAFAFA;")
        self.layout.addWidget(self.label)

        self.switch = AnimatedSwitch(checked)
        self.switch.toggled.connect(self.toggled.emit)
        self.layout.addWidget(self.switch)

        self.layout.setAlignment(self.label, Qt.AlignmentFlag.AlignLeft)
        self.layout.setAlignment(self.switch, Qt.AlignmentFlag.AlignRight)

    def isChecked(self):
        return self.switch.isChecked()

    def setChecked(self, checked):
        self.switch.setChecked(checked)


class AnimatedSwitch(QWidget):
    toggled = pyqtSignal(bool)

    def __init__(self, checked=False, parent=None):
        super().__init__(parent)
        self.checked = checked
        self._handle_position = 5
        self.setFixedSize(50, 30)

        self.animation = QPropertyAnimation(self, b"handle_position")
        self.animation.setDuration(150)

        self.setMouseTracking(True)

    def get_handle_position(self):
        return self._handle_position

    def set_handle_position(self, pos):
        self._handle_position = pos
        self.update()

    handle_position = pyqtProperty(
        float, get_handle_position, set_handle_position)

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)

        track_color = QColor(
            224, 224, 224) if self.checked else QColor(97, 97, 97)
        handle_color = QColor(33, 33, 33)

        painter.setPen(Qt.PenStyle.NoPen)
        painter.setBrush(QBrush(track_color))
        painter.drawRoundedRect(0, 5, self.width(), 20, 10, 10)

        painter.setBrush(QBrush(handle_color))
        painter.drawEllipse(int(self._handle_position), 5, 20, 20)

    def mousePressEvent(self, event):
        if event.button() == Qt.MouseButton.LeftButton:
            self.checked = not self.checked

            start = self._handle_position
            end = self.width() - 30 if self.checked else 5

            self.animation.setStartValue(start)
            self.animation.setEndValue(end)
            self.animation.start()

            self.toggled.emit(self.checked)

    def isChecked(self):
        return self.checked

    def setChecked(self, checked):
        if self.checked != checked:
            self.checked = checked
            self._handle_position = self.width() - 30 if checked else 5
            self.update()
            self.toggled.emit(self.checked)
