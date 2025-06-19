import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

type UserUpdateData = {
  name?: string;
  email?: string;
  password?: string;
  role?: Role; // Ou use o enum Role se você tiver
  updatedAt?: Date;
};

// Obter um usuário específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar se o usuário está autenticado e é admin
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    const userId = params.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// Atualizar um usuário
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar se o usuário está autenticado e é admin
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    const userId = params.id;
    const data = await request.json();
    const { name, email, password, role } = data;

    // Verificar se o usuário existe
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Preparar os dados para atualização
    const updateData: UserUpdateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Atualizar o usuário
    const updatedUser = await prisma.user.update({
      where: { id: userId },
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

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// Excluir um usuário
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar se o usuário está autenticado e é admin
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    const userId = params.id;

    // Verificar se o usuário existe
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Não permitir que um admin exclua a si mesmo
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "Não é possível excluir seu próprio usuário" },
        { status: 400 }
      );
    }

    // Excluir o usuário
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: "Usuário excluído com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
