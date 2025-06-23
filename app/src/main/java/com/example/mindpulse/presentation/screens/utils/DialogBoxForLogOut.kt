package com.example.shoppingapp.presentation.screens.utils

import android.widget.Toast
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil3.compose.AsyncImage
import com.example.mindpulse.domain.models.UserDataModel
import com.example.mindpulse.presentation.nav.Routes
import com.example.mindpulse.presentation.viewmodel.MyViewModel
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Composable
fun DialogBoxForLogOut(
    viewModel: MyViewModel,
    navController: NavController,
    firebaseAuth: FirebaseAuth
) {

//    val getUserState = viewModel.getUserState.collectAsState()
//
//    val coroutineScope = rememberCoroutineScope()
//
//    val context = LocalContext.current
//
//    LaunchedEffect(key1 = Unit) {
//        coroutineScope.launch(Dispatchers.IO) {
//            viewModel.getUser()
//        }
//    }
//
//    when {
//        getUserState.value.isLoading -> {
//            Box(
//                modifier = Modifier.fillMaxSize(),
//                contentAlignment = Alignment.Center
//            ) {
//                CircularProgressIndicator()
//            }
//        }
//
//        getUserState.value.isError != null -> {
//            Text(text = getUserState.value.isError.toString())
//        }
//
//        getUserState.value.isSuccess != null -> {
//            Column(
//                modifier = Modifier
//                    .fillMaxSize()
//                    .background(
//                        brush = Brush.Companion.linearGradient(
//                            colors = listOf(Color.White, Color(0xFFF68B8B)),
//                        )
//                    ),
//                verticalArrangement = Arrangement.Center,
//                horizontalAlignment = Alignment.CenterHorizontally
//            ) {
//                Card(
//                    modifier = Modifier
//                        .clip(RoundedCornerShape(30.dp))
//                        .wrapContentSize()
//                        .padding(10.dp),
//                    colors = CardDefaults.cardColors(
//                        containerColor = Color.White
//                    ),
//                ) {
//
//                    Column(
//                        modifier = Modifier.padding(30.dp),
//                        horizontalAlignment = Alignment.CenterHorizontally
//                    ) {
//                        AsyncImage(
//                            model = UserDataModel.profilePicture,
//                            contentDescription = null,
//                            modifier = Modifier
//                                .size(80.dp)
//                                .clip(CircleShape),
//                            contentScale = ContentScale.Crop
//                        )
//
//                        Spacer(Modifier.height(15.dp))
//                        Text(
//                            "LogOut",
//                            fontSize = 22.sp,
//                            color = Color(0xFFF68B8B),
//                            fontWeight = FontWeight.SemiBold
//                        )
//                        Spacer(Modifier.height(20.dp))
//                        Text(text = "Do You Really")
//                        Text(text = "Want To LogOut")
//
//
//                        Spacer(Modifier.height(15.dp))
//
//                        Row {
//                            Button(
//                                onClick = {
//                                    navController.navigate(Routes.ProfileScreenRoutes)
//                                },
//                                modifier = Modifier
//                                    .size(width = 120.dp, height = 50.dp),
//                                colors = ButtonDefaults.buttonColors(
//                                    containerColor = Color.White,
//                                    contentColor = Color.Red
//                                ),
//                                border = BorderStroke(2.dp, Color(0xFFEF8C8C)),
//                                shape = RoundedCornerShape(15.dp)
//                            ) {
//                                Text("Cancel", fontSize = 20.sp)
//                            }
//
//                            Spacer(Modifier.width(10.dp))
//
//                            Button(
//                                onClick = {
//                                    firebaseAuth.signOut()
//                                    navController.navigate(Routes.LogInScreenRoutes)
//                                    Toast.makeText(
//                                        context,
//                                        "LogOut Successfully",
//                                        Toast.LENGTH_SHORT
//                                    ).show()
//
//                                },
//                                modifier = Modifier
//                                    .size(width = 120.dp, height = 50.dp),
//                                colors = ButtonDefaults.buttonColors(
//                                    containerColor = Color(0xFFF68B8B),
//                                    contentColor = Color.White
//                                ),
//                                shape = RoundedCornerShape(15.dp)
//                            ) {
//                                Text("LogOut", fontSize = 20.sp)
//                            }
//
//
//                        }
//
//                        Spacer(Modifier.height(10.dp))
//
//                    }
//                }
//            }
//
//        }
//    }


}