
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.awt.Toolkit
import java.awt.datatransfer.StringSelection

class MainScreen {
    private val _uiState = MutableStateFlow(UiState())
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()

    val scope = CoroutineScope(Dispatchers.Main)

    init {
        updateCharacterList()

        val password = _uiState.value.currentListOfChars
        val theme = _uiState.value.darkMode
        println("App launched, current password is: $password and dark theme is on: $theme")
    }

    private fun updateCharacterList() {
        val currentState = _uiState.value
        val newCharList = mutableListOf<String>()

        if (currentState.isUppercaseSelected) {
            newCharList += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".map { it.toString() }
        }
        if (currentState.isLowercaseSelected) {
            newCharList += "abcdefghijklmnopqrstuvwxyz".map { it.toString() }
        }
        if (currentState.isNumbersSelected) {
            newCharList += "1234567890".map { it.toString() }
        }
        if (currentState.isSpecialCharSelected) {
            newCharList += "!§\$%&/()=?*+#".map { it.toString() }
        }

        _uiState.update { it.copy(currentListOfChars = newCharList) }
    }

    fun generatePassword() {
        val chars = _uiState.value.currentListOfChars
        val desiredLength = _uiState.value.desiredLength
        val shuffled = chars.shuffled()

        val takeSpecificLength = shuffled.take(desiredLength)
        val iterator = takeSpecificLength.listIterator()

        var finalPassword = ""
        while(iterator.hasNext()){
            finalPassword += iterator.next()
        }

        _uiState.update {
            it.copy(result = finalPassword)
        }

        println("Generated password is: $finalPassword with length: ${finalPassword.length}")
    }

    fun toggleUppercase() {
        _uiState.update {
            it.copy(isUppercaseSelected = !it.isUppercaseSelected)
        }
        updateCharacterList()
    }

    fun toggleLowercase() {
        _uiState.update {
            it.copy(isLowercaseSelected = !it.isLowercaseSelected)
        }
        updateCharacterList()
    }

    fun toggleNumbers() {
        _uiState.update {
            it.copy(isNumbersSelected = !it.isNumbersSelected)
        }
        updateCharacterList()
    }

    fun toggleSpecialChars() {
        _uiState.update {
            it.copy(isSpecialCharSelected = !it.isSpecialCharSelected)
        }
        updateCharacterList()
    }

    fun setNewDesiredLength(length: Int) {
        _uiState.update {
            it.copy(desiredLength = length)
        }
    }

    fun copyToClipboard(){
        val pwdToCopy = _uiState.value.result?:""
        val clipboard = Toolkit.getDefaultToolkit().systemClipboard
        try {
            scope.launch {
                if(pwdToCopy.isBlank()) {
                    showCopyFailMessage("Empty content was not copied!")
                } else {
                    clipboard.setContents(StringSelection(pwdToCopy), null)
                    showCopySuccessMessage("Copied!")
                }
                delay(800)

                showCopySuccessMessage(null)
            }
        }catch(e: IllegalStateException){
            scope.launch {
                showCopyFailMessage("Failed to copy!")
                delay(500)
                showCopyFailMessage(null)
            }
            e.printStackTrace()
            println("Could not copy to clipboard: ${e.message?.take(50)}")
        }
    }

    fun showWarningMessage(message: String) {
        _uiState.update {
            it.copy(warningMessage = message)
        }
    }

    fun showCopySuccessMessage(message: String?){
        _uiState.update {
            it.copy(copyMessage = message)
        }
    }

    fun showCopyFailMessage(message: String?){
        _uiState.update {
            it.copy(copyMessage = message)
        }
    }

    fun toggleDarkMode() {
        _uiState.update {
            it.copy(darkMode = !_uiState.value.darkMode)
        }
    }

    data class UiState(
        val darkMode: Boolean = false,
        val desiredLength: Int = 22,
        val isUppercaseSelected: Boolean = true,
        val isLowercaseSelected: Boolean = true,
        val isNumbersSelected: Boolean = true,
        val isSpecialCharSelected: Boolean = true,
        val currentListOfChars: MutableList<String> = mutableListOf(),
        val isResultShown: Boolean = false,
        val result: String? = null,
        val warningMessage: String? = null,
        val copyMessage: String? = null
    )
}