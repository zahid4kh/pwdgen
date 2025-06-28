
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
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
        println(
            if(uiState.darkMode) "Dark theme" else "Light theme"
        )
    }

    LaunchedEffect(uiState.desiredLength){
        println("Generated password will be of length: ${uiState.desiredLength}")
    }


    AppTheme(darkTheme = uiState.darkMode) {
        Scaffold(
            modifier = Modifier.fillMaxSize(),
            topBar = {
                CenterAlignedTopAppBar(
                    title = {
                        Text(
                            text = "PWDGEN",
                            style = MaterialTheme.typography.titleLarge
                        )
                    },
                    actions = {
                        IconButton(onClick = {viewModel.toggleDarkMode()}){
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
                    .padding(paddingValues),
                horizontalAlignment = Alignment.CenterHorizontally
            ){
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
                    onCheckedChange = {
                        viewModel.toggleSpecialChars()
                    }
                )

                Row(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ){
                    Slider(
                        value = uiState.desiredLength.toFloat(),
                        onValueChange = {it ->
                            viewModel.setNewDesiredLength(it.toInt())
                        },
                        valueRange = 7f..75f,
                        modifier = Modifier.weight(1f)
                    )
                    AddHorizontalSpace(10.dp)
                    Text(text = uiState.desiredLength.toString())
                }

                AddVerticalSpace(20.dp)

                Row(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ){
                    OutlinedButton(
                        onClick = {
                            viewModel.generatePassword()
                        },
                        shape = MaterialTheme.shapes.medium
                    ){
                        Text(
                            text = "Generate"
                        )
                    }

                    AnimatedVisibility(
                        visible = isResultNull
                    ){
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.End
                        ){
                            AddHorizontalSpace(12.dp)

                            Text(
                                text = uiState.result?:"",
                                style = MaterialTheme.typography.labelMedium,
                                fontWeight = FontWeight.Bold,
                                overflow = TextOverflow.Ellipsis,
                                softWrap = false,
                                modifier = Modifier.weight(1f)
                            )

                            AddHorizontalSpace(12.dp)

                            AnimatedVisibility(
                                visible = uiState.copyMessage != null
                            ){
                                Text(
                                    text = uiState.copyMessage?:"",
                                    style = MaterialTheme.typography.bodySmall
                                )
                            }


                            IconButton(
                                onClick = {viewModel.copyToClipboard()}
                            ){
                                Icon(
                                    painterResource(Res.drawable.copy),
                                    contentDescription = "Copy to clipboard"
                                )
                            }

                        }
                    }
                }
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
    Box(
        modifier = Modifier.padding(12.dp)
    ){
        OutlinedCard(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.outlinedCardColors(
                containerColor = MaterialTheme.colorScheme.tertiaryContainer
            )
        ){
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .heightIn(min = 50.dp)
                    .padding(horizontal = 5.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ){
                Text(
                    text = text,
                    style = MaterialTheme.typography.bodyLarge
                )

                Switch(
                    checked = isChecked,
                    onCheckedChange = {it->
                        onCheckedChange(it)
                    }
                )
            }
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