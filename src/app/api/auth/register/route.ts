import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/lib/services/user-service";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validação básica
    if (!data.name || !data.email || !data.password) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    // Criar usuário com role USER por padrão
    const user = await userService.create({
      ...data,
      role: "USER",
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao registrar usuário" },
      { status: 400 }
    );
  }
}
