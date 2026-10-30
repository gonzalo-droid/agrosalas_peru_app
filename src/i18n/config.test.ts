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
  assert.equal(stripLocale("/en/products"), "/products");
  assert.equal(stripLocale("/es/products/garbanzo"), "/products/garbanzo");
  assert.equal(stripLocale("/products"), "/products");
  assert.equal(stripLocale("/"), "/");
  assert.equal(stripLocale("/english"), "/english");
  assert.equal(stripLocale("/en-us/x"), "/en-us/x");
});

test("localizedPath agrega /en y deja el español sin prefijo", () => {
  assert.equal(localizedPath("/", "es"), "/");
  assert.equal(localizedPath("/", "en"), "/en");
  assert.equal(localizedPath("/products", "en"), "/en/products");
  assert.equal(localizedPath("/products", "es"), "/products");
  assert.equal(localizedPath("/en/products", "es"), "/products");
  assert.equal(localizedPath("/en/products", "en"), "/en/products");
});

test("localizedPath preserva query y hash", () => {
  assert.equal(
    localizedPath("/products?category=conservas", "en"),
    "/en/products?category=conservas",
  );
  assert.equal(localizedPath("/about#mision", "en"), "/en/about#mision");
  assert.equal(localizedPath("/?x=1", "en"), "/en?x=1");
  assert.equal(localizedPath("/contact?asunto=quote", "es"), "/contact?asunto=quote");
});

test("resolveLocaleRoute reescribe español sin prefijo", () => {
  assert.deepEqual(resolveLocaleRoute("/"), { type: "rewrite", path: "/es" });
  assert.deepEqual(resolveLocaleRoute("/products"), { type: "rewrite", path: "/es/products" });
  assert.deepEqual(resolveLocaleRoute("/english"), { type: "rewrite", path: "/es/english" });
  assert.deepEqual(resolveLocaleRoute("/en-us"), { type: "rewrite", path: "/es/en-us" });
});

test("resolveLocaleRoute deja pasar /en", () => {
  assert.deepEqual(resolveLocaleRoute("/en"), { type: "next" });
  assert.deepEqual(resolveLocaleRoute("/en/products/garbanzo"), { type: "next" });
});

test("resolveLocaleRoute redirige /es explícito", () => {
  assert.deepEqual(resolveLocaleRoute("/es"), { type: "redirect", path: "/" });
  assert.deepEqual(resolveLocaleRoute("/es/products"), { type: "redirect", path: "/products" });
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
