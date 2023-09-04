export const rolesMiddlewareAdmin = ( req, res, next ) => {
    if( req.user.role === 'admin' ){
        next()
    }else{
        res.send({ error:' you don t access '})
    }
};


export const rolesMiddlewareUser = ( req, res, next ) => {
    if( req.user.role === 'user' ){
        next()
    }else{
        res.send({ error:' you don t access '})
    }
};