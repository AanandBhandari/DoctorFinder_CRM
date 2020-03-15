import React, { Fragment } from 'react'
import loading from './loading.gif'

const Loader = () => {
    return (
        <Fragment>
            <img src={loading}
                style={{ margin: 'auto', display: 'block' }}
                alt='Loading...' />
        </Fragment>
    )
}

export default Loader