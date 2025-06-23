package com.example.mindpulse.presentation.screens


import android.widget.Toast
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.constraintlayout.compose.ConstraintLayout
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.mindpulse.R
import com.example.mindpulse.domain.models.UserDataModel
import com.example.mindpulse.presentation.nav.Routes
import com.example.mindpulse.presentation.viewmodel.MyViewModel
import java.nio.file.WatchEvent


@Composable
fun SignUpScreen(viewModel: MyViewModel = hiltViewModel(), navController: NavController) {

    val createUserState = viewModel.createUserState.collectAsState()
    val context = LocalContext.current
    val configuration = LocalConfiguration.current
    val screenWidth = configuration.screenWidthDp.dp
    val screenHeight = configuration.screenHeightDp.dp

    when {
        createUserState.value.isLoading -> {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator()
            }

        }

        createUserState.value.isError != null -> {
            Text(text = createUserState.value.isError.toString())
        }

        createUserState.value.isSuccess != null -> {

            Toast.makeText(context, "User Register", Toast.LENGTH_SHORT).show()

        }
    }


    val firstName = remember { mutableStateOf("") }
    val lastName = remember { mutableStateOf("") }
    val userEmail = remember { mutableStateOf("") }
    val createPassword = remember { mutableStateOf("") }
    val confirmPassword = remember { mutableStateOf("") }


    val scrollState = rememberScrollState()


    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(
                brush = Brush.linearGradient(
                    colors = listOf(Color.White, Color(0xFF77EADE))
                )
            )
            .verticalScroll(scrollState)
            .padding(horizontal = 16.dp)
    ) {

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.AutoMirrored.Rounded.ArrowBack,
                contentDescription = null,
                modifier = Modifier
                    .size((screenWidth * 0.08f))
                    .clickable {
                        navController.navigate(
                            Routes.LogInScreenRoutes
                        )
                    }
            )
            Spacer(modifier = Modifier.width(16.dp))

            Text(
                text = "Sign-Up",
                fontWeight = FontWeight.Bold,
                fontSize = (screenWidth.value * 0.07).sp,
                color = Color.Black
            )
        }

        Spacer(Modifier.height(screenHeight * 0.02f))

        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = (screenWidth.value * 0.06).dp)
                .background(Color.White)
        ) {
            Box(
                modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp).clip(shape = CircleShape),
                contentAlignment = Alignment.Center
            ){
                Image(painter = painterResource(R.drawable.logoforsignup), contentDescription = null)
            }
        }


    }


}




