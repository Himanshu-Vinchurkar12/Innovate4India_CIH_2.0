package com.example.mindpulse.domain.di

import com.example.mindpulse.data.repoImp.RepoImp
import com.example.mindpulse.domain.repo.Repo
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent


// this di module is create to separate the data layer and domain layer (and here we implement the repo )


@Module
@InstallIn(SingletonComponent::class)
object  DomainDiModule{


    @Provides
    fun provideRepo(
        auth: FirebaseAuth,
        fireStore: FirebaseFirestore,

    ) : Repo {
        return RepoImp(
            auth,
            fireStore,
        )
    }
}