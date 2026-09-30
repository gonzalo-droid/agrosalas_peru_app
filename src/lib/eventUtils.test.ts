import { test } from "node:test";
import assert from "node:assert/strict";
import type { EventItem } from "../types/index.ts";
import {
  assertUniqueSlugs,
  coverOrPlaceholder,
  formatEventDate,
  isUpcoming,
  pickOtherEvents,
  splitEvents,
  todayInLima,
} from "./eventUtils.ts";

function ev(slug: string, startDate: string, endDate?: string): EventItem {
  return {
    slug, title: slug, startDate, endDate, city: "Lima, Perú",
    summary: "", body: [], cover: "", gallery: [],
  };
}

test("formatEventDate — ES", () => {
  assert.equal(formatEventDate("2026-05-12", undefined, "es"), "12 may 2026");
  assert.equal(formatEventDate("2026-05-12", "2026-05-12", "es"), "12 may 2026");
  assert.equal(formatEventDate("2026-05-12", "2026-05-14", "es"), "12–14 may 2026");
  assert.equal(formatEventDate("2026-04-30", "2026-05-02", "es"), "30 abr – 2 may 2026");
  assert.equal(formatEventDate("2026-12-30", "2027-01-02", "es"), "30 dic 2026 – 2 ene 2027");
  assert.equal(formatEventDate("2026-09-05", undefined, "es"), "5 set 2026");
});

test("formatEventDate — EN", () => {
  assert.equal(formatEventDate("2026-05-12", undefined, "en"), "May 12, 2026");
  assert.equal(formatEventDate("2026-05-12", "2026-05-14", "en"), "May 12–14, 2026");
  assert.equal(formatEventDate("2026-04-30", "2026-05-02", "en"), "Apr 30 – May 2, 2026");
  assert.equal(formatEventDate("2026-12-30", "2027-01-02", "en"), "Dec 30, 2026 – Jan 2, 2027");
});

test("isUpcoming usa endDate y cuenta el día de hoy y los eventos en curso", () => {
  assert.equal(isUpcoming(ev("a", "2026-09-29"), "2026-09-29"), true);
  assert.equal(isUpcoming(ev("a", "2026-09-28"), "2026-09-29"), false);
  assert.equal(isUpcoming(ev("a", "2026-09-27", "2026-09-30"), "2026-09-29"), true);
  assert.equal(isUpcoming(ev("a", "2026-09-25", "2026-09-28"), "2026-09-29"), false);
});

test("splitEvents separa y ordena", () => {
  const list = [
    ev("pasado-viejo", "2025-03-01"),
    ev("proximo-lejano", "2027-06-01"),
    ev("pasado-reciente", "2026-08-01"),
    ev("proximo-cercano", "2026-10-10"),
  ];
  const { upcoming, past } = splitEvents(list, "2026-09-29");
  assert.deepEqual(upcoming.map((e) => e.slug), ["proximo-cercano", "proximo-lejano"]);
  assert.deepEqual(past.map((e) => e.slug), ["pasado-reciente", "pasado-viejo"]);
});

test("splitEvents no muta el array original", () => {
  const list = [ev("b", "2027-01-01"), ev("a", "2026-12-01")];
  splitEvents(list, "2026-09-29");
  assert.deepEqual(list.map((e) => e.slug), ["b", "a"]);
});

test("pickOtherEvents excluye el actual, prioriza próximos y respeta el límite", () => {
  const list = [
    ev("actual", "2026-10-01"),
    ev("pasado-1", "2026-08-01"),
    ev("pasado-2", "2026-07-01"),
    ev("proximo-1", "2026-11-01"),
    ev("pasado-3", "2026-06-01"),
  ];
  assert.deepEqual(
    pickOtherEvents(list, "actual", "2026-09-29").map((e) => e.slug),
    ["proximo-1", "pasado-1", "pasado-2"],
  );
  assert.equal(pickOtherEvents(list, "actual", "2026-09-29", 1).length, 1);
});

test("todayInLima devuelve YYYY-MM-DD en hora de Lima (UTC-5)", () => {
  // 03:00 UTC del 30 = 22:00 del 29 en Lima
  assert.equal(todayInLima(new Date("2026-09-30T03:00:00Z")), "2026-09-29");
  assert.equal(todayInLima(new Date("2026-09-30T06:00:00Z")), "2026-09-30");
});

test("coverOrPlaceholder", () => {
  assert.equal(coverOrPlaceholder(""), "/images/products/placeholder.svg");
  assert.equal(coverOrPlaceholder("  "), "/images/products/placeholder.svg");
  assert.equal(coverOrPlaceholder("/images/event/x/cover.jpg"), "/images/event/x/cover.jpg");
});

test("assertUniqueSlugs lanza con el slug repetido", () => {
  assert.doesNotThrow(() => assertUniqueSlugs([ev("a", "2026-01-01"), ev("b", "2026-01-01")]));
  assert.throws(
    () => assertUniqueSlugs([ev("a", "2026-01-01"), ev("a", "2026-02-01")]),
    /slug duplicado: "a"/,
  );
});
