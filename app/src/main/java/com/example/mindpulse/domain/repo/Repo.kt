package com.example.mindpulse.domain.repo

import com.example.mindpulse.common.ResultState
import com.example.mindpulse.domain.models.UserDataModel
import kotlinx.coroutines.flow.Flow

interface Repo {
    fun registerUserWithEmailAndPassword(userData: UserDataModel): Flow<ResultState<String>>

    fun loginUserWithEmailAndPassword(userData: UserDataModel): Flow<ResultState<String>>

}