import { prisma } from "../prisma";
import bcrypt from "bcryptjs";

type CreateUserData = {
  name: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
};

type UpdateUserData = {
  name?: string;
  email?: string;
  password?: string;
  role?: "USER" | "ADMIN";
};

export const userService = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  },

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async create(data: CreateUserData) {
    // Verificar se o email já existe
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email já está em uso");
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Criar usuário
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role || "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async update(id: string, data: UpdateUserData) {
    // Preparar dados para atualização
    const updateData: any = { ...data };

    // Se tiver senha, fazer hash
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    // Se tiver email, verificar se já existe
    if (data.email) {
      const existingUser = await this.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email já está em uso");
      }
    }

    // Atualizar usuário
    return prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  },
};