
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import org.jetbrains.compose.resources.painterResource
import pwdgen.resources.Res
import pwdgen.resources.copy
import pwdgen.resources.moon
import pwdgen.resources.sun
import theme.AppTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun App(
    viewModel: MainScreen
) {
    val uiState by viewModel.uiState.collectAsState()
    val isResultNull = uiState.result != null

    LaunchedEffect(uiState.isSpecialCharSelected){
        println("Special chars are selected: ${uiState.isSpecialCharSelected}")
        println("Uppercase is selected: ${uiState.isUppercaseSelected}")
        println("Lowercase is selected: ${uiState.isLowercaseSelected}")
        println("Numbers are selected: ${uiState.isNumbersSelected}")
    }

    LaunchedEffect(uiState.darkMode){
        println(if(uiState.darkMode) "Dark theme" else "Light theme")
    }

    LaunchedEffect(uiState.desiredLength){
        println("Generated password will be of length: ${uiState.desiredLength}")
    }

    val scrollState = rememberScrollState()

    LaunchedEffect(uiState.result){
        if (uiState.result != null){
            delay(200)
            scrollState.animateScrollTo(scrollState.maxValue)
        }
        println("Current scroll state: ${scrollState.value}")
    }

    AppTheme(darkTheme = uiState.darkMode) {
        Scaffold(
            modifier = Modifier.fillMaxSize(),
            topBar = {
                CenterAlignedTopAppBar(
                    title = {
                        Text(
                            text = "PWDGEN",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.ExtraBold
                        )
                    },
                    actions = {
                        IconButton(
                            onClick = {viewModel.toggleDarkMode()},
                            modifier = Modifier.padding(8.dp)
                        ){
                            Icon(
                                painterResource(
                                    if(uiState.darkMode) Res.drawable.moon else Res.drawable.sun,
                                ),
                                contentDescription = "Theme toggle"
                            )
                        }
                    }
                )
            }
        ){paddingValues ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
                    .padding(horizontal = 16.dp)
                    .verticalScroll(scrollState),
                horizontalAlignment = Alignment.CenterHorizontally
            ){
                AddVerticalSpace(8.dp)

                ToggleItem(
                    text = "Include Uppercase (A-Z)",
                    isChecked = uiState.isUppercaseSelected,
                    onCheckedChange = {viewModel.toggleUppercase()}
                )
                ToggleItem(
                    text = "Include Lowercase (a-z)",
                    isChecked = uiState.isLowercaseSelected,
                    onCheckedChange = {viewModel.toggleLowercase()}
                )
                ToggleItem(
                    text = "Include Numbers (0-9)",
                    isChecked = uiState.isNumbersSelected,
                    onCheckedChange = {viewModel.toggleNumbers()}
                )
                ToggleItem(
                    text = "Include Special (!@#$...)",
                    isChecked = uiState.isSpecialCharSelected,
                    onCheckedChange = {viewModel.toggleSpecialChars()}
                )

                AddVerticalSpace(16.dp)

                // Password Length Section
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .shadow(4.dp, RoundedCornerShape(12.dp)),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.surfaceVariant
                    )
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "Password Length",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.SemiBold
                            )
                            Card(
                                shape = RoundedCornerShape(8.dp),
                                colors = CardDefaults.cardColors(
                                    containerColor = MaterialTheme.colorScheme.primary
                                )
                            ) {
                                Text(
                                    text = uiState.desiredLength.toString(),
                                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Bold,
                                    color = MaterialTheme.colorScheme.onPrimary
                                )
                            }
                        }

                        AddVerticalSpace(12.dp)

                        Slider(
                            value = uiState.desiredLength.toFloat(),
                            onValueChange = { viewModel.setNewDesiredLength(it.toInt()) },
                            valueRange = 7f..75f,
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                }

                AddVerticalSpace(24.dp)

                // Generate Button Section
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .shadow(6.dp, RoundedCornerShape(16.dp)),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.surface
                    )
                ) {
                    Column(
                        modifier = Modifier.padding(20.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Button(
                            onClick = { viewModel.generatePassword() },
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(56.dp),
                            shape = RoundedCornerShape(12.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = MaterialTheme.colorScheme.primary
                            )
                        ) {
                            Text(
                                text = "Generate Password",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }

                        AnimatedVisibility(visible = isResultNull) {
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                AddVerticalSpace(16.dp)

                                HorizontalDivider(
                                    modifier = Modifier.fillMaxWidth(0.3f),
                                    thickness = 2.dp,
                                    color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)
                                )

                                AddVerticalSpace(16.dp)

                                Card(
                                    modifier = Modifier.fillMaxWidth(),
                                    shape = RoundedCornerShape(8.dp),
                                    colors = CardDefaults.cardColors(
                                        containerColor = MaterialTheme.colorScheme.tertiaryContainer
                                    )
                                ) {
                                    Row(
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .padding(12.dp),
                                        verticalAlignment = Alignment.CenterVertically,
                                        horizontalArrangement = Arrangement.SpaceBetween
                                    ) {
                                        Text(
                                            text = uiState.result ?: "",
                                            style = MaterialTheme.typography.bodyLarge,
                                            fontWeight = FontWeight.Medium,
                                            overflow = TextOverflow.Ellipsis,
                                            modifier = Modifier.weight(1f)
                                        )

                                        Row(
                                            verticalAlignment = Alignment.CenterVertically
                                        ) {
                                            AnimatedVisibility(visible = uiState.copyMessage != null) {
                                                Text(
                                                    text = uiState.copyMessage ?: "",
                                                    style = MaterialTheme.typography.bodySmall,
                                                    color = MaterialTheme.colorScheme.primary,
                                                    modifier = Modifier.padding(end = 8.dp)
                                                )
                                            }

                                            IconButton(
                                                onClick = { viewModel.copyToClipboard() },
                                                modifier = Modifier.size(36.dp)
                                            ) {
                                                Icon(
                                                    painterResource(Res.drawable.copy),
                                                    contentDescription = "Copy to clipboard",
                                                    tint = MaterialTheme.colorScheme.primary
                                                )
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                AddVerticalSpace(15.dp)
            }
        }
    }
}


@Composable
fun ToggleItem(
    text: String,
    onCheckedChange: (Boolean) -> Unit,
    isChecked: Boolean = true
){
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp)
            .shadow(2.dp, RoundedCornerShape(12.dp)),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isChecked)
                MaterialTheme.colorScheme.tertiaryContainer
            else
                MaterialTheme.colorScheme.surfaceVariant
        )
    ){
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ){
            Text(
                text = text,
                style = MaterialTheme.typography.bodyLarge,
                fontWeight = FontWeight.Medium,
                color = if (isChecked)
                    MaterialTheme.colorScheme.onTertiaryContainer
                else
                    MaterialTheme.colorScheme.onSurfaceVariant
            )

            Switch(
                checked = isChecked,
                onCheckedChange = { onCheckedChange(it) }
            )
        }
    }
}

@Composable
fun AddVerticalSpace(space: Dp){
    Spacer(
        modifier = Modifier.height(space)
    )
}

@Composable
fun AddHorizontalSpace(space: Dp){
    Spacer(
        modifier = Modifier.width(space)
    )
}