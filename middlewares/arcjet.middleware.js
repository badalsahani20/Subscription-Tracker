import aj from "../config/arcjet.js";

const arcjectMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {requested: 1});

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) return res.status(429).json({ message: "Rate limit exceeded" }); // Too many requests
      if (decision.reason.isBot()) res.status(403).json({ error: 'Bot detected' });

      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error}`);
    next(error);
  }
};

export default arcjectMiddleware;