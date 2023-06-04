import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { SideBar } from './cmps/side-bar'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { CreateStory } from './cmps/create-story'

export function RootCmp() {

    return (
        <div className='app-container'>
            {/* {<CreateStory />} */}
            <SideBar />
            <main className='main-container'>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


