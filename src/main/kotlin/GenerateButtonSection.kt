
import MainScreen.UiState
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.painterResource
import pwdgen.resources.Res
import pwdgen.resources.copy

@Composable
fun GenerateButtonSection(
    viewModel: MainScreen,
    uiState: UiState,
    isResultNull: Boolean
){
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
}