import { AuthGrid } from "@/components/auth/grid";
import { SignUpSection } from "@/components/auth/signup";

export default function Page() {
  return (
    <AuthGrid>
      <AuthGrid.Left>
        <img
          src="https://plus.unsplash.com/premium_photo-1684785617500-fb22234eeedd"
          className="w-full h-full object-cover"
        />
      </AuthGrid.Left>
      <AuthGrid.Right>
        <SignUpSection />
      </AuthGrid.Right>
    </AuthGrid>
  );
}
