import { test } from "node:test";
import assert from "node:assert/strict";
import { translate, translations } from "./translations.ts";

test("translate devuelve el texto del idioma", () => {
  assert.equal(translate("es", "nav.catalog"), "Catálogo");
  assert.equal(translate("en", "nav.catalog"), "Catalog");
});

test("translate cae a español y luego a la clave", () => {
  translations.es["__test.onlyEs"] = "solo es";
  assert.equal(translate("en", "__test.onlyEs"), "solo es");
  delete translations.es["__test.onlyEs"];
  assert.equal(translate("en", "__no.existe"), "__no.existe");
});

test("todas las claves meta.* existen en ambos idiomas", () => {
  const esMeta = Object.keys(translations.es).filter((k) => k.startsWith("meta."));
  const enMeta = Object.keys(translations.en).filter((k) => k.startsWith("meta."));
  assert.ok(esMeta.length >= 20, `solo ${esMeta.length} claves meta.* en es`);
  assert.deepEqual([...enMeta].sort(), [...esMeta].sort());
});
