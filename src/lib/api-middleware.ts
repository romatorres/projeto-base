import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

type ApiHandler = (req: NextRequest, context: { params: any }) => Promise<NextResponse>;

export function withAuth(handler: ApiHandler): ApiHandler {
  return async (req: NextRequest, context: { params: any }) => {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    return handler(req, context);
  };
}

export function withAdminAuth(handler: ApiHandler): ApiHandler {
  return async (req: NextRequest, context: { params: any }) => {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    if (token.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Permissão negada" },
        { status: 403 }
      );
    }

    return handler(req, context);
  };
}