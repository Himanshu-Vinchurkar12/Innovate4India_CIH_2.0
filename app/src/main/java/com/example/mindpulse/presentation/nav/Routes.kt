package com.example.mindpulse.presentation.nav

import kotlinx.serialization.Serializable


sealed class SubNavigation{

    @Serializable
    object LogInSignUpScreenRoutes : Routes()

    @Serializable
    object HomeScreenRoutes : Routes()

}
sealed class Routes {

    @Serializable
    object LogInScreenRoutes : Routes()

    @Serializable
    object SignUpScreenRoutes : Routes()

    @Serializable
    class DialogBoxRoutes(var state : String) : Routes()

    @Serializable
    object HomeScreenRoutes : Routes()

    @Serializable
    object ProfileScreenRoutes : Routes()

    @Serializable
    object NotificationScreenRoutes : Routes()

    @Serializable
    object WishListScreenRoutes : Routes()

     @Serializable
    object CartScreenRoutes : Routes()

     @Serializable
    object CheckOutScreenRoutes : Routes()

    @Serializable
    object SeeAllProductScreenRoutes : Routes()

    @Serializable
    object SeeAllCategoryScreenRoutes : Routes()

    @Serializable
    data class EachProductScreenRoutes(
        val productId: String
    ) : Routes()


    @Serializable
    object DialogBoxForLogOutRoutes : Routes()

}