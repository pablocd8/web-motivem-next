import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura_cambiar_en_produccion';

export function verifyToken(request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return { error: 'No se proporcionó token de autenticación', status: 401 };
  }

  const tokenValue = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(tokenValue, JWT_SECRET);
    return { userId: decoded.userId, email: decoded.email };
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return { error: 'Token inválido', status: 401 };
    }
    if (error.name === 'TokenExpiredError') {
      return { error: 'Token expirado', status: 401 };
    }
    return { error: 'Error al verificar token', status: 500 };
  }
}

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}
