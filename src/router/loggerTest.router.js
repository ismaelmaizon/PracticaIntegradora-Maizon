import { Router } from "express";


const router = Router();

router.get('/', async(req, res)=>{
    res.send({message: "¡Prueba logger!"})
    req.logger.error('Logger - error');
    req.logger.warn('Logger - warn');
    req.logger.info('Logger - info');
    req.logger.http('Logger - http');
    req.logger.verbose('Logger - Verbose');
    req.logger.debug('Logger - Debug');
})


export default router;