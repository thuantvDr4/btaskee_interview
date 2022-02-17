import auth from '@react-native-firebase/auth';


/**
 * function: sign-in with email & password
 * @param email
 * @param password
 */
const signInWithEmailAndPassword =(email, password)=>{
    return  auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            return{
                code: 1,
                message:'User account created & signed in!'
            }
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                // console.log('That email address is already in use!');
                return{
                    code: -1,
                    message:'That email address is already in use!'
                }
            }

            if (error.code === 'auth/invalid-email') {
                // console.log('That email address is invalid!');
                return{
                    code: -1,
                    message:'That email address is invalid!'
                }
            }

            console.error(error);
        });
}


export {
    signInWithEmailAndPassword
}