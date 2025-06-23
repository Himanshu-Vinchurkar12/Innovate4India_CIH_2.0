package com.example.mindpulse.data.repoImp



import com.example.mindpulse.common.ResultState
import com.example.mindpulse.common.USER_PATH
import com.example.mindpulse.domain.repo.Repo
import com.example.mindpulse.domain.models.UserDataModel
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import javax.inject.Inject


class RepoImp @Inject constructor(
    private val auth: FirebaseAuth,
    private val fireStore: FirebaseFirestore,
) : Repo {
    override fun registerUserWithEmailAndPassword(userData: UserDataModel): Flow<ResultState<String>> =
        callbackFlow {
            trySend(ResultState.Loading)


            auth.createUserWithEmailAndPassword(userData.email, userData.password)
                .addOnSuccessListener {

                    fireStore.collection(USER_PATH).document(
                        it.user!!.uid.toString()
                    ).set(userData).addOnSuccessListener {
                        trySend(ResultState.Success("User Registered Successfully"))
                    }.addOnFailureListener {
                        trySend(ResultState.Error(it.message.toString()))
                    }

                }.addOnFailureListener {
                    trySend(ResultState.Error(it.message.toString()))

                }



            awaitClose {
                close()
            }
        }

    override fun loginUserWithEmailAndPassword(userData: UserDataModel): Flow<ResultState<String>> =
        callbackFlow {

            trySend(ResultState.Loading)


            auth.signInWithEmailAndPassword(userData.email, userData.password)
                .addOnSuccessListener {

                    trySend(ResultState.Success("User Logged In Successfully"))
                }.addOnFailureListener {
                    trySend(ResultState.Error(it.message.toString()))
                }

            awaitClose {
                close()
            }


        }






//
//    override fun getUser(): Flow<ResultState<UserDataModel>> = callbackFlow {
//        trySend(ResultState.Loading)
//
//        try {
//            fireStore.collection(USER_PATH).document(auth.currentUser!!.uid).get()
//                .addOnSuccessListener {
//                    val user = it.toObject(UserDataModel::class.java)
//                    trySend(ResultState.Success(user!!))
//                }.addOnFailureListener {
//                    trySend(ResultState.Error(it.message.toString()))
//                }
//        } catch (e: Exception) {
//            trySend(ResultState.Error(e.message.toString()))
//        }
//
//        awaitClose {
//            close()
//        }
//
//    }
//
//    override fun updateUser(userData: UserDataModel): Flow<ResultState<String>> = callbackFlow {
//        trySend(ResultState.Loading)
//
//        try {
//            fireStore.collection(USER_PATH).document(auth.currentUser!!.uid)
//                .set(userData).addOnSuccessListener {
//                    trySend(ResultState.Success("User Updated Successfully"))
//                }.addOnFailureListener {
//                    trySend(ResultState.Error(it.message.toString()))
//                }
//        } catch (e: Exception) {
//
//            trySend(ResultState.Error(e.message.toString()))
//        }
//
//        awaitClose {
//            close()
//        }
//    }
//
//    override fun setUserProfileImage(imageUrl: String): Flow<ResultState<String>> = callbackFlow {
//        trySend(ResultState.Loading)
//
//        try {
//
//            storage.reference.child("UserProfileImage/${auth.currentUser!!.uid}")
//                .putFile(imageUrl.toUri())
//                .addOnSuccessListener {
//                    it.storage.downloadUrl.addOnSuccessListener {
//                        trySend(ResultState.Success(it.toString()))
//                    }.addOnFailureListener {
//                        trySend(ResultState.Error(it.message.toString()))
//                    }
//
//                }.addOnFailureListener {
//                    trySend(ResultState.Error(it.message.toString()))
//
//                }
//        } catch (e: Exception) {
//            trySend(ResultState.Error(e.message.toString()))
//        }
//
//        awaitClose {
//            close()
//        }
//    }
//




}
