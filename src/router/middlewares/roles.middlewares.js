export const rolesMiddlewareAdminAndPremium = ( req, res, next ) => {
    let user = req.session.user
    if( user.role === 'admin' || user.role === 'premium'){
        next()
    }else{
        res.send({ error:' you don t access '})
    }
};

export const rolesMiddlewareAdmin = ( req, res, next ) => {
    console.log('roles');
    console.log(req.session.user);
    let user = req.session.user
    if( user.role === 'admin'){
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