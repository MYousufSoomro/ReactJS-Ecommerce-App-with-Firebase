import Messages from '../screens/DashboardScreens/Messages'
import Notifications from '../screens/DashboardScreens/Notifications'
import Profile from '../screens/DashboardScreens/Profile'

 const DashboardRoutes = [
    {
        name: 'Messages',
        path: 'messages',
        element: <Messages />
    },
    {
        name: 'Notifications',
        path: 'notifications',
        element: <Notifications />
    },
    {
        name: 'Profile',
        path: 'profile',
        element: <Profile />
    },
]

export default DashboardRoutes