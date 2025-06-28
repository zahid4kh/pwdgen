
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.spring
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.rememberLazyGridState
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.WindowPosition
import androidx.compose.ui.window.WindowState
import kotlinx.coroutines.delay
import org.jetbrains.compose.resources.painterResource
import pwdgen.resources.*
import theme.AppTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun App(
    viewModel: MainScreen,
    windowState: WindowState
) {
    val uiState by viewModel.uiState.collectAsState()
    val isResultNull = uiState.result != null
    val gridState = rememberLazyGridState()
    var resizeClicked by remember { mutableStateOf(false) }

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

    LaunchedEffect(uiState.result) {
        if (uiState.result != null) {
            delay(200)
            gridState.animateScrollToItem(gridState.layoutInfo.totalItemsCount - 1)
        }
    }

    if (resizeClicked){
        windowState.size = windowState.size.copy(width = 820.dp, height = 600.dp)
        windowState.position = WindowPosition.Aligned(Alignment.Center)
    }else{
        windowState.size = windowState.size.copy(width = 400.dp, height = 570.dp)
        windowState.position = WindowPosition.Aligned(Alignment.Center)
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
                        TooltipBox(
                            positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
                            tooltip = {
                                PlainTooltip {
                                    Text(if(uiState.darkMode) "Go Light" else "Go Dark")
                                }
                            },
                            state = rememberTooltipState()
                        ){
                            IconButton(
                                onClick = {viewModel.toggleDarkMode()},
                                modifier = Modifier.padding(8.dp)
                            ){
                                Icon(
                                    painterResource(
                                        if(uiState.darkMode) Res.drawable.moon else Res.drawable.sun,
                                    ),
                                    contentDescription = "Theme toggle",
                                    tint = MaterialTheme.colorScheme.primary
                                )
                            }
                        }

                    },
                    navigationIcon = {
                        TooltipBox(
                            positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
                            tooltip = {PlainTooltip { Text("Resize window") }},
                            state = rememberTooltipState()
                        ){
                            IconButton(
                                onClick = {resizeClicked = !resizeClicked},
                                modifier = Modifier.padding(8.dp)
                            ){
                                Icon(
                                    painterResource(if(resizeClicked) Res.drawable.minimize else Res.drawable.maximize),
                                    contentDescription = "Expand window",
                                    tint = MaterialTheme.colorScheme.primary
                                )
                            }
                        }

                    }
                )
            }
        ){paddingValues ->
            LazyVerticalGrid(
                state = gridState,
                columns = GridCells.Adaptive(400.dp),
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
                    .animateContentSize(),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ){
                item(span = { GridItemSpan(maxLineSpan)}){
                    AddVerticalSpace(8.dp)
                }

                item {
                    ToggleItem(
                        text = "Include Uppercase (A-Z)",
                        isChecked = uiState.isUppercaseSelected,
                        onCheckedChange = { viewModel.toggleUppercase() },
                        modifier = Modifier.animateItem(placementSpec = spring())
                    )
                }
                item {
                    ToggleItem(
                        text = "Include Lowercase (a-z)",
                        isChecked = uiState.isLowercaseSelected,
                        onCheckedChange = { viewModel.toggleLowercase() },
                        modifier = Modifier.animateItem(placementSpec = spring())
                    )
                }
                item {
                    ToggleItem(
                        text = "Include Numbers (0-9)",
                        isChecked = uiState.isNumbersSelected,
                        onCheckedChange = { viewModel.toggleNumbers() },
                        modifier = Modifier.animateItem(placementSpec = spring())
                    )
                }
                item {
                    ToggleItem(
                        text = "Include Special (!@#$...)",
                        isChecked = uiState.isSpecialCharSelected,
                        onCheckedChange = { viewModel.toggleSpecialChars() },
                        modifier = Modifier.animateItem(placementSpec = spring())
                    )
                }

                item(span = { GridItemSpan(maxLineSpan) }) {
                    AddVerticalSpace(16.dp)
                }

                item(span = { GridItemSpan(maxLineSpan) }) {
                    PwdLengthSection(
                        uiState = uiState,
                        viewModel = viewModel
                    )
                }

                item(span = { GridItemSpan(maxLineSpan) }) {
                    AddVerticalSpace(24.dp)
                }

                item(span = { GridItemSpan(maxLineSpan) }) {
                    GenerateButtonSection(
                        viewModel = viewModel,
                        uiState = uiState,
                        isResultNull = isResultNull
                    )
                }

                item(span = { GridItemSpan(maxLineSpan) }) {
                    AddVerticalSpace(15.dp)
                }
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