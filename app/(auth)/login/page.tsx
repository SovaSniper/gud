import { AuthGrid } from "@/components/auth/grid";
import { LogInSection } from "@/components/auth/login";

export default function Page() {
    return (
        <AuthGrid>
            <AuthGrid.Left>
                <img
                    src="https://images.unsplash.com/photo-1674027392887-751d6396b710"
                    className="w-full h-full object-cover"
                />
            </AuthGrid.Left>
            <AuthGrid.Right>
                <LogInSection />
            </AuthGrid.Right>
        </AuthGrid>
    );
}
