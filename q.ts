import { Application, Router } from "https://deno.land/x/oak/mod.ts";

console.log(Deno.cwd());

const router: Router = new Router();
router
  .get("/", (context) => {
    context.response.body = "<h1>Hello</h1>";
  })
  .post("/eval", async ({ request, response }) => {
    const body = await request.body();
    const val = await body.value;
    response.body = eval(val);
    console.log(val);
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
