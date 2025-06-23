package com.example.mindpulse.presentation.screens

import android.widget.Toast
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.mindpulse.presentation.viewmodel.MyViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(viewModel: MyViewModel = hiltViewModel(), navController: NavController) {

    val coroutineScope = rememberCoroutineScope()

    val context = LocalContext.current

    val getUserState = viewModel.getUserState.collectAsState()
    val updateState = viewModel.updateUserState.collectAsState()


    when {
        updateState.value.isLoading -> {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator()
            }
        }

        updateState.value.isError != null -> {
            Text(text = updateState.value.isError.toString())
        }

        updateState.value.isSuccess != null -> {
            Toast.makeText(context, "Updated Successfully", Toast.LENGTH_SHORT).show()
            updateState.value.isSuccess = null
        }
    }

    val imageUri = remember { mutableStateOf("") }

    val isEditing = remember { mutableStateOf(false) }

    val firstName = remember { mutableStateOf("") }
    val lastName = remember { mutableStateOf("") }
    val email = remember { mutableStateOf("") }
    val phoneNumber = remember { mutableStateOf("") }
    val address = remember { mutableStateOf("") }
    val profileImage = remember { mutableStateOf("") }
    val password = remember { mutableStateOf("") }

//    LaunchedEffect(key1 = Unit) {
//        coroutineScope.launch(Dispatchers.IO) {
//            viewModel.getUser()
//        }
//    }


}