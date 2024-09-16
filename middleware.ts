// File to handle security. Ensuring only users can access certain functionality and endpoints

//This middleware function is executed on each request
//importing and exported default middleware from next-auth.
export { default } from "next-auth/middleware";

//Adding routes that would require authentication. Redirected to login if user tries to access these routes without logging in.
export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
