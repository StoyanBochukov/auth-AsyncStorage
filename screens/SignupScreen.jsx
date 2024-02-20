import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { createUser } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
	const [isLoading, setIsLoading] = useState(false);

	const authCtx = useContext(AuthContext);

	const signupHandler = async ({ email, password }) => {
		setIsLoading(true);
		try {
			const token = await createUser(email, password);
			authCtx.authenticate(token);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			Alert.alert('Something went wrong!', 'Invalid input fields!');
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <LoadingOverlay message='Loading...' />;
	}

	return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
