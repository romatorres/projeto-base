import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/lib/services/user-service";
import { withAdminAuth } from "@/lib/api-middleware";
import { getToken } from "next-auth/jwt";

async function getUserById(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await userService.findById(params.id);

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
      { error: "Erro ao buscar usuário" },
      { status: 500 }
    );
  }
}

async function updateUser(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    // Validação básica
    if (!data.name && !data.email && !data.password && !data.role) {
      return NextResponse.json(
        { error: "Nenhum dado para atualizar" },
        { status: 400 }
      );
    }

    const user = await userService.update(params.id, data);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
      { status: 400 }
    );
  }
}

async function deleteUser(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar se o usuário está tentando excluir a si mesmo
    const token = await getToken({ req: request });
    if (token?.id === params.id) {
      return NextResponse.json(
        { error: "Não é possível excluir seu próprio usuário" },
        { status: 400 }
      );
    }

    await userService.delete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return NextResponse.json(
      { error: "Erro ao excluir usuário" },
      { status: 500 }
    );
  }
}

// Aplicar middleware de autenticação admin
export const GET = withAdminAuth(getUserById);
export const PUT = withAdminAuth(updateUser);
export const DELETE = withAdminAuth(deleteUser);
