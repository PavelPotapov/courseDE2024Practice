export const listMarsMockResponse = {
  marks: [
    { id: "1", type: "1", cords: [53.5, 58.9] },
    { id: "13", type: "2", cords: [54.5, 57.9] },
    { id: "14", type: "33", cords: [53.5, 57.9] },
    { id: "15", type: "4", cords: [52.5, 57.9] },
    { id: "16", type: "55", cords: [51.5, 57.9] },
  ],
};

export const markDetail = {
  ["1"]: {
    id: "1",
    title: "Al Capone",
    type: "1",
    address: {
      city: "Челябинск",
      house: "12a",
      street: "ул. Братьев Кашириных",
    },
    comment:
      "Хороший бар и караоке, по средам у них специальные акции с коктейлями",
    images: [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
    ],
  },
  ["2"]: {
    id: "2",
    title: "Al Capone 2",
    type: "1",
    address: {
      city: "Челябинск 2",
      house: "12a",
      street: "ул. Братьев Кашириных 2",
    },
    comment:
      "Хороший бар и караоке, по средам у них специальные акции с коктейлями 2",
    images: [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
    ],
  },
};
