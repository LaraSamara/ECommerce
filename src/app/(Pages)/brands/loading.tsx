import React from 'react';
import { Loader } from 'lucide-react';

const loading = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <Loader className='animate-spin'/>
        </div>
    )
}

export default loading
