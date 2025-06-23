package com.example.mindpulse.domain.usecase

import com.example.mindpulse.domain.models.UserDataModel
import com.example.mindpulse.domain.repo.Repo
import javax.inject.Inject

class LogInUserUseCase  @Inject constructor(private val repo: Repo)  {

    suspend fun loginUserUseCase(userData: UserDataModel) = repo.loginUserWithEmailAndPassword(userData)
}