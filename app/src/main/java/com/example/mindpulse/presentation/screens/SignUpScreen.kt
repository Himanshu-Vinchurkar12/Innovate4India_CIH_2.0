package com.example.mindpulse.presentation.screens


import android.util.Log
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
import androidx.compose.material3.CardDefaults
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
            Log.d("TAG","data : ${createUserState.value.isSuccess}")

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

        Spacer(Modifier.height(screenHeight * 0.05f))
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
                .fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            shape = RoundedCornerShape(12.dp),
            elevation = CardDefaults.cardElevation(6.dp)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 16.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier
                        .size(100.dp) // circle size
                        .clip(CircleShape)
                        .background(Color.LightGray) // Optional: background behind image
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.logoforsignup),
                        contentDescription = "Logo",
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Crop
                    )
                }

                Spacer(Modifier.height(screenHeight * 0.02f))

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {

                    OutlinedTextField(
                        value = firstName.value,
                        onValueChange = {
                            firstName.value = it
                        },
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.weight(1f),
                        placeholder = {
                            Text(
                                text = "First Name",
                                fontSize = (screenWidth.value * 0.03).sp,
                                color = Color.DarkGray
                            )
                        },
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedBorderColor = Color.Gray,
                            unfocusedBorderColor = Color.LightGray,
                            unfocusedContainerColor = Color.White
                        )

                    )

                    Spacer(Modifier.width(screenWidth * 0.05f))

                    OutlinedTextField(
                        value = lastName.value,
                        onValueChange = {
                            lastName.value = it
                        },
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.weight(1f),
                        placeholder = {
                            Text(
                                text = "Last Name",
                                fontSize = (screenWidth.value * 0.03).sp,
                                color = Color.DarkGray
                            )
                        },
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedBorderColor = Color.Gray,
                            unfocusedBorderColor = Color.LightGray,
                            unfocusedContainerColor = Color.White
                        )

                    )

                }

                Spacer(Modifier.height(screenHeight * 0.02f))

                OutlinedTextField(
                    value = userEmail.value,
                    onValueChange = {
                        userEmail.value = it
                    },
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                    placeholder = {
                        Text(
                            text = "Enter Email",
                            fontSize = (screenWidth.value * 0.03).sp,
                            color = Color.DarkGray
                        )
                    },
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color.Gray,
                        unfocusedBorderColor = Color.LightGray,
                        unfocusedContainerColor = Color.White
                    )

                )

                Spacer(Modifier.height(screenHeight * 0.02f))

                OutlinedTextField(
                    value = createPassword.value,
                    onValueChange = {
                        createPassword.value = it
                    },
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                    placeholder = {
                        Text(
                            text = "Create Password",
                            fontSize = (screenWidth.value * 0.03).sp,
                            color = Color.DarkGray
                        )
                    },
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color.Gray,
                        unfocusedBorderColor = Color.LightGray,
                    )

                )
                Spacer(Modifier.height(screenHeight * 0.02f))

                OutlinedTextField(
                    value = confirmPassword.value,
                    onValueChange = {
                        confirmPassword.value = it
                    },
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                    placeholder = {
                        Text(
                            text = "Confirm Password",
                            fontSize = (screenWidth.value * 0.03).sp,
                            color = Color.DarkGray
                        )
                    },
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color.Gray,
                        unfocusedBorderColor = Color.LightGray,
                        unfocusedContainerColor = Color.White
                    )

                )

                Spacer(Modifier.height(screenHeight * 0.03f))
                Button(
                    onClick = {
                        if (firstName.value.isEmpty() || lastName.value.isEmpty() || userEmail.value.isEmpty() || createPassword.value.isEmpty() || confirmPassword.value.isEmpty()) {
                            Toast.makeText(
                                context,
                                "Please fill all the fields",
                                Toast.LENGTH_SHORT
                            ).show()
                        } else {
                            if (createPassword.value == confirmPassword.value) {
                                val userData = UserDataModel(
                                    firstName = firstName.value,
                                    lastName = lastName.value,
                                    email = userEmail.value,
                                    password = createPassword.value,
                                )
                                viewModel.createUser(userData)
                            } else {
                                Toast.makeText(
                                    context,
                                    "Password does not match",
                                    Toast.LENGTH_SHORT
                                )
                                    .show()
                            }
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFF037368),
                        contentColor = Color.White
                    ),
                    shape = RoundedCornerShape(12.dp)
                ) {

                    Text(text = "Sign Up", fontSize = 22.sp)
                }

                Spacer(Modifier.height(screenHeight * 0.02f))

                Row(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ) {
                    Text(
                        text = "Already have an account?"
                    )
                    Spacer(Modifier.width(screenWidth * 0.012f))
                    Text(
                        text = "LogIn",
                        color = Color(0xFF3F55DE),
                        modifier = Modifier.clickable{
                            navController.navigate(Routes.LogInScreenRoutes)
                        }
                    )
                }

                Spacer(Modifier.height(screenHeight * 0.05f))
            }
        }


    }


}




