import androidx.compose.desktop.ui.tooling.preview.Preview
import androidx.compose.runtime.Composable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp

@Composable
@Preview
fun App() {
    // State variables for UI controls and results
    var lengthStr by remember { mutableStateOf("22") }
    var useSpecial by remember { mutableStateOf(true) }
    var useNumbers by remember { mutableStateOf(true) }
    var useLowercase by remember { mutableStateOf(true) }
    var useUppercase by remember { mutableStateOf(true) }
    var generatedPassword by remember { mutableStateOf("") }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    var warningMessage by remember { mutableStateOf<String?>(null) }

    PwdgenTheme {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(32.dp)
                .verticalScroll(rememberScrollState()),
            contentAlignment = Alignment.Center
        ) {
            Card(
                modifier = Modifier
                    .widthIn(min = 350.dp, max = 600.dp)
                    .heightIn(min = 450.dp),
                elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
            ) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Text("Password Generator", style = MaterialTheme.typography.headlineMedium)

                    Spacer(modifier = Modifier.height(16.dp))

                    OutlinedTextField(
                        value = lengthStr,
                        onValueChange = { newValue ->

                            val filteredValue = newValue.filter { it.isDigit() }.take(3)
                            lengthStr = filteredValue
                            errorMessage = null
                            warningMessage = null

                            val len = filteredValue.toIntOrNull()
                            if (len != null && len in 1..7) {
                                warningMessage = "Warning: Length < 8 is not recommended."
                            }
                        },
                        label = { Text("Password Length (1-128)") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        isError = errorMessage?.contains("length", ignoreCase = true) == true,
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth(0.6f),
                        shape = MaterialTheme.shapes.medium
                    )

                    OptionSwitch("Include Uppercase (A-Z)", useUppercase) {
                        useUppercase = it
                        errorMessage = null
                    }
                    OptionSwitch("Include Lowercase (a-z)", useLowercase) {
                        useLowercase = it
                        errorMessage = null
                    }
                    OptionSwitch("Include Numbers (0-9)", useNumbers) {
                        useNumbers = it
                        errorMessage = null
                    }
                    OptionSwitch("Include Special (!@#$...)", useSpecial) {
                        useSpecial = it
                        errorMessage = null
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Button(
                        onClick = {
                            errorMessage = null
                            warningMessage = null
                            generatedPassword = ""

                            val length = lengthStr.toIntOrNull()

                            // Validate length input
                            if (length == null) {
                                errorMessage = "Invalid length: Please enter a number."
                                return@Button
                            }

                            if (length in 1..7) {
                                warningMessage = "Warning: Length < 8 is not recommended."
                            }

                            try {
                                generatedPassword = generatePassword(
                                    length = length,
                                    useSpecial = useSpecial,
                                    useNumbers = useNumbers,
                                    useLowercase = useLowercase,
                                    useUppercase = useUppercase
                                )
                                if (length >= 8) warningMessage = null

                            } catch (e: IllegalArgumentException) {
                                errorMessage = e.message
                            } catch (e: Exception) {
                                errorMessage = "An unexpected error occurred: ${e.message}"
                                println("Unexpected error: ${e.stackTraceToString()}")
                            }
                        },
                        modifier = Modifier.padding(top = 8.dp)
                    ) {
                        Text("Generate Password")
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    if (generatedPassword.isNotEmpty()) {
                        Text(
                            "Generated Password:",
                            style = MaterialTheme.typography.titleMedium
                        )
                        SelectionContainer {
                            Text(
                                generatedPassword,
                                style = MaterialTheme.typography.bodyLarge.copy(
                                    fontFamily = FontFamily.Monospace
                                ),
                                modifier = Modifier.padding(vertical = 8.dp)
                            )
                        }
                    }

                    val messageToShow = errorMessage ?: warningMessage
                    if (messageToShow != null) {
                        Text(
                            messageToShow,
                            color = if (errorMessage != null) MaterialTheme.colorScheme.error else MaterialTheme.colorScheme.tertiary,
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(top = 8.dp)
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun OptionSwitch(
    label: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(label, style = MaterialTheme.typography.bodyMedium)
        Switch(
            checked = checked,
            onCheckedChange = onCheckedChange
        )
    }
}