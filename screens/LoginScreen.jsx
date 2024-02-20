import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { loginUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
	const [isLoading, setIsLoading] = useState(false);
	const authCtx = useContext(AuthContext);

	const loginHandler = async ({ email, password }) => {
		setIsLoading(true);
		try {
			const token = await loginUser(email, password);
			authCtx.authenticate(token);
			setIsLoading(false);
			console.log('Login Success!');
		} catch (error) {
			console.log(error);
			Alert.alert('Something went wrong!', 'Wrong Credentials!');
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <LoadingOverlay message='Loading...' />;
	}

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
