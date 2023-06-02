export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality() {
    this.sellIn--;

    if (this.sellIn < 0) {
      this.quality = Math.max(this.quality - 2, 0);
    } else {
      this.quality = Math.max(this.quality - 1, 0);
    }
  }
}


export class ConjuredItem extends Item {
  updateQuality() {
    if (this.sellIn < 0) {
      this.quality = Math.max(this.quality - 4, 0);
    } else {
      this.quality = Math.max(this.quality - 2, 0);
    }

    this.sellIn--;
  }
}

export class AgedBrie extends Item {
  updateQuality() {
    if (this.sellIn < 0) {
      this.quality = Math.min(this.quality + 2, 50);
    } else {
      this.quality = Math.min(this.quality + 1, 50);
    }

    this.sellIn--;
  }
}

export class Sulfuras extends Item {
  updateQuality() {
  }
}

export class BackstagePasses extends Item {
  updateQuality() {
    if (this.sellIn <= 0) {
      this.quality = 0;
    } else if (this.sellIn <= 5) {
      this.quality = Math.min(this.quality + 3, 50);
    } else if (this.sellIn <= 10) {
      this.quality = Math.min(this.quality + 2, 50);
    } else {
      this.quality = Math.min(this.quality + 1, 50);
    }

    this.sellIn--;
  }
}

export let items = [];

items.push(new Item("+5 Dexterity Vest", 10, 20));
items.push(new AgedBrie("Aged Brie", 2, 0));
items.push(new Item("Elixir of the Mongoose", 5, 7));
items.push(new Sulfuras("Sulfuras, Hand of Ragnaros", 0, 80));
items.push(new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 15, 20));
items.push(new ConjuredItem("Conjured Mana Cake", 3, 6));

export const updateQuality = () => {
  for (let item of items) {
    item.updateQuality();
  }
};
