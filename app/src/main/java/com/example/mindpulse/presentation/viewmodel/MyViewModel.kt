package com.example.mindpulse.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mindpulse.common.ResultState
import com.example.mindpulse.domain.models.UserDataModel
import com.example.mindpulse.domain.usecase.CreateUserUseCase
import com.example.mindpulse.domain.usecase.LogInUserUseCase
import com.google.firebase.firestore.FirebaseFirestore
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MyViewModel @Inject constructor(
    private val createUserUseCase: CreateUserUseCase,
    private val logInUserUseCase: LogInUserUseCase,

    private val fireStore: FirebaseFirestore
) : ViewModel() {


    val _createUserState = MutableStateFlow(CreateUserState())
    val createUserState = _createUserState.asStateFlow()

    val _logInUserState = MutableStateFlow(LogInUserState())
    val logInUserState = _logInUserState.asStateFlow()


    val _homeScreenState = MutableStateFlow(HomeScreenState())
    val homeScreenState = _homeScreenState.asStateFlow()


    val _getUserState = MutableStateFlow(GetUserDataState())
    val getUserState = _getUserState.asStateFlow()

    val _updateUserState = MutableStateFlow(UpdateUserDataState())
    val updateUserState = _updateUserState.asStateFlow()

    val  _setProfileImageState = MutableStateFlow(SetProfileImageState())
    val setProfileImageState = _setProfileImageState.asStateFlow()






//    fun setProfileImage(imageUri: String) {
//        viewModelScope.launch(Dispatchers.IO){
//            setProfileImageUseCase.setProfileImageUseCase(imageUri).collect {
//                when (it) {
//                    is ResultState.Loading -> {
//                        _setProfileImageState.value = SetProfileImageState(isLoading = true)
//                    }
//                    is ResultState.Error -> {
//                        _setProfileImageState.value = SetProfileImageState(isError = it.message)
//                    }
//                    is ResultState.Success -> {
//                        _setProfileImageState.value = SetProfileImageState(isSuccess = it.data)
//                    }
//
//                }
//            }
//        }
//    }

//    fun updateUser(userData: UserDataModel) {
//        viewModelScope.launch(Dispatchers.IO) {
//            updateDataUserUseCase.updateDataUserUseCase(userData).collect {
//                when (it) {
//                    is ResultState.Loading -> {
//                        _updateUserState.value = UpdateUserDataState(isLoading = true)
//                    }
//
//                    is ResultState.Error -> {
//                        _updateUserState.value = UpdateUserDataState(isError = it.message)
//                    }
//
//                    is ResultState.Success -> {
//                        _updateUserState.value = UpdateUserDataState(isSuccess = it.data)
//                    }
//                }
//
//            }
//        }
//    }

//
//    fun getUser() {
//        viewModelScope.launch(Dispatchers.IO) {
//            getUserUseCase.getUserUseCase().collect {
//                when (it) {
//                    is ResultState.Loading -> {
//                        _getUserState.value = GetUserDataState(isLoading = true)
//                    }
//
//                    is ResultState.Error -> {
//                        _getUserState.value = GetUserDataState(isError = it.message)
//                    }
//
//                    is ResultState.Success -> {
//                        _getUserState.value = GetUserDataState(isSuccess = it.data)
//
//                    }
//                }
//            }
//        }
//    }


//
//
//    init {
//        loadHomeScreen()
//    }

//    fun loadHomeScreen() {
//        viewModelScope.launch(Dispatchers.IO) {
//            combine(
//                getAllCategoryUseCase.getAllCategoryUseCase(),
//                getAllProductUseCase.getAllProductUseCase(),
//                 getBannerUseCase.getBannerUseCase(),
//            )
//            { categoryState, productState, bannerState ->
//
//                when {
//                    categoryState is ResultState.Error ->
//                        HomeScreenState(isLoading = false, isError = categoryState.message)
//
//                    productState is ResultState.Error ->
//                        HomeScreenState(isLoading = false, isError = productState.message)
//
//                    bannerState is ResultState.Error ->
//                        HomeScreenState(isLoading = false, isError = bannerState.message)
//
//                    categoryState is ResultState.Success && productState is ResultState.Success && bannerState is ResultState.Success-> {
//                        HomeScreenState(
//                            isLoading = false,
//                            category = categoryState.data,
//                            product = productState.data,
//                            banner = bannerState.data
//
//                        )
//
//                    }
//
//                    else -> {
//                        HomeScreenState(isLoading = true)
//                    }
//                }
//
//            }.collect {
//                _homeScreenState.value = it
//            }
//        }
//    }



    fun createUser(userData: UserDataModel) {
        viewModelScope.launch(Dispatchers.IO) {
            createUserUseCase.createUserUseCase(userData).collect {
                when (it) {
                    is ResultState.Loading -> {
                        _createUserState.value = CreateUserState(isLoading = true)
                    }

                    is ResultState.Error -> {
                        _createUserState.value = CreateUserState(isError = it.message)
                    }

                    is ResultState.Success -> {
                        _createUserState.value = CreateUserState(isSuccess = it.data)
                    }
                }

            }

        }
    }


    fun loginUser(userData: UserDataModel) {
        viewModelScope.launch(Dispatchers.IO) {
            logInUserUseCase.loginUserUseCase(userData).collect {
                when (it) {
                    is ResultState.Loading -> {
                        _logInUserState.value = LogInUserState(isLoading = true)
                    }

                    is ResultState.Error -> {
                        _logInUserState.value = LogInUserState(isError = it.message)
                    }

                    is ResultState.Success -> {
                        _logInUserState.value = LogInUserState(isSuccess = it.data)
                    }
                }

            }
        }
    }


}


data class CreateUserState(
    val isLoading: Boolean = false,
    val isError: String? = null,
    val isSuccess: String? = null
)


data class LogInUserState(
    val isLoading: Boolean = false,
    val isError: String? = null,
    var isSuccess: String? = null
)



data class HomeScreenState(
    val isLoading: Boolean = false,
    val isError: String? = null,
)



data class AddToWishListState(
    val isLoading: Boolean = false,
    val isError: String? = null,
    var isSuccess: String? = null
)



data class GetUserDataState(
    val isLoading: Boolean = false,
    val isError: String? = null,
    val isSuccess: UserDataModel? = null
)


data class UpdateUserDataState(
    val isLoading: Boolean = false,
    val isError: String? = null,
    var isSuccess: String? = null
)


data class SetProfileImageState(
    val isLoading: Boolean = false,
    val isError: String? = null,
    val isSuccess: String? = null
)


