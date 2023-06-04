import { CreateStory } from './cmps/create-story.jsx'
import { HomePage } from './pages/home-page.jsx'
import { SearchStory } from './cmps/search-story.jsx'
import { UserDetails } from './pages/user-details.jsx'
// import { AboutUs } from './pages/about-us.jsx'
// import { storyIndex } from './pages/story-index.jsx'
// import { ReviewIndex } from './pages/review-index.jsx'
// import { ChatApp } from './pages/chat-app.jsx'
// import { AdminApp } from './pages/admin-app.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: 'create',
        component: <CreateStory />,
        label: 'Create story',
    },
    {
        path: 'search',
        component: <SearchStory />,
        label: 'Search story',
    },

    {
        path: 'user-details',
        component: <UserDetails />,
        label: 'Profile',
    },
    
    // {
    //     path: 'story',
    //     component: <StoryIndex />,
    //     label: 'stories'
    // },
    // {
    //     path: 'review',
    //     component: <ReviewIndex />,
    //     label: 'Reviews'
    // },
    // {
    //     path: 'chat',
    //     component: <ChatApp />,
    //     label: 'Chat'
    // },
    // {
    //     path: 'about',
    //     component: <AboutUs />,
    //     label: 'About us'
    // },
    // {
    //     path: 'admin',
    //     component: <AdminApp />,
    //     label: 'Admin Only'
    // }
]

export default routes