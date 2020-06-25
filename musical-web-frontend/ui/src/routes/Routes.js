import App from '../App'
import Paths from './Paths'
import HomePageContainer from '../app/user-page/HomePageContainer'
import LoginContainer from '../app/auth-page/login/LoginContainer'
import AccountSettingContainer from '../app/user-page/account-setting/AccountSettingContainer'
import ForgotPasswordContainer from '../app/auth-page/forgot-password/ForgotPasswordContainer'
import UserDashboard from '../app/user-page/dashboard/UserDashboard'
import LandingPage from '../app/landing-page/Landing-page'

const routes = [
    {
        component: App,
        routes: [
            {
                path: Paths.Login,
                exact: false,
                component: LoginContainer
            },
            {
                path : Paths.ForgotPassword,
                exact : true,
                component : ForgotPasswordContainer
            },
            {
                path: Paths.LandingPage,
                exact: true,
                component: LandingPage
            },
            {
                path: Paths.UserDashboard,
                exact: true,
                component: UserDashboard
            },
            {
                component: HomePageContainer,
                path: Paths.HomePage,
                routes: [
                    {
                        path : Paths.UserDashboard,
                        exact : true,
                        component : UserDashboard   
                    },
                    {
                        path : Paths.AccountSetting,
                        exact : true,
                        component : AccountSettingContainer
                    },
                    
                ]
            },

        ]
    }
]


export default routes


