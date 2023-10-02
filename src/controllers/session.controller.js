
const current = async (req, res ) => {
    let result = req.user // el " req.user " va a obtener la informacion del usuario que se guardo en el "jwt_Payload" enviado desde passportCall('jwt')
    console.log(result);
    const {user} = req.user
    return user, res.send(result)
}



export default {
    current
}