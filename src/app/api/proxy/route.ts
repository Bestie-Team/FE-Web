// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`;

//   try {
//     const body = await req.json();

//     const response = await fetch(targetUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         accessToken: body.accessToken,
//       }),
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Error response:", errorText);
//       return NextResponse.json(
//         { error: "Backend error", details: errorText },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });
//   } catch (error) {
//     console.error("Error during proxy request:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
