import { Request, RequestHandler, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  register = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.register(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const result = await this.userService.login(username, password);

      // Set the JWT token in an HTTP-only cookie
      res
        .cookie('token', result.token, {
          httpOnly: true, 
          secure: process.env.NODE_ENV === 'production', // Only send in HTTPS for production
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        .json({ message: 'Login successful' });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  };

  searchUsers: RequestHandler = async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        res.status(400).json({ message: 'Search query is required' });
        return;

      }
      const users = await this.userService.searchUsers(query);
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
