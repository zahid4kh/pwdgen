@file:JvmName("pwdgen")
import androidx.compose.ui.Alignment
import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.WindowPosition
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import org.koin.core.context.startKoin
import org.koin.java.KoinJavaComponent.getKoin
import theme.AppTheme

fun main() = application {
    startKoin {
        modules(appModule)
    }

    val viewModel = getKoin().get<MainScreen>()
    val windowState = rememberWindowState(
        size = DpSize(400.dp, 570.dp),
        position = WindowPosition.Aligned(Alignment.Center)
    )

    Window(
        onCloseRequest = ::exitApplication,
        state = windowState,
        alwaysOnTop = true,
        title = "pwdgen",
        resizable = false,
        icon = null
    ) {
        AppTheme {
            App(
                viewModel = viewModel,
                windowState = windowState
            )
        }
    }
}