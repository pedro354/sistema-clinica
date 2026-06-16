import {Router, Request, Response} from 'express';

const router = Router();
router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Fase de teste do backend' });
});
router.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    res.json({ message: `Login recebido para email e senha: email: ${email}, senha: ${password}` });
    
    console.log(req.body);
});

module.exports = router;

