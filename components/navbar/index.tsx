import { MainNavBar } from "./main-navbar";

export function NavBar() {
    return (
        <div className="sticky px-4 z-50 bg-grayscale-025">
            <div className="hidden sm:block">
                <MainNavBar />
            </div>
            <div className="block sm:hidden">
                {/* <MobileNavBar /> */}
            </div>
        </div>
    )
}