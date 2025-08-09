import React from "react";

export function AuthGrid({ children }: React.HTMLAttributes<HTMLDivElement>) {
  const childrenArray = React.Children.toArray(children);

  // Extract left and right children by type
  const leftChild = childrenArray.find(
    (child: any) => child.type === AuthGrid.Left
  );
  const rightChild = childrenArray.find(
    (child: any) => child.type === AuthGrid.Right
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:block md:w-1/2 bg-secondary max-h-screen overflow-hidden">
        {leftChild}
      </div>
      <div className="w-full md:w-1/2 p-6 max-h-screen flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-6">
          {rightChild}
        </div>
      </div>
    </div>
  )
}

function Left({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return <>{children}</>;
}

function Right({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return <>{children}</>;
}

AuthGrid.Left = Left;
AuthGrid.Right = Right;
