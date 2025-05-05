import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import java.awt.SystemColor.text

private val LightColorScheme = lightColorScheme(
    primary = AlmostBlack,
    onPrimary = White,
    primaryContainer = DarkGray,
    onPrimaryContainer = White,
    secondary = MediumGray,
    onSecondary = White,
    secondaryContainer = LightGray,
    onSecondaryContainer = Black,
    tertiary = MediumGray2,
    onTertiary = White,
    tertiaryContainer = VeryLightGray,
    onTertiaryContainer = Black,
    background = AlmostWhite,
    onBackground = Black,
    surface = White,
    onSurface = Black,
    surfaceVariant = VeryLightGray,
    onSurfaceVariant = Black,
    outline = LightGray,
    error = RedErrorLight,
    onError = White,
    errorContainer = Color(0xFFFCD8DF),
    onErrorContainer = Color(0xFF410E0B)
)

private val DarkColorScheme = darkColorScheme(
    primary = VeryLightGray,
    onPrimary = Black,
    primaryContainer = LightGray,
    onPrimaryContainer = Black,
    secondary = MediumGray,
    onSecondary = Black,
    secondaryContainer = DarkGray,
    onSecondaryContainer = White,
    tertiary = LightGray,
    onTertiary = Black,
    tertiaryContainer = MediumGray,
    onTertiaryContainer = White,
    background = Black,
    onBackground = White,
    surface = AlmostBlack,
    onSurface = White,
    surfaceVariant = DarkGray,
    onSurfaceVariant = White,
    outline = MediumGray2,
    error = RedErrorDark,
    onError = Black,
    errorContainer = Color(0xFF93000A),
    onErrorContainer = Color(0xFFFFDAD6)
)

@Composable
fun PwdgenTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}