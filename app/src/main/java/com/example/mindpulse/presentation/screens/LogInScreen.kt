package com.example.shoppingapp.presentation.screens

import android.widget.Toast
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.HorizontalDivider
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.constraintlayout.compose.ConstraintLayout
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.mindpulse.presentation.nav.Routes
import com.example.mindpulse.presentation.viewmodel.MyViewModel



@Composable
fun LogInScreen(viewModel:MyViewModel = hiltViewModel(),navController: NavController) {


    val context = LocalContext.current
    val logInUserState = viewModel.logInUserState.collectAsState()



    when{
        logInUserState.value.isLoading -> {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ){
                CircularProgressIndicator()
            }
        }
        logInUserState.value.isError != null -> {
            Toast.makeText(context,logInUserState.value.isError.toString(),Toast.LENGTH_SHORT).show()
        }
        logInUserState.value.isSuccess != null -> {
            navController.navigate(Routes.DialogBoxRoutes(state = "LogIn"))
            Toast.makeText(context,"LogIn Successfully",Toast.LENGTH_SHORT).show()
            logInUserState.value.isSuccess = null
        }
    }


    val interactionSource = remember { MutableInteractionSource() }
    val isPressed = interactionSource.collectIsPressedAsState()

    val interactionSource1 = remember { MutableInteractionSource() }
    val isPressed1 = interactionSource1.collectIsPressedAsState()

    val userEmail = remember { mutableStateOf("") }
    val password = remember { mutableStateOf("") }
}

  // Use the state to change the background color
//    val color = if (isPressed.value) Color(0xFFEF8C8C) else Color.White
//    val color1 = if (isPressed1.value) Color(0xFFEF8C8C) else Color.White






