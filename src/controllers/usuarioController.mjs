import db from '../config/db.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    
    try {
        const [usuarios] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (usuarios.length > 0) return res.status(400).json({ erro: "E-mail já existe." });

        const hash = await bcrypt.hash(senha, 10);
        await db.query("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [nome, email, hash]);

        res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: "Erro no servidor." });
    }
};

export const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [usuarios] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (usuarios.length === 0) return res.status(404).json({ erro: "Usuário não encontrado." });

        const valido = await bcrypt.compare(senha, usuarios[0].senha);
        if (!valido) return res.status(401).json({ erro: "Senha incorreta." });
        
        const token = jwt.sign(
            { id: usuarios[0].id, email: usuarios[0].email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ mensagem: "Login realizado com sucesso!", token });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao fazer login." });
    }
};