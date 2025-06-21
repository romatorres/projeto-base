import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/lib/services/user-service";
import { withAdminAuth } from "@/lib/api-middleware";

async function getUsers() {
  try {
    const users = await userService.findAll();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}

async function createUser(request: NextRequest) {
  try {
    const data = await request.json();

    // Validação básica
    if (!data.name || !data.email || !data.password) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const user = await userService.create(data);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 400 }
    );
  }
}

// Aplicar middleware de autenticação admin
export const GET = withAdminAuth(getUsers);
export const POST = withAdminAuth(createUser);
