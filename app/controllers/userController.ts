import { Request, Response } from "express";
import * as userService from "@/services/userService";


export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userId = await userService.createUser(userData);
    res.status(201).json({ id: userId, message: "User created successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userService.updateUser(userId, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};
function errorHandler(res: Response<any, Record<string, any>>, error: unknown) {
    throw new Error("Function not implemented.");
}

