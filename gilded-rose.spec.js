import { expect, describe, it, beforeEach } from "vitest";
import { Item, ConjuredItem, AgedBrie, Sulfuras, BackstagePasses, items, updateQuality } from "./gilded-rose.js";

describe("updateQuality", () => {
  beforeEach(() => {
    items.length = 0;
  });

  it("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new Item("basic", 5, 3);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });

  it("degrades quality of basic items twice as fast once the sellIn is less than zero", () => {
    const testItem = new Item("basic", 0, 10);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(8);
    expect(testItem.sellIn).toBe(-1);
  });

  it("ensures the quality of an item is never negative", () => {
    const testItem = new Item("basic", 5, 0);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(4);
  });

  it("increases quality of Aged Brie the older it gets", () => {
    const testItem = new AgedBrie("Aged Brie", 5, 10);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(11);
    expect(testItem.sellIn).toBe(4);
  });

  it("ensures the quality of an item is never more than 50", () => {
    const testItem = new AgedBrie("Aged Brie", 5, 50);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(50);
    expect(testItem.sellIn).toBe(4);
  });

  it("keeps Sulfuras' quality and sellIn constant", () => {
    const testItem = new Sulfuras("Sulfuras, Hand of Ragnaros", 0, 80);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(80);
    expect(testItem.sellIn).toBe(0);
  });

  it("increases Backstage Passes' quality by 2 when sellIn is 10 days or less", () => {
    const testItem = new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 10, 20);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(22);
    expect(testItem.sellIn).toBe(9);
  });

  it("increases Backstage Passes' quality by 3 when sellIn is 5 days or less", () => {
    const testItem = new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 5, 20);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(23);
    expect(testItem.sellIn).toBe(4);
  });

  it("drops Backstage Passes' quality to 0 after the concert", () => {
    const testItem = new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 0, 20);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(-1);
  });

  it("degrades quality of Conjured items four times as fast once the sellIn is less than zero", () => {
    const testItem = new ConjuredItem("Conjured Mana Cake", -1, 10);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(6);
    expect(testItem.sellIn).toBe(-2);
  });
  
  it("degrades quality of Conjured items twice as fast once the sellIn is zero", () => {
    const testItem = new ConjuredItem("Conjured Mana Cake", 0, 10);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(8);
    expect(testItem.sellIn).toBe(-1);
  });
  
  it("ensures the quality of Conjured items is never negative", () => {
    const testItem = new ConjuredItem("Conjured Mana Cake", 3, 0);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(2);
  });
});

