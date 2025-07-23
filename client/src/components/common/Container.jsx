import React from 'react'
import cn from '../../utils/cn'

function Container({ children,className }) {
    return (
        <div className={cn(`max-w-[1269px]  mx-auto px-5`, className)}>
            {children}
        </div>
    )
}

export default Container
