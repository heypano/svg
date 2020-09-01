const base = "https://pup.codes:33334/";

export const getCat = (name = "dexter") => {
  return fetch(`${base}getCat/${name}`).then(r => r.json());
};

export const saveCat = (name = "dexter", data) => {
  return fetch(`${base}saveCat/${name}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(r => r.json());
};
