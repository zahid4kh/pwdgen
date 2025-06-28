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
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import org.jetbrains.compose.resources.painterResource
import pwdgen.resources.Res
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

                ToggleSection(
                    uiState = uiState,
                    viewModel = viewModel
                )

                AddVerticalSpace(16.dp)

                PwdLengthSection(
                    uiState = uiState,
                    viewModel = viewModel
                )

                AddVerticalSpace(24.dp)

                GenerateButtonSection(
                    viewModel = viewModel,
                    uiState = uiState,
                    isResultNull = isResultNull
                )

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