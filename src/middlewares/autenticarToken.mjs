import jwt from 'jsonwebtoken';

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ erro: 'Token ausente ou mal formatado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = usuario;
        next();
    } catch (err) {
        res.status(403).json({ erro: 'Token inválido' });
    }
};

export default autenticarToken;