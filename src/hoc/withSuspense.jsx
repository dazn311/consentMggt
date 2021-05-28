import React from 'react';

export function withSuspense(WreppedComponent) {
    return (props) => {
        return <React.Suspense fallback={<div>loading...</div>} >
            <WreppedComponent {...props} />
        </React.Suspense>
    }
}