import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/usuarioController.mjs';
import autenticarToken from '../middlewares/autenticarToken.mjs;'

const router = Router();

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/perfil', autenticarToken, (req, res) => {
    res.json({ mensagem: 'Perfil protegido!', usuario: req.usuario });
});

export default router;