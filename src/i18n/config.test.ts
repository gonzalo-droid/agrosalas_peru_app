import { test } from "node:test";
import assert from "node:assert/strict";
import { isLocale, localizedPath, resolveLocaleRoute, stripLocale } from "./config.ts";

test("isLocale acepta solo es y en", () => {
  assert.equal(isLocale("es"), true);
  assert.equal(isLocale("en"), true);
  assert.equal(isLocale("fr"), false);
  assert.equal(isLocale(""), false);
});

test("stripLocale quita el prefijo de idioma", () => {
  assert.equal(stripLocale("/en"), "/");
  assert.equal(stripLocale("/es"), "/");
  assert.equal(stripLocale("/en/catalogo"), "/catalogo");
  assert.equal(stripLocale("/es/catalogo/garbanzo"), "/catalogo/garbanzo");
  assert.equal(stripLocale("/catalogo"), "/catalogo");
  assert.equal(stripLocale("/"), "/");
  assert.equal(stripLocale("/english"), "/english");
  assert.equal(stripLocale("/en-us/x"), "/en-us/x");
});

test("localizedPath agrega /en y deja el español sin prefijo", () => {
  assert.equal(localizedPath("/", "es"), "/");
  assert.equal(localizedPath("/", "en"), "/en");
  assert.equal(localizedPath("/catalogo", "en"), "/en/catalogo");
  assert.equal(localizedPath("/catalogo", "es"), "/catalogo");
  assert.equal(localizedPath("/en/catalogo", "es"), "/catalogo");
  assert.equal(localizedPath("/en/catalogo", "en"), "/en/catalogo");
});

test("localizedPath preserva query y hash", () => {
  assert.equal(
    localizedPath("/catalogo?categoria=conservas", "en"),
    "/en/catalogo?categoria=conservas",
  );
  assert.equal(localizedPath("/about#mision", "en"), "/en/about#mision");
  assert.equal(localizedPath("/?x=1", "en"), "/en?x=1");
  assert.equal(localizedPath("/contact?asunto=quote", "es"), "/contact?asunto=quote");
});

test("resolveLocaleRoute reescribe español sin prefijo", () => {
  assert.deepEqual(resolveLocaleRoute("/"), { type: "rewrite", path: "/es" });
  assert.deepEqual(resolveLocaleRoute("/catalogo"), { type: "rewrite", path: "/es/catalogo" });
  assert.deepEqual(resolveLocaleRoute("/english"), { type: "rewrite", path: "/es/english" });
  assert.deepEqual(resolveLocaleRoute("/en-us"), { type: "rewrite", path: "/es/en-us" });
});

test("resolveLocaleRoute deja pasar /en", () => {
  assert.deepEqual(resolveLocaleRoute("/en"), { type: "next" });
  assert.deepEqual(resolveLocaleRoute("/en/catalogo/garbanzo"), { type: "next" });
});

test("resolveLocaleRoute redirige /es explícito", () => {
  assert.deepEqual(resolveLocaleRoute("/es"), { type: "redirect", path: "/" });
  assert.deepEqual(resolveLocaleRoute("/es/catalogo"), { type: "redirect", path: "/catalogo" });
});

test("resolveLocaleRoute ignora api, og, imágenes, _next y archivos", () => {
  for (const p of [
    "/api/contact",
    "/og",
    "/images/logo.png",
    "/_next/static/chunk.js",
    "/sitemap.xml",
    "/robots.txt",
    "/favicon.ico",
  ]) {
    assert.deepEqual(resolveLocaleRoute(p), { type: "next" }, p);
  }
});
