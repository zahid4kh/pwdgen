import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import java.awt.Dimension

fun main() = application {
    val windowState = rememberWindowState(size = DpSize(600.dp, 700.dp))

    Window(
        onCloseRequest = ::exitApplication,
        state = windowState,
        title = "PWDGEN"
    ) {
        window.minimumSize = Dimension(600, 700)
        window.name = "pwdgen"
        PwdgenTheme {
            App()
        }
    }
}