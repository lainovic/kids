export class Human {
  name: string;
  nickname: string;
  age: number;
  birthday: Date;
  placeOfBirth: string;
  children: Human[] = [];

  constructor(
    name: string,
    birthday: Date,
    placeOfBirth: string,
    nickname?: string,
    children: Human[] = [],
  ) {
    this.name = name;
    this.nickname = nickname ?? name;
    this.birthday = birthday;
    this.age = this.calculateAge();
    this.placeOfBirth = placeOfBirth;
    this.children = children;
  }

  private calculateAge(): number {
    const ageDifMs = Date.now() - this.birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  toString(): string {
    return (
      "Child: " +
      this.name +
      " (" +
      this.nickname +
      "), " +
      this.age +
      " years old, born on " +
      this.birthday
    );
  }

  isParent(child: Human): boolean {
    return this.children.includes(child);
  }

  isChild(parent: Human): boolean {
    return parent.children.includes(this);
  }
}

export const vasja = new Human(
  "Vasja",
  new Date("2016-07-19T04:02:00Z"),
  "Europe/Belgrade",
  "Vasja",
);

export const dima = new Human(
  "Dimitrije",
  new Date("2014-05-05T04:55:00Z"),
  "Europe/Belgrade",
  "Dima",
);

export const bokica = new Human(
  "Bojana",
  new Date("1988-02-15T06:15:00Z"),
  "Europe/Belgrade",
  "Bokica",
  [vasja, dima]
);

export const marko = new Human(
  "Marko",
  new Date("1986-06-27T04:15:00Z"),
  "Europe/Belgrade",
  "Maki",
  [vasja, dima]
);
