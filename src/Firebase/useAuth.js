import { useEffect, useState } from "react"
import getFirebaseInstance from "./firebase"
import loadFirebaseDependencies from "./loadFirebaseDependencies"

function useAuth() {
    const [user, setUser] = useState(null)
    const [firebase, setFirebase] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let unsubscribe
        let publicProfileUnsubscribe

        loadFirebaseDependencies.then(app => {
            const firebaseInstance = getFirebaseInstance(app)
            setFirebase(firebaseInstance)

            unsubscribe = firebaseInstance.auth.onAuthStateChanged(userResult => {
                if (userResult) {
                    // get user custom claims
                    firebaseInstance.getUserProfile({userId: userResult.uid})
                    .then(t => {setUser({
                        ...userResult,
                        username: t.empty ? null : t.docs[0].id});
                    })
                    /*setLoading(true);
                    Promise.all([
                        firebaseInstance.getUserProfile({ userId: userResult.uid }),
                        firebaseInstance.auth.currentUser.getIdTokenResult(true),
                    ]).then((result) => {
                        const publicProfileResult = result[0]
                        const token = result[1]

                        if (publicProfileResult.empty) {
                            publicProfileUnsubscribe = firebaseInstance.db
                              .collection("publicUsers")
                              .where("userId", "==", userResult.uid)
                              .onSnapshot((snapshot) => {
                                  const publicProfileDoc = snapshot.docs[0]
                                  if (publicProfileDoc && publicProfileDoc.id) {
                                      setUser({
                                          ...userResult,
                                          admin: token.claims.admin,
                                          username: publicProfileDoc.id,
                                      })
                                  }

                                  setLoading(false)
                              })
                        } else {
                            const publicProfileDoc = publicProfileResult.docs[0]
                            if (publicProfileDoc && publicProfileDoc.id) {
                                setUser({
                                    ...userResult,
                                    admin: token.claims.admin,
                                    username: publicProfileDoc.id,
                                })
                            }

                            setLoading(false)
                        }
                    })*/
                }else{
                    setUser(null);
                }

                setLoading(false);
            })
        })

        return () => {
            if (unsubscribe) {
                unsubscribe()
            }

            if (publicProfileUnsubscribe) {
                publicProfileUnsubscribe()
            }
        }
    }, [])

    return { user, firebase, loading }
}

export default useAuth
