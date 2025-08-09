import { NextRequest } from "next/server";
import { POST } from "@/app/api/user/onboard/route";
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { createClient } from "@/lib/supabase/server";
import { UserResponse } from "@supabase/supabase-js";
vi.mock("@/lib/supabase/server");

describe("POST /api/user/onboard", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("returns 401 on if unauthorised", async () => {
    (createClient as any).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: {
            error: {
              message: "Error"
            }
          } as UserResponse,
          error: null,
        }),
      },
    });

    const jsonBody = JSON.stringify({ firstname: "Alice", lastname: "Smith" });

    const mockRequest = new NextRequest("http://localhost/api/user/onboard", {
      method: "POST",
      body: jsonBody,
      headers: { "content-type": "application/json" },
    });

    const response = await POST(mockRequest);
    expect(response.status).toBe(401);

    const text = await response.text();
    console.log(text)
    // expect(text).toBe("Invalid request body");
  });
});