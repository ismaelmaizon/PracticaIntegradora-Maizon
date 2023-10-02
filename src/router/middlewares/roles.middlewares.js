export const rolesMiddlewareAdmin = ( req, res, next ) => {
    if( req.user.role === 'admin' || req.user.role === 'premium'){
        next()
    }else{
        res.send({ error:' you don t access '})
    }
};


export const rolesMiddlewareUser = ( req, res, next ) => {
    if( req.user.role === 'user'|| req.user.role === 'premium'){
        next()
    }else{
        res.send({ error:' you don t access '})
    }
};