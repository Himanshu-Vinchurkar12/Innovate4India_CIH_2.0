package com.example.mindpulse.presentation.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.mindpulse.R
import com.example.mindpulse.presentation.nav.Routes

@Composable
fun DialogBox(state: String,navController: NavController) {

    if (state == "SignUp"){

        Column(
            modifier = Modifier.fillMaxSize().background(
                brush = Brush.Companion.linearGradient(
                    colors = listOf(Color.White, Color(0xFFF68B8B)),
                )
            ),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Card(
                modifier = Modifier
                    .clip(RoundedCornerShape(30.dp))
                    .wrapContentSize()
                    .padding(10.dp),
                colors = CardDefaults.cardColors(
                    containerColor = Color.White
                ),
            ) {

                Column(
                    modifier = Modifier.padding(30.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
//                    Image(
//                        painter = painterResource(R.drawable.alertdialog),
//                        contentDescription = null,
//                        modifier = Modifier.size(80.dp).clip(CircleShape),
//                        contentScale = ContentScale.Crop
//                    )
                    Spacer(Modifier.height(15.dp))
                    Text("Success", fontSize = 22.sp, color = Color(0xFFF68B8B), fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(20.dp))
                    Text(text = "Congratulation you have")
                    Spacer(Modifier.height(2.dp))
                    Text(text = "Complete your Registration")

                    Spacer(Modifier.height(15.dp))

                    Button(
                        onClick = {
                            navController.navigate(Routes.LogInScreenRoutes)

                        },
                        modifier = Modifier
                            .size(width = 200.dp, height = 50.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFFF68B8B),
                            contentColor = Color.White
                        ),
                        shape = RoundedCornerShape(15.dp)
                    ) {
                        Text("Done", fontSize = 20.sp)
                    }

                    Spacer(Modifier.height(10.dp))

                }
            }
        }

    }
    else{
        Column(
            modifier = Modifier.fillMaxSize().background(
                brush = Brush.Companion.linearGradient(
                    colors = listOf(Color.White, Color(0xFFF68B8B)),
                )
            ),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Card(
                modifier = Modifier
                    .clip(RoundedCornerShape(30.dp))
                    .wrapContentSize()
                    .padding(10.dp),
                colors = CardDefaults.cardColors(
                    containerColor = Color.White
                ),
            ) {

                Column(
                    modifier = Modifier.padding(30.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
//                    Image(
//                        painter = painterResource(R.drawable.alertdialog),
//                        contentDescription = null,
//                        modifier = Modifier.size(80.dp).clip(CircleShape),
//                        contentScale = ContentScale.Crop
//                    )
                    Spacer(Modifier.height(15.dp))
                    Text("Success", fontSize = 22.sp, color = Color(0xFFF68B8B), fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(20.dp))
                    Text(text = "Congratulation you have")
                    Spacer(Modifier.height(2.dp))
                    Text(text = "Successfully LogIn")

                    Spacer(Modifier.height(15.dp))

                    Button(
                        onClick = {
                            navController.navigate(Routes.HomeScreenRoutes)
                        },
                        modifier = Modifier
                            .size(width = 200.dp, height = 50.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFFF68B8B),
                            contentColor = Color.White
                        ),
                        shape = RoundedCornerShape(15.dp)
                    ) {
                        Text("Done", fontSize = 20.sp)
                    }

                    Spacer(Modifier.height(10.dp))

                }
            }
        }
    }

}