package com.example.mindpulse.presentation.nav

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.rounded.FavoriteBorder
import androidx.compose.material.icons.rounded.Person
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.navigation
import androidx.navigation.compose.rememberNavController
import com.example.bottombar.AnimatedBottomBar
import com.example.bottombar.components.BottomBarItem
import com.example.bottombar.model.IndicatorDirection
import com.example.bottombar.model.IndicatorStyle
import com.example.mindpulse.presentation.screens.DialogBox
import com.example.shoppingapp.presentation.screens.LogInScreen
import com.example.mindpulse.presentation.screens.ProfileScreen
import com.example.mindpulse.presentation.screens.SignUpScreen
import com.example.mindpulse.presentation.screens.utils.HomeScreen
import com.example.shoppingapp.presentation.screens.utils.DialogBoxForLogOut
import com.example.mindpulse.presentation.viewmodel.MyViewModel
import com.google.firebase.auth.FirebaseAuth

@Composable
fun Nav(viewModel: MyViewModel = hiltViewModel(), firebaseAuth: FirebaseAuth) {

    val navController = rememberNavController()


    var selectedItem = remember { mutableIntStateOf(0) }

    var showBottomBar = remember { mutableStateOf(false) }

    val bottomNavItem = listOf(
        BottomItems(
            name = "Home",
            icon = Icons.Default.Home
        ),
        BottomItems(
            name = "Like",
            icon = Icons.Rounded.FavoriteBorder
        ),
        BottomItems(
            name = "Cart",
            icon = Icons.Filled.ShoppingCart
        ),
        BottomItems(
            name = "Profile",
            icon = Icons.Rounded.Person
        ),

        )



    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = {

            if (showBottomBar.value == true) {
                AnimatedBottomBar(
                    selectedItem = selectedItem.intValue,
                    itemSize = bottomNavItem.size,
                    containerColor = Color.Transparent,
                    indicatorStyle = IndicatorStyle.FILLED,
                    indicatorColor = Color(0xFFE37E7E),
                    indicatorDirection = IndicatorDirection.BOTTOM
                ) {
                    bottomNavItem.forEachIndexed { index, items ->

                        BottomBarItem(
                            selected = selectedItem.intValue == index,
                            imageVector = items.icon,
                            label = items.name,
                            containerColor = Color.Transparent,
                            onClick = {
                                selectedItem.intValue = index

                                when (index) {
                                    0 -> {
                                        navController.navigate(Routes.HomeScreenRoutes)
                                        {
                                            popUpTo(Routes.HomeScreenRoutes) {
                                                inclusive = true
                                            }
                                        }
                                    }

                                    1 -> {
                                        navController.navigate(Routes.WishListScreenRoutes)
                                        {
                                            popUpTo(Routes.HomeScreenRoutes) {
                                                inclusive = true
                                            }
                                        }
                                    }

                                    2 -> {
                                        navController.navigate(Routes.CartScreenRoutes)
                                        {
                                            popUpTo(Routes.HomeScreenRoutes) {
                                                inclusive = true
                                            }
                                        }
                                    }

                                    3 -> {
                                        navController.navigate(Routes.ProfileScreenRoutes)
                                        {
                                            popUpTo(Routes.HomeScreenRoutes) {
                                                inclusive = true
                                            }
                                        }
                                    }

                                }
                            }

                        )
                    }
                }
            }


        }
    )
    { innerPadding ->


        Box(
            modifier = Modifier
        ) {

            NavHost(
                navController = navController,
                startDestination = Routes.SignUpScreenRoutes
            ) {

                composable<Routes.LogInScreenRoutes> {
                    showBottomBar.value = false
                    LogInScreen(navController = navController)

                }

                composable<Routes.SignUpScreenRoutes> {
                    showBottomBar.value = false
                    SignUpScreen(
                        navController = navController
                    )
                }

                composable<Routes.HomeScreenRoutes>{
                    showBottomBar.value = true
                    HomeScreen(
                        navController = navController
                    )
                }
            }


        }
    }


}



data class BottomItems(
    val name: String,
    val icon: ImageVector
)