//
//    ConstraintLayout(modifier = Modifier
//        .padding(start = 131.dp)
//        .fillMaxWidth())
//    {
//        val (topBar) = createRefs()
//
//        Image(
//            painter = painterResource(drawable.ellipse),
//            contentDescription = null,
//            modifier = Modifier
//                .size(300.dp)
//                .padding(bottom = 108.dp)
//                .constrainAs(topBar) {
//                    top.linkTo(parent.top)
//                    start.linkTo(parent.start)
//                    end.linkTo(parent.end)
//                },
//        )
//
//    }
//
//    ConstraintLayout(
//        modifier = Modifier.padding(top = 780.dp, end = 318.dp)
//        .fillMaxWidth()
//    )
//    {
//        val (topBar) = createRefs()
//
//        Image(
//            painter = painterResource(.drawable.ellipse_2),
//            contentDescription = null,
//            modifier = Modifier
//                .size(150.dp)
//                .constrainAs(topBar) {
//                    top.linkTo(parent.bottom)
//                    start.linkTo(parent.absoluteLeft)
//                    end.linkTo(parent.end)
//                },
//        )
//
//    }
//
//    Column(
//        modifier = Modifier
//            .fillMaxSize()
//            .padding(10.dp)
//    ) {
//        Spacer(Modifier.height(46.dp))
//
//        Image(
//            painter = painterResource(.drawable.ic_back),
//            contentDescription = null,
//            modifier = Modifier.size(40.dp).clickable{
//                navController.popBackStack()
//            }
//        )
//        Spacer(Modifier.height(40.dp))
//
//        Text(
//            text = "LogIn",
//            fontSize = 30.sp,
//            fontWeight = FontWeight.Bold,
//            fontFamily = FontFamily.Serif,
//            modifier = Modifier.padding(start = 20.dp)
//        )
//
//
//        Spacer(Modifier.height(30.dp))
//
//
//        OutlinedTextField(
//            value = userEmail.value,
//            onValueChange = {
//                userEmail.value = it
//            },
//            label = {
//                Text(text = "Enter a Email")
//            },
//            singleLine = true,
//            shape = RoundedCornerShape(15.dp),
//            colors = OutlinedTextFieldDefaults.colors(
//                focusedBorderColor = Color(0xFFEF8C8C),
//                unfocusedBorderColor = Color(0xFFEF8C8C)
//            ),
//            modifier = Modifier
//                .size(width = 360.dp, height = 62.dp)
//                .padding(start = 10.dp)
//        )
//        Spacer(Modifier.height(30.dp))
//
//        OutlinedTextField(
//            value = password.value,
//            onValueChange = {
//                password.value = it
//            },
//            label = {
//                Text(text = "Enter Password")
//            },
//            singleLine = true,
//            shape = RoundedCornerShape(15.dp),
//            colors = OutlinedTextFieldDefaults.colors(
//                focusedBorderColor = Color(0xFFEF8C8C),
//                unfocusedBorderColor = Color(0xFFEF8C8C)
//            ),
//            modifier = Modifier
//                .size(width = 360.dp, height = 60.dp)
//                .padding(start = 10.dp)
//        )
//        Spacer(Modifier.height(25.dp))
//
//
//        Button(
//            onClick = {
//                if ( userEmail.value.isEmpty() || password.value.isEmpty() ) {
//                    Toast.makeText(context, "Please fill all the fields", Toast.LENGTH_SHORT).show()
//                } else {
//                        val userData = (
//                            email = userEmail.value,
//                            password = password.value,
//                        )
//                        viewModel.loginUser(userData)
//                }
//            },
//            modifier = Modifier
//                .size(width = 360.dp, height = 50.dp)
//                .padding(start = 10.dp),
//            colors = ButtonDefaults.buttonColors(
//                containerColor = Color(0xFFF68B8B),
//                contentColor = Color.White
//            ),
//            shape = RoundedCornerShape(15.dp)
//        ) {
//
//            Text(text = "Log In", fontSize = 22.sp)
//        }
//
//        Spacer(Modifier.height(15.dp))
//
//        Row(
//            modifier = Modifier.fillMaxWidth(),
//            horizontalArrangement = Arrangement.Center
//        ) {
//            Text(text = "Don't have an account?")
//            Spacer(Modifier.width(6.dp))
//            Text(
//                text = "SignUp",
//                fontSize = 18.sp,
//                fontWeight = FontWeight.SemiBold,
//                color = Color(0xFFF68B8B),
//                modifier = Modifier.clickable {
//                    navController.navigate(Routes.SignUpScreenRoutes)
//
//                })
//
//        }
//
//        Spacer(Modifier.height(16.dp))
//
//        Row(
//            modifier = Modifier.fillMaxWidth().padding(start = 30.dp, end = 30.dp)
//        ) {
//            HorizontalDivider(thickness = 3.dp, color = Color.Black, modifier = Modifier.width(130.dp).padding(top = 11.dp))
//            Spacer(Modifier.width(15.dp))
//            Text(text = "OR", fontWeight = FontWeight.SemiBold, fontFamily = FontFamily.Serif)
//            Spacer(Modifier.width(15.dp))
//            HorizontalDivider(thickness = 3.dp, color = Color.Black, modifier = Modifier.width(130.dp).padding(top = 11.dp))
//
//        }
//
//        Spacer(Modifier.height(26.dp))
//
//        Button(
//            onClick = {},
//            modifier = Modifier
//                .size(width = 360.dp, height = 55.dp)
//                .padding(start = 10.dp),
//            border = BorderStroke(2.dp, Color(0xFFEF8C8C)),
//            shape = RoundedCornerShape(15.dp),
//            interactionSource = interactionSource,
//            colors = ButtonDefaults.buttonColors(
//                containerColor = color,
//                contentColor = Color.DarkGray
//            ),
//            elevation = ButtonDefaults.buttonElevation(
//                defaultElevation = 5.dp,
//            )
//
//
//        ) {
//            Row(
//                modifier = Modifier.fillMaxWidth()
//            ) {
//                Image(
//                    painter = painterResource(.drawable.face),
//                    contentDescription = null,
//                    modifier = Modifier
//                        .size(58.dp),
//                    contentScale = ContentScale.Crop
//                )
//                Spacer(Modifier.width(20.dp))
//                Text(
//                    text = "Log in with Facebook",
//                    fontSize = 17.sp,
//                    modifier = Modifier.padding(top = 10.dp)
//                )
//
//            }
//        }
//        Spacer(Modifier.height(26.dp))
//
//        Button(
//            onClick = {},
//            modifier = Modifier
//                .size(width = 360.dp, height = 55.dp)
//                .padding(start = 10.dp),
//            border = BorderStroke(2.dp, Color(0xFFEF8C8C)),
//            shape = RoundedCornerShape(15.dp),
//            interactionSource = interactionSource1,
//            colors = ButtonDefaults.buttonColors(
//                containerColor = color1,
//                contentColor = Color.DarkGray
//            ),
//            elevation = ButtonDefaults.buttonElevation(
//                defaultElevation = 5.dp,
//            )
//
//
//        ) {
//            Row(
//                modifier = Modifier.fillMaxWidth()
//            ) {
//                Image(
//                    painter = painterResource(drawable.google),
//                    contentDescription = null,
//                    modifier = Modifier
//                        .size(58.dp)
//                        .clip(CircleShape),
//                    contentScale = ContentScale.Crop
//                )
//                Spacer(Modifier.width(20.dp))
//                Text(
//                    text = "Log in with Google",
//                    fontSize = 17.sp,
//                    modifier = Modifier.padding(top = 10.dp)
//                )
//
//            }
//        }
//    }
//
//
//
//
//}
