import androidx.compose.runtime.Composable

@Composable
fun ToggleSection(
    uiState: MainScreen.UiState,
    viewModel: MainScreen
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
        onCheckedChange = {viewModel.toggleSpecialChars()}
    )
}