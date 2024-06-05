import {router, usePage} from "@inertiajs/react";
import {useState} from "react";
import PageHeader from "@/Components/PageHeader.jsx";
import {AdminLinks} from "@/Components/AdminLinks.jsx";
import {PageFooter} from "@/Components/PageFooter.jsx";

const App = ({children}) => {
    const { auth } = usePage().props;
    const [transitioning, setTransitioning] = useState(false)
    router.on('start', () => {
        setTransitioning(true)
    })

    router.on('finish', () => {
        setTransitioning(false)
    })
    return (
        <div className="App">
            <PageHeader auth={auth}/>
            <main className={transitioning ? "router-animation on" : "router-animation"}>
                <div className="container">
                    {children}
                </div>
            </main>
            <PageFooter/>
            { auth.user !== null && auth.user.admin_access ? (<AdminLinks/>) : (<></>) }
        </div>
    )
}

export default App;
