package com.example.mindpulse.domain.usecase

import com.example.mindpulse.domain.models.UserDataModel
import com.example.mindpulse.domain.repo.Repo
import javax.inject.Inject

class CreateUserUseCase @Inject constructor(private val repo: Repo) {


    suspend fun createUserUseCase(userData: UserDataModel) = repo.registerUserWithEmailAndPassword(userData)
}