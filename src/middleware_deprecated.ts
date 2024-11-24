import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// DEPRECATED: cannot use middleware in SSG

// This function can be marked `async` if using `await` inside
function middleware(request: NextRequest) {
    const base = "http://localhost:3000/";
    const params = request.url.replace(base, "").split("/");
    let lang = params[0];

    if (["en", "kr"].includes(lang)) {
        return NextResponse.next();
    }

    lang = "en";
    params.splice(0, 1, lang);
    const url = base + params.join("/");

    return NextResponse.redirect(new URL(url, request.url));
}

const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        {
            source: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },

        {
            source: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
            has: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },

        {
            source: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
            has: [{ type: "header", key: "x-present" }],
            missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
        },
    ],
};
